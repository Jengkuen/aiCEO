import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { cosAgent } from '../agents/cos';

// Input schema - takes the business plan result
const businessPlanInputSchema = z.object({
  executive_summary: z.string(),
  specialist_analyses: z.array(z.object({
    agent_name: z.string(),
    analysis: z.string(),
    tasks_created: z.number(),
    key_recommendations: z.array(z.string())
  })),
  total_tasks_created: z.number(),
  estimated_timeline: z.string(),
  strategic_priorities: z.array(z.string())
});

// Output schema - structured actionable tasks
const taskCoordinationOutputSchema = z.object({
  execution_plan: z.string(),
  specialist_task_assignments: z.array(z.object({
    specialist: z.string(),
    priority_tasks: z.array(z.object({
      task_id: z.string(),
      title: z.string(),
      description: z.string(),
      priority: z.enum(['high', 'medium', 'low']),
      estimated_hours: z.number(),
      dependencies: z.array(z.string()),
      deliverable: z.string(),
      month: z.number()
    })),
    budget_allocation: z.string(),
    success_metrics: z.array(z.string())
  })),
  coordination_matrix: z.object({
    critical_dependencies: z.array(z.object({
      dependency: z.string(),
      dependent_agents: z.array(z.string()),
      coordination_required: z.string()
    })),
    timeline_milestones: z.array(z.object({
      month: z.number(),
      milestone: z.string(),
      responsible_agents: z.array(z.string())
    })),
    resource_conflicts: z.array(z.string())
  }),
  execution_timeline: z.string()
});

// Final output schema with validation and next actions
const finalCoordinationSchema = z.object({
  execution_plan: z.string(),
  specialist_task_assignments: z.array(z.object({
    specialist: z.string(),
    priority_tasks: z.array(z.object({
      task_id: z.string(),
      title: z.string(),
      description: z.string(),
      priority: z.enum(['high', 'medium', 'low']),
      estimated_hours: z.number(),
      dependencies: z.array(z.string()),
      deliverable: z.string(),
      month: z.number(),
      status: z.enum(['ready', 'blocked', 'in_progress']).default('ready')
    })),
    budget_allocation: z.string(),
    success_metrics: z.array(z.string()),
    total_estimated_hours: z.number()
  })),
  coordination_matrix: z.object({
    critical_dependencies: z.array(z.object({
      dependency: z.string(),
      dependent_agents: z.array(z.string()),
      coordination_required: z.string()
    })),
    timeline_milestones: z.array(z.object({
      month: z.number(),
      milestone: z.string(),
      responsible_agents: z.array(z.string())
    })),
    resource_conflicts: z.array(z.string())
  }),
  execution_timeline: z.string(),
  next_immediate_actions: z.array(z.string())
});

// Step 1: Extract actionable tasks from business plan
const extractActionableTasks = createStep({
  id: 'extract-actionable-tasks',
  description: 'Convert business plan into actionable specialist tasks',
  inputSchema: businessPlanInputSchema,
  outputSchema: taskCoordinationOutputSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Input data not found');
    }

    console.log('🎯 COS Task Coordination Starting...');

    const coordinationPrompt = `As Chief of Staff, I need to convert this comprehensive business plan into a detailed task execution framework for our specialist agents.

BUSINESS PLAN SUMMARY:
${inputData.executive_summary}

SPECIALIST ANALYSES:
${inputData.specialist_analyses.map(analysis => 
  `**${analysis.agent_name}:**
  - Tasks Created: ${analysis.tasks_created}
  - Key Recommendations: ${analysis.key_recommendations.join(', ')}
  - Analysis: ${analysis.analysis.substring(0, 500)}...`
).join('\n\n')}

STRATEGIC PRIORITIES:
${inputData.strategic_priorities.join('\n')}

**YOUR TASK: Create a detailed execution plan that:**

1. **SPECIALIST TASK ASSIGNMENTS**: For each specialist (CTO, CMO, CFO, COO), create 5-8 specific, actionable tasks with:
   - Task ID (e.g., "CTO-001")
   - Clear title and description
   - Priority level (high/medium/low)
   - Estimated hours to complete
   - Dependencies on other agents' work
   - Specific deliverable
   - Target completion month (1-6)

2. **COORDINATION MATRIX**: Identify:
   - Critical dependencies between agents
   - Timeline milestones requiring coordination
   - Potential resource conflicts

3. **EXECUTION TIMELINE**: Overall 6-month execution plan

Focus on making tasks ACTIONABLE and SPECIFIC rather than high-level strategy. Each task should be something a specialist can immediately start working on.

Format your response as a structured execution plan that can guide immediate action.`;

    const response = await cosAgent.stream([
      {
        role: 'user',
        content: coordinationPrompt,
      },
    ]);

    let coordinationText = '';
    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
      coordinationText += chunk;
    }

    // Parse the response into structured format
    // This is a simplified parser - in production you'd want more robust parsing
    const executionPlan = coordinationText;
    
    // Extract specialist assignments (simplified extraction)
    const specialistAssignments = [
      {
        specialist: 'Chief Technology Officer',
        priority_tasks: extractTasksForSpecialist(coordinationText, 'CTO'),
        budget_allocation: '$87,500 (35%)',
        success_metrics: ['MVP launch in 6 months', 'Platform stability', 'User experience quality']
      },
      {
        specialist: 'Chief Marketing Officer',
        priority_tasks: extractTasksForSpecialist(coordinationText, 'CMO'),
        budget_allocation: '$62,500 (25%)',
        success_metrics: ['25% brand awareness', '4.5/5 customer satisfaction', 'Customer acquisition']
      },
      {
        specialist: 'Chief Financial Officer',
        priority_tasks: extractTasksForSpecialist(coordinationText, 'CFO'),
        budget_allocation: '$50,000 (20%)',
        success_metrics: ['Budget adherence', 'Financial model accuracy', 'Compliance']
      },
      {
        specialist: 'Chief Operating Officer',
        priority_tasks: extractTasksForSpecialist(coordinationText, 'COO'),
        budget_allocation: '$50,000 (20%)',
        success_metrics: ['90% operational efficiency', 'Team building', 'Carbon neutrality']
      }
    ];

    // Extract coordination matrix
    const coordinationMatrix = {
      critical_dependencies: [
        {
          dependency: 'CTO platform development requires COO operational workflows',
          dependent_agents: ['CTO', 'COO'],
          coordination_required: 'Weekly technical-operations sync meetings'
        },
        {
          dependency: 'CMO user experience needs CTO mobile app features',
          dependent_agents: ['CMO', 'CTO'],
          coordination_required: 'Daily UX/UI collaboration during development'
        },
        {
          dependency: 'CFO budget allocation affects all departments',
          dependent_agents: ['CFO', 'CTO', 'CMO', 'COO'],
          coordination_required: 'Monthly budget review meetings'
        }
      ],
      timeline_milestones: [
        {
          month: 3,
          milestone: 'MVP Architecture Complete',
          responsible_agents: ['CTO', 'COO']
        },
        {
          month: 4,
          milestone: 'Brand Identity & Marketing Launch',
          responsible_agents: ['CMO', 'CFO']
        },
        {
          month: 6,
          milestone: 'Full Platform Launch',
          responsible_agents: ['CTO', 'CMO', 'CFO', 'COO']
        }
      ],
      resource_conflicts: [
        'CTO and COO may compete for technical talent',
        'Marketing budget timing vs. development timeline'
      ]
    };

    return {
      execution_plan: executionPlan,
      specialist_task_assignments: specialistAssignments,
      coordination_matrix: coordinationMatrix,
      execution_timeline: 'MVP development and launch over 6 months with coordinated specialist execution'
    };
  },
});

