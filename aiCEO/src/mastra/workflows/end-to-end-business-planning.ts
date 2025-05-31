import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { cosAgent } from '../agents/cos';

// Input schema for the complete business planning process
const businessPlanningInputSchema = z.object({
  business_idea: z.string(),
  business_context: z.object({
    industry: z.string(),
    stage: z.string(),
    budget: z.number(),
    timeline: z.string(),
    constraints: z.array(z.string())
  }).optional()
});

// Final comprehensive output schema
const completePlanningOutputSchema = z.object({
  // Original business analysis
  business_analysis: z.object({
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
  }),
  
  // Task coordination results
  task_coordination: z.object({
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
  }),
  
  // Integration validation
  integration_summary: z.object({
    total_specialists_engaged: z.number(),
    total_actionable_tasks: z.number(),
    ready_to_execute_tasks: z.number(),
    estimated_total_hours: z.number(),
    critical_path_identified: z.boolean(),
    coordination_meetings_required: z.number(),
    success_probability: z.string()
  })
});

// Step 1: Run Business Analysis Workflow
const runBusinessAnalysis = createStep({
  id: 'run-business-analysis',
  description: 'Execute the complete multi-agent business analysis workflow',
  inputSchema: businessPlanningInputSchema,
  outputSchema: z.object({
    business_idea: z.string(),
    business_context: z.object({
      industry: z.string(),
      stage: z.string(),
      budget: z.number(),
      timeline: z.string(),
      constraints: z.array(z.string())
    }).optional(),
    business_analysis: z.object({
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
    })
  }),
  execute: async ({ inputData, mastra }) => {
    console.log('🎯 Step 4.3: Starting End-to-End Business Planning Test...');
    console.log('📋 Phase 1: Running Business Analysis Workflow...');

    // Get the business analysis workflow
    const businessAnalysisWorkflow = mastra?.getWorkflow('businessAnalysisWorkflow');
    if (!businessAnalysisWorkflow) {
      throw new Error('Business analysis workflow not found');
    }

    // Execute business analysis
    const analysisRun = businessAnalysisWorkflow.createRun();
    const analysisResult = await analysisRun.start({
      inputData: {
        business_idea: inputData.business_idea,
        business_context: inputData.business_context
      }
    });

    if (analysisResult.status !== 'success') {
      throw new Error(`Business analysis failed: ${analysisResult.status}`);
    }

    console.log('✅ Business Analysis Complete!');
    console.log(`📊 Generated: ${analysisResult.result.total_tasks_created} total tasks`);
    console.log(`👥 Specialists: ${analysisResult.result.specialist_analyses.length} engaged`);

    return {
      business_idea: inputData.business_idea,
      business_context: inputData.business_context,
      business_analysis: analysisResult.result
    };
  }
});

// Step 2: Run Task Coordination Workflow
const runTaskCoordination = createStep({
  id: 'run-task-coordination',
  description: 'Execute task coordination workflow on business analysis results',
  inputSchema: z.object({
    business_idea: z.string(),
    business_context: z.object({
      industry: z.string(),
      stage: z.string(),
      budget: z.number(),
      timeline: z.string(),
      constraints: z.array(z.string())
    }).optional(),
    business_analysis: z.object({
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
    })
  }),
  outputSchema: z.object({
    business_idea: z.string(),
    business_context: z.object({
      industry: z.string(),
      stage: z.string(),
      budget: z.number(),
      timeline: z.string(),
      constraints: z.array(z.string())
    }).optional(),
    business_analysis: z.object({
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
    }),
    task_coordination: z.object({
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
    })
  }),
  execute: async ({ inputData, mastra }) => {
    console.log('📋 Phase 2: Running Task Coordination Workflow...');

    // Get the task coordination workflow
    const taskCoordinationWorkflow = mastra?.getWorkflow('taskCoordinationWorkflow');
    if (!taskCoordinationWorkflow) {
      throw new Error('Task coordination workflow not found');
    }

    // Execute task coordination
    const coordinationRun = taskCoordinationWorkflow.createRun();
    const coordinationResult = await coordinationRun.start({
      inputData: {
        executive_summary: inputData.business_analysis.executive_summary,
        specialist_analyses: inputData.business_analysis.specialist_analyses,
        total_tasks_created: inputData.business_analysis.total_tasks_created,
        estimated_timeline: inputData.business_analysis.estimated_timeline,
        strategic_priorities: inputData.business_analysis.strategic_priorities
      }
    });

    if (coordinationResult.status !== 'success') {
      throw new Error(`Task coordination failed: ${coordinationResult.status}`);
    }

    console.log('✅ Task Coordination Complete!');
    console.log(`📋 Immediate Actions: ${coordinationResult.result.next_immediate_actions.length}`);
    console.log(`🔗 Dependencies: ${coordinationResult.result.coordination_matrix.critical_dependencies.length}`);

    return {
      business_idea: inputData.business_idea,
      business_context: inputData.business_context,
      business_analysis: inputData.business_analysis,
      task_coordination: coordinationResult.result
    };
  }
});

