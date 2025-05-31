// Test script for CTO agent - Technology Domain Expert
import { mastra } from './src/mastra/index.ts'

async function testCTOAgent() {
  try {
    console.log('🔧 Testing CTO Agent - Technology Domain Expertise...\n')
    
    // Test Scenario 1: Technology Planning for Food Delivery Platform
    const techRequest = `
Business Context: Sustainable food delivery platform using electric bikes in San Francisco
- Budget: $175,000 for technology development (35% of $500k total)
- Timeline: 6 months to launch
- Expected Load: 10,000+ users, 1,000+ daily orders
- Key Features: Real-time delivery tracking, payment processing, restaurant integration, mobile app

As CTO, create comprehensive technical tasks covering:
1. Technology stack selection and architecture design
2. Development roadmap with specific milestones
3. Infrastructure planning for scalability
4. Security and compliance requirements
5. Team hiring and development processes

Focus on creating actionable technical tasks with realistic time estimates and clear deliverables.
`

    console.log('📋 Test Scenario 1: Technology Strategy & Task Generation')
    console.log('Input:', techRequest.substring(0, 150) + '...')
    console.log('\n⏳ CTO Technical Analysis & Task Generation...\n')

    const response1 = await mastra.agent('ctoAgent').generate([
      {
        role: 'user',
        content: techRequest
      }
    ])

    console.log('⚙️ CTO Technical Strategy & Tasks:')
    console.log('='.repeat(100))
    console.log(response1.text)
    console.log('='.repeat(100))

    // Test Scenario 2: AI Tutoring Platform Technical Requirements
    console.log('\n🤖 Test Scenario 2: AI/EdTech Technical Planning')
    
    const aiTechRequest = `
Business Context: AI-powered personalized tutoring platform for high school students
- Budget: $262,500 for technology (35% of $750k total)
- Timeline: 8 months to MVP launch
- Expected Scale: 50,000+ students, AI-driven personalized learning paths
- Key Technologies: AI/ML for personalized learning, video conferencing, progress tracking

Create technical tasks focusing on:
1. AI/ML infrastructure and model deployment
2. Real-time communication and video platform
3. Data analytics and student progress tracking
4. Scalable architecture for educational content delivery
5. Privacy compliance (COPPA, FERPA) and security
`

    console.log('Input:', aiTechRequest.substring(0, 150) + '...')
    console.log('\n⏳ CTO AI/EdTech Technical Planning...\n')

    const response2 = await mastra.agent('ctoAgent').generate([
      {
        role: 'user',
        content: aiTechRequest
      }
    ])

    console.log('🎓 CTO AI/EdTech Technical Strategy:')
    console.log('='.repeat(100))
    console.log(response2.text)
    console.log('='.repeat(100))

    // Test Scenario 3: Technology Cost Estimation and Team Planning
    console.log('\n💰 Test Scenario 3: Technical Resource Planning')
    
    const resourceRequest = `
Business Context: Remote work productivity platform
- Budget: $140,000 for technology (35% of $400k total)
- Timeline: 4 months to beta launch
- Features: Team collaboration, project management, video conferencing, analytics

As CTO, provide:
1. Technology cost breakdown (development, infrastructure, tools)
2. Technical team hiring plan with specific roles and timeline
3. Development methodology and project management approach
4. Risk assessment and mitigation strategies for tight timeline
5. MVP vs full feature prioritization for rapid launch
`

    console.log('Input:', resourceRequest.substring(0, 150) + '...')
    console.log('\n⏳ CTO Resource Planning & Risk Assessment...\n')

    const response3 = await mastra.agent('ctoAgent').generate([
      {
        role: 'user',
        content: resourceRequest
      }
    ])

    console.log('📊 CTO Resource Planning & Risk Management:')
    console.log('='.repeat(100))
    console.log(response3.text)
    console.log('='.repeat(100))

    // Validation Summary
    console.log('\n✅ CTO AGENT VALIDATION SUMMARY:')
    console.log('1. Technical Expertise: Verify domain-specific technology knowledge')
    console.log('2. Task Generation: Check for actionable technical tasks with time estimates')
    console.log('3. Business Alignment: Ensure technical decisions support business objectives')
    console.log('4. Architecture Focus: Confirm scalable, secure, and cost-effective solutions')
    console.log('5. Team Planning: Validate technical hiring and resource planning')
    console.log('6. Risk Management: Check for technical risk identification and mitigation')

  } catch (error) {
    console.error('❌ Error testing CTO agent:', error)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Ensure Mastra dev server is running: npm run dev')
    console.log('2. Check CTO agent registration in src/mastra/index.ts')
    console.log('3. Verify task generation tool is working properly')
    console.log('4. Test individual agent in playground at localhost:4111')
  }
}

// Run CTO validation tests
console.log('⚙️ CTO Agent Validation Testing')
console.log('📍 Testing technology domain expertise and task generation')
console.log('🎯 Expected: Technical strategy with actionable development tasks\n')

testCTOAgent() 