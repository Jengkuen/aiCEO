# aiCEO Detailed Implementation Plan

## Tech Stack Selection (Optimized for Cursor AI Development)

### Core Framework
- **Backend**: Next.js 14 with App Router (full-stack React framework)
- **AI Agents**: Mastra (required for hackathon)
- **Language**: TypeScript (excellent AI code editor support)
- **Database**: SQLite with Drizzle ORM (fastest setup for tasks/OKRs)
- **Styling**: Tailwind CSS (fast prototyping, excellent AI completion)
- **UI Components**: shadcn/ui (copy-paste components, Cursor-friendly)
- **LLM Provider**: OpenAI GPT-4 (via Mastra)
- **Real-time**: Next.js API routes with Server-Sent Events for chat

### Why This Stack for AI Code Editors:
1. **TypeScript**: Superior autocomplete and type safety for complex data models
2. **Next.js**: Single codebase for frontend/backend with API routes
3. **Tailwind**: AI assistants excel at generating component layouts
4. **shadcn/ui**: Pre-built components perfect for executive dashboards
5. **SQLite + Drizzle**: Simple, fast database for tasks, OKRs, and messages

## Enhanced Project Structure

```
aiCEO/
├── src/
│   ├── app/                          # Next.js app router
│   │   ├── api/                      # API routes
│   │   │   ├── analyze/              # Business analysis endpoint
│   │   │   ├── chat/                 # CEO ↔ COS communication
│   │   │   ├── tasks/                # Task management endpoints
│   │   │   └── okrs/                 # OKR tracking endpoints
│   │   ├── dashboard/                # CEO dashboard
│   │   │   ├── page.tsx              # Main dashboard
│   │   │   ├── tasks/                # Task management pages
│   │   │   └── okrs/                 # OKR tracking pages
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Landing page
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── dashboard/                # Executive dashboard components
│   │   │   ├── kpi-dashboard.tsx     # KPI visualization
│   │   │   ├── okr-tracker.tsx       # OKR progress tracking
│   │   │   └── task-queue.tsx        # Task management interface
│   │   ├── chat/                     # CEO ↔ COS chat interface
│   │   └── agents/                   # Agent status components
│   ├── lib/                          # Core business logic
│   │   ├── agents/                   # Mastra agent implementations
│   │   │   ├── base-agent.ts         # Base agent with task creation
│   │   │   ├── cos-agent.ts          # Chief of Staff orchestrator
│   │   │   ├── cto-agent.ts          # CTO with technical tasks
│   │   │   ├── cmo-agent.ts          # CMO with marketing tasks
│   │   │   ├── cfo-agent.ts          # CFO with financial tasks
│   │   │   └── coo-agent.ts          # COO with operational tasks
│   │   ├── tasks/                    # Task management system
│   │   │   ├── task-manager.ts       # Central task coordination
│   │   │   └── task-templates.ts     # Task template definitions
│   │   ├── okrs/                     # OKR and KPI management
│   │   │   ├── okr-generator.ts      # Auto-generate OKRs from ideas
│   │   │   └── kpi-calculator.ts     # KPI calculations and tracking
│   │   ├── db/                       # Database schema and config
│   │   └── utils.ts                  # Utility functions
│   └── types/                        # TypeScript type definitions
├── public/                           # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── drizzle.config.ts
```

## Enhanced Type Definitions

Create `src/types/index.ts`:
```typescript
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
}

export interface BusinessAnalysis {
  id: string
  companyId: string
  cosOverview: {
    executiveSummary: string
    strategicPriorities: string[]
    timeline: string
    nextSteps: string[]
  }
  agentAnalyses: AgentAnalysis[]
  generatedOKRs: Omit<OKR, 'id' | 'companyId' | 'createdAt'>[]
  estimatedKPIs: Omit<KPI, 'id' | 'companyId' | 'lastUpdated'>[]
  totalTasks: number
  createdAt: Date
}
```

## Hour-by-Hour Implementation Guide

### Hour 1: Foundation & Data Models (0-60 min)

#### Step 1.1: Project Setup (0-15 min)
```bash
# Initialize Next.js project
npx create-next-app@latest aiceo --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd aiceo

# Install dependencies
npm install @mastra/core @mastra/agent openai
npm install drizzle-orm drizzle-kit better-sqlite3 @types/better-sqlite3
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
npm install lucide-react @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tabs
npm install recharts date-fns uuid @types/uuid
```

