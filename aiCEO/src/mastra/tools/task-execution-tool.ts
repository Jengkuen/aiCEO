import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { simpleTaskStorage } from '../storage/simple-task-storage';

// Mock data for simulating task completion
const mockTaskResults: Record<string, string[]> = {
  'Chief Technology Officer': [
    'Technology stack selected: React.js, Node.js, PostgreSQL, AWS',
    'Database schema designed with user authentication and data models',
    'CI/CD pipeline configured with automated testing and deployment',
    'API endpoints developed with authentication and rate limiting',
    'Security audit completed with SSL, encryption, and access controls',
    'Performance optimization implemented with caching and CDN'
  ],
  'Chief Marketing Officer': [
    'Brand identity created with logo, colors, and messaging framework',
    'Digital marketing strategy developed for social media and content',
    'User acquisition funnel designed with conversion optimization',
    'Market research completed with competitor analysis and positioning',
    'Content calendar created for 6 months of marketing materials',
    'Customer personas developed with behavioral and demographic insights'
  ],
  'Chief Financial Officer': [
    'Financial projections modeled for 3-year revenue and expenses',
    'Funding strategy developed with investor pitch and timeline',
    'Budget allocation completed across all business functions',
    'Cash flow analysis performed with scenario planning',
    'Financial controls implemented with reporting and compliance',
    'Pricing strategy optimized based on market analysis and costs'
  ],
  'Chief Operating Officer': [
    'Operational processes documented with workflows and procedures',
    'Team structure designed with roles, responsibilities, and reporting',
    'Vendor partnerships established for key service providers',
    'Quality management system implemented with standards and metrics',
    'Supply chain optimized with cost reduction and reliability',
    'Customer service protocols established with support channels'
  ]
};

