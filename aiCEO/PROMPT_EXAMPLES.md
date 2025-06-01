# AI CEO Task Execution - Specific Prompts Guide

This guide provides specific, structured prompts that reliably trigger the correct tools and behaviors in the AI CEO Task Execution System.

## 🎯 **Business Planning Prompts**

### Complete Business Plan Creation
```
Create a comprehensive business plan for "[BUSINESS_IDEA]" including:
- Technology strategy and development roadmap
- Marketing strategy and customer acquisition
- Financial planning and funding strategy  
- Operational processes and team structure
- Generate detailed tasks for each C-suite specialist
- Store all tasks in the database for execution tracking

Business context: [INDUSTRY], [STAGE], [BUDGET_RANGE], [TIMELINE], [LOCATION]
```

**Example:**
```
Create a comprehensive business plan for "AI-powered personal fitness coaching app" including:
- Technology strategy and development roadmap
- Marketing strategy and customer acquisition
- Financial planning and funding strategy
- Operational processes and team structure
- Generate detailed tasks for each C-suite specialist
- Store all tasks in the database for execution tracking

Business context: Mobile health tech, Startup stage, $500K initial budget, 12-month launch timeline, San Francisco Bay Area
```

## 📊 **Task Query Prompts**

### View All Tasks for Business Idea
```
Query all tasks for business idea "[BUSINESS_IDEA]":
- Show task IDs, titles, specialists, priorities, and status
- Include task statistics and completion summary
- Highlight which tasks are ready for execution
- Group tasks by specialist (CTO, CMO, CFO, COO)
```

### Query Tasks by Specialist
```
Query all tasks assigned to [SPECIALIST_NAME] for "[BUSINESS_IDEA]":
- Show only tasks for this specialist
- Include task priorities and current status
- Show estimated hours and dependencies
- Include task statistics for this specialist
```

### Query Ready-to-Execute Tasks
```
Query ready-to-execute tasks for "[BUSINESS_IDEA]":
- Filter only tasks with status "ready"
- Sort by priority (high, medium, low)
- Show task IDs for execution reference
- Include total ready tasks count and estimated hours
```

### Query by Priority Level
```
Query [PRIORITY] priority tasks for "[BUSINESS_IDEA]":
- Filter tasks by priority level: high/medium/low
- Show current status of these priority tasks
- Include specialist assignments
- Show which are ready for execution
```

## ⚡ **Task Execution Prompts**

### Execute Individual Task by ID
```
Execute task with ID "[TASK_ID]" for "[BUSINESS_IDEA]":
- Start execution with appropriate specialist
- Use demo mode (complete immediately)
- Show detailed execution results
- Update task status to completed
- Provide next steps and recommendations
```

### Execute Batch by Business Idea
```
Execute batch tasks for "[BUSINESS_IDEA]":
- Execute up to [NUMBER] tasks
- Prioritize high-priority tasks first
- Use demo mode for immediate completion
- Show execution results for each task
- Provide summary of completed vs remaining tasks
```

### Execute by Specialist
```
Execute all ready tasks for [SPECIALIST_NAME] on "[BUSINESS_IDEA]":
- Filter tasks assigned to this specialist only
- Execute all ready tasks for this specialist
- Use demo mode for immediate completion
- Show specialist-specific execution results
- Update task statuses appropriately
```

### Execute by Priority Level
```
Execute [PRIORITY] priority tasks for "[BUSINESS_IDEA]":
- Filter tasks by priority level: high/medium/low
- Execute up to [NUMBER] tasks of this priority
- Use demo mode for immediate completion
- Show priority-specific execution results
- Provide remaining tasks summary
```

### Execute with Production Mode
```
Execute tasks for "[BUSINESS_IDEA]" in production mode:
- Execute up to [NUMBER] tasks
- Use production mode (mark as in-progress, not completed)
- Show realistic execution start results
- Track progress without auto-completion
- Provide monitoring and next steps guidance
```

## 🔍 **Status Tracking Prompts**

### Complete Status Overview
```
Show complete task status for "[BUSINESS_IDEA]":
- Total tasks created vs completed
- Status breakdown (ready, in_progress, completed, blocked)
- Tasks by specialist with completion rates
- Total estimated hours vs completed hours
- Next recommended actions
```

### Progress Since Last Check
```
Show task progress update for "[BUSINESS_IDEA]":
- Recently completed tasks
- Currently in-progress tasks
- Newly ready tasks
- Completion percentage change
- Recommended next tasks to execute
```

## 🚀 **Complete Workflow Prompts**

### End-to-End Business Execution
```
Execute complete business workflow for "[BUSINESS_IDEA]":

Step 1: Create comprehensive business plan with all C-suite specialists
Step 2: Generate and store detailed tasks in database
Step 3: Query and review all generated tasks
Step 4: Execute top 5 high-priority tasks immediately
Step 5: Show final status and next steps

Business context: [CONTEXT_DETAILS]
Use demo mode for immediate task completion.
```

