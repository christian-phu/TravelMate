# AI Agent System

## Overview

The TravelMate AI Agent system is built on a multi-agent architecture that enables autonomous task execution for travel planning. The system uses LLM-powered agents that can analyze tasks, execute actions using tools, and create new subtasks dynamically.

## Core Agent Components

### 1. Agent Loop

The agent operates in a loop consisting of the following steps:

```
┌────────┐     ┌────────────┐     ┌────────────┐
│        │     │            │     │            │
│ Start  │────▶│  Analyze   │────▶│  Execute   │
│        │     │            │     │            │
└────────┘     └────────────┘     └────────────┘
     ▲                                   │
     │                                   │
     │          ┌────────────┐           │
     │          │            │           │
     └──────────│  Create    │◀──────────┘
                │            │
                └────────────┘
```

1. **Start**: Initialize an agent run with a specific goal
2. **Analyze**: Break down a task to determine required tools and approach
3. **Execute**: Use tools and reasoning to accomplish a task
4. **Create**: Generate new subtasks based on execution results
5. **Summarize**: (Optional) Provide a final summary of results

### 2. Agent Schema

The agent system is defined by the following data models:

- `ModelSettings`: Configuration for LLM model parameters
- `AgentRun`: Base class containing run_id and goal
- `AgentTaskAnalyze`: Schema for the analysis phase
- `AgentTaskExecute`: Schema for the execution phase
- `AgentTaskCreate`: Schema for the task creation phase
- `AgentSummarize`: Schema for the summarization phase

### 3. Tools System

Agents use a variety of tools to accomplish tasks:

- **Web Search**: Find information about destinations, attractions, etc.
- **Reservation Tools**: Interface with booking systems
- **Weather Tools**: Get weather forecasts for destinations
- **Calendar Tools**: Manage travel itineraries
- **Memory Tools**: Store and retrieve user preferences and history

### 4. Memory and Context

The agent system maintains context across interactions using:

- **Pinecone Vector DB**: For semantic search of past interactions
- **SQL Database**: For structured data storage
- **Conversation History**: For maintaining dialogue context

### 5. Prompt Engineering

The agent's behavior is guided by carefully crafted prompts stored in the `prompts.py` file. These include:

- Task analysis prompts
- Execution prompts
- Task creation prompts
- Summarization prompts

## LLM Integration

The platform supports multiple LLM models:

- OpenAI GPT models (gpt-3.5-turbo-16k, gpt-4, gpt-4-turbo-preview)
- Custom model integration capability

Model settings can be configured with parameters like:

- Temperature
- Max tokens
- Language preference

## Agent Security

The agent system includes several security features:

- Custom API key handling
- Input validation
- Output filtering
- Tool usage permissions

## Development and Extension

To extend the agent with new capabilities:

1. Define new tool schemas in `/tools` directory
2. Update prompts to include new tool capabilities
3. Implement tool handlers in the backend
4. Register tools with the agent system 