#### Step 1.2: Database Schema (15-35 min)
Create `src/lib/db/schema.ts`:
```typescript
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const companies = sqliteTable('companies', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  industry: text('industry'),
  stage: text('stage').notNull(),
  budget: integer('budget'),
  timeline: text('timeline'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  companyId: text('company_id').notNull().references(() => companies.id),
  agentType: text('agent_type').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  instructions: text('instructions').notNull(), // JSON string
  priority: text('priority').notNull(),
  status: text('status').notNull(),
  estimatedHours: integer('estimated_hours').notNull(),
  requiredResources: text('required_resources').notNull(), // JSON string
  dependencies: text('dependencies').notNull(), // JSON string
  dueDate: integer('due_date', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  feedback: text('feedback'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const okrs = sqliteTable('okrs', {
  id: text('id').primaryKey(),
  companyId: text('company_id').notNull().references(() => companies.id),
  objective: text('objective').notNull(),
  description: text('description').notNull(),
  keyResults: text('key_results').notNull(), // JSON string
  targetDate: integer('target_date', { mode: 'timestamp' }).notNull(),
  progress: integer('progress').notNull(),
  status: text('status').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const kpis = sqliteTable('kpis', {
  id: text('id').primaryKey(),
  companyId: text('company_id').notNull().references(() => companies.id),
  name: text('name').notNull(),
  value: real('value').notNull(),
  target: real('target').notNull(),
  unit: text('unit').notNull(),
  category: text('category').notNull(),
  trend: text('trend').notNull(),
  lastUpdated: integer('last_updated', { mode: 'timestamp' }).notNull(),
})

export const chatMessages = sqliteTable('chat_messages', {
  id: text('id').primaryKey(),
  companyId: text('company_id').notNull().references(() => companies.id),
  role: text('role').notNull(),
  content: text('content').notNull(),
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
  relatedTasks: text('related_tasks'), // JSON string
  relatedOKRs: text('related_okrs'), // JSON string
})
```

#### Step 1.3: Database Configuration (35-45 min)
Create `drizzle.config.ts` and `src/lib/db/index.ts` for database connection.

#### Step 1.4: shadcn/ui Setup (45-60 min)
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input textarea badge avatar tabs progress
npx shadcn-ui@latest add dialog select checkbox switch slider
```

### Hour 2: Agent Framework with Task Creation (60-120 min)

#### Step 2.1: Enhanced Base Agent (60-75 min)
Create `src/lib/agents/base-agent.ts`:
```typescript
import { Agent } from '@mastra/agent'
import { AgentType, Task } from '@/types'

export abstract class BaseCSuiteAgent extends Agent {
  public agentType: AgentType
  
  constructor(agentType: AgentType, systemPrompt: string) {
    super({
      name: agentType,
      instructions: systemPrompt,
      model: 'gpt-4',
    })
    this.agentType = agentType
  }

  abstract analyzeBusinessIdea(idea: string, constraints?: any): Promise<{
    summary: string
    recommendations: string[]
    tasks: Omit<Task, 'id' | 'companyId' | 'createdAt'>[]
    risks: string[]
    opportunities: string[]
  }>

  protected createTask(
    title: string,
    description: string,
    instructions: string[],
    priority: Task['priority'] = 'medium',
    estimatedHours: number = 2,
    requiredResources: string[] = [],
    dependencies: string[] = []
  ): Omit<Task, 'id' | 'companyId' | 'createdAt'> {
    return {
      agentType: this.agentType,
      title,
      description,
      instructions,
      priority,
      status: 'pending',
      estimatedHours,
      requiredResources,
      dependencies,
    }
  }
}
```

#### Step 2.2: COS Agent with Orchestration (75-105 min)
Create `src/lib/agents/cos-agent.ts`:
```typescript
import { BaseCSuiteAgent } from './base-agent'
import { BusinessAnalysis, AgentAnalysis, OKR, KPI } from '@/types'

const COS_PROMPT = `
You are the Chief of Staff for an AI-powered C-suite team. Your responsibilities:

1. STRATEGIC OVERSIGHT: Coordinate between CTO, CMO, CFO, and COO agents
2. EXECUTIVE COMMUNICATION: Maintain direct dialogue with the CEO
3. TASK ORCHESTRATION: Ensure all agent recommendations become actionable tasks
4. OKR GENERATION: Create strategic objectives and measurable key results
5. BUSINESS SYNTHESIS: Combine all agent analyses into cohesive business plans

When analyzing a business idea:
- Provide executive-level strategic overview
- Identify 3-5 strategic objectives (OKRs)
- Coordinate task delegation across all agents
- Generate KPI recommendations for tracking success
- Create realistic timelines and milestones

Focus on practical execution and CEO-level decision making.
`

