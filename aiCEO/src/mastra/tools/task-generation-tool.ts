import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { AgentTaskTemplate, AgentType } from '../../types/index.js'
import { generateContextualTasks, getTaskTemplatesByAgent } from '../../templates/task-templates.js'

// Schema for task generation input
const taskGenerationInputSchema = z.object({
  businessIdea: z.string().describe('The business idea to analyze'),
  agentType: z.enum(['COS', 'CTO', 'CMO', 'CFO', 'COO']).describe('The type of agent generating tasks'),
  businessContext: z.object({
    industry: z.string().describe('Industry or sector'),
    stage: z.enum(['idea', 'analysis', 'planning', 'execution']).describe('Current business stage'),
    budget: z.number().optional().describe('Available budget'),
    timeline: z.string().optional().describe('Target timeline for completion'),
    constraints: z.array(z.string()).optional().describe('Any specific constraints or requirements')
  }).describe('Business context information')
})

// Schema for task output
const taskOutputSchema = z.object({
  tasks: z.array(z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['setup', 'research', 'development', 'marketing', 'operations', 'legal', 'financial']),
    estimatedHours: z.number(),
    priority: z.enum(['low', 'medium', 'high', 'critical']),
    requiredSkills: z.array(z.string()),
    dependencies: z.array(z.string()),
    deliverables: z.array(z.string()),
    successCriteria: z.array(z.string())
  })),
  summary: z.string().describe('Summary of the generated tasks'),
  totalEstimatedHours: z.number().describe('Total estimated hours for all tasks'),
  priorityBreakdown: z.object({
    critical: z.number(),
    high: z.number(),
    medium: z.number(),
    low: z.number()
  }).describe('Count of tasks by priority level')
})

export const taskGenerationTool = createTool({
  id: 'generate-tasks',
  description: 'Generate structured, actionable tasks based on business idea and agent specialization',
  inputSchema: taskGenerationInputSchema,
  outputSchema: taskOutputSchema,
  execute: async ({ context }) => {
    const { businessIdea, agentType, businessContext } = context

    try {
      // Generate contextual tasks using our templates
      const tasks = generateContextualTasks(agentType as AgentType, {
        idea: businessIdea,
        industry: businessContext.industry,
        stage: businessContext.stage,
        budget: businessContext.budget,
        timeline: businessContext.timeline
      })

      // Calculate metrics
      const totalEstimatedHours = tasks.reduce((sum, task) => sum + task.estimatedHours, 0)
      
      const priorityBreakdown = tasks.reduce((breakdown, task) => {
        breakdown[task.priority]++
        return breakdown
      }, { critical: 0, high: 0, medium: 0, low: 0 })

      // Generate summary
      const summary = `Generated ${tasks.length} ${agentType} tasks for ${businessContext.industry} business in ${businessContext.stage} stage. Total estimated effort: ${totalEstimatedHours} hours.`

      return {
        tasks: tasks.map(task => ({
          title: task.title,
          description: task.description,
          category: task.category,
          estimatedHours: task.estimatedHours,
          priority: task.priority,
          requiredSkills: task.requiredSkills,
          dependencies: task.dependencies,
          deliverables: task.deliverables,
          successCriteria: task.successCriteria
        })),
        summary,
        totalEstimatedHours,
        priorityBreakdown
      }
    } catch (error) {
      throw new Error(`Failed to generate tasks: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
})

// OKR Generation Tool
const okrGenerationInputSchema = z.object({
  businessIdea: z.string().describe('The business idea to create OKRs for'),
  businessContext: z.object({
    industry: z.string(),
    stage: z.string(),
    timeline: z.string().optional(),
    budget: z.number().optional()
  }),
  strategicPriorities: z.array(z.string()).describe('Key strategic priorities identified')
})

const okrOutputSchema = z.object({
  objectives: z.array(z.object({
    objective: z.string().describe('The strategic objective'),
    description: z.string().describe('Detailed description of the objective'),
    keyResults: z.array(z.object({
      description: z.string(),
      targetValue: z.number(),
      unit: z.string(),
      currentValue: z.number().default(0)
    })),
    targetDate: z.string().describe('Target completion date'),
    priority: z.enum(['critical', 'high', 'medium'])
  })),
  summary: z.string().describe('Summary of the OKR framework'),
  totalKeyResults: z.number()
})

export const okrGenerationTool = createTool({
  id: 'generate-okrs',
  description: 'Generate company-level Objectives and Key Results (OKRs) based on business strategy',
  inputSchema: okrGenerationInputSchema,
  outputSchema: okrOutputSchema,
  execute: async ({ context }) => {
    const { businessIdea, businessContext, strategicPriorities } = context

    // Template-based OKR generation based on business context
    const objectives = []

    // Revenue/Growth Objective (Universal)
    objectives.push({
      objective: "Achieve Sustainable Revenue Growth",
      description: `Establish and grow revenue streams for the ${businessContext.industry} business`,
      keyResults: [
        {
          description: "Monthly Recurring Revenue (MRR)",
          targetValue: businessContext.budget ? Math.floor(businessContext.budget * 0.1) : 10000,
          unit: "USD",
          currentValue: 0
        },
        {
          description: "Customer Acquisition",
          targetValue: 100,
          unit: "customers",
          currentValue: 0
        },
        {
          description: "Customer Retention Rate",
          targetValue: 85,
          unit: "percentage",
          currentValue: 0
        }
      ],
      targetDate: businessContext.timeline || "12 months",
      priority: "critical" as const
    })

    // Market Position Objective
    objectives.push({
      objective: "Establish Strong Market Position",
      description: `Build brand recognition and competitive advantage in ${businessContext.industry}`,
      keyResults: [
        {
          description: "Brand Awareness",
          targetValue: 25,
          unit: "percentage",
          currentValue: 0
        },
        {
          description: "Market Share",
          targetValue: 5,
          unit: "percentage",
          currentValue: 0
        },
        {
          description: "Customer Satisfaction Score",
          targetValue: 4.5,
          unit: "rating (1-5)",
          currentValue: 0
        }
      ],
      targetDate: businessContext.timeline || "18 months",
      priority: "high" as const
    })

    // Operational Excellence Objective
    objectives.push({
      objective: "Build Scalable Operations",
      description: "Develop efficient, scalable operational processes and team structure",
      keyResults: [
        {
          description: "Operational Efficiency",
          targetValue: 90,
          unit: "percentage",
          currentValue: 0
        },
        {
          description: "Team Size",
          targetValue: 15,
          unit: "employees",
          currentValue: 1
        },
        {
          description: "Process Automation",
          targetValue: 75,
          unit: "percentage",
          currentValue: 0
        }
      ],
      targetDate: businessContext.timeline || "15 months",
      priority: "high" as const
    })

    const totalKeyResults = objectives.reduce((sum, obj) => sum + obj.keyResults.length, 0)
    const summary = `Generated ${objectives.length} strategic objectives with ${totalKeyResults} key results for ${businessContext.industry} business`

    return {
      objectives,
      summary,
      totalKeyResults
    }
  }
}) 