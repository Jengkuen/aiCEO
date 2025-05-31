import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

// Simple test script to check for Gemini rate limiting
async function testRateLimit() {
  console.log('🧪 Testing Gemini API Rate Limiting...\n');

  const model = google('gemini-1.5-flash-latest');
  const testPrompts = [
    'Say hello',
    'What is 2+2?',
    'Name a color',
    'Count to 3',
    'Say goodbye'
  ];

  let successCount = 0;
  let errorCount = 0;
  let rateLimitCount = 0;

  for (let i = 0; i < testPrompts.length; i++) {
    const prompt = testPrompts[i];
    console.log(`📤 Test ${i + 1}/5: "${prompt}"`);
    
    try {
      const start = Date.now();
      const result = await generateText({
        model,
        prompt,
        maxTokens: 50,
      });
      
      const duration = Date.now() - start;
      console.log(`✅ Success (${duration}ms): ${result.text.trim()}`);
      successCount++;
      
    } catch (error) {
      errorCount++;
      
      // Check for rate limiting indicators
      if (error.message?.includes('429') || 
          error.message?.toLowerCase().includes('rate limit') ||
          error.message?.toLowerCase().includes('quota exceeded') ||
          error.code === 'RESOURCE_EXHAUSTED') {
        
        rateLimitCount++;
        console.log('🚫 RATE LIMITED:', error.message);
        
        // If rate limited, wait a bit before continuing
        console.log('⏳ Waiting 2 seconds before next attempt...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } else {
        console.log('❌ Other Error:', error.message);
      }
    }
    
    // Small delay between requests
    if (i < testPrompts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Successful requests: ${successCount}/${testPrompts.length}`);
  console.log(`❌ Failed requests: ${errorCount}/${testPrompts.length}`);
  console.log(`🚫 Rate limited: ${rateLimitCount}/${testPrompts.length}`);

  if (rateLimitCount > 0) {
    console.log('\n⚠️  RATE LIMITING DETECTED!');
    console.log('Consider:');
    console.log('  - Adding delays between requests');
    console.log('  - Implementing exponential backoff');
    console.log('  - Checking your API quota limits');
    console.log('  - Using a different model or tier');
  } else if (successCount === testPrompts.length) {
    console.log('\n🎉 All tests passed! No rate limiting detected.');
  } else {
    console.log('\n🤔 Some requests failed, but not due to rate limiting.');
  }
}

// Run the test
testRateLimit().catch(error => {
  console.error('💥 Test script failed:', error);
  process.exit(1);
}); 