export class COSAgent extends BaseCSuiteAgent {
  constructor() {
    super('COS', COS_PROMPT)
  }

  async analyzeBusinessIdea(idea: string, constraints?: any) {
    const response = await this.run({
      messages: [
        {
          role: 'user',
          content: `
          Business Idea: ${idea}
          Constraints: ${JSON.stringify(constraints || {})}
          
          Provide a strategic executive analysis including:
          1. Executive summary
          2. Strategic priorities
          3. Recommended OKRs (3-5 objectives with measurable key results)
          4. High-level coordination tasks
          5. Success metrics and KPIs
          `
        }
      ]
    })
    
    return {
      summary: response.content,
      recommendations: [
        'Coordinate comprehensive business analysis',
        'Establish OKR tracking system',
        'Implement task delegation workflow',
        'Set up executive reporting cadence'
      ],
      tasks: [
        this.createTask(
          'Coordinate Agent Analysis',
          'Oversee completion of all C-suite agent analyses',
          [
            'Ensure CTO completes technical analysis',
            'Verify CMO completes market analysis', 
            'Confirm CFO completes financial analysis',
            'Check COO completes operations analysis'
          ],
          'critical',
          4,
          ['Agent coordination system', 'Progress tracking']
        ),
        this.createTask(
          'Establish OKR Framework',
          'Set up quarterly objectives and key results tracking',
          [
            'Define 3-5 strategic objectives',
            'Create measurable key results for each objective',
            'Set up progress tracking system',
            'Schedule weekly OKR review meetings'
          ],
          'high',
          3,
          ['OKR tracking software', 'Executive calendar']
        )
      ],
      risks: ['Agent coordination complexity', 'Information synthesis challenges'],
      opportunities: ['Streamlined execution', 'Data-driven decision making']
    }
  }

  async generateOKRs(idea: string, agentAnalyses: AgentAnalysis[]): Promise<OKR[]> {
    const analysisContext = agentAnalyses.map(a => 
      `${a.agentType}: ${a.summary}`
    ).join('\n')
    
    const response = await this.run({
      messages: [
        {
          role: 'user',
          content: `
          Business Idea: ${idea}
          Agent Analyses: ${analysisContext}
          
          Generate 3-5 strategic OKRs (Objectives and Key Results) that:
          1. Align with the business vision
          2. Are measurable and time-bound
          3. Cover key business areas (growth, revenue, operations)
          4. Are achievable within 3-6 months
          
          Return as JSON array of OKRs with objectives and 3-5 key results each.
          `
        }
      ]
    })
    
    // Parse and return structured OKRs
    // Implementation would parse the response into proper OKR format
    return []
  }

  async chatWithCEO(message: string, context: any): Promise<string> {
    const response = await this.run({
      messages: [
        {
          role: 'user',
          content: `
          CEO Message: ${message}
          Current Context: ${JSON.stringify(context)}
          
          Respond as Chief of Staff with:
          1. Clear, executive-level communication
          2. Actionable recommendations
          3. Status updates on relevant tasks/OKRs
          4. Strategic guidance
          `
        }
      ]
    })
    
    return response.content
  }
}
```

#### Step 2.3: Task Management System (105-120 min)
Create `src/lib/tasks/task-manager.ts` for centralized task coordination.

### Hour 3: Specialized Agents with Task Generation (120-180 min)

#### Step 3.1: CTO Agent (120-135 min)
Create `src/lib/agents/cto-agent.ts`:
```typescript
import { BaseCSuiteAgent } from './base-agent'

const CTO_PROMPT = `
You are a seasoned CTO specializing in:
- Technical architecture and system design
- Technology stack recommendations
- Development roadmap planning
- Infrastructure and scalability
- Security and compliance
- Team building and technical hiring

For each business idea, generate specific technical tasks that include:
- Exact tools/technologies to research or implement
- Specific development milestones
- Infrastructure setup tasks
- Security implementation steps
- Technical hiring needs

Make tasks actionable with clear instructions and success criteria.
`

export class CTOAgent extends BaseCSuiteAgent {
  constructor() {
    super('CTO', CTO_PROMPT)
  }

