// Test script for COS agent - Strategic Orchestrator Role
import { mastra } from './src/mastra/index.ts'

async function testCOSStrategicRole() {
  try {
    console.log('🚀 Testing COS Agent - Strategic Orchestration & Delegation...\n')
    
    // Test Scenario 1: Strategic Business Analysis with Delegation
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

As Chief of Staff, provide strategic analysis with OKRs and delegation plan for C-suite specialists. Focus on strategic coordination, not operational tasks.
`

    console.log('📋 Test Scenario 1: Strategic Business Analysis')
    console.log('Input:', businessIdea.substring(0, 100) + '...')
    console.log('\n⏳ COS Strategic Analysis - OKRs & Delegation Planning...\n')

    const response1 = await mastra.agent('cosAgent').generate([
      {
        role: 'user',
        content: businessIdea
      }
    ])

    console.log('🎯 COS Strategic Analysis:')
    console.log('='.repeat(100))
    console.log(response1.text)
    console.log('='.repeat(100))

    // Test Scenario 2: Multi-Business Strategic Evaluation
    console.log('\n📊 Test Scenario 2: CEO Strategic Decision Support')
    
    const ceoRequest = `
CEO Request: "I have 3 business ideas and need strategic analysis to choose which one to pursue:

1. Sustainable food delivery (SF) - $500k budget
2. AI tutoring platform - $750k budget  
3. Remote work productivity platform - $400k budget

As my Chief of Staff, provide strategic recommendation with OKRs for the top choice and delegation strategy for immediate action."
`

    console.log('Input:', ceoRequest.substring(0, 100) + '...')
    console.log('\n⏳ COS Strategic Decision Support...\n')

    const response2 = await mastra.agent('cosAgent').generate([
      {
        role: 'user',
        content: ceoRequest
      }
    ])

    console.log('💼 CEO Strategic Briefing:')
    console.log('='.repeat(100))
    console.log(response2.text)
    console.log('='.repeat(100))

    // Test Scenario 3: Delegation Model Validation
    console.log('\n🔄 Test Scenario 3: Delegation Model Validation')
    
    const delegationValidation = `
Please explain your role as Chief of Staff and demonstrate your delegation approach:

1. How do you differ from a task-generating agent?
2. Show your strategic analysis process for an EdTech business
3. Create OKRs and delegation plans without creating operational tasks
4. Explain how specialists will receive context for task creation

Business Example: AI-powered personalized tutoring platform for high school students preparing for college admissions.
`

    console.log('Input:', delegationValidation.substring(0, 100) + '...')
    console.log('\n⏳ COS Delegation Model Explanation...\n')

    const response3 = await mastra.agent('cosAgent').generate([
      {
        role: 'user',
        content: delegationValidation
      }
    ])

    console.log('🏗️ COS Delegation Model Validation:')
    console.log('='.repeat(100))
    console.log(response3.text)
    console.log('='.repeat(100))

    // Validation Summary
    console.log('\n✅ VALIDATION SUMMARY:')
    console.log('1. Strategic Analysis: Check for high-level business intelligence')
    console.log('2. OKR Creation: Look for company-level objectives with measurable key results')
    console.log('3. Delegation Planning: Verify specialist assignments with context and budgets')
    console.log('4. NO Task Creation: Ensure COS does not create detailed operational tasks')
    console.log('5. Executive Communication: Confirm CEO-level strategic language and insights')

  } catch (error) {
    console.error('❌ Error testing COS strategic role:', error)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Ensure Mastra dev server is running: npm run dev')
    console.log('2. Check agent registration in src/mastra/index.ts')
    console.log('3. Verify Google Gemini API key in .env')
    console.log('4. Test individual agent in playground at localhost:4111')
  }
}

// Run validation tests
console.log('🎯 COS Agent Validation Testing')
console.log('📍 Testing corrected delegation model architecture')
console.log('🎪 Expected: Strategic orchestration without operational task creation\n')

testCOSStrategicRole() 