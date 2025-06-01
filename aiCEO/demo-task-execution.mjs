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
  console.log('This system uses structured prompts to reliably:');
  console.log('1. Create comprehensive business plans with specific context');
  console.log('2. Generate actionable tasks with detailed parameters');
  console.log('3. Execute tasks through specialist coordination');
  console.log('4. Track progress with detailed status reporting\n');

  try {
    // Get business idea from user
    const businessIdea = await askQuestion('💡 Enter your business idea: ');
    
    // Get additional context
    const industry = await askQuestion('🏭 Industry/sector (e.g., "FinTech", "HealthTech"): ');
    const stage = await askQuestion('📈 Business stage (e.g., "Early startup", "Growth stage"): ');
    const budget = await askQuestion('💰 Budget range (e.g., "$100K seed", "$1M Series A"): ');
    const timeline = await askQuestion('⏰ Timeline (e.g., "12-month MVP", "6-month pilot"): ');
    
    console.log(`\nGreat! Creating comprehensive business plan for: "${businessIdea}"\n`);

    // Step 1: Create business plan with structured prompt
    console.log('📋 Creating comprehensive business plan with structured prompt...');
    const planningResult = await mastra.agent('cosAgent').generate(
      `Create a comprehensive business plan for "${businessIdea}" including:
      - Technology strategy and development roadmap
      - Marketing strategy and customer acquisition
      - Financial planning and funding strategy
      - Operational processes and team structure
      - Generate detailed tasks for each C-suite specialist
      - Store all tasks in the database for execution tracking

      Business context: ${industry} industry, ${stage}, ${budget} budget, ${timeline} timeline`
    );
    console.log('✅ Business plan created with structured approach!\n');
    console.log('📝 Planning Summary:');
    console.log(planningResult.text.substring(0, 600) + '...\n');

    await askQuestion('Press Enter to see the generated tasks with detailed query...');

    // Step 2: Query tasks with specific structured prompt
    console.log('📊 Retrieving generated tasks with detailed parameters...');
    const taskQuery = await mastra.agent('cosAgent').generate(
      `Query all tasks for business idea "${businessIdea}":
      - Show task IDs, titles, specialists, priorities, and status
      - Include task statistics and completion summary
      - Highlight which tasks are ready for execution
      - Group tasks by specialist (CTO, CMO, CFO, COO)`
    );
    console.log('✅ Tasks retrieved with structured query!\n');
    console.log('📋 Generated Tasks:');
    console.log(taskQuery.text + '\n');

    const startExecution = await askQuestion('🚀 Would you like to start executing tasks with batch execution? (y/n): ');
    
    if (startExecution.toLowerCase() === 'y' || startExecution.toLowerCase() === 'yes') {
      console.log('\n⚡ Starting batch task execution with structured prompts...');
      
      // Step 3: Execute high priority tasks with structured prompt
      const taskExecution = await mastra.agent('cosAgent').generate(
        `Execute batch tasks for "${businessIdea}":
        - Execute up to 3 tasks
        - Prioritize high-priority tasks first
        - Use demo mode for immediate completion
        - Show execution results for each task
        - Provide summary of completed vs remaining tasks`
      );
      console.log('✅ Batch execution completed!\n');
      console.log('🎯 Execution Results:');
      console.log(taskExecution.text + '\n');

      const executeSpecialist = await askQuestion('👨‍💻 Execute specialist-specific tasks (CTO/CMO/CFO/COO)? Enter specialist or "skip": ');
      
      if (executeSpecialist.toLowerCase() !== 'skip' && executeSpecialist.trim()) {
        const specialistName = executeSpecialist.includes('CTO') ? 'Chief Technology Officer' :
                              executeSpecialist.includes('CMO') ? 'Chief Marketing Officer' :
                              executeSpecialist.includes('CFO') ? 'Chief Financial Officer' :
                              executeSpecialist.includes('COO') ? 'Chief Operating Officer' :
                              'Chief Technology Officer'; // default

        console.log(`\n⚡ Executing ${specialistName} tasks with specialist-focused prompt...`);
        const specialistExecution = await mastra.agent('cosAgent').generate(
          `Execute all ready tasks for ${specialistName} on "${businessIdea}":
          - Filter tasks assigned to this specialist only
          - Execute all ready tasks for this specialist
          - Use demo mode for immediate completion
          - Show specialist-specific execution results
          - Update task statuses appropriately`
        );
        console.log(`✅ ${specialistName} tasks executed!\n`);
        console.log(`💼 ${specialistName} Execution Results:`);
        console.log(specialistExecution.text + '\n');
      }

      // Final status check with comprehensive prompt
      console.log('📈 Checking final comprehensive task status...');
      const finalStatus = await mastra.agent('cosAgent').generate(
        `Show complete task status for "${businessIdea}":
        - Total tasks created vs completed
        - Status breakdown (ready, in_progress, completed, blocked)
        - Tasks by specialist with completion rates
        - Total estimated hours vs completed hours
        - Next recommended actions`
      );
      console.log('✅ Status updated with comprehensive summary!\n');
      console.log('📊 Final Status:');
      console.log(finalStatus.text + '\n');
    }

    console.log('🎉 Demo completed using structured prompts!');
    console.log('📚 Check PROMPT_EXAMPLES.md for more structured prompt patterns.');
    console.log('🔧 These specific prompts ensure reliable tool triggering and consistent results.\n');

    // Show example of next steps
    console.log('💡 Example follow-up prompts you could use:');
    console.log(`1. "Query ready-to-execute tasks for '${businessIdea}' sorted by priority"`);
    console.log(`2. "Execute high priority tasks for '${businessIdea}' - maximum 2 tasks, demo mode"`);
    console.log(`3. "Show task progress update for '${businessIdea}' with completion statistics"`);

  } catch (error) {
    console.error('❌ Error during demo:', error);
  } finally {
    rl.close();
  }
}

// Run the interactive demo
interactiveDemo().catch(console.error); 