  async analyzeBusinessIdea(idea: string, constraints?: any) {
    const response = await this.run({
      messages: [
        {
          role: 'user',
          content: `Analyze technical requirements for: ${idea}. 
          Create specific, actionable technical tasks.`
        }
      ]
    })
    
    return {
      summary: response.content,
      recommendations: [
        'Establish development environment',
        'Select appropriate technology stack',
        'Design system architecture',
        'Plan development roadmap'
      ],
      tasks: [
        this.createTask(
          'Setup Development Environment',
          'Create standardized development environment for the team',
          [
            'Install Node.js v18+ and npm',
            'Create GitHub repository with naming convention: company-name-app',
            'Initialize React + TypeScript project using Vite',
            'Set up ESLint and Prettier configurations',
            'Create README with setup instructions'
          ],
          'high',
          3,
          ['GitHub account', 'Development machine', 'Node.js']
        ),
        this.createTask(
          'Research Cloud Infrastructure',
          'Evaluate and select cloud hosting platform',
          [
            'Compare AWS, Vercel, and Railway pricing for MVP scale',
            'Create account on selected platform',
            'Set up staging and production environments',
            'Configure domain name and SSL certificates',
            'Document deployment process'
          ],
          'medium',
          4,
          ['Credit card for cloud services', 'Domain name budget']
        ),
        this.createTask(
          'Design Database Schema',
          'Create initial database structure for core features',
          [
            'Map out core entities and relationships',
            'Choose between PostgreSQL and MySQL based on requirements',
            'Create migration files for initial schema',
            'Set up database connection and ORM (Prisma/Drizzle)',
            'Create seed data for testing'
          ],
          'high',
          5,
          ['Database design tool', 'SQL knowledge']
        )
      ],
      risks: ['Technology choice complexity', 'Scalability planning'],
      opportunities: ['Modern tech stack advantages', 'Rapid prototyping capability']
    }
  }
}
```

#### Step 3.2: CMO Agent (135-150 min)
Create `src/lib/agents/cmo-agent.ts` with marketing-specific task generation.

#### Step 3.3: CFO & COO Agents (150-180 min)
Create financial and operational task generators.

### Hour 4: Integration & OKR/KPI System (180-240 min)

#### Step 4.1: Agent Manager with Task Aggregation (180-200 min)
Create `src/lib/agents/agent-manager.ts`:
```typescript
import { COSAgent } from './cos-agent'
import { CTOAgent } from './cto-agent'
import { CMOAgent } from './cmo-agent'
import { CFOAgent } from './cfo-agent'
import { COOAgent } from './coo-agent'
import { BusinessAnalysis, Task } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export class AgentManager {
  private agents: {
    cos: COSAgent
    cto: CTOAgent
    cmo: CMOAgent
    cfo: CFOAgent
    coo: COOAgent
  }

  constructor() {
    this.agents = {
      cos: new COSAgent(),
      cto: new CTOAgent(),
      cmo: new CMOAgent(),
      cfo: new CFOAgent(),
      coo: new COOAgent(),
    }
  }

  async analyzeBusinessIdea(
    idea: string, 
    companyId: string,
    constraints?: any
  ): Promise<BusinessAnalysis> {
    // COS initial overview
    const cosAnalysis = await this.agents.cos.analyzeBusinessIdea(idea, constraints)
    
    // Parallel specialized analyses
    const [ctoAnalysis, cmoAnalysis, cfoAnalysis, cooAnalysis] = await Promise.all([
      this.agents.cto.analyzeBusinessIdea(idea, constraints),
      this.agents.cmo.analyzeBusinessIdea(idea, constraints),
      this.agents.cfo.analyzeBusinessIdea(idea, constraints),
      this.agents.coo.analyzeBusinessIdea(idea, constraints),
    ])
    
    const agentAnalyses = [ctoAnalysis, cmoAnalysis, cfoAnalysis, cooAnalysis]
    
    // Generate OKRs based on all analyses
    const generatedOKRs = await this.agents.cos.generateOKRs(idea, agentAnalyses)
    
    // Calculate total tasks
    const totalTasks = agentAnalyses.reduce((sum, analysis) => sum + analysis.tasks.length, 0) + cosAnalysis.tasks.length
    
    return {
      id: uuidv4(),
      companyId,
      cosOverview: {
        executiveSummary: cosAnalysis.summary,
        strategicPriorities: cosAnalysis.recommendations,
        timeline: '6-month execution roadmap',
        nextSteps: ['Review all generated tasks', 'Prioritize by business impact', 'Begin execution']
      },
      agentAnalyses,
      generatedOKRs,
      estimatedKPIs: this.generateKPIs(idea, agentAnalyses),
      totalTasks,
      createdAt: new Date()
    }
  }

  private generateKPIs(idea: string, analyses: any[]) {
    // Generate relevant KPIs based on business type and agent recommendations
    return [
      {
        name: 'Monthly Revenue',
        value: 0,
        target: 10000,
        unit: 'USD',
        category: 'financial' as const,
        trend: 'stable' as const
      },
      {
        name: 'Customer Acquisition Cost',
        value: 0,
        target: 50,
        unit: 'USD',
        category: 'marketing' as const,
        trend: 'stable' as const
      }
    ]
  }
}
```

#### Step 4.2: API Routes (200-220 min)
Create comprehensive API endpoints for analysis, tasks, OKRs, and chat.

#### Step 4.3: OKR & KPI Management (220-240 min)
Create tracking and calculation systems.

### Hour 5: Executive Dashboard UI (240-300 min)

#### Step 5.1: Main CEO Dashboard (240-270 min)
Create `src/app/dashboard/page.tsx`:
```typescript
'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { TaskQueue } from '@/components/dashboard/task-queue'
import { OKRTracker } from '@/components/dashboard/okr-tracker'
import { KPIDashboard } from '@/components/dashboard/kpi-dashboard'
import { COSChat } from '@/components/chat/cos-chat'
import { BusinessAnalysis } from '@/types'

