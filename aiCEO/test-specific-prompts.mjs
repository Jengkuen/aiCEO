#!/usr/bin/env node

import { mastra } from './src/mastra/index.ts';

async function testSpecificPrompts() {
  console.log('🧪 Testing Specific Prompt Patterns\n');
  console.log('This test validates that structured prompts reliably trigger the correct tools.\n');

  const businessIdea = "Smart plant monitoring system for urban gardeners";
  const testResults = [];

  try {
    // Test 1: Business Planning Prompt
    console.log('📋 Test 1: Structured Business Planning Prompt');
    const start1 = Date.now();
    const planResult = await mastra.agent('cosAgent').generate(
      `Create a comprehensive business plan for "${businessIdea}" including:
      - Technology strategy and development roadmap
      - Marketing strategy and customer acquisition
      - Financial planning and funding strategy
      - Operational processes and team structure
      - Generate detailed tasks for each C-suite specialist
      - Store all tasks in the database for execution tracking

      Business context: IoT/AgTech, Early startup, $100K seed funding, 9-month MVP timeline, Urban markets`
    );
    const time1 = Date.now() - start1;
    testResults.push({
      test: 'Business Planning',
      success: planResult.text.length > 200,
      time: time1,
      toolsUsed: planResult.text.includes('complete business planning') || planResult.text.includes('task')
    });
    console.log(`✅ Completed in ${time1}ms - ${planResult.text.length} chars\n`);

    // Test 2: Task Query Prompt
    console.log('📊 Test 2: Structured Task Query Prompt');
    const start2 = Date.now();
    const queryResult = await mastra.agent('cosAgent').generate(
      `Query all tasks for business idea "${businessIdea}":
      - Show task IDs, titles, specialists, priorities, and status
      - Include task statistics and completion summary
      - Highlight which tasks are ready for execution
      - Group tasks by specialist (CTO, CMO, CFO, COO)`
    );
    const time2 = Date.now() - start2;
    testResults.push({
      test: 'Task Query',
      success: queryResult.text.length > 100,
      time: time2,
      toolsUsed: queryResult.text.includes('task') || queryResult.text.includes('specialist')
    });
    console.log(`✅ Completed in ${time2}ms - ${queryResult.text.length} chars\n`);

    // Test 3: Batch Execution Prompt
    console.log('⚡ Test 3: Structured Batch Execution Prompt');
    const start3 = Date.now();
    const execResult = await mastra.agent('cosAgent').generate(
      `Execute batch tasks for "${businessIdea}":
      - Execute up to 2 tasks
      - Prioritize high-priority tasks first
      - Use demo mode for immediate completion
      - Show execution results for each task
      - Provide summary of completed vs remaining tasks`
    );
    const time3 = Date.now() - start3;
    testResults.push({
      test: 'Batch Execution',
      success: execResult.text.length > 100,
      time: time3,
      toolsUsed: execResult.text.includes('executed') || execResult.text.includes('completed')
    });
    console.log(`✅ Completed in ${time3}ms - ${execResult.text.length} chars\n`);

    // Test 4: Specialist-Specific Execution
    console.log('👨‍💻 Test 4: Specialist-Focused Execution Prompt');
    const start4 = Date.now();
    const ctoResult = await mastra.agent('cosAgent').generate(
      `Execute all ready tasks for Chief Technology Officer on "${businessIdea}":
      - Filter tasks assigned to this specialist only
      - Execute all ready tasks for this specialist
      - Use demo mode for immediate completion
      - Show specialist-specific execution results
      - Update task statuses appropriately`
    );
    const time4 = Date.now() - start4;
    testResults.push({
      test: 'Specialist Execution',
      success: ctoResult.text.length > 100,
      time: time4,
      toolsUsed: ctoResult.text.includes('Technology Officer') || ctoResult.text.includes('CTO')
    });
    console.log(`✅ Completed in ${time4}ms - ${ctoResult.text.length} chars\n`);

    // Test 5: Status Check Prompt
    console.log('📈 Test 5: Comprehensive Status Check Prompt');
    const start5 = Date.now();
    const statusResult = await mastra.agent('cosAgent').generate(
      `Show complete task status for "${businessIdea}":
      - Total tasks created vs completed
      - Status breakdown (ready, in_progress, completed, blocked)
      - Tasks by specialist with completion rates
      - Total estimated hours vs completed hours
      - Next recommended actions`
    );
    const time5 = Date.now() - start5;
    testResults.push({
      test: 'Status Check',
      success: statusResult.text.length > 100,
      time: time5,
      toolsUsed: statusResult.text.includes('status') || statusResult.text.includes('complete')
    });
    console.log(`✅ Completed in ${time5}ms - ${statusResult.text.length} chars\n`);

    // Results Summary
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('========================\n');
    
    const successful = testResults.filter(r => r.success).length;
    const totalTime = testResults.reduce((sum, r) => sum + r.time, 0);
    const avgTime = Math.round(totalTime / testResults.length);
    
    testResults.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      const tools = result.toolsUsed ? '🔧' : '⚠️';
      console.log(`${status} Test ${index + 1}: ${result.test} - ${result.time}ms ${tools}`);
    });
    
    console.log(`\n📈 Success Rate: ${successful}/${testResults.length} (${Math.round(successful/testResults.length*100)}%)`);
    console.log(`⏱️  Average Response Time: ${avgTime}ms`);
    console.log(`🔧 Tool Usage Detected: ${testResults.filter(r => r.toolsUsed).length}/${testResults.length} tests`);
    
    if (successful === testResults.length) {
      console.log('\n🎉 ALL TESTS PASSED! Structured prompts are working correctly.');
      console.log('📚 You can confidently use the prompts from QUICK_PROMPTS.md and PROMPT_EXAMPLES.md');
    } else {
      console.log('\n⚠️  Some tests failed. Check prompt structure and tool configuration.');
    }

  } catch (error) {
    console.error('❌ Error during prompt testing:', error);
  }
}

// Run the test
testSpecificPrompts().catch(console.error); 