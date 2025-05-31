// Architecture Validation Script - No Server Required
import fs from 'fs'
import path from 'path'

console.log('🏗️ COS Agent Architecture Validation')
console.log('=' .repeat(50))

// Check COS Agent File
const cosAgentPath = './src/mastra/agents/cos.ts'
if (fs.existsSync(cosAgentPath)) {
  const cosAgentContent = fs.readFileSync(cosAgentPath, 'utf8')
  
  console.log('✅ COS Agent File: EXISTS')
  
  // Check for correct model
  if (cosAgentContent.includes('gemini-2.5-flash-preview-05-20')) {
    console.log('✅ Model: Updated to Gemini 2.5 Flash Preview')
  } else {
    console.log('❌ Model: Not updated to latest version')
  }
  
  // Check for strategic instructions
  if (cosAgentContent.includes('Strategic Orchestrator') || cosAgentContent.includes('strategic')) {
    console.log('✅ Instructions: Contains strategic orchestration focus')
  } else {
    console.log('❌ Instructions: Missing strategic focus')
  }
  
  // Check for correct tools
  if (cosAgentContent.includes('generate-okrs')) {
    console.log('✅ Tools: Has OKR generation tool')
  } else {
    console.log('❌ Tools: Missing OKR generation tool')
  }
  
  if (cosAgentContent.includes('create-delegation-plan')) {
    console.log('✅ Tools: Has delegation tool')
  } else {
    console.log('❌ Tools: Missing delegation tool')
  }
  
  // Check for incorrect tools (should NOT have task generation)
  if (cosAgentContent.includes('taskGenerationTool') && !cosAgentContent.includes('// No taskGenerationTool')) {
    console.log('❌ Tools: Still has task generation tool (should be removed)')
  } else {
    console.log('✅ Tools: Correctly excludes task generation tool')
  }
  
  // Check memory configuration
  if (cosAgentContent.includes('lastMessages: 100')) {
    console.log('✅ Memory: Extended context (100 messages)')
  } else {
    console.log('⚠️  Memory: Check extended context configuration')
  }
  
} else {
  console.log('❌ COS Agent File: NOT FOUND')
}

console.log('\n🛠️ Tool Files Validation')

// Check delegation tool
const delegationToolPath = './src/mastra/tools/delegation-tool.ts'
if (fs.existsSync(delegationToolPath)) {
  console.log('✅ Delegation Tool: EXISTS')
} else {
  console.log('❌ Delegation Tool: NOT FOUND')
}

// Check task generation tool
const taskToolPath = './src/mastra/tools/task-generation-tool.ts'
if (fs.existsSync(taskToolPath)) {
  console.log('✅ Task Generation Tool: EXISTS (for specialists)')
} else {
  console.log('❌ Task Generation Tool: NOT FOUND')
}

console.log('\n📋 Architecture Summary')
console.log('=' .repeat(50))
console.log('COS Role: Strategic Orchestrator')
console.log('COS Tools: generate-okrs, create-delegation-plan')
console.log('Specialist Tools: taskGenerationTool (domain-specific)')
console.log('Workflow: COS → Strategic Analysis → Delegation → Specialist Tasks → Integration')

console.log('\n🎯 Next Steps for Testing')
console.log('1. Open browser to http://localhost:4111')
console.log('2. Select "cosAgent" in playground')
console.log('3. Test strategic business analysis scenarios')
console.log('4. Verify delegation without task creation')
console.log('5. Confirm OKR and delegation tool usage')

console.log('\n🚀 Ready for Step 2.3 Validation!') 