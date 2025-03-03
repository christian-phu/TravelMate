# TravelMate - AI-Powered Travel Assistant

TravelMate is an advanced travel planning platform built on an AI agent architecture that helps users plan trips, find accommodations, discover attractions, and manage their travel itineraries.

## 🤖 AI Agent Architecture

The core of TravelMate is its AI agent system that uses:

- **LLM-powered agents** that can analyze tasks, execute actions, and create new subtasks
- **Specialized tools** for flight and hotel search, weather forecasts, and navigation
- **Memory systems** for context retention across conversations
- **Multi-step reasoning** to break down complex travel planning tasks

### Architecture Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                              User Interface                                │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                              API Gateway                                   │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                        AI Agent Orchestration Layer                        │
├─────────────────┬─────────────────┬──────────────────┬────────────────────┤
│                 │                 │                  │                    │
│                 ▼                 ▼                  ▼                    ▼
│    ┌───────────────────┐ ┌──────────────┐ ┌──────────────────┐ ┌──────────────┐
│    │ Task Analysis     │ │ Task         │ │ Task Creation    │ │ Task         │
│    │ Engine            │ │ Execution    │ │ Engine           │ │ Summarization│
│    │ ┌───────────────┐ │ │ Engine       │ │ ┌──────────────┐ │ │ Engine       │
│    │ │ Goal Analysis │ │ │              │ │ │ Subtask      │ │ │              │
│    │ └───────────────┘ │ │              │ │ │ Generation   │ │ │              │
│    │ ┌───────────────┐ │ │              │ │ └──────────────┘ │ │              │
│    │ │ Task Planning │ │ │              │ │ ┌──────────────┐ │ │              │
│    │ └───────────────┘ │ │              │ │ │ Priority     │ │ │              │
│    └───────────────────┘ └──────────────┘ │ │ Management   │ │ └──────────────┘
│                                           │ └──────────────┘ │
│                                           └──────────────────┘
└───────────────────────────────────────────────────────────────────────────┘
                    │                             │
                    ▼                             ▼
┌────────────────────────┐             ┌────────────────────────────┐
│     Tools Registry      │             │      Memory System         │
├────────────────────────┤             ├────────────────────────────┤
│ ┌──────────────────┐   │             │ ┌──────────────────────┐   │
│ │ Web Search       │   │             │ │ Vector DB            │   │
│ └──────────────────┘   │             │ │ (Pinecone)           │   │
│ ┌──────────────────┐   │             │ └──────────────────────┘   │
│ │ Hotel/Flight     │   │             │ ┌──────────────────────┐   │
│ │ Reservation      │   │             │ │ SQL Database         │   │
│ └──────────────────┘   │             │ │ (User Preferences)   │   │
│ ┌──────────────────┐   │             │ └──────────────────────┘   │
│ │ Weather          │   │             │ ┌──────────────────────┐   │
│ └──────────────────┘   │             │ │ Conversation History │   │
│ ┌──────────────────┐   │             │ └──────────────────────┘   │
│ │ Navigation       │   │             └────────────────────────────┘
│ └──────────────────┘   │                          ▲
│ ┌──────────────────┐   │                          │
│ │ Calendar         │   │                          │
│ └──────────────────┘   │                          │
└────────────────────────┘                          │
          │                                         │
          ▼                                         │
┌────────────────────────┐                         │
│  External Services     │                         │
├────────────────────────┤                         │
│ ┌──────────────────┐   │                         │
│ │ OpenAI API       │   │                         │
│ └──────────────────┘   │                         │
│ ┌──────────────────┐   │                         │
│ │ Booking Services │───┼─────────────────────────┘
│ └──────────────────┘   │
│ ┌──────────────────┐   │
│ │ Maps API         │   │
│ └──────────────────┘   │
└────────────────────────┘
```

TravelMate agents operate in a loop consisting of:
1. **Analyze**: Breaking down tasks and determining required tools
2. **Execute**: Using tools to accomplish specific tasks
3. **Create**: Generating new tasks based on execution results

## 🚀 Features

- **Smart Travel Planning**: Plan complete itineraries with a simple goal
- **Personalized Recommendations**: Get suggestions based on your preferences
- **Real-time Booking**: Book flights, hotels, and attractions directly
- **Intelligent Assistance**: Ask questions and get helpful travel advice
- **Trip Management**: Keep all your travel details organized in one place

## 🛠️ Technology Stack

- **Backend**: Python with FastAPI
- **Frontend**: Next.js/React
- **Database**: MySQL + Pinecone Vector DB
- **AI**: Large Language Models via OpenAI API
- **Containerization**: Docker/Docker Compose

## 📖 Documentation

Detailed documentation is available in the [docs](/docs) directory:

- [Architecture Overview](/docs/architecture-overview.md)
- [AI Agent System](/docs/agent-system.md)
- [API Reference](/docs/api-reference.md)
- [Database Schema](/docs/database-schema.md)
- [Tools Reference](/docs/tools-reference.md)
- [Development Guide](/docs/development-guide.md)

## 🔧 Getting Started

To set up your development environment:

```bash
# Clone the repository
git clone <repository-url>
cd travelmate

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start with Docker Compose
docker-compose up -d
```

## 📄 License

Proprietary - All rights reserved 