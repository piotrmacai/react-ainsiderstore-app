import { Bot, Workflow, Palette, Sparkles, Brain, Zap, Image, Video, FileText, Settings, Cpu, Wand2, Network, Database, Lightbulb } from 'lucide-react';

export type DocCategory = 'ai-agents' | 'automation' | 'creative-ai';
export type DocDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface DocArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  category: DocCategory;
  categoryLabel: string;
  tools: string[];
  difficulty: DocDifficulty;
  readTime: string;
  icon: keyof typeof iconMap;
}

// eslint-disable-next-line react-refresh/only-export-components
export const iconMap = {
  Bot,
  Workflow,
  Palette,
  Sparkles,
  Brain,
  Zap,
  Image,
  Video,
  FileText,
  Settings,
  Cpu,
  Wand2,
  Network,
  Database,
  Lightbulb,
};

export const CATEGORIES = [
  { id: 'ai-agents', label: 'AI Agents', icon: Bot },
  { id: 'automation', label: 'Automation', icon: Workflow },
  { id: 'creative-ai', label: 'Creative AI', icon: Palette },
] as const;

export const TOOLS = [
  'Gemini',
  'Antigravity',
  'Claude Code',
  'n8n',
  'Midjourney',
  'DALL-E',
  'Stable Diffusion',
  'Make',
  'Zapier',
  'LangChain',
  'AutoGPT',
  'Runway',
] as const;


