# aiCEO C-Suite Agent Testing Guide

## 🏢 Complete Testing Suite for Professional AI Executives

This guide provides comprehensive test prompts and scenarios for validating each C-suite agent's domain expertise and task generation capabilities.

## 🚀 Quick Start Testing

### Prerequisites
```bash
# 1. Start Mastra development server
npm run dev

# 2. Verify server is running at http://localhost:4111
# 3. Ensure all agents are registered in src/mastra/index.ts
```

### Master Test Runner
```bash
# Quick test of all agents
node test-all-agents.mjs

# Test specific agent
node test-all-agents.mjs cmo

# Show system status
node test-all-agents.mjs status

# Help and usage
node test-all-agents.mjs --help
```

## 📋 Individual Agent Testing

### 🎯 COS Agent - Strategic Orchestrator
**Focus**: Strategic planning, OKR generation, C-suite delegation

```bash
# Test strategic delegation
node test-all-agents.mjs cos
```

**Expected Capabilities**:
- ✅ Company-wide OKR generation
- ✅ Strategic budget allocation
- ✅ C-suite delegation with clear objectives
- ✅ Business strategy synthesis
- ✅ Cross-functional coordination

**Test Prompts**:
```
Business: AI-powered fitness coaching app
Budget: $1M total, 12 months to launch
Create strategic OKRs and delegate work to CTO, CMO, CFO, COO with specific budget allocation and success metrics.
```

### ⚙️ CTO Agent - Technology Domain Expert
**Focus**: Technology strategy, development planning, infrastructure

```bash
# Comprehensive technology testing
node test-cto.mjs
```

**Expected Capabilities**:
- ✅ Technical architecture design
- ✅ Development roadmap planning
- ✅ Technology stack selection
- ✅ Infrastructure scalability planning
- ✅ Team hiring and cost estimation

**Test Prompts**:
```
Business: Real-time collaboration platform for remote teams
Budget: $300K for technology development
Timeline: 8 months to MVP
Create comprehensive technical strategy with architecture, development plan, and team requirements.
```

### 📈 CMO Agent - Marketing Domain Expert
**Focus**: Brand strategy, customer acquisition, market positioning

```bash
# Comprehensive marketing testing
node test-cmo-focused.mjs
```

**Expected Capabilities**:
- ✅ Brand positioning and differentiation
- ✅ Customer acquisition strategies
- ✅ Digital marketing campaigns
- ✅ Crisis management and brand recovery
- ✅ B2B marketing and sales enablement

**Test Scenarios**:
1. **Brand Positioning**: New market entry with competitive differentiation
2. **Growth Marketing**: Viral growth mechanisms and referral programs
3. **Crisis Management**: Brand recovery after reputation damage
4. **B2B Marketing**: Enterprise sales support and thought leadership

### 💰 CFO Agent - Financial Domain Expert
**Focus**: Financial planning, fundraising, business model optimization

```bash
# Comprehensive financial testing
node test-cfo-focused.mjs
```

**Expected Capabilities**:
- ✅ Financial modeling and projections
- ✅ Fundraising strategy and investor relations
- ✅ Cash flow management and optimization
- ✅ M&A analysis and valuation
- ✅ Crisis financial planning

**Test Scenarios**:
1. **Financial Modeling**: Unit economics and growth projections
2. **Fundraising**: Series A strategy and investor presentations
3. **Crisis Management**: Cash flow crisis and turnaround planning
4. **M&A Analysis**: Due diligence and strategic transactions

### ⚙️ COO Agent - Operations Domain Expert
**Focus**: Operational excellence, team management, process optimization

```bash
# Comprehensive operations testing
node test-coo-focused.mjs
```

**Expected Capabilities**:
- ✅ Operational scaling and standardization
- ✅ Customer experience optimization
- ✅ Crisis operations and business continuity
- ✅ Digital transformation and automation
- ✅ Team management and organizational development

**Test Scenarios**:
1. **Rapid Scaling**: 10x growth operational infrastructure
2. **Customer Experience**: Service quality improvement and recovery
3. **Crisis Management**: Business continuity and emergency response
4. **Digital Transformation**: Process automation and efficiency