// Step 3: Integration Validation and Summary
const validateIntegration = createStep({
  id: 'validate-integration',
  description: 'Validate the integration between business analysis and task coordination',
  inputSchema: z.object({
    business_idea: z.string(),
    business_context: z.object({
      industry: z.string(),
      stage: z.string(),
      budget: z.number(),
      timeline: z.string(),
      constraints: z.array(z.string())
    }).optional(),
    business_analysis: z.object({
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
    }),
    task_coordination: z.object({
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
    })
  }),
  outputSchema: completePlanningOutputSchema,
  execute: async ({ inputData }) => {
    console.log('📋 Phase 3: Validating Integration & Generating Summary...');

    // Calculate integration metrics
    const totalSpecialists = inputData.task_coordination.specialist_task_assignments.length;
    const totalActionableTasks = inputData.task_coordination.specialist_task_assignments.reduce(
      (sum, assignment) => sum + assignment.priority_tasks.length, 0
    );
    const readyToExecuteTasks = inputData.task_coordination.specialist_task_assignments.reduce(
      (sum, assignment) => sum + assignment.priority_tasks.filter(task => task.status === 'ready').length, 0
    );
    const estimatedTotalHours = inputData.task_coordination.specialist_task_assignments.reduce(
      (sum, assignment) => sum + assignment.total_estimated_hours, 0
    );
    const criticalPathExists = inputData.task_coordination.coordination_matrix.critical_dependencies.length > 0;
    const coordinationMeetings = inputData.task_coordination.coordination_matrix.timeline_milestones.length;

    // Calculate success probability based on various factors
    let successScore = 0;
    successScore += readyToExecuteTasks > 0 ? 20 : 0; // Immediate actionability
    successScore += totalSpecialists === 4 ? 20 : 0; // Full C-suite engagement
    successScore += criticalPathExists ? 20 : 0; // Dependencies identified
    successScore += coordinationMeetings >= 3 ? 20 : 0; // Adequate coordination
    successScore += estimatedTotalHours > 0 && estimatedTotalHours < 1000 ? 20 : 10; // Realistic scope

    const successProbability = successScore >= 90 ? 'Very High (90%+)' :
                              successScore >= 70 ? 'High (70-90%)' :
                              successScore >= 50 ? 'Medium (50-70%)' : 'Low (<50%)';

    const integrationSummary = {
      total_specialists_engaged: totalSpecialists,
      total_actionable_tasks: totalActionableTasks,
      ready_to_execute_tasks: readyToExecuteTasks,
      estimated_total_hours: estimatedTotalHours,
      critical_path_identified: criticalPathExists,
      coordination_meetings_required: coordinationMeetings,
      success_probability: successProbability
    };

    console.log('✅ Integration Validation Complete!');
    console.log('📊 SYSTEM PERFORMANCE METRICS:');
    console.log(`👥 Specialists Engaged: ${totalSpecialists}/4`);
    console.log(`📋 Actionable Tasks Created: ${totalActionableTasks}`);
    console.log(`🚀 Ready to Execute: ${readyToExecuteTasks}`);
    console.log(`⏰ Total Estimated Hours: ${estimatedTotalHours}`);
    console.log(`🎯 Success Probability: ${successProbability}`);

    return {
      business_analysis: inputData.business_analysis,
      task_coordination: inputData.task_coordination,
      integration_summary: integrationSummary
    };
  }
});

// Main End-to-End Business Planning Workflow
const endToEndBusinessPlanningWorkflow = createWorkflow({
  id: 'end-to-end-business-planning',
  inputSchema: businessPlanningInputSchema,
  outputSchema: completePlanningOutputSchema,
})
  .then(runBusinessAnalysis)
  .then(runTaskCoordination)
  .then(validateIntegration);

// Commit the workflow
endToEndBusinessPlanningWorkflow.commit();

// Helper function for easy testing
export async function runCompleteBusinessPlanningTest(businessIdea: string, businessContext?: any) {
  console.log('🚀 Starting Complete Multi-Agent Business Planning Test...');
  console.log(`💡 Business Idea: ${businessIdea}`);
  
  return await endToEndBusinessPlanningWorkflow.createRun().start({
    inputData: {
      business_idea: businessIdea,
      business_context: businessContext
    }
  });
}

export { endToEndBusinessPlanningWorkflow }; 