import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

// Advanced rate limit testing with multiple scenarios
class RateLimitTester {
  constructor() {
    this.model = google('gemini-1.5-flash-latest');
    this.results = {
      burst: { success: 0, rateLimited: 0, errors: 0 },
      sustained: { success: 0, rateLimited: 0, errors: 0 },
      recovery: { success: 0, rateLimited: 0, errors: 0 }
    };
  }

  async makeRequest(prompt, testType) {
    try {
      const start = Date.now();
      const result = await generateText({
        model: this.model,
        prompt,
        maxTokens: 20,
      });
      
      const duration = Date.now() - start;
      this.results[testType].success++;
      console.log(`✅ Success (${duration}ms): ${result.text.trim().substring(0, 50)}...`);
      return { success: true, duration };
      
    } catch (error) {
      // Check for rate limiting
      if (this.isRateLimited(error)) {
        this.results[testType].rateLimited++;
        console.log(`🚫 Rate Limited: ${error.message}`);
        return { success: false, rateLimited: true, error };
      } else {
        this.results[testType].errors++;
        console.log(`❌ Error: ${error.message}`);
        return { success: false, rateLimited: false, error };
      }
    }
  }

  isRateLimited(error) {
    const rateLimitIndicators = [
      '429',
      'rate limit',
      'quota exceeded',
      'resource_exhausted',
      'too many requests',
      'requests per minute'
    ];
    
    const errorText = (error.message || error.toString()).toLowerCase();
    return rateLimitIndicators.some(indicator => errorText.includes(indicator)) ||
           error.code === 'RESOURCE_EXHAUSTED';
  }

  async testBurstRequests() {
    console.log('\n🚀 Test 1: Burst Requests (10 rapid requests)');
    console.log('Testing how the API handles rapid consecutive requests...\n');

    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(this.makeRequest(`Quick test ${i + 1}`, 'burst'));
    }

    await Promise.allSettled(promises);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Cool down
  }

  async testSustainedLoad() {
    console.log('\n⏳ Test 2: Sustained Load (20 requests with 200ms intervals)');
    console.log('Testing sustained request pattern...\n');

    for (let i = 0; i < 20; i++) {
      console.log(`Request ${i + 1}/20:`);
      await this.makeRequest(`Sustained test ${i + 1}`, 'sustained');
      
      if (i < 19) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
  }

  async testRecoveryAfterLimit() {
    console.log('\n🔄 Test 3: Recovery Pattern');
    console.log('Testing recovery after potential rate limiting...\n');

    // First, try to trigger rate limiting with rapid requests
    console.log('Attempting to trigger rate limit...');
    const rapidPromises = [];
    for (let i = 0; i < 15; i++) {
      rapidPromises.push(this.makeRequest(`Recovery trigger ${i + 1}`, 'recovery'));
    }
    await Promise.allSettled(rapidPromises);

    // Wait and try again
    console.log('\nWaiting 5 seconds for recovery...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('Testing recovery with spaced requests:');
    for (let i = 0; i < 3; i++) {
      console.log(`Recovery test ${i + 1}/3:`);
      await this.makeRequest(`Recovery test ${i + 1}`, 'recovery');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 COMPREHENSIVE TEST RESULTS');
    console.log('='.repeat(60));

    const tests = [
      { name: 'Burst Requests', key: 'burst' },
      { name: 'Sustained Load', key: 'sustained' },
      { name: 'Recovery Pattern', key: 'recovery' }
    ];

    tests.forEach(test => {
      const results = this.results[test.key];
      const total = results.success + results.rateLimited + results.errors;
      
      console.log(`\n${test.name}:`);
      console.log(`  ✅ Successful: ${results.success}/${total} (${((results.success/total)*100).toFixed(1)}%)`);
      console.log(`  🚫 Rate Limited: ${results.rateLimited}/${total} (${((results.rateLimited/total)*100).toFixed(1)}%)`);
      console.log(`  ❌ Other Errors: ${results.errors}/${total} (${((results.errors/total)*100).toFixed(1)}%)`);
    });

    const totalRateLimited = Object.values(this.results).reduce((sum, r) => sum + r.rateLimited, 0);
    const totalRequests = Object.values(this.results).reduce((sum, r) => sum + r.success + r.rateLimited + r.errors, 0);

    console.log('\n' + '-'.repeat(40));
    console.log('OVERALL SUMMARY:');
    console.log(`Total requests: ${totalRequests}`);
    console.log(`Rate limited: ${totalRateLimited} (${((totalRateLimited/totalRequests)*100).toFixed(1)}%)`);

    if (totalRateLimited > 0) {
      console.log('\n⚠️  RATE LIMITING DETECTED!');
      console.log('\nRecommendations:');
      console.log('  🔄 Implement exponential backoff');
      console.log('  ⏱️  Add delays between requests (500ms-1s)');
      console.log('  📊 Monitor your API quota usage');
      console.log('  🎯 Consider using batch requests where possible');
      console.log('  💰 Check if you need to upgrade your API tier');
    } else {
      console.log('\n🎉 No rate limiting detected! Your current usage pattern seems fine.');
    }
  }

  async runAllTests() {
    console.log('🧪 Starting Comprehensive Gemini Rate Limit Testing...');
    console.log('This will make ~50 API requests to test various patterns.\n');

    try {
      await this.testBurstRequests();
      await this.testSustainedLoad();
      await this.testRecoveryAfterLimit();
      this.printResults();
    } catch (error) {
      console.error('💥 Test suite failed:', error);
    }
  }
}

// Run the comprehensive tests
const tester = new RateLimitTester();
tester.runAllTests().catch(error => {
  console.error('💥 Test runner failed:', error);
  process.exit(1);
}); 