## 🤝 Cross-Functional Testing

### Full C-Suite Coordination
```bash
# Test complete C-suite collaboration
node test-csuite.mjs
```

**Validation Points**:
- ✅ Strategic alignment across all functions
- ✅ Budget coordination and resource allocation
- ✅ Timeline synchronization and dependencies
- ✅ Cross-functional task integration
- ✅ Business objective support

### Integration Test Prompt
```
Business: EcoDeliver - Sustainable food delivery platform
Total Budget: $500,000
Timeline: 6 months to launch
Market: 50,000+ potential users, 200+ restaurants

Test each agent's ability to:
1. COS: Create strategic OKRs and coordinate delegation
2. CTO: Plan technology infrastructure and development
3. CMO: Design brand strategy and customer acquisition
4. CFO: Model financials and prepare for fundraising
5. COO: Scale operations and ensure service quality
```

## 📊 Validation Criteria

### Domain Expertise Assessment
Each agent should demonstrate:

**Professional Knowledge**:
- ✅ Industry-standard terminology and practices
- ✅ Realistic timelines and cost estimates
- ✅ Comprehensive understanding of domain challenges
- ✅ Strategic thinking appropriate for C-suite level

**Task Generation Quality**:
- ✅ Actionable tasks with clear deliverables
- ✅ Realistic time estimates and dependencies
- ✅ Proper resource allocation and budget consideration
- ✅ Success criteria and measurement frameworks

**Business Integration**:
- ✅ Alignment with overall business objectives
- ✅ Cross-functional coordination awareness
- ✅ Risk assessment and mitigation strategies
- ✅ Scalability and growth planning

### Response Quality Indicators

**Excellent Response** (90%+ validation score):
- Comprehensive task lists with 10+ actionable items
- Realistic time estimates (weeks/months, not days)
- Budget-conscious planning with ROI considerations
- Cross-functional dependencies clearly identified
- Professional C-suite level strategic thinking

**Good Response** (70-89% validation score):
- Solid domain knowledge with actionable recommendations
- Reasonable time estimates and resource planning
- Some business alignment and strategic considerations
- Basic cross-functional awareness

**Needs Improvement** (<70% validation score):
- Generic or superficial recommendations
- Unrealistic timelines or budget allocations
- Lack of domain-specific expertise
- Poor business alignment or strategic understanding

## 🔧 Troubleshooting

### Common Issues
1. **Agent Not Found Error**
   - Verify agent is registered in `src/mastra/index.ts`
   - Check for import/export syntax errors

2. **Tool Execution Failures**
   - Ensure `taskGenerationTool` is working properly
   - Check for simplified tool imports (not complex dependencies)

3. **Response Cutoffs**
   - Verify tools are ultra-simplified with minimal dependencies
   - Check for circular import issues

4. **Server Connection Issues**
   - Restart Mastra dev server: `npm run dev`
   - Verify server is running at `http://localhost:4111`

### Browser Testing
- Visit `http://localhost:4111` for interactive testing
- Test individual agents in the playground interface
- Validate tool execution and response completeness

## 🎯 Success Metrics

### System Validation Complete When:
- ✅ All 5 agents respond with domain expertise
- ✅ Task generation tools execute without errors
- ✅ Cross-functional coordination demonstrated
- ✅ Professional C-suite level strategic thinking
- ✅ Realistic business planning and execution

### Ready for Production When:
- ✅ Comprehensive testing across all scenarios
- ✅ Consistent high-quality responses (90%+ validation)
- ✅ Stable performance under various business contexts
- ✅ Integration workflows functioning correctly
- ✅ End-to-end business planning scenarios successful

---

## 📞 Next Steps

After successful testing validation:
1. **Hour 4**: Integration workflows and agent coordination
2. **Hour 5**: Advanced business scenario testing
3. **Hour 6**: Production deployment and final optimization

The aiCEO system is designed to provide professional-grade C-suite AI agents capable of handling complex business challenges with strategic expertise and cross-functional coordination. 