export const taskExecutionTool = createTool({
  id: 'execute-business-task',
  description: 'Start execution of a specific business task by coordinating with the appropriate specialist agent',
  inputSchema: z.object({
    task_id: z.string().describe('The ID of the task to execute'),
    business_idea: z.string().optional().describe('The business idea this task belongs to (for context)'),
    specialist_instructions: z.string().optional().describe('Additional specific instructions for the specialist agent'),
    simulate_completion: z.boolean().optional().default(true).describe('Whether to simulate task completion for demo purposes')
  }),
  outputSchema: z.object({
    success: z.boolean(),
    task_id: z.string(),
    task_title: z.string(),
    specialist: z.string(),
    status: z.string(),
    execution_result: z.string(),
    estimated_completion_time: z.string(),
    next_steps: z.array(z.string()),
    message: z.string()
  }),
  execute: async ({ context }) => {
    const { task_id, business_idea, specialist_instructions, simulate_completion } = context;
    
    try {
      // Find the task in storage
      const allTasks = simpleTaskStorage.getAllTasks();
      const task = allTasks.find(t => t.task_id === task_id || t.id === task_id);
      
      if (!task) {
        return {
          success: false,
          task_id,
          task_title: 'Unknown',
          specialist: 'Unknown',
          status: 'not_found',
          execution_result: 'Task not found in database',
          estimated_completion_time: 'N/A',
          next_steps: ['Please verify the task ID and try again'],
          message: `❌ Task with ID "${task_id}" not found in the database.`
        };
      }

      // Check if task is ready to execute
      if (task.status !== 'ready' && task.status !== 'blocked') {
        return {
          success: false,
          task_id: task.task_id,
          task_title: task.title,
          specialist: task.specialist,
          status: task.status,
          execution_result: `Task is currently ${task.status} and cannot be started`,
          estimated_completion_time: 'N/A',
          next_steps: ['Wait for task dependencies to be resolved', 'Check task prerequisites'],
          message: `⚠️ Task "${task.title}" is currently ${task.status} and cannot be executed.`
        };
      }

      // Mark task as in progress
      simpleTaskStorage.updateTaskStatus(task.task_id, 'in_progress');

      // Simulate specialist agent coordination
      const specialistResults = mockTaskResults[task.specialist] || [
        'Task initiated with specialist agent',
        'Requirements analyzed and approach defined',
        'Work plan created with milestones and deliverables'
      ];

      let executionResult: string;
      let newStatus: 'in_progress' | 'completed';
      let estimatedTime: string;
      let nextSteps: string[];

      if (simulate_completion) {
        // Simulate completion with random result
        const randomResult = specialistResults[Math.floor(Math.random() * specialistResults.length)];
        executionResult = `✅ COMPLETED: ${randomResult}`;
        newStatus = 'completed';
        estimatedTime = 'Completed immediately (demo mode)';
        nextSteps = [
          'Review completed deliverable',
          'Update stakeholders on completion',
          'Check dependencies and start next tasks'
        ];
        
        // Update status to completed
        simpleTaskStorage.updateTaskStatus(task.task_id, 'completed');
      } else {
        // Real execution mode - mark as in progress
        const randomResult = specialistResults[Math.floor(Math.random() * specialistResults.length)];
        executionResult = `🚀 STARTED: ${task.specialist} has begun work on "${task.title}". Initial approach: ${randomResult}`;
        newStatus = 'in_progress';
        estimatedTime = `${task.estimated_hours} hours (as estimated)`;
        nextSteps = [
          'Monitor progress with specialist agent',
          'Provide additional guidance if needed',
          'Review intermediate deliverables'
        ];
      }

      return {
        success: true,
        task_id: task.task_id,
        task_title: task.title,
        specialist: task.specialist,
        status: newStatus,
        execution_result: executionResult,
        estimated_completion_time: estimatedTime,
        next_steps: nextSteps,
        message: `✅ Successfully ${simulate_completion ? 'completed' : 'started'} task "${task.title}" with ${task.specialist}.`
      };

    } catch (error) {
      return {
        success: false,
        task_id,
        task_title: 'Unknown',
        specialist: 'Unknown',
        status: 'error',
        execution_result: `Error executing task: ${error instanceof Error ? error.message : 'Unknown error'}`,
        estimated_completion_time: 'N/A',
        next_steps: ['Review error details', 'Check task configuration', 'Retry execution'],
        message: `❌ Error executing task: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
});

export const batchTaskExecutionTool = createTool({
  id: 'execute-batch-tasks',
  description: 'Execute multiple tasks in batch, optionally filtered by business idea, specialist, or priority',
  inputSchema: z.object({
    business_idea: z.string().optional().describe('Filter tasks for a specific business idea'),
    specialist: z.string().optional().describe('Filter tasks for a specific specialist'),
    priority: z.enum(['high', 'medium', 'low']).optional().describe('Filter tasks by priority level'),
    max_tasks: z.number().optional().default(5).describe('Maximum number of tasks to execute in this batch'),
    simulate_completion: z.boolean().optional().default(true).describe('Whether to simulate task completion for demo purposes')
  }),
  outputSchema: z.object({
    success: z.boolean(),
    tasks_executed: z.number(),
    results: z.array(z.object({
      task_id: z.string(),
      task_title: z.string(),
      specialist: z.string(),
      status: z.string(),
      execution_result: z.string()
    })),
    summary: z.string(),
    next_ready_tasks: z.number(),
    message: z.string()
  }),
  execute: async ({ context, runtimeContext }) => {
    const { business_idea, specialist, priority, max_tasks, simulate_completion } = context;
    
    try {
      // Get ready tasks based on filters
      let readyTasks = simpleTaskStorage.getReadyTasks(business_idea);
      
      if (specialist) {
        readyTasks = readyTasks.filter(task => task.specialist === specialist);
      }
      
      if (priority) {
        readyTasks = readyTasks.filter(task => task.priority === priority);
      }

      // Limit to max_tasks
      const tasksToExecute = readyTasks.slice(0, max_tasks);
      
      if (tasksToExecute.length === 0) {
        return {
          success: true,
          tasks_executed: 0,
          results: [],
          summary: 'No ready tasks found matching the specified criteria',
          next_ready_tasks: 0,
          message: '📝 No tasks found to execute with the given filters.'
        };
      }

      const results = [];
      
      for (const task of tasksToExecute) {
        // Execute each task using the direct execution logic
        const taskExecutionResult = await taskExecutionTool.execute({
          context: {
            task_id: task.task_id,
            business_idea: task.business_idea,
            simulate_completion
          },
          runtimeContext
        });
        
        if (taskExecutionResult.success) {
          results.push({
            task_id: task.task_id,
            task_title: task.title,
            specialist: task.specialist,
            status: taskExecutionResult.status,
            execution_result: taskExecutionResult.execution_result
          });
        }
      }

      // Count remaining ready tasks
      const remainingReadyTasks = simpleTaskStorage.getReadyTasks(business_idea).length;
      
      const summary = `Executed ${results.length} tasks successfully. ${remainingReadyTasks} tasks remain ready for execution.`;
      
      return {
        success: true,
        tasks_executed: results.length,
        results,
        summary,
        next_ready_tasks: remainingReadyTasks,
        message: `✅ Batch execution completed: ${results.length} tasks ${simulate_completion ? 'completed' : 'started'}.`
      };

    } catch (error) {
      return {
        success: false,
        tasks_executed: 0,
        results: [],
        summary: `Error in batch execution: ${error instanceof Error ? error.message : 'Unknown error'}`,
        next_ready_tasks: 0,
        message: `❌ Batch execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}); 