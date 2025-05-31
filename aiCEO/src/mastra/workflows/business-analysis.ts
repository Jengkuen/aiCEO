import { google } from '@ai-sdk/google';
import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { cosAgent } from '../agents/cos';
import { ctoAgent } from '../agents/cto';
import { cmoAgent } from '../agents/cmo';
import { cfoAgent } from '../agents/cfo';
import { cooAgent } from '../agents/coo';

// Input schema for the business analysis workflow
const businessAnalysisInputSchema = z.object({
  business_idea: z.string().describe('The business idea to analyze'),
  business_context: z.object({
    industry: z.string().optional(),
    stage: z.enum(['idea', 'analysis', 'planning', 'execution']).default('idea'),
    budget: z.number().optional(),
    timeline: z.string().optional(),
    constraints: z.array(z.string()).optional(),
  }).optional(),
});

// Schema for specialist agent analysis
const specialistAnalysisSchema = z.object({
  agent_name: z.string(),
  analysis: z.string(),
  tasks_created: z.number(),
  key_recommendations: z.array(z.string()),
});

// Schema for COS strategic output
const cosStrategicOutputSchema = z.object({
  business_idea: z.string(),
  strategic_analysis: z.string(),
  okrs_created: z.boolean(),
  delegation_strategy: z.string(),
  strategic_priorities: z.array(z.string()),
});

// Schema for specialist analyses collection
const specialistCollectionSchema = z.object({
  business_idea: z.string(),
  strategic_analysis: z.string(),
  strategic_priorities: z.array(z.string()),
  specialist_analyses: z.array(specialistAnalysisSchema),
});

// Final output schema for the complete business analysis
const businessAnalysisOutputSchema = z.object({
  executive_summary: z.string(),
  strategic_priorities: z.array(z.string()),
  okrs_generated: z.boolean(),
  delegation_plan: z.string(),
  specialist_analyses: z.array(specialistAnalysisSchema),
  total_tasks_created: z.number(),
  estimated_timeline: z.string(),
  next_steps: z.array(z.string()),
});

// Step 1: COS Strategic Assessment & OKR Creation
const cosStrategicAnalysis = createStep({
  id: 'cos-strategic-analysis',
  description: 'COS performs strategic assessment and creates OKRs',
  inputSchema: businessAnalysisInputSchema,
  outputSchema: cosStrategicOutputSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Input data not found');
    }

    const businessIdea = inputData.business_idea;
    const context = inputData.business_context;
    
    // Create comprehensive context for COS analysis
    const contextPrompt = `
Business Idea: ${businessIdea}

Business Context:
- Industry: ${context?.industry || 'Not specified'}
- Stage: ${context?.stage || 'idea'}
- Budget: ${context?.budget ? `$${context.budget.toLocaleString()}` : 'Not specified'}
- Timeline: ${context?.timeline || 'Not specified'}
- Constraints: ${context?.constraints?.join(', ') || 'None specified'}

Please provide a comprehensive strategic analysis including:
1. Executive strategic overview and market opportunity assessment
2. Generate company OKRs using your generate-okrs tool
3. Create a delegation plan using your create-delegation-plan tool
4. Identify 3-5 strategic priorities for specialist agent focus
5. Provide strategic context for each domain expert (CTO, CMO, CFO, COO)

Focus on strategic orchestration and coordination, not detailed task creation.
`;

    console.log('🎯 COS Strategic Analysis Starting...');
    
    const response = await cosAgent.stream([
      {
        role: 'user',
        content: contextPrompt,
      },
    ]);

    let analysisText = '';
    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
      analysisText += chunk;
    }

    // Extract key information from the analysis
    const okrsCreated = analysisText.toLowerCase().includes('objective') && 
                       analysisText.toLowerCase().includes('key result');
    
    const delegationCreated = analysisText.toLowerCase().includes('delegation') ||
                             analysisText.toLowerCase().includes('cto') ||
                             analysisText.toLowerCase().includes('cmo');

    // Extract strategic priorities (simplified extraction)
    const priorities = extractStrategicPriorities(analysisText);

    return {
      business_idea: businessIdea,
      strategic_analysis: analysisText,
      okrs_created: okrsCreated,
      delegation_strategy: delegationCreated ? analysisText : 'Delegation strategy included in analysis',
      strategic_priorities: priorities,
    };
  },
});