export default function CEODashboard() {
  const [businessIdea, setBusinessIdea] = useState('')
  const [analysis, setAnalysis] = useState<BusinessAnalysis | null>(null)
  const [loading, setLoading] = useState(false)

  const analyzeIdea = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: businessIdea }),
      })
      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Executive Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">CEO Dashboard</h1>
          <p className="text-muted-foreground">Strategic oversight and execution tracking</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline">5 Agents Active</Badge>
          <Badge variant="secondary">{analysis?.totalTasks || 0} Tasks Generated</Badge>
        </div>
      </div>

      {/* Business Idea Input */}
      {!analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Business Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={businessIdea}
              onChange={(e) => setBusinessIdea(e.target.value)}
              placeholder="Describe your business idea in detail. Include target market, key features, and business model..."
              className="min-h-[120px]"
            />
            <Button 
              onClick={analyzeIdea} 
              disabled={loading || !businessIdea}
              className="w-full"
              size="lg"
            >
              {loading ? 'Analyzing with AI C-Suite...' : 'Generate Strategic Analysis'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Executive Dashboard */}
      {analysis && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="okrs">OKRs</TabsTrigger>
            <TabsTrigger value="kpis">KPIs</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="chat">COS Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Executive Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{analysis.cosOverview.executiveSummary}</p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{analysis.totalTasks}</div>
                  <p className="text-sm text-muted-foreground">Tasks Generated</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{analysis.generatedOKRs.length}</div>
                  <p className="text-sm text-muted-foreground">Strategic Objectives</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-sm text-muted-foreground">AI Agents</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">6mo</div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <TaskQueue companyId={analysis.companyId} />
          </TabsContent>

          <TabsContent value="okrs">
            <OKRTracker companyId={analysis.companyId} />
          </TabsContent>

          <TabsContent value="kpis">
            <KPIDashboard companyId={analysis.companyId} />
          </TabsContent>

          <TabsContent value="chat">
            <COSChat companyId={analysis.companyId} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
```

#### Step 5.2: Task Management Components (270-285 min)
Create `src/components/dashboard/task-queue.tsx` with drag-and-drop task management.

#### Step 5.3: Chat Interface (285-300 min)
Create `src/components/chat/cos-chat.tsx` for real-time CEO ↔ COS communication.

### Hour 6: Demo Preparation & Polish (300-360 min)

#### Step 6.1: Demo Data & Scenarios (300-320 min)
Create `src/lib/demo-data.ts` with three complete demo scenarios.

#### Step 6.2: UI Polish & Animations (320-340 min)
Add loading states, transitions, and responsive design improvements.

#### Step 6.3: Final Testing & Demo Script (340-360 min)
Test all scenarios and prepare presentation materials.

## Key Success Metrics

1. **Task Generation**: 30+ actionable tasks within 5 minutes
2. **OKR Alignment**: All tasks connect to strategic objectives  
3. **Executive UX**: Dashboard provides immediate business insight
4. **Real-time Communication**: Seamless CEO ↔ COS dialogue
5. **Execution Readiness**: Tasks are immediately actionable

This implementation focuses on the core value proposition: transforming business ideas into executable action plans with strategic oversight. 