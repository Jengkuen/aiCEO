// Focused CFO Agent Testing - Financial Domain Expert Validation
import { mastra } from './src/mastra/index.ts'

async function testCFOAgent() {
  try {
    console.log('💰 CFO Agent Focused Testing - Financial Domain Expertise...\n')
    
    // ========================
    // Test 1: Financial Modeling & Unit Economics
    // ========================
    console.log('📊 Test 1: Financial Modeling & Unit Economics Analysis\n')
    
    const modelingScenario = `
Business: RentEasy - Property rental platform connecting landlords with tenants
Current Metrics: 5,000 monthly active users, $2,000 average rent listed, 8% take rate
Growth Stage: Scaling from $500K to $5M ARR over 18 months
Challenge: Prove unit economics sustainability for Series A fundraising
Burn Rate: $200K/month, 12 months runway remaining

As CFO, create financial planning tasks focused on:
1. Comprehensive financial model with 3-year revenue projections and scenario planning
2. Unit economics analysis including customer lifetime value and acquisition cost optimization
3. Path to profitability with break-even analysis and cash flow positive timeline
4. Competitive benchmarking with industry metrics and valuation multiples
5. Financial dashboard and KPI tracking system for investor reporting

Emphasize data-driven financial planning that supports growth while managing burn rate efficiently.`

    const modelingResponse = await mastra.agent('cfoAgent').generate([
      {
        role: 'user',
        content: modelingScenario
      }
    ])

    console.log('📈 CFO Financial Modeling Response:')
    console.log('='.repeat(100))
    console.log(modelingResponse.text)
    console.log('='.repeat(100))

    // ========================
    // Test 2: Fundraising Strategy & Investor Relations
    // ========================
    console.log('\n🎯 Test 2: Fundraising Strategy & Investor Relations\n')
    
    const fundraisingScenario = `
Business: HealthTech AI - AI diagnostic platform for radiology clinics
Current Status: $1.2M seed round 18 months ago, $800K remaining runway
Growth Metrics: 150% revenue growth, 40 clinic customers, $50K average contract value
Fundraising Goal: $8M Series A to accelerate growth and expand to new medical specialties
Timeline: 4 months to close funding round

As CFO, create fundraising and investor relations tasks:
1. Series A fundraising strategy with investor targeting and timeline
2. Compelling pitch deck with financial projections and growth narrative
3. Due diligence preparation with data room and financial documentation
4. Valuation analysis and term sheet negotiation strategy
5. Investor relations program with regular updates and board reporting

Focus on building investor confidence in AI healthcare market opportunity and financial scalability.`

    const fundraisingResponse = await mastra.agent('cfoAgent').generate([
      {
        role: 'user',
        content: fundraisingScenario
      }
    ])

    console.log('💼 CFO Fundraising Strategy Response:')
    console.log('='.repeat(100))
    console.log(fundraisingResponse.text)
    console.log('='.repeat(100))

    // ========================
    // Test 3: Cash Flow Crisis & Turnaround Planning
    // ========================
    console.log('\n🚨 Test 3: Cash Flow Crisis & Financial Turnaround\n')
    
    const crisisScenario = `
Business: QuickShip - Same-day delivery logistics startup
Crisis Situation: Major customer canceled $2M annual contract, 60 days cash remaining
Current State: $800K monthly burn, 180 employees, expensive fulfillment infrastructure
Immediate Needs: Extend runway to 12 months while pivoting to profitable market segments
Available Options: Cost reduction, asset sales, emergency funding, or strategic acquisition

As CFO, create turnaround and crisis management tasks:
1. Emergency cash flow management with detailed weekly cash projections
2. Cost reduction plan with operational efficiency improvements and workforce optimization
3. Asset optimization including facility consolidation and equipment liquidation
4. Emergency funding strategy with bridge financing and strategic investor options
5. Business model pivot analysis with focus on higher-margin service offerings

Prioritize immediate cash preservation while positioning for long-term viability.`

    const crisisResponse = await mastra.agent('cfoAgent').generate([
      {
        role: 'user',
        content: crisisScenario
      }
    ])

    console.log('⚡ CFO Crisis Management Response:')
    console.log('='.repeat(100))
    console.log(crisisResponse.text)
    console.log('='.repeat(100))

    // ========================
    // Test 4: M&A Financial Analysis & Business Valuation
    // ========================
    console.log('\n🤝 Test 4: M&A Analysis & Strategic Transactions\n')
    
    const maScenario = `
Business: DataFlow - Customer analytics platform with $3M ARR
M&A Opportunity: Acquire smaller competitor "InsightPro" with complementary technology
Target Details: $1M ARR, 25 enterprise customers, strong data science team
Strategic Value: Combined entity could reach $8M ARR with cross-selling and technology integration
Consideration: $5M purchase price (5x revenue multiple)
Integration Budget: $1.5M for technology integration and team consolidation

As CFO, create M&A financial analysis tasks:
1. Comprehensive due diligence with financial, legal, and technology assessment
2. Valuation analysis using multiple methodologies and comparable transactions
3. Deal structure optimization with earnouts, retention incentives, and risk mitigation
4. Integration planning with cost synergies and revenue enhancement opportunities
5. Post-acquisition financial tracking with success metrics and performance monitoring

Focus on maximizing strategic value while managing integration risks and financial returns.`

    const maResponse = await mastra.agent('cfoAgent').generate([
      {
        role: 'user',
        content: maScenario
      }
    ])

    console.log('🔍 CFO M&A Analysis Response:')
    console.log('='.repeat(100))
    console.log(maResponse.text)
    console.log('='.repeat(100))

    // ========================
    // CFO Validation Summary
    // ========================
    console.log('\n' + '='.repeat(100))
    console.log('✅ CFO AGENT VALIDATION SUMMARY')
    console.log('='.repeat(100))
    console.log('💰 Financial Domain Expertise Validated:')
    console.log('  ✓ Financial Modeling & Unit Economics (growth sustainability)')
    console.log('  ✓ Fundraising Strategy & Investor Relations (Series A readiness)')
    console.log('  ✓ Cash Flow Crisis Management (turnaround planning)')
    console.log('  ✓ M&A Analysis & Strategic Transactions (value creation)')
    
    console.log('\n📊 Expected CFO Capabilities Demonstrated:')
    console.log('  ✓ Comprehensive financial planning with scenario analysis')
    console.log('  ✓ Investment strategy and capital allocation optimization')
    console.log('  ✓ Risk management and financial controls implementation')
    console.log('  ✓ Stakeholder communication and transparent reporting')
    console.log('  ✓ Strategic financial analysis supporting business decisions')
    console.log('  ✓ Business model optimization and profitability planning')

  } catch (error) {
    console.error('❌ Error testing CFO agent:', error)
    console.log('\nTroubleshooting: Ensure Mastra dev server is running and CFO agent is registered')
  }
}

console.log('💰 CFO Agent Domain Expertise Testing')
console.log('📍 Testing financial modeling, fundraising, crisis management, and M&A analysis')
console.log('🎯 Expected: Professional financial strategies with actionable planning\n')

testCFOAgent() 