// Step 2: Parallel Specialist Analysis
const parallelSpecialistAnalysis = createStep({
  id: 'parallel-specialist-analysis',
  description: 'Execute all specialist analyses in parallel',
  inputSchema: cosStrategicOutputSchema,
  outputSchema: specialistCollectionSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Input data not found');
    }

    console.log('🚀 Starting Parallel Specialist Analysis...');

    // Create specialist input
    const specialistInput = {
      business_idea: inputData.business_idea,
      strategic_context: inputData.strategic_analysis,
      strategic_priorities: inputData.strategic_priorities,
    };

    // Execute CTO Analysis
    console.log('💻 CTO Technical Planning Starting...');
    const ctoPrompt = `
As the Chief Technology Officer, you need to create a comprehensive technical strategy and detailed task list for this business:

Business Idea: ${specialistInput.business_idea}

Strategic Context from COS:
${specialistInput.strategic_context}

Strategic Priorities:
${specialistInput.strategic_priorities.join('\n')}

Please provide:
1. Technical analysis and architecture recommendations
2. Use your generate-tasks tool to create comprehensive technical tasks
3. Focus on technology strategy, development roadmap, and infrastructure
4. Include tasks for team building, security, scalability, and cost optimization
5. Provide specific technical recommendations and timelines

Create detailed, actionable technical tasks that support the business objectives.
`;

    const ctoResponse = await ctoAgent.stream([{ role: 'user', content: ctoPrompt }]);
    let ctoAnalysis = '';
    for await (const chunk of ctoResponse.textStream) {
      process.stdout.write(chunk);
      ctoAnalysis += chunk;
    }

    // Execute CMO Analysis
    console.log('📈 CMO Marketing Planning Starting...');
    const cmoPrompt = `
As the Chief Marketing Officer, you need to create a comprehensive marketing strategy and detailed task list for this business:

Business Idea: ${specialistInput.business_idea}

Strategic Context from COS:
${specialistInput.strategic_context}

Strategic Priorities:
${specialistInput.strategic_priorities.join('\n')}

Please provide:
1. Market analysis and customer segmentation
2. Use your generate-tasks tool to create comprehensive marketing tasks
3. Focus on brand development, customer acquisition, and growth strategies
4. Include tasks for content marketing, digital presence, and customer retention
5. Provide specific marketing recommendations and channel strategies

Create detailed, actionable marketing tasks that drive customer acquisition and revenue growth.
`;

    const cmoResponse = await cmoAgent.stream([{ role: 'user', content: cmoPrompt }]);
    let cmoAnalysis = '';
    for await (const chunk of cmoResponse.textStream) {
      process.stdout.write(chunk);
      cmoAnalysis += chunk;
    }

    // Execute CFO Analysis
    console.log('💰 CFO Financial Planning Starting...');
    const cfoPrompt = `
As the Chief Financial Officer, you need to create a comprehensive financial strategy and detailed task list for this business:

Business Idea: ${specialistInput.business_idea}

Strategic Context from COS:
${specialistInput.strategic_context}

Strategic Priorities:
${specialistInput.strategic_priorities.join('\n')}

Please provide:
1. Financial modeling and revenue projections
2. Use your generate-tasks tool to create comprehensive financial tasks
3. Focus on funding strategy, financial controls, and business setup
4. Include tasks for pricing strategy, investor relations, and compliance
5. Provide specific financial recommendations and funding requirements

Create detailed, actionable financial tasks that ensure business viability and growth funding.
`;

    const cfoResponse = await cfoAgent.stream([{ role: 'user', content: cfoPrompt }]);
    let cfoAnalysis = '';
    for await (const chunk of cfoResponse.textStream) {
      process.stdout.write(chunk);
      cfoAnalysis += chunk;
    }

    // Execute COO Analysis
    console.log('⚙️ COO Operations Planning Starting...');
    const cooPrompt = `
As the Chief Operating Officer, you need to create a comprehensive operations strategy and detailed task list for this business:

Business Idea: ${specialistInput.business_idea}

Strategic Context from COS:
${specialistInput.strategic_context}

Strategic Priorities:
${specialistInput.strategic_priorities.join('\n')}

Please provide:
1. Operational process design and efficiency planning
2. Use your generate-tasks tool to create comprehensive operational tasks
3. Focus on team building, process optimization, and scaling strategies
4. Include tasks for vendor management, quality control, and performance metrics
5. Provide specific operational recommendations and resource requirements

Create detailed, actionable operational tasks that ensure efficient business execution and scaling.
`;

    const cooResponse = await cooAgent.stream([{ role: 'user', content: cooPrompt }]);
    let cooAnalysis = '';
    for await (const chunk of cooResponse.textStream) {
      process.stdout.write(chunk);
      cooAnalysis += chunk;
    }

    // Process specialist results
    const specialistAnalyses = [
      {
        agent_name: 'Chief Technology Officer',
        analysis: ctoAnalysis,
        tasks_created: countTasksInText(ctoAnalysis),
        key_recommendations: extractRecommendations(ctoAnalysis),
      },
      {
        agent_name: 'Chief Marketing Officer',
        analysis: cmoAnalysis,
        tasks_created: countTasksInText(cmoAnalysis),
        key_recommendations: extractRecommendations(cmoAnalysis),
      },
      {
        agent_name: 'Chief Financial Officer',
        analysis: cfoAnalysis,
        tasks_created: countTasksInText(cfoAnalysis),
        key_recommendations: extractRecommendations(cfoAnalysis),
      },
      {
        agent_name: 'Chief Operating Officer',
        analysis: cooAnalysis,
        tasks_created: countTasksInText(cooAnalysis),
        key_recommendations: extractRecommendations(cooAnalysis),
      },
    ];

    return {
      business_idea: inputData.business_idea,
      strategic_analysis: inputData.strategic_analysis,
      strategic_priorities: inputData.strategic_priorities,
      specialist_analyses: specialistAnalyses,
    };
  },
});

