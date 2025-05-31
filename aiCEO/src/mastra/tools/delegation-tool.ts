import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

// Schema for delegation input
const delegationInputSchema = z.object({
  businessIdea: z.string().describe('The business idea being analyzed'),
  businessContext: z.object({
    industry: z.string(),
    stage: z.enum(['idea', 'analysis', 'planning', 'execution']),
    budget: z.number().optional(),
    timeline: z.string().optional(),
    constraints: z.array(z.string()).optional()
  }),
  strategicPriorities: z.array(z.string()).describe('Key strategic focus areas identified'),
  companyOKRs: z.array(z.object({
    objective: z.string(),
    keyResults: z.array(z.string())
  })).describe('Company-level OKRs for alignment')
})

// Schema for delegation output
const delegationOutputSchema = z.object({
  delegationPlan: z.array(z.object({
    agentType: z.enum(['CTO', 'CMO', 'CFO', 'COO']),
    strategicContext: z.string().describe('Business background and domain priorities'),
    scopeOfResponsibility: z.string().describe('What this agent should focus on and deliver'),
    successCriteria: z.array(z.string()).describe('How their contribution aligns with company OKRs'),
    constraints: z.object({
      budget: z.number().optional(),
      timeline: z.string().optional(),
      resources: z.array(z.string())
    }),
    dependencies: z.array(z.string()).describe('What they need from other agents or external sources'),
    deliverables: z.array(z.string()).describe('Expected outputs from this agent'),
    priority: z.enum(['critical', 'high', 'medium'])
  })),
  coordinationMatrix: z.array(z.object({
    fromAgent: z.enum(['CTO', 'CMO', 'CFO', 'COO']),
    toAgent: z.enum(['CTO', 'CMO', 'CFO', 'COO']),
    dependency: z.string(),
    timeline: z.string()
  })).describe('Cross-agent dependencies and coordination requirements'),
  summary: z.string().describe('Executive summary of delegation strategy')
})

