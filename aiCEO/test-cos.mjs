// Test script for COS agent - Strategic Orchestrator Role
import { mastra } from './src/mastra/index.js'

async function testCOSStrategicRole() {
  try {
    console.log('🚀 Testing COS Agent - Strategic Orchestration & Delegation...\n')
    
    const businessIdea = `
Sustainable food delivery service using electric bikes in San Francisco.
Focus: Delivering healthy, locally-sourced meals to busy professionals in downtown offices.

Business Context:
- Industry: Food delivery and sustainable transportation
- Budget: $500,000 initial investment  
- Timeline: Launch within 6 months
- Target Market: Busy professionals in downtown SF (25-45 years old)
- Key Differentiator: Zero-emission delivery with premium locally-sourced meals
- Market Size: 200,000+ office workers in downtown SF
- Competition: DoorDash, Uber Eats (but not focused on sustainability)

Please provide strategic analysis with OKRs and delegation plan for C-suite specialists.
`

    console.log('📋 Business Idea:', businessIdea)
    console.log('\n⏳ COS Strategic Analysis - OKRs & Delegation Planning...\n')

    const response = await mastra.agent('cosAgent').generate([
      {
        role: 'user',
        content: `As Chief of Staff, provide strategic analysis for this business idea. Create company OKRs and delegation plan for specialized C-suite agents (CTO, CMO, CFO, COO). Focus on strategic coordination, not operational tasks: ${businessIdea}`
      }
    ])

    console.log('🎯 COS Strategic Analysis:')
    console.log('='.repeat(100))
    console.log(response.text)
    console.log('='.repeat(100))

    // Test delegation-focused scenario
    console.log('\n🔄 Testing Delegation Coordination Scenario...\n')
    
    const delegationScenario = `
AI-powered personalized tutoring platform for high school students.
Budget: $750,000 over 12 months
Industry: Education Technology  
Market: Parents seeking college prep support for students

Strategic Priorities Identified:
1. Technology Platform Development
2. Content Creation & Curriculum Design  
3. Student Acquisition & Brand Building
4. Financial Sustainability & Funding

As COS, create OKRs and delegate specialized work to appropriate C-suite agents.
`

    const response2 = await mastra.agent('cosAgent').generate([
      {
        role: 'user', 
        content: `Strategic coordination request: Analyze this EdTech business and create delegation plan for C-suite specialists. Focus on OKRs and coordination, not detailed tasks: ${delegationScenario}`
      }
    ])

    console.log('📚 COS Delegation Analysis:')
    console.log('='.repeat(100))
    console.log(response2.text)
    console.log('='.repeat(100))

    // Test CEO communication scenario
    console.log('\n📊 Testing CEO Strategic Communication...\n')
    
    const ceoRequest = `
CEO Request: "I have 3 business ideas and need strategic analysis to choose which one to pursue:

1. Sustainable food delivery (SF) - $500k budget
2. AI tutoring platform - $750k budget  
3. Remote work productivity platform - $400k budget

As my Chief of Staff, provide strategic recommendation with OKRs for the top choice and delegation strategy for immediate action."
`

    const response3 = await mastra.agent('cosAgent').generate([
      {
        role: 'user',
        content: ceoRequest
      }
    ])

    console.log('💼 CEO Strategic Briefing:')
    console.log('='.repeat(100))
    console.log(response3.text)
    console.log('='.repeat(100))

  } catch (error) {
    console.error('❌ Error testing COS strategic role:', error)
  }
}

testCOSStrategicRole() 