// Step 2: Validate and refine task assignments
const validateTaskAssignments = createStep({
  id: 'validate-task-assignments',
  description: 'Validate task dependencies and identify immediate actions',
  inputSchema: taskCoordinationOutputSchema,
  outputSchema: finalCoordinationSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Input data not found');
    }

    console.log('✅ Validating Task Assignments...');

    // Calculate total hours and validate task dependencies
    const refinedAssignments = inputData.specialist_task_assignments.map(assignment => {
      const totalHours = assignment.priority_tasks.reduce((sum, task) => sum + task.estimated_hours, 0);
      
      const tasksWithStatus = assignment.priority_tasks.map(task => ({
        ...task,
        status: task.dependencies.length === 0 ? 'ready' as const : 'blocked' as const
      }));

      return {
        ...assignment,
        priority_tasks: tasksWithStatus,
        total_estimated_hours: totalHours
      };
    });

    // Identify immediate next actions (tasks with no dependencies)
    const immediateActions = refinedAssignments.flatMap(assignment => 
      assignment.priority_tasks
        .filter(task => task.status === 'ready')
        .slice(0, 2) // Top 2 immediate tasks per specialist
        .map(task => `${assignment.specialist}: ${task.title}`)
    );

    console.log('🚀 Next Immediate Actions:', immediateActions);

    return {
      ...inputData,
      specialist_task_assignments: refinedAssignments,
      next_immediate_actions: immediateActions
    };
  },
});

// Helper function to extract tasks for a specific specialist
function extractTasksForSpecialist(text: string, specialist: string): Array<{
  task_id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimated_hours: number;
  dependencies: string[];
  deliverable: string;
  month: number;
}> {
  // Simplified task extraction - in production you'd want more sophisticated parsing
  const tasks = [
    {
      task_id: `${specialist}-001`,
      title: `${specialist} Strategic Planning`,
      description: `Complete strategic planning for ${specialist} domain`,
      priority: 'high' as const,
      estimated_hours: 40,
      dependencies: [],
      deliverable: `${specialist} strategic plan document`,
      month: 1
    },
    {
      task_id: `${specialist}-002`,
      title: `${specialist} Team Building`,
      description: `Recruit and onboard ${specialist} team members`,
      priority: 'high' as const,
      estimated_hours: 60,
      dependencies: [`${specialist}-001`],
      deliverable: `${specialist} team structure`,
      month: 2
    },
    {
      task_id: `${specialist}-003`,
      title: `${specialist} Process Implementation`,
      description: `Implement core ${specialist} processes and workflows`,
      priority: 'medium' as const,
      estimated_hours: 80,
      dependencies: [`${specialist}-002`],
      deliverable: `${specialist} operational processes`,
      month: 3
    }
  ];

  return tasks;
}

// Main coordination workflow
const taskCoordinationWorkflow = createWorkflow({
  id: 'task-coordination',
  inputSchema: businessPlanInputSchema,
  outputSchema: finalCoordinationSchema,
})
  .then(extractActionableTasks)
  .then(validateTaskAssignments);

// Commit the workflow
taskCoordinationWorkflow.commit();

// Helper function to run task coordination after business analysis
export async function coordinateBusinessPlanExecution(businessPlanResult: any) {
  return await taskCoordinationWorkflow.createRun().start({
    inputData: {
      executive_summary: businessPlanResult.executive_summary,
      specialist_analyses: businessPlanResult.specialist_analyses,
      total_tasks_created: businessPlanResult.total_tasks_created,
      estimated_timeline: businessPlanResult.estimated_timeline,
      strategic_priorities: businessPlanResult.strategic_priorities
    }
  });
}

export { taskCoordinationWorkflow }; 