// Master Test Runner for All C-Suite Agents
import { mastra } from './src/mastra/index.ts'

// Individual test functions
async function quickCOSTest() {
  console.log('🎯 Quick COS Agent Test - Strategic Delegation\n')
  const response = await mastra.agent('cosAgent').generate([
    {
      role: 'user',
      content: `Business: AI tutoring platform for high school students
Budget: $750K total, 8 months timeline
Create strategic company OKRs and delegate work to CTO, CMO, CFO, COO with budget allocation.`
    }
  ])
  console.log('COS Strategic Response:\n', response.text.substring(0, 800) + '...\n')
}

async function quickCTOTest() {
  console.log('⚙️ Quick CTO Agent Test - Technology Planning\n')
  const response = await mastra.agent('ctoAgent').generate([
    {
      role: 'user',
      content: `Business: Video conferencing platform for remote teams
Budget: $200K for technology development
Create technical architecture and development roadmap for MVP launch in 5 months.`
    }
  ])
  console.log('CTO Technical Response:\n', response.text.substring(0, 800) + '...\n')
}

async function quickCMOTest() {
  console.log('📈 Quick CMO Agent Test - Marketing Strategy\n')
  const response = await mastra.agent('cmoAgent').generate([
    {
      role: 'user',
      content: `Business: Sustainable fashion marketplace
Budget: $150K for brand development and customer acquisition
Create brand positioning and digital marketing strategy for eco-conscious consumers.`
    }
  ])
  console.log('CMO Marketing Response:\n', response.text.substring(0, 800) + '...\n')
}

async function quickCFOTest() {
  console.log('💰 Quick CFO Agent Test - Financial Planning\n')
  const response = await mastra.agent('cfoAgent').generate([
    {
      role: 'user',
      content: `Business: B2B SaaS project management tool
Current: $100K MRR, 40% growth rate, 18 months runway
Create financial model and Series A fundraising strategy for $5M round.`
    }
  ])
  console.log('CFO Financial Response:\n', response.text.substring(0, 800) + '...\n')
}

async function quickCOOTest() {
  console.log('⚙️ Quick COO Agent Test - Operations Excellence\n')
  const response = await mastra.agent('cooAgent').generate([
    {
      role: 'user',
      content: `Business: Food delivery service expanding to 10 new cities
Current: 50K orders/month, need to scale to 500K orders/month in 6 months
Create operational scaling plan with quality assurance and team management.`
    }
  ])
  console.log('COO Operations Response:\n', response.text.substring(0, 800) + '...\n')
}

// Main test runner
async function runAgentTests() {
  const args = process.argv.slice(2)
  const testType = args[0] || 'quick'
  
  console.log('🏢 aiCEO C-Suite Agent Testing Suite')
  console.log('=' .repeat(60))
  
  try {
    if (testType === 'quick' || testType === 'all') {
      console.log('🚀 Running Quick Agent Validation Tests...\n')
      
      await quickCOSTest()
      await quickCTOTest() 
      await quickCMOTest()
      await quickCFOTest()
      await quickCOOTest()
      
      console.log('✅ Quick Tests Complete!')
      console.log('\nFor comprehensive testing, run:')
      console.log('  node test-cmo-focused.mjs  # CMO domain expertise')
      console.log('  node test-cfo-focused.mjs  # CFO financial planning')
      console.log('  node test-coo-focused.mjs  # COO operations excellence')
      console.log('  node test-cto.mjs          # CTO technology strategy')
      console.log('  node test-csuite.mjs       # Full C-suite coordination')
    }
    
    if (testType === 'cos') await quickCOSTest()
    if (testType === 'cto') await quickCTOTest()
    if (testType === 'cmo') await quickCMOTest()
    if (testType === 'cfo') await quickCFOTest()
    if (testType === 'coo') await quickCOOTest()
    
    if (testType === 'status') {
      console.log('🏢 C-Suite Agent System Status:')
      console.log('  ✅ COS Agent - Strategic orchestrator')
      console.log('  ✅ CTO Agent - Technology domain expert')
      console.log('  ✅ CMO Agent - Marketing domain expert')
      console.log('  ✅ CFO Agent - Financial domain expert')
      console.log('  ✅ COO Agent - Operations domain expert')
      console.log('\n📍 Development server: http://localhost:4111')
      console.log('📝 Test each agent individually in the playground')
    }
    
  } catch (error) {
    console.error('❌ Test execution error:', error)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Start Mastra dev server: npm run dev')
    console.log('2. Check all agents are registered in src/mastra/index.ts')
    console.log('3. Verify no import or syntax errors in agent files')
  }
}

// Usage information
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🏢 aiCEO Agent Testing Suite - Usage

Commands:
  node test-all-agents.mjs                    # Quick test of all agents
  node test-all-agents.mjs quick              # Same as above
  node test-all-agents.mjs [agent]            # Test specific agent
  node test-all-agents.mjs status             # Show system status

Available Agents:
  cos     # Strategic orchestrator and delegation
  cto     # Technology domain expert
  cmo     # Marketing domain expert  
  cfo     # Financial domain expert
  coo     # Operations domain expert

Comprehensive Tests:
  node test-cmo-focused.mjs    # CMO: Brand, growth, crisis, B2B marketing
  node test-cfo-focused.mjs    # CFO: Modeling, fundraising, M&A, crisis
  node test-coo-focused.mjs    # COO: Scaling, customer experience, automation
  node test-cto.mjs           # CTO: Technology strategy and development
  node test-csuite.mjs        # Full C-suite coordination testing

Prerequisites:
  - Mastra dev server running (npm run dev)
  - All agents registered in src/mastra/index.ts
  - Valid API keys configured
`)
  process.exit(0)
}

runAgentTests() 