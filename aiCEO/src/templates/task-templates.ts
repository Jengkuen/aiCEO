// Task creation templates for C-suite agents
// Ensures consistent, actionable task generation across all domains

import { AgentTaskTemplate, AgentType } from '../types/index'

// Base task template with common fields
const createTaskTemplate = (
  agentType: AgentType,
  title: string,
  description: string,
  category: AgentTaskTemplate['category'],
  estimatedHours: number,
  priority: AgentTaskTemplate['priority'],
  requiredSkills: string[],
  dependencies: string[] = [],
  deliverables: string[],
  successCriteria: string[]
): AgentTaskTemplate => ({
  title,
  description,
  category,
  estimatedHours,
  priority,
  requiredSkills,
  dependencies,
  deliverables,
  successCriteria
})

// CTO Task Templates
export const ctoTaskTemplates = {
  // Technology Research Templates
  technologyStackResearch: (technologies: string[]) => createTaskTemplate(
    'CTO',
    'Technology Stack Research and Selection',
    `Research and evaluate ${technologies.join(', ')} for the project. Compare features, costs, scalability, and development speed. Create a detailed comparison matrix with recommendations.`,
    'research',
    8,
    'high',
    ['Technology Research', 'Architecture Planning', 'Market Analysis'],
    [],
    [
      'Technology comparison matrix with scoring criteria',
      'Cost analysis per technology option',
      'Implementation timeline estimates',
      'Risk assessment for each option',
      'Final technology stack recommendation'
    ],
    [
      'All major technology options evaluated against project requirements',
      'Clear reasoning provided for recommended technology choices',
      'Cost and timeline estimates are realistic and detailed',
      'Risk mitigation strategies identified for chosen technologies'
    ]
  ),

  // Development Setup Templates
  developmentEnvironmentSetup: (techStack: string[]) => createTaskTemplate(
    'CTO',
    'Development Environment Setup',
    `Set up complete development environment for ${techStack.join(', ')}. Include version control, CI/CD pipeline, testing framework, and deployment configuration.`,
    'setup',
    12,
    'critical',
    ['DevOps', 'System Administration', 'Software Development'],
    ['Technology Stack Research and Selection'],
    [
      'Configured development environment documentation',
      'CI/CD pipeline setup and testing',
      'Version control repository with branching strategy',
      'Automated testing framework implementation',
      'Deployment scripts and configuration'
    ],
    [
      'Developers can start coding immediately with full environment access',
      'All builds and deployments are automated',
      'Code quality checks are enforced automatically',
      'Development workflow is documented and repeatable'
    ]
  ),

  // Infrastructure Planning Templates
  infrastructurePlanning: (expectedLoad: string) => createTaskTemplate(
    'CTO',
    'Infrastructure Architecture Planning',
    `Design scalable infrastructure architecture to handle ${expectedLoad}. Include database design, server architecture, CDN requirements, and monitoring systems.`,
    'research',
    16,
    'high',
    ['Cloud Architecture', 'Database Design', 'Performance Engineering'],
    ['Technology Stack Research and Selection'],
    [
      'Infrastructure architecture diagrams',
      'Database schema and scaling strategy',
      'Server sizing and auto-scaling configuration',
      'Monitoring and alerting system setup',
      'Security architecture documentation',
      'Cost estimation and optimization plan'
    ],
    [
      'Infrastructure can handle projected load with room for growth',
      'All single points of failure are eliminated',
      'Security best practices are implemented throughout',
      'Monitoring provides complete visibility into system health'
    ]
  )
}