// Step 3: COS Integration & Synthesis
const cosIntegrationSynthesis = createStep({
  id: 'cos-integration-synthesis',
  description: 'COS synthesizes all specialist analyses into unified business plan',
  inputSchema: specialistCollectionSchema,
  outputSchema: businessAnalysisOutputSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Input data not found');
    }

    const totalTasks = inputData.specialist_analyses.reduce((sum, analysis) => sum + analysis.tasks_created, 0);
    
    const synthesisPrompt = `
As the Chief of Staff, you need to synthesize all specialist analyses into a unified business plan:

Original Business Idea: ${inputData.business_idea}

Your Strategic Analysis:
${inputData.strategic_analysis}

Specialist Analyses Summary:
${inputData.specialist_analyses.map(analysis => `
${analysis.agent_name}:
- Tasks Created: ${analysis.tasks_created}
- Key Recommendations: ${analysis.key_recommendations.join(', ')}
`).join('\n')}

Total Tasks Created Across All Specialists: ${totalTasks}

Please provide:
1. Executive Summary integrating all domain expertise
2. Cross-functional coordination analysis and dependencies
3. Resource allocation and timeline integration
4. Strategic next steps for CEO and business execution
5. Risk assessment and mitigation strategies across all domains
6. Overall business plan viability and success probability

Focus on strategic synthesis, coordination, and executive-level insights.
`;

    console.log('🎯 COS Integration & Synthesis Starting...');
    
    const response = await cosAgent.stream([
      {
        role: 'user',
        content: synthesisPrompt,
      },
    ]);

    let synthesisText = '';
    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
      synthesisText += chunk;
    }

    const nextSteps = extractNextSteps(synthesisText);
    const timeline = extractTimeline(synthesisText);

    return {
      executive_summary: synthesisText,
      strategic_priorities: inputData.strategic_priorities,
      okrs_generated: true,
      delegation_plan: inputData.strategic_analysis,
      specialist_analyses: inputData.specialist_analyses,
      total_tasks_created: totalTasks,
      estimated_timeline: timeline,
      next_steps: nextSteps,
    };
  },
});

// Main Business Analysis Workflow
const businessAnalysisWorkflow = createWorkflow({
  id: 'comprehensive-business-analysis',
  inputSchema: businessAnalysisInputSchema,
  outputSchema: businessAnalysisOutputSchema,
})
  // Phase 1: COS Strategic Assessment & OKR Creation
  .then(cosStrategicAnalysis)
  // Phase 2: Parallel Specialist Task Creation
  .then(parallelSpecialistAnalysis)
  // Phase 3: COS Synthesis & Integration
  .then(cosIntegrationSynthesis);

// Helper functions for text processing
function extractStrategicPriorities(text: string): string[] {
  const priorities = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    if (line.match(/^\d+\./)) {
      priorities.push(line.replace(/^\d+\.\s*/, '').trim());
    }
  }
  
  return priorities.slice(0, 5); // Limit to 5 priorities
}

function countTasksInText(text: string): number {
  const taskKeywords = ['task', 'action item', 'deliverable', 'milestone'];
  let count = 0;
  
  for (const keyword of taskKeywords) {
    const matches = text.toLowerCase().match(new RegExp(keyword, 'g'));
    if (matches) count += matches.length;
  }
  
  return Math.min(count, 50); // Cap at reasonable number
}

function extractRecommendations(text: string): string[] {
  const recommendations = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    if (line.toLowerCase().includes('recommend') || 
        line.toLowerCase().includes('suggest') ||
        line.match(/^[\*\-]\s/)) {
      recommendations.push(line.replace(/^[\*\-]\s*/, '').trim());
    }
  }
  
  return recommendations.slice(0, 10); // Limit to 10 recommendations
}

function extractNextSteps(text: string): string[] {
  const steps = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    if (line.toLowerCase().includes('next step') || 
        line.toLowerCase().includes('immediate action') ||
        line.match(/^\d+\.\s*[A-Z]/)) {
      steps.push(line.replace(/^\d+\.\s*/, '').trim());
    }
  }
  
  return steps.slice(0, 8); // Limit to 8 next steps
}

function extractTimeline(text: string): string {
  const timelineMatches = text.match(/(\d+\s*(month|week|day|quarter)s?)/gi);
  if (timelineMatches && timelineMatches.length > 0) {
    return timelineMatches[0];
  }
  return '3-6 months'; // Default timeline
}

// Commit the workflow
businessAnalysisWorkflow.commit();

export { businessAnalysisWorkflow }; 