// eslint-disable-next-line react-refresh/only-export-components
export const docsData: DocArticle[] = [
  // AI Agents Category
  {
    id: 'what-are-ai-agents',
    title: 'What are AI Agents?',
    description: 'A comprehensive introduction to autonomous AI systems, their components, and how they differ from traditional chatbots.',
    category: 'ai-agents',
    categoryLabel: 'AI Agents',
    tools: ['Gemini', 'Claude Code', 'Antigravity'],
    difficulty: 'beginner',
    readTime: '8 min',
    icon: 'Bot',
    content: `# What are AI Agents?

AI Agents are autonomous systems that can perceive their environment, make decisions, and take actions to achieve specific goals. Unlike simple chatbots that respond to single queries, agents can:

## Key Characteristics

### 1. Autonomy
Agents operate independently, making decisions without constant human intervention. They can plan multi-step tasks and execute them sequentially.

### 2. Tool Use
Modern agents can use external tools like web browsers, code interpreters, APIs, and databases to accomplish tasks.

### 3. Memory
Agents maintain context across interactions, remembering past conversations and learning from outcomes.

### 4. Goal-Oriented Behavior
Rather than just responding to queries, agents work toward achieving specific objectives.

## Types of AI Agents

| Type | Description | Example Use Case |
|------|-------------|------------------|
| **Reactive** | Respond to current input only | Simple chatbots |
| **Deliberative** | Plan and reason about actions | Research assistants |
| **Hybrid** | Combine reactive and deliberative | Coding assistants |

## Building Blocks

\`\`\`
┌─────────────────────────────────────────┐
│              AI Agent Core              │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │  LLM    │  │ Memory  │  │ Tools   │  │
│  │ (Brain) │  │ (State) │  │ (Actions)│  │
│  └─────────┘  └─────────┘  └─────────┘  │
├─────────────────────────────────────────┤
│           Orchestration Layer           │
└─────────────────────────────────────────┘
\`\`\`

## Getting Started

To build your first agent, you'll need:
1. An LLM provider (Gemini, Claude, GPT-4)
2. A framework (Antigravity, LangChain)
3. Tools for the agent to use

> **Next Steps**: Check out "Building Your First Agent" for a hands-on tutorial.
`,
  },
  {
    id: 'building-first-agent',
    title: 'Building Your First Agent',
    description: 'Step-by-step guide to creating an autonomous AI agent using Gemini and Antigravity framework.',
    category: 'ai-agents',
    categoryLabel: 'AI Agents',
    tools: ['Gemini', 'Antigravity', 'Claude Code'],
    difficulty: 'intermediate',
    readTime: '15 min',
    icon: 'Cpu',
    content: `# Building Your First Agent

This tutorial walks you through creating a functional AI agent that can research topics and summarize findings.

## Prerequisites

- Node.js 18+ or Python 3.10+
- API key for Gemini or Claude
- Basic understanding of async programming

## Step 1: Set Up Your Environment

\`\`\`bash
# Create project directory
mkdir my-first-agent
cd my-first-agent

# Initialize project
npm init -y
npm install @anthropic-ai/sdk dotenv
\`\`\`

## Step 2: Define Your Agent's Tools

\`\`\`typescript
const tools = [
  {
    name: 'web_search',
    description: 'Search the web for information',
    parameters: {
      query: { type: 'string', description: 'Search query' }
    }
  },
  {
    name: 'read_url',
    description: 'Read content from a URL',
    parameters: {
      url: { type: 'string', description: 'URL to read' }
    }
  }
];
\`\`\`

## Step 3: Create the Agent Loop

\`\`\`typescript
async function runAgent(task: string) {
  const messages = [{ role: 'user', content: task }];
  
  while (true) {
    const response = await llm.chat({
      messages,
      tools,
      system: 'You are a research assistant...'
    });
    
    if (response.stop_reason === 'end_turn') {
      return response.content;
    }
    
    // Execute tool calls
    for (const toolCall of response.tool_calls) {
      const result = await executeTool(toolCall);
      messages.push({ role: 'tool', content: result });
    }
  }
}
\`\`\`

## Step 4: Run Your Agent

\`\`\`typescript
const result = await runAgent(
  'Research the latest developments in AI agents and summarize the top 3 trends'
);
console.log(result);
\`\`\`

## Best Practices

1. **Limit iterations** - Set a maximum loop count to prevent infinite loops
2. **Log everything** - Track tool calls for debugging
3. **Handle errors gracefully** - Agents should recover from failed tool calls
4. **Use structured outputs** - JSON mode helps parse agent responses

## Common Pitfalls

> ⚠️ **Warning**: Agents can get stuck in loops. Always implement a maximum iteration count.

> 💡 **Tip**: Start with simple tasks before adding complex tool chains.
`,
  },
  {
    id: 'agent-frameworks-comparison',
    title: 'Agent Frameworks Comparison',
    description: 'In-depth comparison of popular AI agent frameworks: Antigravity, LangChain, AutoGPT, and CrewAI.',
    category: 'ai-agents',
    categoryLabel: 'AI Agents',
    tools: ['Antigravity', 'LangChain', 'AutoGPT'],
    difficulty: 'intermediate',
    readTime: '12 min',
    icon: 'Network',
    content: `# Agent Frameworks Comparison

Choosing the right framework is crucial for your AI agent project. Here's a detailed comparison.

## Framework Overview

| Framework | Language | Best For | Learning Curve |
|-----------|----------|----------|----------------|
| **Antigravity** | TypeScript | IDE integration | Medium |
| **LangChain** | Python/TS | Flexibility | High |
| **AutoGPT** | Python | Autonomous tasks | Low |
| **CrewAI** | Python | Multi-agent | Medium |

## Antigravity

**Best for**: Coding assistants and IDE-integrated agents

\`\`\`typescript
// Antigravity example
const agent = new AntigravityAgent({
  tools: [readFile, writeFile, runCommand],
  model: 'gemini-2.0-flash'
});

await agent.run('Refactor the auth module');
\`\`\`

**Pros:**
- Deep IDE integration
- Built-in file system tools
- Excellent for coding tasks

**Cons:**
- Primarily for development workflows
- Newer ecosystem

## LangChain

**Best for**: Complex chains and custom workflows

\`\`\`python
# LangChain example
from langchain.agents import create_react_agent

agent = create_react_agent(
    llm=ChatOpenAI(),
    tools=[search, calculator],
    prompt=prompt_template
)
\`\`\`

**Pros:**
- Highly flexible
- Large community
- Many integrations

**Cons:**
- Steep learning curve
- Can be over-engineered

## AutoGPT

**Best for**: Fully autonomous, goal-driven tasks

**Pros:**
- Highly autonomous
- Goal decomposition
- Memory systems

**Cons:**
- Can be unpredictable
- Higher token costs

## Recommendation Matrix

| Use Case | Recommended Framework |
|----------|----------------------|
| Coding assistant | Antigravity |
| Research agent | LangChain |
| Autonomous tasks | AutoGPT |
| Team of agents | CrewAI |
`,
  },
  {
    id: 'multi-agent-systems',
    title: 'Multi-Agent Systems',
    description: 'Learn how to coordinate multiple AI agents working together on complex tasks.',
    category: 'ai-agents',
    categoryLabel: 'AI Agents',
    tools: ['Antigravity', 'LangChain'],
    difficulty: 'advanced',
    readTime: '18 min',
    icon: 'Network',
    content: `# Multi-Agent Systems

When a single agent isn't enough, multiple specialized agents can work together.

## Architecture Patterns

### 1. Hierarchical

\`\`\`
        ┌─────────────┐
        │  Manager    │
        │   Agent     │
        └──────┬──────┘
               │
    ┌──────────┼──────────┐
    │          │          │
┌───▼───┐  ┌───▼───┐  ┌───▼───┐
│Research│  │Writer │  │Review │
│ Agent  │  │ Agent │  │ Agent │
└────────┘  └───────┘  └───────┘
\`\`\`

### 2. Peer-to-Peer

Agents communicate directly with each other based on their capabilities.

### 3. Blackboard

Agents share a common workspace where they read/write information.

## Implementation Example

\`\`\`typescript
class MultiAgentSystem {
  private agents: Map<string, Agent> = new Map();
  
  registerAgent(name: string, agent: Agent) {
    this.agents.set(name, agent);
  }
  
  async runTask(task: string) {
    // Manager decomposes task
    const subtasks = await this.manager.decompose(task);
    
    // Assign to specialized agents
    const results = await Promise.all(
      subtasks.map(st => this.routeToAgent(st))
    );
    
    // Synthesize results
    return this.manager.synthesize(results);
  }
}
\`\`\`

## Communication Protocols

| Protocol | Use Case | Complexity |
|----------|----------|------------|
| Message Queue | Async tasks | Medium |
| Direct Call | Sync operations | Low |
| Shared State | Collaborative | High |

## Best Practices

1. **Clear responsibilities** - Each agent should have a focused role
2. **Defined interfaces** - Standardize how agents communicate
3. **Error isolation** - One failing agent shouldn't crash the system
4. **Observability** - Log all inter-agent communications
`,
  },
  {
    id: 'agent-memory-context',
    title: 'Agent Memory & Context',
    description: 'Understanding and implementing persistent memory and context management for AI agents.',
    category: 'ai-agents',
    categoryLabel: 'AI Agents',
    tools: ['Gemini', 'Claude Code', 'Antigravity'],
    difficulty: 'advanced',
    readTime: '14 min',
    icon: 'Database',
    content: `# Agent Memory & Context Management

Effective memory is what separates simple chatbots from powerful agents.

## Types of Memory

### 1. Short-term (Working Memory)
Current conversation context, typically the message history.

### 2. Long-term (Episodic Memory)
Past interactions, decisions, and outcomes stored persistently.

### 3. Semantic Memory
Facts, knowledge, and learned information.

## Implementation Strategies

### Vector Database Approach

\`\`\`typescript
import { VectorStore } from './vector-store';

class AgentMemory {
  private vectors: VectorStore;
  
  async remember(content: string, metadata: object) {
    const embedding = await embedText(content);
    await this.vectors.upsert({
      id: generateId(),
      values: embedding,
      metadata: { ...metadata, timestamp: Date.now() }
    });
  }
  
  async recall(query: string, limit = 5) {
    const embedding = await embedText(query);
    return this.vectors.query({
      values: embedding,
      topK: limit
    });
  }
}
\`\`\`

### Structured State Management

\`\`\`typescript
interface AgentState {
  currentTask: string | null;
  completedTasks: Task[];
  learnedFacts: Map<string, string>;
  userPreferences: UserPrefs;
}

const stateManager = {
  save: (state: AgentState) => redis.set('agent:state', JSON.stringify(state)),
  load: () => JSON.parse(redis.get('agent:state'))
};
\`\`\`

## Context Window Management

| Strategy | Pros | Cons |
|----------|------|------|
| Rolling window | Simple | Loses old context |
| Summarization | Compact | Loses details |
| RAG retrieval | Relevant | Latency |

## Memory Architecture

\`\`\`
┌────────────────────────────────────────┐
│            Agent Core                  │
├────────────────────────────────────────┤
│  ┌──────────┐    ┌──────────────────┐  │
│  │ Working  │◄──►│ Memory Manager   │  │
│  │ Memory   │    └────────┬─────────┘  │
│  └──────────┘             │            │
│                           ▼            │
│            ┌──────────────────────┐    │
│            │   Vector Database    │    │
│            │  (Long-term Memory)  │    │
│            └──────────────────────┘    │
└────────────────────────────────────────┘
\`\`\`

## Best Practices

> 💡 **Tip**: Implement memory pruning to remove outdated or irrelevant memories.

> ⚠️ **Warning**: Be careful with PII in long-term memory storage.
`,
  },

  // Automation Category
  {
    id: 'business-automation-basics',
    title: 'Business Process Automation Basics',
    description: 'Introduction to automating business workflows with AI and no-code tools.',
    category: 'automation',
    categoryLabel: 'Automation',
    tools: ['n8n', 'Make', 'Zapier'],
    difficulty: 'beginner',
    readTime: '10 min',
    icon: 'Workflow',
    content: `# Business Process Automation Basics

Learn how to automate repetitive business tasks and free up time for high-value work.

## What is Business Process Automation?

BPA uses technology to execute recurring tasks or processes where manual effort can be replaced. Modern BPA often incorporates AI for intelligent decision-making.

## Common Automation Use Cases

| Process | Manual Time | Automated Time | Savings |
|---------|-------------|----------------|---------|
| Invoice processing | 15 min | 30 sec | 97% |
| Email triage | 2 hrs/day | 10 min | 92% |
| Data entry | 4 hrs/day | 15 min | 94% |
| Report generation | 3 hrs | 5 min | 97% |

## Automation Platforms Comparison

### n8n
- **Type**: Open-source, self-hostable
- **Best for**: Technical teams, complex workflows
- **Pricing**: Free (self-hosted) or cloud plans

### Make (formerly Integromat)
- **Type**: Cloud-based, visual
- **Best for**: Medium complexity workflows
- **Pricing**: Free tier + paid plans

### Zapier
- **Type**: Cloud-based, simple
- **Best for**: Quick integrations, non-technical users
- **Pricing**: Premium-focused

## Building Your First Automation

\`\`\`
Trigger: New form submission
    │
    ▼
Action 1: Extract data with AI
    │
    ▼
Action 2: Create CRM record
    │
    ▼
Action 3: Send confirmation email
    │
    ▼
Action 4: Notify team in Slack
\`\`\`

## ROI Calculation

\`\`\`
Time saved per task × Tasks per day × Working days per year × Hourly rate
= Annual savings

Example:
10 min × 20 tasks × 250 days × $50/hr = $41,667/year
\`\`\`

## Getting Started Checklist

- [ ] Identify repetitive processes
- [ ] Document current workflow steps
- [ ] Choose appropriate platform
- [ ] Start with simple automations
- [ ] Monitor and optimize
`,
  },
  {
    id: 'n8n-ai-workflows',
    title: 'n8n Workflows for AI',
    description: 'Building powerful AI-integrated workflows with n8n automation platform.',
    category: 'automation',
    categoryLabel: 'Automation',
    tools: ['n8n', 'Gemini', 'Claude Code'],
    difficulty: 'intermediate',
    readTime: '16 min',
    icon: 'Zap',
    content: `# n8n Workflows for AI

n8n is a powerful open-source automation platform that integrates seamlessly with AI services.

## Why n8n for AI Workflows?

- **Self-hostable**: Keep your data private
- **Extensible**: Custom nodes for any API
- **Visual**: Build complex flows visually
- **AI-native**: Built-in AI nodes

## Setting Up n8n

\`\`\`bash
# Docker installation
docker run -it --rm \\
  --name n8n \\
  -p 5678:5678 \\
  -v n8n_data:/home/node/.n8n \\
  n8nio/n8n
\`\`\`

## AI Nodes Available

| Node | Purpose |
|------|---------|
| OpenAI | GPT models, embeddings |
| Google Gemini | Gemini Pro/Flash |
| Anthropic | Claude models |
| AI Agent | Autonomous agents |
| Vector Store | RAG workflows |

## Example: AI-Powered Email Responder

\`\`\`json
{
  "workflow": {
    "nodes": [
      {
        "name": "Email Trigger",
        "type": "Gmail Trigger"
      },
      {
        "name": "Classify Email",
        "type": "Gemini",
        "prompt": "Classify this email: {{$json.body}}"
      },
      {
        "name": "Generate Response",
        "type": "Gemini",
        "prompt": "Draft a response to: {{$json.body}}"
      },
      {
        "name": "Send Reply",
        "type": "Gmail"
      }
    ]
  }
}
\`\`\`

## Building a RAG Pipeline

\`\`\`
Document Upload
    │
    ▼
Split into Chunks
    │
    ▼
Generate Embeddings (OpenAI/Gemini)
    │
    ▼
Store in Pinecone/Qdrant
    │
    ▼
Query Similar Chunks
    │
    ▼
Generate Answer with Context
\`\`\`

## Best Practices

1. **Error handling**: Add error workflows for AI failures
2. **Rate limiting**: Respect API limits
3. **Logging**: Track all AI calls for debugging
4. **Cost monitoring**: Set up billing alerts

## Advanced: Custom AI Agent Node

\`\`\`javascript
// Custom n8n node for AI agents
class AIAgentNode {
  async execute() {
    const tools = this.getInputData('tools');
    const task = this.getNodeParameter('task');
    
    const agent = new Agent({ tools });
    const result = await agent.run(task);
    
    return [{ json: { result } }];
  }
}
\`\`\`
`,
  },
  {
    id: 'zapier-ai-integration',
    title: 'Zapier + AI Integration',
    description: 'Creating no-code AI automations with Zapier for business workflows.',
    category: 'automation',
    categoryLabel: 'Automation',
    tools: ['Zapier', 'Gemini'],
    difficulty: 'beginner',
    readTime: '10 min',
    icon: 'Zap',
    content: `# Zapier + AI Integration

Zapier makes it easy to add AI capabilities to your workflows without code.

## Zapier's AI Features

### 1. AI by Zapier
Built-in GPT integration for text processing.

### 2. Code by Zapier
Custom Python/JavaScript with AI libraries.

### 3. Direct AI App Connections
OpenAI, Anthropic, Google AI integrations.

## Quick Automations

### Lead Qualification

\`\`\`
New Form Submission (Typeform)
    │
    ▼
AI by Zapier: Analyze lead quality
    │
    ├── High Quality → Add to Salesforce + Notify Sales
    │
    └── Low Quality → Add to Nurture Campaign
\`\`\`

### Content Repurposing

\`\`\`
New Blog Post (WordPress)
    │
    ▼
AI: Generate social posts
    │
    ├── Twitter post → Buffer
    ├── LinkedIn post → Buffer
    └── Newsletter blurb → Mailchimp
\`\`\`

## Setting Up AI by Zapier

1. Add "AI by Zapier" action
2. Choose operation (Generate Text, Classify, etc.)
3. Write your prompt with dynamic fields
4. Map output to next steps

## Example Prompts

**Lead Scoring:**
\`\`\`
Score this lead 1-10 based on company size, 
role, and stated interest:
Company: {{company}}
Role: {{role}}
Interest: {{message}}
Return only the number.
\`\`\`

**Email Summarization:**
\`\`\`
Summarize this email in one sentence.
Extract: action items, deadlines, key people.
Email: {{body}}
\`\`\`

## Pricing Considerations

| Plan | AI Tasks/Month | Cost |
|------|---------------|------|
| Free | 100 | $0 |
| Starter | 750 | $19.99 |
| Professional | 2,000 | $49 |
| Team | 50,000 | $69+ |

## Tips for Zapier AI

> 💡 Use specific prompts for better results

> ⚠️ Watch your task usage - AI steps count double
`,
  },
  {
    id: 'make-ai-scenarios',
    title: 'Make.com AI Scenarios',
    description: 'Building visual AI workflows with Make (formerly Integromat).',
    category: 'automation',
    categoryLabel: 'Automation',
    tools: ['Make', 'Gemini'],
    difficulty: 'intermediate',
    readTime: '12 min',
    icon: 'Settings',
    content: `# Make.com AI Scenarios

Make.com offers powerful visual automation with excellent AI integrations.

## Why Make for AI Workflows?

- **Visual data mapping**: See exactly how data flows
- **Complex logic**: Advanced branching and iteration
- **Error handling**: Built-in retry and rollback
- **App ecosystem**: 1,500+ integrations

## AI Modules in Make

| Module | Features |
|--------|----------|
| OpenAI | Chat, DALL-E, Whisper |
| Google AI | Gemini, Imagen |
| Anthropic | Claude models |
| HTTP + Webhook | Any AI API |

## Scenario: AI Document Processor

\`\`\`
┌─────────────┐
│ Google Drive│
│   Watcher   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   OCR +     │
│   Extract   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Gemini    │
│  Classify   │
└──────┬──────┘
       │
       ▼
┌─────────────┐    ┌─────────────┐
│   Notion    │    │   Slack     │
│   Database  │    │  Notify     │
└─────────────┘    └─────────────┘
\`\`\`

## Building the Scenario

### Step 1: Set Up Trigger

Watch a Google Drive folder for new documents.

### Step 2: Process with AI

\`\`\`json
{
  "module": "Google Gemini",
  "action": "Generate Content",
  "prompt": "Extract invoice data from this text: {{text}}. Return JSON with: vendor, amount, date, items[]"
}
\`\`\`

### Step 3: Route by Type

Use Router module to handle different document types.

### Step 4: Store Results

Create structured records in Notion or Airtable.

## Operations vs Tokens

Make charges by **operations**, but AI calls may use many tokens.

| Operation | Token Usage | Cost Impact |
|-----------|-------------|-------------|
| Simple prompt | 100-500 | Low |
| Document analysis | 1,000-5,000 | Medium |
| Image generation | N/A | High |

## Advanced: Custom AI Module

\`\`\`javascript
// Make custom app for AI
{
  "name": "my-ai-api",
  "connection": {
    "type": "apiKey",
    "apiKeyPlacement": "header"
  },
  "modules": [{
    "name": "analyze",
    "url": "/analyze",
    "method": "POST"
  }]
}
\`\`\`
`,
  },
  {
    id: 'document-processing-automation',
    title: 'Document Processing Automation',
    description: 'Automating document workflows: OCR, extraction, classification, and routing.',
    category: 'automation',
    categoryLabel: 'Automation',
    tools: ['n8n', 'Make', 'Gemini'],
    difficulty: 'intermediate',
    readTime: '14 min',
    icon: 'FileText',
    content: `# Document Processing Automation

Transform your document workflows with AI-powered extraction and classification.

## Document Processing Pipeline

\`\`\`
┌─────────────────────────────────────────────────────┐
│                Document Ingestion                    │
├─────────────────────────────────────────────────────┤
│  Email → Scan → Upload → API → Watch Folder         │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│               Pre-processing                         │
├─────────────────────────────────────────────────────┤
│  OCR → Text Extraction → Image Enhancement          │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│              AI Analysis                             │
├─────────────────────────────────────────────────────┤
│  Classification → Entity Extraction → Validation    │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│              Output & Storage                        │
├─────────────────────────────────────────────────────┤
│  Database → File System → API → Notification        │
└─────────────────────────────────────────────────────┘
\`\`\`

## Document Types & Solutions

| Document | Key Fields | AI Approach |
|----------|------------|-------------|
| Invoice | vendor, amount, items | Structured extraction |
| Contract | parties, terms, dates | NER + summarization |
| Receipt | merchant, total, date | OCR + extraction |
| Resume | name, skills, experience | Classification + NER |

## AI Extraction Prompt

\`\`\`
Extract the following from this invoice:
- Vendor name
- Invoice number
- Date
- Due date
- Line items (description, quantity, unit price)
- Subtotal
- Tax
- Total

Return as valid JSON.

Document text:
{{document_text}}
\`\`\`

## Classification System

\`\`\`typescript
const documentTypes = [
  'invoice',
  'contract', 
  'receipt',
  'report',
  'correspondence'
];

async function classifyDocument(text: string) {
  const response = await gemini.generate({
    prompt: \`Classify this document into one of: 
    \${documentTypes.join(', ')}
    
    Document: \${text}
    
    Return only the category name.\`
  });
  
  return response.text.trim().toLowerCase();
}
\`\`\`

## Validation Layer

Always validate AI extractions:

\`\`\`typescript
function validateInvoice(data: InvoiceData) {
  const errors = [];
  
  if (!data.vendor) errors.push('Missing vendor');
  if (!data.total || data.total <= 0) errors.push('Invalid total');
  if (!isValidDate(data.date)) errors.push('Invalid date');
  
  // Verify calculations
  const calculatedTotal = data.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice, 0
  );
  
  if (Math.abs(calculatedTotal - data.subtotal) > 0.01) {
    errors.push('Line items don\\'t match subtotal');
  }
  
  return { valid: errors.length === 0, errors };
}
\`\`\`

## Best Practices

> 💡 Always implement human-in-the-loop for high-value documents

> ⚠️ Store original documents alongside extracted data
`,
  },

  // Creative AI Category
  {
    id: 'image-generation-fundamentals',
    title: 'Image Generation Fundamentals',
    description: 'Understanding how diffusion models work and the basics of AI image generation.',
    category: 'creative-ai',
    categoryLabel: 'Creative AI',
    tools: ['Midjourney', 'DALL-E', 'Stable Diffusion'],
    difficulty: 'beginner',
    readTime: '12 min',
    icon: 'Image',
    content: `# Image Generation Fundamentals

Learn how modern AI creates images from text descriptions.

## How Diffusion Models Work

\`\`\`
Text Prompt
    │
    ▼
┌─────────────┐
│   CLIP      │ → Text understanding
│   Encoder   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    UNet     │ → Noise prediction
│  Denoiser   │  (iterative)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    VAE      │ → Image decoder
│   Decoder   │
└──────┬──────┘
       │
       ▼
    Image
\`\`\`

## Key Concepts

### 1. Text Encoding
The model converts your prompt into numerical representations (embeddings) that capture meaning.

### 2. Diffusion Process
Starting from random noise, the model progressively removes noise to reveal an image matching your prompt.

### 3. Guidance Scale
Controls how closely the output matches your prompt vs. creative freedom.

| Guidance | Effect |
|----------|--------|
| Low (1-5) | More creative, may ignore prompt |
| Medium (7-10) | Balanced |
| High (15+) | Strict adherence, may reduce quality |

## Popular Models Comparison

| Model | Strengths | Best For |
|-------|-----------|----------|
| Midjourney | Artistic, aesthetic | Art, illustrations |
| DALL-E 3 | Prompt following | Specific scenes |
| Stable Diffusion | Customizable | Technical control |
| Imagen | Photorealism | Product photos |

## Image Sizes

Standard outputs:
- **1024×1024**: Square (default for most)
- **1792×1024**: Landscape
- **1024×1792**: Portrait
- **512×512**: Fast previews

## Quality Settings

\`\`\`
Steps: 20-50 (more = higher quality, slower)
CFG Scale: 7-12 (prompt adherence)
Sampler: DPM++ 2M Karras (balanced)
\`\`\`

## Getting Started

1. **Start simple**: Describe what you want clearly
2. **Add details**: Style, lighting, mood
3. **Iterate**: Refine based on results
4. **Use references**: Art styles, artists, techniques

> 💡 The best prompts are specific but not overly constrained
`,
  },
  {
    id: 'prompt-engineering-images',
    title: 'Prompt Engineering for Images',
    description: 'Master the art of writing effective prompts for Midjourney, DALL-E, and Stable Diffusion.',
    category: 'creative-ai',
    categoryLabel: 'Creative AI',
    tools: ['Midjourney', 'DALL-E', 'Stable Diffusion'],
    difficulty: 'intermediate',
    readTime: '15 min',
    icon: 'Wand2',
    content: `# Prompt Engineering for Images

Learn to write prompts that produce stunning, consistent results.

## Prompt Structure

\`\`\`
[Subject] + [Style] + [Details] + [Technical] + [Modifiers]
\`\`\`

### Example Breakdown

**Prompt:**
> A majestic lion, digital art, golden hour lighting, 8K resolution, trending on ArtStation, by Greg Rutkowski

| Component | Example |
|-----------|---------|
| Subject | A majestic lion |
| Style | digital art |
| Details | golden hour lighting |
| Technical | 8K resolution |
| Modifiers | trending on ArtStation, by Greg Rutkowski |

## Style Keywords

### Art Styles
\`\`\`
photorealistic, hyperrealistic, oil painting, watercolor,
sketch, anime, cartoon, 3D render, isometric, low poly,
pixel art, vector art, concept art, matte painting
\`\`\`

### Lighting
\`\`\`
golden hour, blue hour, studio lighting, dramatic lighting,
rim lighting, volumetric lighting, ambient occlusion,
cinematic lighting, natural lighting, neon lighting
\`\`\`

### Mood/Atmosphere
\`\`\`
ethereal, moody, dark, vibrant, dreamy, mysterious,
dramatic, peaceful, energetic, nostalgic, futuristic
\`\`\`

## Platform-Specific Tips

### Midjourney

\`\`\`
/imagine prompt: cyberpunk city at night, neon lights, 
rain-soaked streets, blade runner style --ar 16:9 --v 6.0 --q 2
\`\`\`

**Parameters:**
- \`--ar\`: Aspect ratio
- \`--v\`: Version
- \`--q\`: Quality
- \`--s\`: Stylize (creativity)

### DALL-E 3

DALL-E 3 understands natural language better:

\`\`\`
Create a cozy coffee shop interior with warm lighting,
exposed brick walls, plants on wooden shelves, and
customers reading books. Style: architectural illustration.
\`\`\`

### Stable Diffusion

\`\`\`
masterpiece, best quality, ultra detailed,
fantasy castle on floating island, dramatic clouds,
volumetric lighting, 8k uhd, dslr
Negative: blurry, low quality, bad anatomy
\`\`\`

## Negative Prompts

Exclude unwanted elements:

\`\`\`
Negative prompt: blurry, low quality, watermark, text,
bad anatomy, extra limbs, deformed, cropped, out of frame
\`\`\`

## Consistency Techniques

### Seed Control
Use the same seed for variations:
\`\`\`
--seed 12345 (Midjourney)
\`\`\`

### Style Reference
\`\`\`
/imagine prompt: portrait of a woman --sref [image_url]
\`\`\`

### Character Reference
\`\`\`
/imagine prompt: same character in different pose --cref [image_url]
\`\`\`

## Common Mistakes

> ❌ Too vague: "a beautiful scene"
> ✅ Specific: "a serene lake at sunset with mountains, oil painting style"

> ❌ Contradicting: "minimalist, highly detailed, cluttered"
> ✅ Coherent: "minimalist interior, clean lines, soft lighting"
`,
  },
  {
    id: 'gemini-imagen-guide',
    title: 'Gemini Imagen Guide',
    description: 'Complete guide to Google\'s image generation with Gemini and Imagen.',
    category: 'creative-ai',
    categoryLabel: 'Creative AI',
    tools: ['Gemini'],
    difficulty: 'intermediate',
    readTime: '12 min',
    icon: 'Sparkles',
    content: `# Gemini Imagen Guide

Google's Imagen, accessible through Gemini, offers powerful image generation.

## Accessing Imagen

### Via Gemini API

\`\`\`typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateImage(prompt: string) {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash-exp-image-generation' 
  });
  
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ['image', 'text']
    }
  });
  
  return result.response;
}
\`\`\`

### Via Vertex AI

\`\`\`python
from vertexai.preview.vision_models import ImageGenerationModel

model = ImageGenerationModel.from_pretrained("imagen-3.0-fast-generate-001")

images = model.generate_images(
    prompt="A futuristic cityscape at sunset",
    number_of_images=4,
    aspect_ratio="16:9",
    safety_filter_level="block_some"
)
\`\`\`

## Imagen Capabilities

| Feature | Imagen 3 | Imagen 2 |
|---------|----------|----------|
| Resolution | Up to 1536x1536 | 1024x1024 |
| Styles | All | Most |
| Text in images | Excellent | Good |
| Faces | High quality | Restricted |

## Best Prompts for Imagen

Imagen excels with:
- Photorealistic scenes
- Product photography
- Text in images
- Specific compositions

\`\`\`
Prompt: "A professional product photo of a modern smartwatch 
on a marble surface, soft studio lighting, high-end advertising style"
\`\`\`

## Editing Capabilities

### Inpainting

\`\`\`python
result = model.edit_image(
    prompt="Replace the sky with a dramatic sunset",
    base_image=original_image,
    mask=mask_image  # Mask indicating area to edit
)
\`\`\`

### Outpainting

Extend images beyond their original boundaries.

### Style Transfer

Apply artistic styles while preserving content.

## Safety Filters

Imagen has strict safety policies:

| Level | Description |
|-------|-------------|
| block_few | Least strict |
| block_some | Balanced (default) |
| block_most | Most strict |

## Pricing

| Model | Cost per Image |
|-------|---------------|
| Imagen 3 Fast | $0.02 |
| Imagen 3 Quality | $0.04 |
| Imagen 2 | $0.01 |

## Integration Example

\`\`\`typescript
// Generate product images for e-commerce
async function generateProductShots(productName: string) {
  const angles = ['front view', 'side view', '45-degree angle'];
  
  const images = await Promise.all(
    angles.map(angle => generateImage(
      \`Professional product photo of \${productName}, 
      \${angle}, white background, studio lighting\`
    ))
  );
  
  return images;
}
\`\`\`
`,
  },
  {
    id: 'video-generation-ai',
    title: 'Video Generation with AI',
    description: 'Creating videos with AI: Sora, Runway, Pika, and emerging tools.',
    category: 'creative-ai',
    categoryLabel: 'Creative AI',
    tools: ['Runway'],
    difficulty: 'advanced',
    readTime: '14 min',
    icon: 'Video',
    content: `# Video Generation with AI

The next frontier: generating videos from text and images.

## Current Landscape

| Tool | Access | Max Duration | Best For |
|------|--------|--------------|----------|
| Sora | Limited | 60s | Cinematic |
| Runway Gen-3 | Public | 10s | Motion |
| Pika Labs | Public | 4s | Quick clips |
| Kling | Public | 5s | Realistic |

## How Video Diffusion Works

\`\`\`
┌─────────────────────────────────────────────┐
│          Temporal Diffusion Model           │
├─────────────────────────────────────────────┤
│                                              │
│  Frame 1 ──► Frame 2 ──► Frame 3 ──► ...    │
│     ▲           ▲           ▲                │
│     │           │           │                │
│  Prompt ────────┴───────────┘                │
│                                              │
│  + Temporal consistency constraints          │
│  + Motion dynamics                           │
└─────────────────────────────────────────────┘
\`\`\`

## Runway Gen-3 Alpha

### Text-to-Video

\`\`\`
Prompt: "A drone shot flying over a misty forest 
at sunrise, cinematic, 4K"

Settings:
- Duration: 10 seconds
- Aspect: 16:9
- Motion: Medium
\`\`\`

### Image-to-Video

Start with an image and add motion:

\`\`\`
Input: [uploaded image]
Motion prompt: "camera slowly zooms in, subtle movement"
\`\`\`

## Best Practices

### Prompt Structure

\`\`\`
[Camera movement] + [Subject action] + [Setting] + [Style]
\`\`\`

**Examples:**

> "Tracking shot following a runner through city streets at night, neon lights reflecting on wet pavement, cyberpunk aesthetic"

> "Slow zoom out from a single flower to reveal an entire garden, golden hour, dreamy soft focus"

### Camera Movements

| Term | Effect |
|------|--------|
| Push in | Zoom forward |
| Pull out | Zoom backward |
| Tracking | Follow subject |
| Pan | Horizontal sweep |
| Tilt | Vertical sweep |
| Crane shot | Vertical movement |

## Limitations

Current AI video generation struggles with:

- **Physics**: Objects may defy gravity
- **Consistency**: Characters may change
- **Hands/faces**: Often distorted
- **Text**: Usually illegible
- **Duration**: Limited to seconds

## Workflow Integration

\`\`\`
Storyboard
    │
    ▼
Generate Key Frames (Image AI)
    │
    ▼
Animate Segments (Video AI)
    │
    ▼
Edit & Composite (Traditional tools)
    │
    ▼
Final Video
\`\`\`

## Future Directions

- Longer generations (minutes, not seconds)
- Better physics understanding
- Character consistency
- Audio generation
- Interactive video
`,
  },
  {
    id: 'ai-design-workflows',
    title: 'AI-Assisted Design Workflows',
    description: 'Integrating AI tools into professional design processes.',
    category: 'creative-ai',
    categoryLabel: 'Creative AI',
    tools: ['Midjourney', 'DALL-E', 'Stable Diffusion', 'Gemini'],
    difficulty: 'intermediate',
    readTime: '13 min',
    icon: 'Palette',
    content: `# AI-Assisted Design Workflows

Integrate AI into your design process for faster, more creative output.

## The Modern Design Stack

\`\`\`
┌─────────────────────────────────────────────────┐
│                 Design Process                   │
├─────────────────────────────────────────────────┤
│                                                  │
│  Ideation ──► Generation ──► Refinement ──► Final │
│     │            │              │              │  │
│     ▼            ▼              ▼              ▼  │
│  ChatGPT    Midjourney      Photoshop      Figma │
│  Gemini     DALL-E          Illustrator    Code  │
│             Stable Diff     Canva                │
│                                                  │
└─────────────────────────────────────────────────┘
\`\`\`

## Workflow 1: Brand Identity

### Step 1: Concept Generation

\`\`\`
Prompt to Gemini:
"Generate 5 brand identity concepts for a sustainable 
fashion startup. Include: name ideas, color palette 
suggestions, and logo direction."
\`\`\`

### Step 2: Visual Exploration

\`\`\`
Midjourney prompt:
"minimalist logo, sustainable fashion brand, 
leaf motif, earth tones, vector style --v 6.0"
\`\`\`

### Step 3: Refinement

Take AI outputs into Illustrator for vectorization and refinement.

## Workflow 2: UI/UX Design

### Wireframe Generation

\`\`\`
Prompt: "Generate a wireframe for a mobile app 
home screen for a fitness tracking app, clean 
modern design, showing: daily stats, activity 
rings, quick action buttons"
\`\`\`

### Component Variants

Use AI to generate multiple versions:

\`\`\`
"Create 4 variations of a call-to-action button:
1. Primary, rounded
2. Secondary, outlined
3. Ghost, text only
4. Icon with text"
\`\`\`

## Workflow 3: Content Creation

### Social Media Assets

\`\`\`
Batch generation workflow:
1. Define templates (sizes, brand elements)
2. Generate base images with AI
3. Apply brand overlays in Canva/Photoshop
4. Export for multi-platform
\`\`\`

## Time Savings

| Task | Traditional | AI-Assisted | Savings |
|------|-------------|-------------|---------|
| Mood board | 2 hours | 15 min | 88% |
| Concept variations | 4 hours | 30 min | 88% |
| Stock image search | 1 hour | 5 min | 92% |
| Icon set | 8 hours | 1 hour | 88% |

## Best Practices

### 1. Start with AI, Finish with Craft
Use AI for exploration, human refinement for final output.

### 2. Build Prompt Libraries
\`\`\`json
{
  "brand_style": "modern minimalist, clean lines, muted colors",
  "photo_style": "natural lighting, shallow depth of field",
  "illustration_style": "flat design, geometric shapes, bold colors"
}
\`\`\`

### 3. Create Style Guides for AI
Document prompts that produce on-brand results.

## Tools Integration

| Tool | AI Enhancement |
|------|----------------|
| Figma | AI plugins for generation |
| Photoshop | Generative Fill |
| Illustrator | Image Trace + AI |
| Canva | Magic Studio |

## Ethical Considerations

> ⚠️ Always disclose AI-generated content when required

> 💡 Use AI as a tool, not a replacement for creative thinking

> 🔒 Verify rights for commercial use of AI outputs
`,
  },
  // New AI Agent Templates
  {
    id: 'ai-agent-templates',
    title: 'AI Agent Templates',
    description: 'Production-ready templates for Voiceflow, Flowise, n8n, LangChain, and Botpress agents.',
    category: 'ai-agents',
    categoryLabel: 'AI Agents',
    tools: ['n8n', 'LangChain'],
    difficulty: 'intermediate',
    readTime: '10 min',
    icon: 'Network',
    content: `# AI Agent Templates

Production-ready templates of AI Agents created using Voiceflow, Flowise, n8n, LangChain, and Botpress.

## Voiceflow Templates

### Lead Generation & Customer Support Agent
**Repository:** [View on GitHub](https://github.com/piotrmacai/Voiceflow/tree/main/agent-voiceflow-leadbot-v1)

### Ecommerce Agent with Product Recommendation System
**Repository:** [View on GitHub](https://github.com/piotrmacai/Voiceflow/tree/main/agent-ecom-v1)

## Flowise Templates

### Local RAG with Documents Q&A
[View on GitHub](https://github.com/piotrmacai/agent-flowise-local-ollama-rag)

### Sequential Agent with Defined Conditions
[View on GitHub](https://github.com/piotrmacai/agent-flowise-sequentialAgents)

### Vision Agent for Structuring Data from Documents and Images
[View on GitHub](https://github.com/piotrmacai/agent-flowise-visionAgents)

### RAG Assistant with Custom Tools
[View on GitHub](https://github.com/piotrmacai/agent-flowise-ragtools-support-agent)

## n8n Templates

### Slack Personal AI Agent
[View on GitHub](https://github.com/piotrmacai/n8n/tree/main/agent-slack-personal-agent)

### WooCommerce AI Agent
[View on GitHub](https://github.com/piotrmacai/n8n/tree/main/agent-woocommerce-ai-agent)

### Content Creator AI Agent for WordPress & CMS
[View on GitHub](https://github.com/piotrmacai/n8n/tree/main/agent-cms-content-creator)

### Telegram AI Assistant Starter
[View on GitHub](https://github.com/piotrmacai/n8n/tree/main/agent-telegram-agent-starter)

### Multimodal Telegram AI Assistant
[View on GitHub](https://github.com/piotrmacai/n8n/tree/main/agent-telegram-multimodal)

## LangChain Templates

### Local RAG Chatbot with Ollama & DeepSeek
[View on GitHub](https://github.com/piotrmacai/Langchain/tree/main/agent-ollama-deepseek-rag)

### Local AI Researcher Agent with Ollama & DeepSeek
[View on GitHub](https://github.com/piotrmacai/Langchain/tree/main/agent-researcher-ollama-deepseek)

## Botpress Templates

### Ecommerce AI Agent with Product Recommendations
[View on GitHub](https://github.com/piotrmacai/botpress/tree/main/ecommerce-agent-v1)

### Lead Generation & Customer Support Agent
[View on GitHub](https://github.com/piotrmacai/agent-botpress-leadbot-v2)
`,
  },
  {
    id: 'flowise-guide',
    title: 'Flowise Getting Started',
    description: 'A comprehensive guide to Flowise, an open-source low-code UI for building AI agents.',
    category: 'ai-agents',
    categoryLabel: 'AI Agents',
    tools: ['LangChain'],
    difficulty: 'beginner',
    readTime: '10 min',
    icon: 'Workflow',
    content: `# Flowise Getting Started

Flowise is an open-source, low-code UI platform for building LLM orchestration workflows and AI agents using LangChain.js. It enables rapid development via a visual drag-and-drop interface and supports dynamic RAG updates and real-time document synchronization.

## Key Concepts

- **Visual node-based workflow designer:** 50+ components available
- **Native vector database integrations:** Pinecone, Upstash, Chroma
- **Document Store API:** With dynamic content updates
- **Advanced text splitting strategies:** Markdown, Recursive, Code

## Installation

### Cloud

Flowise Cloud is recommended if you do not want to manage servers, backups, and updates manually.

### Self-Hosting

**Requirements:**
- Node.js v18.15.0 or v20+

**Installation Options:**
- Local setup via repository clone and build
- Global installation via npm
- Runs locally at http://localhost:3000

## Basics

### Core Components
- **Document Loaders:** PDF, CSV, HTML
- **Text Splitters:** With chunk overlap
- **Vector Store connectors:** For indexing
- **LLM gateways:** OpenAI, HuggingFace, local models

### Recommended Workflow Pattern
1. Load documents with metadata
2. Split content context-aware
3. Generate embeddings
4. Configure retrieval (Top-K default: 4)

## Integrations

### Enterprise Capabilities
- Document Store API (Add, Replace, Delete)
- Google Drive real-time sync
- Vector database lifecycle management

## Resources

- [Official Documentation](https://docs.flowiseai.com/)
- [GitHub Repository](https://github.com/FlowiseAI/FlowiseDocs)
`,
  },
  {
    id: 'botpress-guide',
    title: 'Botpress Getting Started',
    description: 'Learn how to build conversational AI assistants with minimal coding using Botpress.',
    category: 'ai-agents',
    categoryLabel: 'AI Agents',
    tools: ['Gemini'], // Using a generic tool as Botpress isn't in TOOLS
    difficulty: 'beginner',
    readTime: '10 min',
    icon: 'Bot',
    content: `# Botpress Getting Started

Botpress is a platform for building conversational AI assistants with minimal coding.

## Key Features

- **Visual flow editor:** Design conversations visually
- **Built-in NLU:** Natural Language Understanding included
- **Multi-language support:** Create global bots
- **Extension system:** Extend functionality
- **Analytics dashboard:** Track performance

## Developer Tools

- Custom actions
- External integrations
- Debugging and testing tools

## Conversation Design

### Core Building Blocks
- Drag-and-drop conversation flows
- Modular message blocks
- Conditional logic
- Centralized content management

## Natural Language Understanding (NLU)

### Capabilities
- Intent recognition
- Entity extraction
- Language detection
- Slot filling

### Optimization
- Training variations
- Versioning
- Performance analytics
- Continuous improvement from real conversations
`,
  },
  {
    id: 'voiceflow-guide',
    title: 'Voiceflow Getting Started',
    description: 'A guide to building voice and chat assistants using Voiceflow collaborative platform.',
    category: 'ai-agents',
    categoryLabel: 'AI Agents',
    tools: ['Gemini'], // Using a generic tool as Voiceflow isn't in TOOLS
    difficulty: 'beginner',
    readTime: '10 min',
    icon: 'Bot',
    content: `# Voiceflow Getting Started

Voiceflow is a collaborative platform for building voice and chat assistants.

## Core Components

- **Blocks:** Functions and actions
- **Intents:** What user wants
- **Variables:** Storing data

## Core Features

### Visual Conversation Design
- Drag-and-drop canvas
- Real-time collaboration
- Version history
- Custom blocks

### NLU Capabilities
- Intent detection
- Entity extraction
- Context memory
- Multilingual support

### Voice Agent Capabilities
- Voice interaction
- Text-to-Speech
- Speech-to-Text
- Voice authentication
- Custom voices

### Conversation Management
- Turn handling
- Interruptions
- Fallback strategies
- Context-aware responses

## Use Cases

### Customer Service
- 24/7 support
- Ticket automation
- FAQ handling
- Human handoff

### Sales & Marketing
- Lead qualification
- Product recommendations
- Booking & scheduling
- Campaign automation

## Integrations

### Voice Channels
- Amazon Alexa
- Google Assistant
- Telephony systems

### Chat Channels
- Web chat
- WhatsApp
- Facebook Messenger

## Analytics

### Key Metrics
- User engagement
- Conversation paths
- Drop-off points
`,
  },
];