// CMO Task Templates
export const cmoTaskTemplates = {
  // Market Research Templates
  competitiveAnalysis: (industry: string) => createTaskTemplate(
    'CMO',
    'Competitive Analysis and Market Positioning',
    `Conduct comprehensive competitive analysis in the ${industry} industry. Identify direct and indirect competitors, analyze their positioning, pricing, and marketing strategies.`,
    'research',
    12,
    'high',
    ['Market Research', 'Competitive Analysis', 'Strategic Planning'],
    [],
    [
      'Competitor analysis matrix with key players',
      'Competitive positioning map',
      'Pricing analysis and recommendations',
      'Marketing channel analysis',
      'Competitive advantage identification',
      'Market gap analysis and opportunities'
    ],
    [
      'All major competitors identified and analyzed',
      'Clear differentiation strategy defined',
      'Pricing strategy is competitive and profitable',
      'Market opportunities clearly identified and prioritized'
    ]
  ),

  // Brand Development Templates
  brandIdentityDevelopment: (targetAudience: string) => createTaskTemplate(
    'CMO',
    'Brand Identity and Visual Design Development',
    `Develop complete brand identity targeting ${targetAudience}. Create brand guidelines, logo design, color palette, typography, and brand voice documentation.`,
    'marketing',
    20,
    'high',
    ['Brand Design', 'Graphic Design', 'Marketing Strategy'],
    ['Competitive Analysis and Market Positioning'],
    [
      'Brand strategy document with positioning and messaging',
      'Logo design with multiple variations and usage guidelines',
      'Complete brand guidelines including colors, fonts, imagery',
      'Brand voice and tone documentation',
      'Business card and letterhead designs',
      'Social media profile templates'
    ],
    [
      'Brand identity is distinctive and memorable',
      'All brand elements work cohesively across platforms',
      'Brand resonates with target audience preferences',
      'Brand guidelines are comprehensive and actionable'
    ]
  ),

  // Digital Marketing Setup Templates
  digitalMarketingSetup: () => createTaskTemplate(
    'CMO',
    'Digital Marketing Infrastructure Setup',
    'Set up comprehensive digital marketing infrastructure including website, social media profiles, email marketing, analytics, and content management systems.',
    'setup',
    16,
    'critical',
    ['Digital Marketing', 'Web Development', 'Analytics', 'Content Marketing'],
    ['Brand Identity and Visual Design Development'],
    [
      'Professional website with SEO optimization',
      'Social media profiles on relevant platforms',
      'Email marketing system with automation workflows',
      'Google Analytics and conversion tracking setup',
      'Content calendar and publishing workflow',
      'Lead generation and capture systems'
    ],
    [
      'Website is live and optimized for conversions',
      'All marketing channels are properly tracked',
      'Lead generation systems are functional and tested',
      'Content publishing workflow is documented and efficient'
    ]
  )
}

// CFO Task Templates
export const cfoTaskTemplates = {
  // Financial Planning Templates
  financialModelCreation: (businessModel: string) => createTaskTemplate(
    'CFO',
    'Financial Model and Projections Development',
    `Create comprehensive financial model for ${businessModel} business. Include 3-year projections, cash flow analysis, and scenario planning for growth and funding needs.`,
    'financial',
    20,
    'critical',
    ['Financial Modeling', 'Excel/Spreadsheet Analysis', 'Business Planning'],
    [],
    [
      '3-year financial projection spreadsheet',
      'Monthly cash flow forecasting model',
      'Revenue model with multiple scenarios',
      'Cost structure analysis and optimization',
      'Break-even analysis and timeline',
      'Funding requirement calculations',
      'Key financial metrics dashboard'
    ],
    [
      'Financial model accurately reflects business operations',
      'Projections are realistic and well-researched',
      'Multiple scenarios account for different growth rates',
      'Cash flow projections identify funding needs and timing'
    ]
  ),

  // Business Setup Templates
  businessEntitySetup: (businessType: string) => createTaskTemplate(
    'CFO',
    'Business Entity Formation and Legal Setup',
    `Establish ${businessType} business entity including registration, tax setup, banking, and basic legal compliance requirements.`,
    'legal',
    8,
    'critical',
    ['Business Law', 'Tax Planning', 'Regulatory Compliance'],
    [],
    [
      'Business registration documentation',
      'Tax ID (EIN) acquisition',
      'Business banking account setup',
      'Operating agreement or bylaws',
      'Business insurance requirements analysis',
      'Basic compliance checklist and calendar'
    ],
    [
      'Business is legally formed and compliant',
      'Banking and financial systems are operational',
      'Tax obligations are understood and planned for',
      'Legal foundation supports planned business activities'
    ]
  ),

  // Funding Strategy Templates
  fundingStrategyDevelopment: (fundingNeeds: number) => createTaskTemplate(
    'CFO',
    'Funding Strategy and Investor Relations Plan',
    `Develop comprehensive funding strategy to raise $${fundingNeeds.toLocaleString()}. Create investor materials, identify funding sources, and establish investor relations processes.`,
    'financial',
    24,
    'high',
    ['Investment Banking', 'Investor Relations', 'Financial Presentation'],
    ['Financial Model and Projections Development'],
    [
      'Investor pitch deck with financial highlights',
      'Detailed funding strategy document',
      'Investor prospect list with contact strategy',
      'Due diligence preparation checklist',
      'Term sheet templates and negotiation guidelines',
      'Investor relations communication plan'
    ],
    [
      'Funding strategy is realistic and well-targeted',
      'Investor materials are professional and compelling',
      'Due diligence materials are complete and organized',
      'Investor outreach plan is systematic and trackable'
    ]
  )
}

