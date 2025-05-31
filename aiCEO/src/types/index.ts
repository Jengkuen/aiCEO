// Shared type definitions for aiCEO C-suite agent system

export interface Company {
  id: string
  name: string
  description: string
  industry: string
  stage: 'idea' | 'analysis' | 'planning' | 'execution'
  budget?: number
  timeline?: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  companyId: string
  agentType: AgentType
  title: string
  description: string
  instructions: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  estimatedHours: number
  requiredResources: string[]
  dependencies: string[]
  dueDate?: Date
  completedAt?: Date
  feedback?: string
  createdAt: Date
}

export interface OKR {
  id: string
  companyId: string
  objective: string
  description: string
  keyResults: KeyResult[]
  targetDate: Date
  progress: number // 0-100
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  createdAt: Date
}

export interface KeyResult {
  id: string
  description: string
  targetValue: number
  currentValue: number
  unit: string
  progress: number // 0-100
}

export interface KPI {
  id: string
  companyId: string
  name: string
  value: number
  target: number
  unit: string
  category: 'financial' | 'marketing' | 'technical' | 'operational'
  trend: 'up' | 'down' | 'stable'
  lastUpdated: Date
}

export interface ChatMessage {
  id: string
  companyId: string
  role: 'ceo' | 'cos'
  content: string
  timestamp: Date
  relatedTasks?: string[]
  relatedOKRs?: string[]
}

export type AgentType = 'COS' | 'CTO' | 'CMO' | 'CFO' | 'COO'

export interface AgentAnalysis {
  agentType: AgentType
  summary: string
  recommendations: string[]
  tasks: Omit<Task, 'id' | 'companyId' | 'createdAt'>[]
  risks: string[]
  opportunities: string[]
  estimatedTimeline: string
  requiredBudget?: number
  successMetrics: string[]
}

export interface BusinessAnalysis {
  id: string
  companyId: string
  cosOverview: {
    executiveSummary: string
    strategicPriorities: string[]
    timeline: string
    nextSteps: string[]
    criticalRisks: string[]
    keyAssumptions: string[]
  }
  agentAnalyses: AgentAnalysis[]
  generatedOKRs: Omit<OKR, 'id' | 'companyId' | 'createdAt'>[]
  estimatedKPIs: Omit<KPI, 'id' | 'companyId' | 'lastUpdated'>[]
  totalTasks: number
  estimatedLaunchTimeframe: string
  estimatedBudgetRange: {
    min: number
    max: number
    currency: string
  }
  createdAt: Date
}

// Agent interaction schemas for workflow coordination
export interface AgentWorkflowInput {
  businessIdea: string
  company: Company
  context?: {
    previousAnalyses?: AgentAnalysis[]
    constraints?: {
      budget?: number
      timeline?: string
      resources?: string[]
    }
  }
}

export interface AgentTaskTemplate {
  title: string
  description: string
  category: 'setup' | 'research' | 'development' | 'marketing' | 'operations' | 'legal' | 'financial'
  estimatedHours: number
  priority: Task['priority']
  requiredSkills: string[]
  dependencies: string[]
  deliverables: string[]
  successCriteria: string[]
}

// Business domain specific types
export interface MarketAnalysis {
  targetMarket: {
    size: string
    demographics: string[]
    painPoints: string[]
  }
  competition: {
    directCompetitors: string[]
    indirectCompetitors: string[]
    competitiveAdvantages: string[]
  }
  positioning: {
    valueProposition: string
    differentiators: string[]
    pricingStrategy: string
  }
}

export interface TechnicalRequirements {
  architecture: {
    frontend: string[]
    backend: string[]
    database: string[]
    infrastructure: string[]
  }
  integrations: string[]
  security: string[]
  scalability: string[]
  compliance: string[]
}

export interface FinancialProjections {
  revenueModel: string
  costStructure: {
    fixed: string[]
    variable: string[]
  }
  funding: {
    required: number
    stages: string[]
    sources: string[]
  }
  projections: {
    year1Revenue: number
    year1Costs: number
    breakEvenMonth: number
  }
}

export interface OperationalPlan {
  organizationStructure: string[]
  processes: string[]
  toolsAndSystems: string[]
  metrics: string[]
  scalingPlan: string[]
} 