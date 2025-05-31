import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { simpleTaskStorage } from '../storage/simple-task-storage';

export const runBusinessPlanningTool = createTool({
  id: 'run-complete-business-planning',
  description: 'Execute the complete end-to-end business planning workflow that runs business analysis, task coordination, and integration validation across all C-suite specialists',
  inputSchema: z.object({
    business_idea: z.string().describe('The business idea or concept to analyze'),
    business_context: z.object({
      industry: z.string().describe('The industry or sector (e.g., "Food Technology", "SaaS", "Healthcare")'),
      stage: z.string().describe('Current business stage (e.g., "idea", "prototype", "early-stage", "growth")'),
      budget: z.number().describe('Available budget in USD for initial development'),
      timeline: z.string().describe('Target timeline for launch or key milestone (e.g., "6 months to MVP", "12 months to revenue")'),
      constraints: z.array(z.string()).describe('Key constraints or limitations (e.g., "Limited to San Francisco", "Must be carbon neutral")')
    }).optional().describe('Additional business context and constraints')
  }),
  outputSchema: z.object({
    workflow_status: z.string(),
    execution_summary: z.string(),
    business_analysis_summary: z.string(),
    task_coordination_summary: z.string(),
    integration_metrics: z.object({
      total_specialists_engaged: z.number(),
      total_actionable_tasks: z.number(),
      ready_to_execute_tasks: z.number(),
      estimated_total_hours: z.number(),
      success_probability: z.string()
    }),
    tasks_saved_to_database: z.boolean(),
    database_task_count: z.number(),
    next_immediate_actions: z.array(z.string()),
    full_results_available: z.boolean()
  }),
  execute: async ({ context, mastra }) => {
    const { business_idea, business_context } = context;
    
    try {
      console.log('🎯 COS triggering complete business planning workflow...');
      console.log(`💡 Business Idea: ${business_idea}`);
      
      // Get the end-to-end business planning workflow
      const workflow = mastra?.getWorkflow('endToEndBusinessPlanningWorkflow');
      if (!workflow) {
        throw new Error('End-to-end business planning workflow not found');
      }

      // Execute the complete workflow
      const run = workflow.createRun();
      const result = await run.start({
        inputData: {
          business_idea,
          business_context: business_context || {
            industry: 'Technology',
            stage: 'idea',
            budget: 100000,
            timeline: '6 months',
            constraints: []
          }
        }
      });

      if (result.status === 'success') {
        const metrics = result.result.integration_summary;
        const coordination = result.result.task_coordination;
        
        // Save tasks to database
        let tasksSaved = false;
        let taskCount = 0;
        
        try {
          const runId = `run_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          simpleTaskStorage.saveTasks(business_idea, result.result, runId);
          tasksSaved = true;
          
          // Get the actual count of saved tasks
          const savedTasks = simpleTaskStorage.getTasksByBusinessIdea(business_idea);
          taskCount = savedTasks.length;
          
          console.log(`✅ Saved ${taskCount} tasks to database for "${business_idea}"`);
        } catch (dbError) {
          console.error('Database save error:', dbError);
          tasksSaved = false;
        }
        
        return {
          workflow_status: 'SUCCESS',
          execution_summary: `Complete business planning workflow executed successfully! Engaged ${metrics.total_specialists_engaged} specialists, generated ${metrics.total_actionable_tasks} actionable tasks with ${metrics.success_probability} success probability.`,
          business_analysis_summary: `Business analysis complete with ${result.result.business_analysis.specialist_analyses.length} specialist analyses. Generated comprehensive strategy covering technology, marketing, finance, and operations domains. Total estimated effort: ${result.result.business_analysis.total_tasks_created} strategic tasks identified.`,
          task_coordination_summary: `Task coordination successful! Created detailed execution plan with ${coordination.specialist_task_assignments.length} specialist assignments. Identified ${coordination.coordination_matrix.critical_dependencies.length} critical dependencies and ${coordination.coordination_matrix.timeline_milestones.length} key milestones.`,
          integration_metrics: {
            total_specialists_engaged: metrics.total_specialists_engaged,
            total_actionable_tasks: metrics.total_actionable_tasks,
            ready_to_execute_tasks: metrics.ready_to_execute_tasks,
            estimated_total_hours: metrics.estimated_total_hours,
            success_probability: metrics.success_probability
          },
          tasks_saved_to_database: tasksSaved,
          database_task_count: taskCount,
          next_immediate_actions: coordination.next_immediate_actions,
          full_results_available: true
        };
      } else {
        throw new Error(`Workflow execution failed with status: ${result.status}`);
      }
      
    } catch (error) {
      console.error('Business planning workflow error:', error);
      return {
        workflow_status: 'FAILED',
        execution_summary: `Business planning workflow failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        business_analysis_summary: 'Business analysis not completed due to workflow failure',
        task_coordination_summary: 'Task coordination not completed due to workflow failure',
        integration_metrics: {
          total_specialists_engaged: 0,
          total_actionable_tasks: 0,
          ready_to_execute_tasks: 0,
          estimated_total_hours: 0,
          success_probability: 'Failed'
        },
        tasks_saved_to_database: false,
        database_task_count: 0,
        next_immediate_actions: ['Debug workflow execution', 'Check system configuration'],
        full_results_available: false
      };
    }
  }
}); 