// COO Task Templates
export const cooTaskTemplates = {
  // Operations Setup Templates
  operationalProcessDesign: (businessType: string) => createTaskTemplate(
    'COO',
    'Core Operational Process Design and Documentation',
    `Design and document core operational processes for ${businessType} business. Create workflows, standard operating procedures, and quality control systems.`,
    'operations',
    16,
    'high',
    ['Process Design', 'Operations Management', 'Quality Control'],
    [],
    [
      'Process flow diagrams for all core operations',
      'Standard operating procedures (SOPs) documentation',
      'Quality control checkpoints and metrics',
      'Operational metrics and KPI framework',
      'Process improvement methodology',
      'Training materials for operational staff'
    ],
    [
      'All core processes are documented and repeatable',
      'Quality standards are defined and measurable',
      'Process efficiency metrics are established',
      'Training materials enable consistent execution'
    ]
  ),

  // Team Building Templates
  organizationalStructureDesign: (expectedTeamSize: number) => createTaskTemplate(
    'COO',
    'Organizational Structure and Hiring Plan',
    `Design organizational structure for team of ${expectedTeamSize} people. Create job descriptions, hiring timeline, and onboarding processes.`,
    'development',
    12,
    'high',
    ['HR Management', 'Organizational Design', 'Recruitment'],
    ['Core Operational Process Design and Documentation'],
    [
      'Organizational chart with roles and responsibilities',
      'Job descriptions for all key positions',
      'Hiring timeline and recruitment strategy',
      'Interview processes and evaluation criteria',
      'Onboarding program and training schedule',
      'Performance management framework'
    ],
    [
      'Organizational structure supports business objectives',
      'Job descriptions attract qualified candidates',
      'Hiring process is efficient and effective',
      'Onboarding ensures new hires are productive quickly'
    ]
  ),

  // Vendor Management Templates
  vendorManagementSetup: (keyVendorTypes: string[]) => createTaskTemplate(
    'COO',
    'Vendor Selection and Management System',
    `Establish vendor management system for ${keyVendorTypes.join(', ')}. Create vendor evaluation criteria, contract templates, and performance monitoring systems.`,
    'setup',
    10,
    'medium',
    ['Vendor Management', 'Contract Negotiation', 'Supply Chain'],
    [],
    [
      'Vendor evaluation criteria and scoring system',
      'RFP templates for major vendor categories',
      'Contract templates with standard terms',
      'Vendor performance monitoring dashboard',
      'Vendor relationship management processes',
      'Backup vendor identification and qualification'
    ],
    [
      'Vendor selection process is objective and repeatable',
      'Contracts protect business interests and ensure quality',
      'Vendor performance is tracked and managed proactively',
      'Backup options exist for critical vendor relationships'
    ]
  )
}