### Specialist-Focused Execution
```
Execute [SPECIALIST_NAME] workflow for "[BUSINESS_IDEA]":

Step 1: Query all tasks assigned to [SPECIALIST_NAME]
Step 2: Show specialist task summary and priorities
Step 3: Execute all ready tasks for this specialist
Step 4: Show specialist-specific execution results
Step 5: Provide specialist recommendations and next steps

Use demo mode for immediate completion.
```

## 📝 **Specific Examples by Business Type**

### Tech Startup
```
Create and execute business plan for "SaaS project management tool for remote teams":
- Technology: React/Node.js web app with real-time collaboration
- Marketing: Target remote-first companies, developer communities
- Financial: Freemium model, $50K seed funding needed
- Operations: 5-person remote team, 9-month MVP timeline
- Generate detailed tasks and execute top 3 high-priority items
```

### Physical Product
```
Create and execute business plan for "Sustainable bamboo kitchenware line":
- Technology: E-commerce platform, inventory management system
- Marketing: Eco-conscious consumers, social media campaigns
- Financial: $100K startup cost, direct-to-consumer sales model
- Operations: Supply chain setup, manufacturing partnerships
- Generate detailed tasks and execute manufacturing and marketing priorities
```

### Service Business
```
Create and execute business plan for "AI-powered accounting services for small businesses":
- Technology: AI automation tools, client portal development
- Marketing: Small business owners, CPA referral network
- Financial: Service-based revenue, $25K initial investment
- Operations: Remote service delivery, client onboarding process
- Generate detailed tasks and execute client acquisition and technology setup
```

## ⚙️ **Tool-Specific Trigger Phrases**

### For `run-complete-business-planning` tool:
- "Create comprehensive business plan"
- "Execute complete business planning workflow"
- "Generate business plan with all specialists"
- "Run end-to-end business analysis"

### For `query-business-tasks` tool:
- "Query tasks for [business_idea]"
- "Show me the tasks"
- "What tasks were created"
- "Display task status"
- "Get task statistics"

### For `execute-business-task` tool:
- "Execute task ID [task_id]"
- "Start task [task_id]"
- "Run individual task"
- "Execute specific task"

### For `execute-batch-tasks` tool:
- "Execute batch tasks"
- "Run multiple tasks"
- "Execute [number] tasks"
- "Batch execute tasks for [specialist]"
- "Execute [priority] priority tasks"

## 🎬 **Demo Script Prompts**

### Quick Demo (5 minutes)
```
1. "Create comprehensive business plan for 'Smart home energy management system' including technology, marketing, financial, and operational strategies with detailed tasks."

2. "Query all tasks for 'Smart home energy management system' and show task IDs, specialists, priorities, and status."

3. "Execute batch tasks for 'Smart home energy management system' - execute up to 3 high-priority tasks using demo mode."

4. "Show complete task status for 'Smart home energy management system' including completion statistics and next steps."
```

### Detailed Demo (15 minutes)
```
1. "Create comprehensive business plan for 'Vertical farming produce delivery service in urban areas' with detailed context: AgTech industry, startup stage, $200K seed funding, 18-month timeline, targeting major cities."

2. "Query ready-to-execute tasks for 'Vertical farming produce delivery service' sorted by priority and grouped by specialist."

3. "Execute all ready tasks for Chief Technology Officer on 'Vertical farming produce delivery service' using demo mode."

4. "Execute high priority tasks for 'Vertical farming produce delivery service' - maximum 2 tasks, demo mode."

5. "Query all tasks for Chief Marketing Officer on 'Vertical farming produce delivery service'."

6. "Execute batch tasks for Chief Marketing Officer on 'Vertical farming produce delivery service' - up to 2 tasks, demo mode."

7. "Show complete task status for 'Vertical farming produce delivery service' with detailed completion statistics."
```

## 💡 **Best Practices for Prompts**

### 1. Always Include Business Idea Name
- Use exact business idea names in quotes
- Keep business names consistent across prompts
- Include context when creating new business plans

### 2. Specify Execution Mode
- "demo mode" for immediate completion
- "production mode" for realistic in-progress tracking
- Default is demo mode if not specified

### 3. Be Specific About Filtering
- Specify specialist names exactly: "Chief Technology Officer"
- Use exact priority levels: "high", "medium", "low"
- Include task limits: "up to 3 tasks", "maximum 5 tasks"

### 4. Request Detailed Output
- Ask for "detailed results"
- Request "execution summary"
- Ask for "next steps" and "recommendations"

### 5. Use Action-Oriented Language
- "Execute", "Run", "Start", "Show", "Query"
- Be directive rather than asking questions
- Include step-by-step instructions for complex workflows

These specific prompts ensure reliable tool triggering and consistent, high-quality results from the AI CEO Task Execution System. 