export const delegationTool = createTool({
  id: 'create-delegation-plan',
  description: 'Create a comprehensive delegation plan for specialized C-suite agents with strategic context and coordination requirements',
  inputSchema: delegationInputSchema,
  outputSchema: delegationOutputSchema,
  execute: async ({ context }) => {
    const { businessIdea, businessContext, strategicPriorities, companyOKRs } = context

    // Generate delegation assignments based on business context
    const delegationPlan = []
    const coordinationMatrix = []

    // CTO Delegation - Technology & Development
    delegationPlan.push({
      agentType: 'CTO' as const,
      strategicContext: `Lead technology strategy for ${businessContext.industry} business. Focus on scalable architecture, development roadmap, and technical infrastructure that supports business growth and operational efficiency.`,
      scopeOfResponsibility: `Technology strategy, development planning, infrastructure design, security architecture, and technical team requirements. Ensure technology choices align with business objectives and market requirements.`,
      successCriteria: [
        'Technology roadmap aligned with business timeline',
        'Scalable architecture supporting growth targets',
        'Development cost estimates within budget constraints',
        'Technical risk mitigation strategies defined'
      ],
      constraints: {
        budget: businessContext.budget ? Math.floor(businessContext.budget * 0.35) : undefined,
        timeline: businessContext.timeline || '6 months',
        resources: ['Development team', 'Technical infrastructure', 'External development tools']
      },
      dependencies: [
        'Budget allocation from CFO',
        'Brand requirements from CMO',
        'Operational requirements from COO'
      ],
      deliverables: [
        'Technology architecture document',
        'Development roadmap with milestones',
        'Technical team hiring plan',
        'Infrastructure and security strategy',
        'Development cost breakdown'
      ],
      priority: 'critical' as const
    })

    // CMO Delegation - Marketing & Brand
    delegationPlan.push({
      agentType: 'CMO' as const,
      strategicContext: `Develop comprehensive marketing strategy for ${businessContext.industry} market entry. Build brand identity, customer acquisition strategy, and market positioning that differentiates from competitors.`,
      scopeOfResponsibility: `Brand development, marketing strategy, customer acquisition, content strategy, and market positioning. Drive awareness and customer growth aligned with revenue objectives.`,
      successCriteria: [
        'Brand identity and positioning strategy',
        'Customer acquisition cost targets defined',
        'Marketing channel strategy with ROI projections',
        'Launch marketing plan with timeline'
      ],
      constraints: {
        budget: businessContext.budget ? Math.floor(businessContext.budget * 0.25) : undefined,
        timeline: businessContext.timeline || '4 months',
        resources: ['Marketing team', 'Content creation tools', 'Advertising budget']
      },
      dependencies: [
        'Product features from CTO',
        'Pricing strategy from CFO',
        'Customer service processes from COO'
      ],
      deliverables: [
        'Brand identity and style guide',
        'Marketing strategy and channel plan',
        'Customer acquisition playbook',
        'Content marketing calendar',
        'Launch campaign strategy'
      ],
      priority: 'high' as const
    })

    // CFO Delegation - Finance & Business Operations
    delegationPlan.push({
      agentType: 'CFO' as const,
      strategicContext: `Establish financial foundation and funding strategy for ${businessContext.industry} business. Create sustainable financial model supporting growth while maintaining fiscal responsibility.`,
      scopeOfResponsibility: `Financial planning, funding strategy, business model design, pricing strategy, and financial controls. Ensure financial sustainability and growth capital availability.`,
      successCriteria: [
        'Financial model with revenue projections',
        'Funding strategy and investor outreach plan',
        'Pricing strategy supporting margin targets',
        'Financial controls and reporting framework'
      ],
      constraints: {
        budget: businessContext.budget || 500000,
        timeline: businessContext.timeline || '3 months',
        resources: ['Accounting systems', 'Legal support', 'Financial advisory']
      },
      dependencies: [
        'Cost estimates from CTO and CMO',
        'Revenue projections from market analysis',
        'Operational cost estimates from COO'
      ],
      deliverables: [
        'Comprehensive financial model',
        'Funding strategy and investor deck',
        'Pricing and revenue strategy',
        'Financial controls and reporting system',
        'Business entity and compliance setup'
      ],
      priority: 'critical' as const
    })

    // COO Delegation - Operations & Execution
    delegationPlan.push({
      agentType: 'COO' as const,
      strategicContext: `Design and implement operational infrastructure for ${businessContext.industry} business. Build scalable processes, team structure, and operational efficiency supporting business growth.`,
      scopeOfResponsibility: `Operational strategy, process design, team building, vendor management, and quality control. Create operational excellence that enables business scaling and customer satisfaction.`,
      successCriteria: [
        'Operational processes documented and optimized',
        'Team structure and hiring plan defined',
        'Vendor relationships and partnerships established',
        'Quality control and performance metrics implemented'
      ],
      constraints: {
        budget: businessContext.budget ? Math.floor(businessContext.budget * 0.20) : undefined,
        timeline: businessContext.timeline || '5 months',
        resources: ['Operations team', 'Process management tools', 'Vendor partnerships']
      },
      dependencies: [
        'Technical infrastructure from CTO',
        'Customer service requirements from CMO',
        'Budget allocation from CFO'
      ],
      deliverables: [
        'Operational process documentation',
        'Team structure and hiring plan',
        'Vendor and partnership strategy',
        'Quality control framework',
        'Performance monitoring system'
      ],
      priority: 'high' as const
    })

    // Generate coordination matrix for cross-agent dependencies
    coordinationMatrix.push(
      {
        fromAgent: 'CTO' as const,
        toAgent: 'CMO' as const,
        dependency: 'Product features and capabilities for marketing positioning',
        timeline: 'Week 2-3 of development planning'
      },
      {
        fromAgent: 'CTO' as const,
        toAgent: 'CFO' as const,
        dependency: 'Development cost estimates and infrastructure costs',
        timeline: 'Week 1 of technology planning'
      },
      {
        fromAgent: 'CMO' as const,
        toAgent: 'CFO' as const,
        dependency: 'Customer acquisition cost projections and pricing input',
        timeline: 'Week 2 of marketing strategy development'
      },
      {
        fromAgent: 'CFO' as const,
        toAgent: 'COO' as const,
        dependency: 'Budget allocation for operations and team building',
        timeline: 'Week 1 of financial planning'
      },
      {
        fromAgent: 'COO' as const,
        toAgent: 'CTO' as const,
        dependency: 'Operational requirements for technical infrastructure',
        timeline: 'Week 1 of operations planning'
      }
    )

    const summary = `Delegation strategy for ${businessContext.industry} business assigns specialized responsibilities to 4 C-suite agents with coordinated timeline and dependencies. CTO leads technology (35% budget), CMO drives marketing (25% budget), CFO manages finance/funding, and COO builds operations (20% budget). Cross-agent coordination ensures alignment and efficient resource utilization.`

    return {
      delegationPlan,
      coordinationMatrix,
      summary
    }
  }
}) 