// COS Task Templates (Strategic and Coordination)
export const cosTaskTemplates = {
  // Strategic Planning Templates
  strategicPlanDevelopment: (timeline: string) => createTaskTemplate(
    'COS',
    'Strategic Plan Development and Implementation',
    `Develop comprehensive ${timeline} strategic plan including vision, objectives, key initiatives, and success metrics. Coordinate with all department heads for alignment.`,
    'setup',
    24,
    'critical',
    ['Strategic Planning', 'Project Management', 'Executive Leadership'],
    [],
    [
      'Strategic plan document with vision and objectives',
      'Key initiative roadmap with timelines',
      'Success metrics and KPI framework',
      'Department alignment and coordination plan',
      'Strategic review and update process',
      'Communication and implementation strategy'
    ],
    [
      'Strategic plan provides clear direction for all teams',
      'Objectives are specific, measurable, and time-bound',
      'All departments understand their role in strategy execution',
      'Progress tracking mechanisms are in place and functional'
    ]
  ),

  // OKR Implementation Templates
  okrFrameworkImplementation: () => createTaskTemplate(
    'COS',
    'OKR Framework Implementation and Training',
    'Implement comprehensive OKR (Objectives and Key Results) framework across the organization. Train teams, establish review cycles, and create tracking systems.',
    'setup',
    16,
    'high',
    ['OKR Methodology', 'Performance Management', 'Team Training'],
    ['Strategic Plan Development and Implementation'],
    [
      'OKR framework documentation and guidelines',
      'OKR training materials and workshops',
      'Quarterly OKR review process and templates',
      'OKR tracking dashboard and reporting system',
      'Team-level OKR alignment methodology',
      'OKR success metrics and improvement process'
    ],
    [
      'All teams understand and use OKR methodology correctly',
      'OKRs are aligned between individual, team, and company levels',
      'Review cycles drive continuous improvement and alignment',
      'OKR system drives measurable progress toward strategic objectives'
    ]
  ),

  // Executive Dashboard Setup
  executiveDashboardSetup: (keyMetrics: string[]) => createTaskTemplate(
    'COS',
    'Executive Dashboard and Reporting System',
    `Create comprehensive executive dashboard tracking ${keyMetrics.join(', ')} and other key business metrics. Establish automated reporting and alert systems.`,
    'setup',
    12,
    'high',
    ['Business Intelligence', 'Dashboard Design', 'Data Analysis'],
    ['OKR Framework Implementation and Training'],
    [
      'Executive dashboard with real-time key metrics',
      'Automated reporting system for regular updates',
      'Alert system for critical metric thresholds',
      'Historical trend analysis and forecasting',
      'Mobile-accessible dashboard for remote monitoring',
      'Data quality monitoring and validation processes'
    ],
    [
      'Dashboard provides real-time visibility into business performance',
      'Reports are automatically generated and distributed',
      'Alert system enables proactive response to issues',
      'Data accuracy and timeliness are maintained consistently'
    ]
  )
}

// Task template utility functions
export const getTaskTemplatesByAgent = (agentType: AgentType) => {
  switch (agentType) {
    case 'CTO':
      return ctoTaskTemplates
    case 'CMO':
      return cmoTaskTemplates
    case 'CFO':
      return cfoTaskTemplates
    case 'COO':
      return cooTaskTemplates
    case 'COS':
      return cosTaskTemplates
    default:
      throw new Error(`Unknown agent type: ${agentType}`)
  }
}

export const generateContextualTasks = (
  agentType: AgentType,
  businessContext: {
    idea: string
    industry: string
    stage: string
    budget?: number
    timeline?: string
  }
): AgentTaskTemplate[] => {
  const tasks: AgentTaskTemplate[] = []

  // Generate contextual tasks based on business context and agent type
  switch (agentType) {
    case 'CTO':
      if (businessContext.stage === 'idea' || businessContext.stage === 'analysis') {
        tasks.push(ctoTaskTemplates.technologyStackResearch(['React', 'Node.js', 'PostgreSQL']))
        tasks.push(ctoTaskTemplates.infrastructurePlanning('10,000 users'))
      }
      if (businessContext.stage === 'planning' || businessContext.stage === 'execution') {
        tasks.push(ctoTaskTemplates.developmentEnvironmentSetup(['React', 'Node.js', 'PostgreSQL']))
      }
      break

    case 'CMO':
      tasks.push(cmoTaskTemplates.competitiveAnalysis(businessContext.industry))
      tasks.push(cmoTaskTemplates.brandIdentityDevelopment('target audience'))
      if (businessContext.stage === 'planning' || businessContext.stage === 'execution') {
        tasks.push(cmoTaskTemplates.digitalMarketingSetup())
      }
      break

    case 'CFO':
      tasks.push(cfoTaskTemplates.financialModelCreation('SaaS'))
      tasks.push(cfoTaskTemplates.businessEntitySetup('LLC'))
      if (businessContext.budget && businessContext.budget > 100000) {
        tasks.push(cfoTaskTemplates.fundingStrategyDevelopment(businessContext.budget))
      }
      break

    case 'COO':
      tasks.push(cooTaskTemplates.operationalProcessDesign(businessContext.industry))
      tasks.push(cooTaskTemplates.organizationalStructureDesign(10))
      tasks.push(cooTaskTemplates.vendorManagementSetup(['Technology', 'Marketing', 'Legal']))
      break

    case 'COS':
      tasks.push(cosTaskTemplates.strategicPlanDevelopment(businessContext.timeline || '12 months'))
      tasks.push(cosTaskTemplates.okrFrameworkImplementation())
      tasks.push(cosTaskTemplates.executiveDashboardSetup(['Revenue', 'Users', 'Conversion Rate']))
      break
  }

  return tasks
} 