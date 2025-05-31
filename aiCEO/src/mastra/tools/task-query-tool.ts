import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { simpleTaskStorage } from '../storage/simple-task-storage';

export const queryTasksTool = createTool({
  id: 'query-business-tasks',
  description: 'Query and retrieve stored tasks from the database for any business idea or specialist',
  inputSchema: z.object({
    business_idea: z.string().optional().describe('Filter tasks for a specific business idea'),
    specialist: z.string().optional().describe('Filter tasks for a specific specialist (e.g., "Chief Technology Officer")'),
    status: z.enum(['ready', 'blocked', 'in_progress', 'completed']).optional().describe('Filter tasks by status'),
    get_stats: z.boolean().optional().describe('Whether to include task statistics and summary')
  }),
  outputSchema: z.object({
    tasks_found: z.number(),
    tasks: z.array(z.object({
      task_id: z.string(),
      title: z.string(),
      specialist: z.string(),
      priority: z.string(),
      status: z.string(),
      estimated_hours: z.number(),
      month: z.number(),
      description: z.string()
    })),
    statistics: z.object({
      total: z.number(),
      ready: z.number(),
      blocked: z.number(),
      in_progress: z.number(),
      completed: z.number(),
      by_specialist: z.record(z.number()),
      total_hours: z.number()
    }).optional(),
    query_summary: z.string()
  }),
  execute: async ({ context }) => {
    const { business_idea, specialist, status, get_stats } = context;
    
    try {
      let tasks: any[] = [];
      let queryDesc = 'all tasks';

      // Query tasks based on filters
      if (business_idea && specialist) {
        tasks = simpleTaskStorage.getTasksByBusinessIdea(business_idea)
          .filter(task => task.specialist === specialist);
        queryDesc = `tasks for "${business_idea}" assigned to ${specialist}`;
      } else if (business_idea) {
        tasks = simpleTaskStorage.getTasksByBusinessIdea(business_idea);
        queryDesc = `all tasks for "${business_idea}"`;
      } else if (specialist) {
        tasks = simpleTaskStorage.getTasksBySpecialist(specialist);
        queryDesc = `all tasks assigned to ${specialist}`;
      } else if (status) {
        tasks = simpleTaskStorage.getReadyTasks(); // This gets ready tasks, we'll filter others below
        queryDesc = `all ${status} tasks`;
      } else {
        // Get all ready tasks if no filters
        tasks = simpleTaskStorage.getReadyTasks();
        queryDesc = 'all ready tasks across all business ideas';
      }

      // Apply status filter if specified
      if (status) {
        tasks = tasks.filter(task => task.status === status);
      }

      // Get statistics if requested
      let statistics;
      if (get_stats) {
        statistics = simpleTaskStorage.getTaskStats(business_idea);
      }

      // Format tasks for output
      const formattedTasks = tasks.map(task => ({
        task_id: task.task_id,
        title: task.title,
        specialist: task.specialist,
        priority: task.priority,
        status: task.status,
        estimated_hours: task.estimated_hours,
        month: task.month,
        description: task.description
      }));

      let summary = `Found ${tasks.length} ${queryDesc}`;
      if (statistics) {
        summary += `. Overall stats: ${statistics.total} total tasks, ${statistics.ready} ready, ${statistics.completed} completed, ${statistics.total_hours} total estimated hours.`;
      }

      return {
        tasks_found: tasks.length,
        tasks: formattedTasks,
        statistics,
        query_summary: summary
      };
      
    } catch (error) {
      return {
        tasks_found: 0,
        tasks: [],
        query_summary: `Error querying tasks: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}); 