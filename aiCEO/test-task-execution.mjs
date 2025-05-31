#!/usr/bin/env node

import { mastra } from './src/mastra/index.ts';

async function testTaskExecution() {
  console.log('🚀 Testing AI CEO Task Execution System\n');

  try {
    // Step 1: Create a business plan and tasks
    console.log('📋 Step 1: Creating business plan and tasks...');
    const planningResult = await mastra.agent('cosAgent').generate(
      'Create a comprehensive business plan for a "Sustainable Urban Vertical Farming startup in San Francisco". Include technology, marketing, financial, and operational strategies.'
    );
    console.log('✅ Business planning completed');
    console.log('Planning Result:', planningResult.text.substring(0, 200) + '...\n');

    // Step 2: Query the tasks that were created
    console.log('📊 Step 2: Querying created tasks...');
    const taskQuery = await mastra.agent('cosAgent').generate(
      'Show me all the tasks that were created for the Sustainable Urban Vertical Farming startup. I want to see what\'s ready to execute.'
    );
    console.log('✅ Task query completed');
    console.log('Task Query Result:', taskQuery.text.substring(0, 300) + '...\n');

    // Step 3: Execute some high-priority tasks
    console.log('⚡ Step 3: Executing high-priority tasks...');
    const taskExecution = await mastra.agent('cosAgent').generate(
      'Start executing the high-priority tasks for the Sustainable Urban Vertical Farming startup. Execute up to 3 tasks and show me the results.'
    );
    console.log('✅ Task execution completed');
    console.log('Execution Result:', taskExecution.text.substring(0, 400) + '...\n');

    // Step 4: Check the updated task status
    console.log('📈 Step 4: Checking updated task status...');
    const statusCheck = await mastra.agent('cosAgent').generate(
      'Show me the current status of all tasks for the Sustainable Urban Vertical Farming startup. How many are completed vs. remaining?'
    );
    console.log('✅ Status check completed');
    console.log('Status Result:', statusCheck.text.substring(0, 300) + '...\n');

    // Step 5: Execute tasks by specialist
    console.log('👨‍💻 Step 5: Executing CTO tasks specifically...');
    const ctoTasks = await mastra.agent('cosAgent').generate(
      'Execute all ready tasks assigned to the Chief Technology Officer for the vertical farming startup. I want to see the technical implementation progress.'
    );
    console.log('✅ CTO task execution completed');
    console.log('CTO Tasks Result:', ctoTasks.text.substring(0, 300) + '...\n');

    console.log('🎉 Task execution demo completed successfully!');

  } catch (error) {
    console.error('❌ Error during task execution demo:', error);
  }
}

// Run the test
testTaskExecution().catch(console.error); 