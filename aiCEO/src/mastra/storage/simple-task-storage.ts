import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// Task schema for storage
export const TaskSchema = z.object({
  id: z.string(),
  business_idea: z.string(),
  specialist: z.string(),
  task_id: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.enum(['high', 'medium', 'low']),
  estimated_hours: z.number(),
  dependencies: z.array(z.string()),
  deliverable: z.string(),
  month: z.number(),
  status: z.enum(['ready', 'blocked', 'in_progress', 'completed']),
  budget_allocation: z.string(),
  created_at: z.string(),
  workflow_run_id: z.string().optional()
});

export type Task = z.infer<typeof TaskSchema>;

interface TaskDatabase {
  tasks: Task[];
  metadata: {
    created_at: string;
    last_updated: string;
    total_tasks: number;
  };
}

export class SimpleTaskStorage {
  private dbPath: string;
  private data: TaskDatabase = {
    tasks: [],
    metadata: {
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
      total_tasks: 0
    }
  };

  constructor(dbPath: string = './tasks.json') {
    this.dbPath = path.resolve(dbPath);
    this.loadData();
  }

  private loadData(): void {
    try {
      if (fs.existsSync(this.dbPath)) {
        const fileContent = fs.readFileSync(this.dbPath, 'utf-8');
        this.data = JSON.parse(fileContent);
      } else {
        this.data = {
          tasks: [],
          metadata: {
            created_at: new Date().toISOString(),
            last_updated: new Date().toISOString(),
            total_tasks: 0
          }
        };
        this.saveData();
      }
    } catch (error) {
      console.warn('Error loading task data, creating new database:', error);
      this.data = {
        tasks: [],
        metadata: {
          created_at: new Date().toISOString(),
          last_updated: new Date().toISOString(),
          total_tasks: 0
        }
      };
    }
  }

  private saveData(): void {
    try {
      this.data.metadata.last_updated = new Date().toISOString();
      this.data.metadata.total_tasks = this.data.tasks.length;
      
      const dirPath = path.dirname(this.dbPath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error saving task data:', error);
    }
  }

  // Save tasks from workflow result
  saveTasks(businessIdea: string, workflowResult: any, workflowRunId?: string): void {
    try {
      const coordination = workflowResult.task_coordination;
      const createdAt = new Date().toISOString();

      // Remove existing tasks for this business idea to avoid duplicates
      this.data.tasks = this.data.tasks.filter(task => task.business_idea !== businessIdea);

      coordination.specialist_task_assignments.forEach((assignment: any) => {
        assignment.priority_tasks.forEach((task: any) => {
          const taskId = `${businessIdea.replace(/\s+/g, '_')}_${task.task_id}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          
          const newTask: Task = {
            id: taskId,
            business_idea: businessIdea,
            specialist: assignment.specialist,
            task_id: task.task_id,
            title: task.title,
            description: task.description,
            priority: task.priority as 'high' | 'medium' | 'low',
            estimated_hours: task.estimated_hours,
            dependencies: task.dependencies || [],
            deliverable: task.deliverable,
            month: task.month,
            status: task.status as 'ready' | 'blocked' | 'in_progress' | 'completed',
            budget_allocation: assignment.budget_allocation,
            created_at: createdAt,
            workflow_run_id: workflowRunId
          };

          this.data.tasks.push(newTask);
        });
      });

      this.saveData();
      console.log(`✅ Saved ${this.data.tasks.filter(t => t.business_idea === businessIdea).length} tasks for "${businessIdea}"`);
    } catch (error) {
      console.error('Error saving tasks:', error);
      throw error;
    }
  }

  // Get all tasks for a business idea
  getTasksByBusinessIdea(businessIdea: string): Task[] {
    return this.data.tasks
      .filter(task => task.business_idea === businessIdea)
      .sort((a, b) => {
        // Sort by month first, then by priority
        if (a.month !== b.month) return a.month - b.month;
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }

  // Get tasks by specialist
  getTasksBySpecialist(specialist: string): Task[] {
    return this.data.tasks
      .filter(task => task.specialist === specialist)
      .sort((a, b) => {
        if (a.month !== b.month) return a.month - b.month;
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }

  // Get ready-to-execute tasks
  getReadyTasks(businessIdea?: string): Task[] {
    let tasks = this.data.tasks.filter(task => task.status === 'ready');
    
    if (businessIdea) {
      tasks = tasks.filter(task => task.business_idea === businessIdea);
    }
    
    return tasks.sort((a, b) => {
      if (a.month !== b.month) return a.month - b.month;
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Update task status
  updateTaskStatus(taskId: string, status: 'ready' | 'blocked' | 'in_progress' | 'completed'): void {
    const task = this.data.tasks.find(t => t.task_id === taskId || t.id === taskId);
    if (task) {
      task.status = status;
      this.saveData();
    }
  }

  // Get task statistics
  getTaskStats(businessIdea?: string): {
    total: number;
    ready: number;
    blocked: number;
    in_progress: number;
    completed: number;
    by_specialist: Record<string, number>;
    total_hours: number;
  } {
    let tasks = this.data.tasks;
    
    if (businessIdea) {
      tasks = tasks.filter(task => task.business_idea === businessIdea);
    }

    const stats = {
      total: tasks.length,
      ready: 0,
      blocked: 0,
      in_progress: 0,
      completed: 0,
      by_specialist: {} as Record<string, number>,
      total_hours: 0
    };

    tasks.forEach(task => {
      // Count by status
      if (task.status === 'ready') stats.ready++;
      else if (task.status === 'blocked') stats.blocked++;
      else if (task.status === 'in_progress') stats.in_progress++;
      else if (task.status === 'completed') stats.completed++;

      // Count by specialist
      if (!stats.by_specialist[task.specialist]) {
        stats.by_specialist[task.specialist] = 0;
      }
      stats.by_specialist[task.specialist]++;

      // Sum total hours
      stats.total_hours += task.estimated_hours;
    });

    return stats;
  }

  // Get all tasks (for debugging)
  getAllTasks(): Task[] {
    return [...this.data.tasks];
  }

  // Clear all tasks for a business idea
  clearTasksForBusiness(businessIdea: string): void {
    this.data.tasks = this.data.tasks.filter(task => task.business_idea !== businessIdea);
    this.saveData();
  }

  // Get database info
  getDbInfo(): { path: string; taskCount: number; lastUpdated: string } {
    return {
      path: this.dbPath,
      taskCount: this.data.tasks.length,
      lastUpdated: this.data.metadata.last_updated
    };
  }
}

// Singleton instance
export const simpleTaskStorage = new SimpleTaskStorage('./tasks.json'); 