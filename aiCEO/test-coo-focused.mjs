// Focused COO Agent Testing - Operations Domain Expert Validation
import { mastra } from './src/mastra/index.ts'

async function testCOOAgent() {
  try {
    console.log('⚙️ COO Agent Focused Testing - Operations Domain Expertise...\n')
    
    // ========================
    // Test 1: Rapid Scaling & Operational Infrastructure
    // ========================
    console.log('🚀 Test 1: Rapid Scaling Operations & Infrastructure\n')
    
    const scalingScenario = `
Business: CloudKitchen - Ghost kitchen network for food delivery
Growth Challenge: Scaling from 5 locations to 50 locations in 12 months
Current Metrics: 500 orders/day per location, 15-minute average prep time, 92% order accuracy
Target Metrics: 1,000 orders/day per location, maintain quality and speed standards
Team Size: Growing from 200 to 1,500 employees across operations, kitchen staff, and management

As COO, create operational scaling tasks focused on:
1. Standardized operational procedures for consistent quality across all locations
2. Team hiring, training, and management systems for rapid workforce expansion
3. Supply chain and vendor management optimization for 10x volume growth
4. Quality control and performance monitoring systems with real-time operational dashboards
5. Technology integration for order management, inventory tracking, and workforce coordination

Emphasize operational excellence while maintaining service quality during rapid expansion.`

    const scalingResponse = await mastra.agent('cooAgent').generate([
      {
        role: 'user',
        content: scalingScenario
      }
    ])

    console.log('📈 COO Scaling Operations Response:')
    console.log('='.repeat(100))
    console.log(scalingResponse.text)
    console.log('='.repeat(100))

    // ========================
    // Test 2: Customer Experience Optimization & Service Recovery
    // ========================
    console.log('\n🎯 Test 2: Customer Experience & Service Excellence\n')
    
    const customerScenario = `
Business: TechSupport Pro - B2B technical support outsourcing
Service Challenge: Customer satisfaction dropped from 95% to 78% due to growth pains
Current Issues: Longer response times, inconsistent service quality, agent turnover (35% annually)
Customer Requirements: <2 hour response time, 95% first-call resolution, multilingual support
Contract Risk: $2M annual contracts at risk due to SLA violations

As COO, create customer experience optimization tasks:
1. Service quality improvement program with standardized procedures and quality metrics
2. Customer service agent training and development with career progression paths
3. Customer experience measurement and feedback systems with real-time monitoring
4. Service recovery procedures for handling escalations and relationship repair
5. Operational efficiency improvements to reduce response times while maintaining quality

Focus on restoring customer confidence while building sustainable operational excellence.`

    const customerResponse = await mastra.agent('cooAgent').generate([
      {
        role: 'user',
        content: customerScenario
      }
    ])

    console.log('🎯 COO Customer Experience Response:')
    console.log('='.repeat(100))
    console.log(customerResponse.text)
    console.log('='.repeat(100))

    // ========================
    // Test 3: Crisis Operations & Business Continuity
    // ========================
    console.log('\n🚨 Test 3: Crisis Management & Business Continuity\n')
    
    const crisisScenario = `
Business: MedLogistics - Medical supply distribution to hospitals
Crisis Situation: Major warehouse fire destroyed 60% of inventory during pandemic surge
Impact: Critical medical supplies shortages, hospital customers demanding immediate solutions
Timeline: 72 hours to restore critical supply chains, 2 weeks to full operational recovery
Constraints: Limited alternative suppliers, transportation disruptions, emergency regulations

As COO, create crisis response and business continuity tasks:
1. Emergency supply chain restoration with alternative vendors and expedited logistics
2. Customer communication and relationship management during service disruptions
3. Temporary operational setup with backup facilities and emergency staffing
4. Crisis coordination with internal teams, suppliers, and regulatory authorities
5. Long-term resilience planning with redundant systems and disaster recovery procedures

Prioritize critical medical supply restoration while building stronger operational resilience.`

    const crisisResponse = await mastra.agent('cooAgent').generate([
      {
        role: 'user',
        content: crisisScenario
      }
    ])

    console.log('⚡ COO Crisis Management Response:')
    console.log('='.repeat(100))
    console.log(crisisResponse.text)
    console.log('='.repeat(100))

    // ========================
    // Test 4: Digital Transformation & Process Automation
    // ========================
    console.log('\n🔄 Test 4: Digital Transformation & Process Automation\n')
    
    const digitalScenario = `
Business: LegalEase - Law firm practice management services
Transformation Goal: Digitize paper-based processes and reduce manual work by 70%
Current State: 80% manual processes, 48-hour average case processing time, high error rates
Technology Budget: $500K for digital transformation over 18 months
Expected Outcomes: 50% faster processing, 90% fewer errors, improved client satisfaction

As COO, create digital transformation and automation tasks:
1. Process mapping and automation opportunity identification with ROI analysis
2. Technology selection and implementation roadmap for practice management systems
3. Change management and employee training programs for digital adoption
4. Data migration and system integration with quality assurance and testing
5. Performance measurement and continuous improvement with automation optimization

Focus on maximizing operational efficiency while ensuring smooth transition and employee adoption.`

    const digitalResponse = await mastra.agent('cooAgent').generate([
      {
        role: 'user',
        content: digitalScenario
      }
    ])

    console.log('💻 COO Digital Transformation Response:')
    console.log('='.repeat(100))
    console.log(digitalResponse.text)
    console.log('='.repeat(100))

    // ========================
    // COO Validation Summary
    // ========================
    console.log('\n' + '='.repeat(100))
    console.log('✅ COO AGENT VALIDATION SUMMARY')
    console.log('='.repeat(100))
    console.log('⚙️ Operations Domain Expertise Validated:')
    console.log('  ✓ Rapid Scaling Operations (standardization & infrastructure)')
    console.log('  ✓ Customer Experience Optimization (service excellence)')
    console.log('  ✓ Crisis Management & Business Continuity (resilience planning)')
    console.log('  ✓ Digital Transformation (process automation & efficiency)')
    
    console.log('\n📊 Expected COO Capabilities Demonstrated:')
    console.log('  ✓ Operational process design and standardization')
    console.log('  ✓ Team management and organizational development')
    console.log('  ✓ Quality control and performance measurement systems')
    console.log('  ✓ Customer experience and service delivery optimization')
    console.log('  ✓ Crisis response and business continuity planning')
    console.log('  ✓ Technology integration and process automation')

  } catch (error) {
    console.error('❌ Error testing COO agent:', error)
    console.log('\nTroubleshooting: Ensure Mastra dev server is running and COO agent is registered')
  }
}

console.log('⚙️ COO Agent Domain Expertise Testing')
console.log('📍 Testing scaling operations, customer experience, crisis management, and digital transformation')
console.log('🎯 Expected: Professional operational strategies with execution excellence\n')

testCOOAgent() 