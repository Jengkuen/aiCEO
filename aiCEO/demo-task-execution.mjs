#!/usr/bin/env node

import { mastra } from './src/mastra/index.ts';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function interactiveDemo() {
  console.log('🚀 AI CEO Task Execution Interactive Demo');
  console.log('======================================\n');
  
  console.log('Welcome to the AI CEO Task Execution System!');
  console.log('This system allows you to:');
  console.log('1. Create comprehensive business plans');
  console.log('2. Generate actionable tasks across all C-suite functions');
  console.log('3. Execute tasks through specialist agents');
  console.log('4. Track progress and completion status\n');

  try {
    // Get business idea from user
    const businessIdea = await askQuestion('💡 Enter your business idea: ');
    console.log(`\nGreat! Let's create a business plan for: "${businessIdea}"\n`);

    // Step 1: Create business plan
    console.log('📋 Creating comprehensive business plan...');
    const planningResult = await mastra.agent('cosAgent').generate(
      `Create a comprehensive business plan for "${businessIdea}". Include technology, marketing, financial, and operational strategies with detailed tasks.`
    );
    console.log('✅ Business plan created!\n');
    console.log('📝 Planning Summary:');
    console.log(planningResult.text.substring(0, 500) + '...\n');

    await askQuestion('Press Enter to see the generated tasks...');

    // Step 2: Show tasks
    console.log('📊 Retrieving generated tasks...');
    const taskQuery = await mastra.agent('cosAgent').generate(
      `Show me all the tasks that were created for "${businessIdea}". Include task IDs, specialists, priorities, and status.`
    );
    console.log('✅ Tasks retrieved!\n');
    console.log('📋 Generated Tasks:');
    console.log(taskQuery.text + '\n');

    const startExecution = await askQuestion('🚀 Would you like to start executing tasks? (y/n): ');
    
    if (startExecution.toLowerCase() === 'y' || startExecution.toLowerCase() === 'yes') {
      console.log('\n⚡ Starting task execution...');
      
      // Step 3: Execute high priority tasks
      const taskExecution = await mastra.agent('cosAgent').generate(
        `Execute the top 3 high-priority ready tasks for "${businessIdea}". Show detailed execution results for each task.`
      );
      console.log('✅ Tasks executed!\n');
      console.log('🎯 Execution Results:');
      console.log(taskExecution.text + '\n');

      const executeMore = await askQuestion('👨‍💻 Execute CTO-specific tasks? (y/n): ');
      
      if (executeMore.toLowerCase() === 'y' || executeMore.toLowerCase() === 'yes') {
        console.log('\n⚡ Executing CTO tasks...');
        const ctoExecution = await mastra.agent('cosAgent').generate(
          `Execute all ready tasks assigned to the Chief Technology Officer for "${businessIdea}". Focus on technical implementation and development tasks.`
        );
        console.log('✅ CTO tasks executed!\n');
        console.log('💻 CTO Execution Results:');
        console.log(ctoExecution.text + '\n');
      }

      // Final status check
      console.log('📈 Checking final task status...');
      const finalStatus = await mastra.agent('cosAgent').generate(
        `Show me the current status summary for all tasks related to "${businessIdea}". Include completion statistics and next steps.`
      );
      console.log('✅ Status updated!\n');
      console.log('📊 Final Status:');
      console.log(finalStatus.text + '\n');
    }

    console.log('🎉 Demo completed! Your business plan has been created and tasks are ready for execution.');
    console.log('You can continue using the COS agent to execute more tasks or create new business plans.\n');

  } catch (error) {
    console.error('❌ Error during demo:', error);
  } finally {
    rl.close();
  }
}

// Run the interactive demo
interactiveDemo().catch(console.error); 