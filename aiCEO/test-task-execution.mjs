#!/usr/bin/env node

import { mastra } from './src/mastra/index.ts';

async function testTaskExecution() {
  console.log('🚀 Testing AI CEO Task Execution System with Specific Prompts\n');

  try {
    const businessIdea = "Sustainable Urban Vertical Farming startup in San Francisco";
    
    // Step 1: Create a business plan and tasks with specific structured prompt
    console.log('📋 Step 1: Creating business plan and tasks with structured prompt...');
    const planningResult = await mastra.agent('cosAgent').generate(
      `Create a comprehensive business plan for "${businessIdea}" including:
      - Technology strategy and development roadmap
      - Marketing strategy and customer acquisition
      - Financial planning and funding strategy
      - Operational processes and team structure
      - Generate detailed tasks for each C-suite specialist
      - Store all tasks in the database for execution tracking

      Business context: AgTech industry, startup stage, $500K seed funding, 18-month launch timeline, San Francisco Bay Area`
    );
    console.log('✅ Business planning completed');
    console.log('Planning Result:', planningResult.text.substring(0, 300) + '...\n');

    // Step 2: Query the tasks with specific prompt
    console.log('📊 Step 2: Querying created tasks with specific parameters...');
    const taskQuery = await mastra.agent('cosAgent').generate(
      `Query all tasks for business idea "${businessIdea}":
      - Show task IDs, titles, specialists, priorities, and status
      - Include task statistics and completion summary
      - Highlight which tasks are ready for execution
      - Group tasks by specialist (CTO, CMO, CFO, COO)`
    );
    console.log('✅ Task query completed');
    console.log('Task Query Result:', taskQuery.text.substring(0, 400) + '...\n');

    // Step 3: Execute high-priority tasks with specific batch execution prompt
    console.log('⚡ Step 3: Executing high-priority tasks with batch execution...');
    const taskExecution = await mastra.agent('cosAgent').generate(
      `Execute batch tasks for "${businessIdea}":
      - Execute up to 3 tasks
      - Prioritize high-priority tasks first
      - Use demo mode for immediate completion
      - Show execution results for each task
      - Provide summary of completed vs remaining tasks`
    );
    console.log('✅ Task execution completed');
    console.log('Execution Result:', taskExecution.text.substring(0, 500) + '...\n');

    // Step 4: Check status with specific status prompt
    console.log('📈 Step 4: Checking updated task status with detailed summary...');
    const statusCheck = await mastra.agent('cosAgent').generate(
      `Show complete task status for "${businessIdea}":
      - Total tasks created vs completed
      - Status breakdown (ready, in_progress, completed, blocked)
      - Tasks by specialist with completion rates
      - Total estimated hours vs completed hours
      - Next recommended actions`
    );
    console.log('✅ Status check completed');
    console.log('Status Result:', statusCheck.text.substring(0, 400) + '...\n');

    // Step 5: Execute CTO-specific tasks with specialist-focused prompt
    console.log('👨‍💻 Step 5: Executing CTO tasks with specialist-focused execution...');
    const ctoTasks = await mastra.agent('cosAgent').generate(
      `Execute all ready tasks for Chief Technology Officer on "${businessIdea}":
      - Filter tasks assigned to this specialist only
      - Execute all ready tasks for this specialist
      - Use demo mode for immediate completion
      - Show specialist-specific execution results
      - Update task statuses appropriately`
    );
    console.log('✅ CTO task execution completed');
    console.log('CTO Tasks Result:', ctoTasks.text.substring(0, 400) + '...\n');

    // Step 6: Final comprehensive status
    console.log('📊 Step 6: Final comprehensive status check...');
    const finalStatus = await mastra.agent('cosAgent').generate(
      `Show task progress update for "${businessIdea}":
      - Recently completed tasks
      - Currently in-progress tasks
      - Newly ready tasks
      - Completion percentage change
      - Recommended next tasks to execute`
    );
    console.log('✅ Final status completed');
    console.log('Final Status:', finalStatus.text.substring(0, 400) + '...\n');

    console.log('🎉 Task execution demo completed successfully with specific prompts!');
    console.log('📚 Check PROMPT_EXAMPLES.md for more structured prompt patterns.');

  } catch (error) {
    console.error('❌ Error during task execution demo:', error);
  }
}

// Run the test
testTaskExecution().catch(console.error); 