import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

// Minimal schema for OKR generation
const simpleOkrInputSchema = z.object({
  businessIdea: z.string(),
  industry: z.string(),
  budget: z.number().optional()
})

const simpleOkrOutputSchema = z.object({
  okrs: z.string(),
  summary: z.string()
})

export const simpleOkrTool = createTool({
  id: 'simple-okrs',
  description: 'Generate simple OKRs for business planning',
  inputSchema: simpleOkrInputSchema,
  outputSchema: simpleOkrOutputSchema,
  execute: async ({ context }) => {
    try {
      const { businessIdea, industry, budget } = context
      
      const okrs = `
**Objective 1: Achieve Revenue Growth**
- Key Result 1: Generate $${budget ? Math.floor(budget * 0.1) : 50000} monthly revenue
- Key Result 2: Acquire 100 customers
- Key Result 3: Achieve 85% customer retention

**Objective 2: Build Market Presence**
- Key Result 1: Achieve 25% brand awareness
- Key Result 2: Capture 5% market share
- Key Result 3: Maintain 4.5/5 customer satisfaction

**Objective 3: Scale Operations**
- Key Result 1: Reach 90% operational efficiency
- Key Result 2: Build team of 15 employees
- Key Result 3: Automate 75% of processes
      `
      
      const summary = `Generated 3 objectives with 9 key results for ${industry} business`
      
      return {
        okrs,
        summary
      }
    } catch (error) {
      return {
        okrs: "Failed to generate OKRs",
        summary: "Error occurred during OKR generation"
      }
    }
  }
})

// Simple delegation tool
const simpleDelegationInputSchema = z.object({
  businessIdea: z.string(),
  industry: z.string(),
  budget: z.number().optional()
})

const simpleDelegationOutputSchema = z.object({
  delegation: z.string(),
  summary: z.string()
})

export const simpleDelegationTool = createTool({
  id: 'simple-delegation',
  description: 'Generate simple delegation plan',
  inputSchema: simpleDelegationInputSchema,
  outputSchema: simpleDelegationOutputSchema,
  execute: async ({ context }) => {
    try {
      const { businessIdea, industry, budget } = context
      
      const delegation = `
**CTO (Technology) - ${budget ? Math.floor(budget * 0.35) : 175000} budget:**
- Technology stack selection and development roadmap
- Infrastructure planning and security architecture
- Technical team hiring and development processes

**CMO (Marketing) - ${budget ? Math.floor(budget * 0.25) : 125000} budget:**
- Brand development and market positioning strategy
- Customer acquisition and digital marketing campaigns
- Content strategy and customer engagement

**CFO (Finance) - ${budget ? Math.floor(budget * 0.20) : 100000} budget:**
- Financial modeling and revenue projections
- Funding strategy and investor relations
- Business setup and compliance management

**COO (Operations) - ${budget ? Math.floor(budget * 0.20) : 100000} budget:**
- Operational process design and optimization
- Team structure and hiring strategy
- Vendor management and partnerships
      `
      
      const summary = `Delegated work to 4 specialized agents with budget allocation totaling $${budget || 500000}`
      
      return {
        delegation,
        summary
      }
    } catch (error) {
      return {
        delegation: "Failed to generate delegation plan",
        summary: "Error occurred during delegation planning"
      }
    }
  }
}) 