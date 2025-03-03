# API Reference

The TravelMate platform exposes a RESTful API for interacting with the AI agent system. All endpoints are prefixed with `/api/v1`.

## Authentication

Most endpoints require authentication using OAuth2. Send a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Agent Endpoints

### Start Agent Run

```
POST /api/v1/agent/run
```

Start a new agent run with a specified goal.

**Request Body:**
```json
{
  "goal": "Plan a 5-day trip to Paris",
  "model_settings": {
    "model": "gpt-4",
    "temperature": 0.7,
    "max_tokens": 500,
    "language": "English"
  }
}
```

**Response:**
```json
{
  "run_id": "run_abc123",
  "goal": "Plan a 5-day trip to Paris"
}
```

### Analyze Task

```
POST /api/v1/agent/analyze
```

Analyze a task to determine required tools and approach.

**Request Body:**
```json
{
  "run_id": "run_abc123",
  "task": "Find hotels near the Eiffel Tower",
  "tool_names": ["web_search", "hotel_search"]
}
```

**Response:**
```json
{
  "run_id": "run_abc123",
  "analysis": {
    "thought": "I need to find hotels near the Eiffel Tower...",
    "tools": [
      {
        "name": "web_search",
        "parameters": {
          "query": "hotels near Eiffel Tower Paris"
        }
      }
    ]
  }
}
```

### Execute Task

```
POST /api/v1/agent/execute
```

Execute a task using the specified analysis.

**Request Body:**
```json
{
  "run_id": "run_abc123",
  "task": "Find hotels near the Eiffel Tower",
  "analysis": {
    "thought": "I need to find hotels near the Eiffel Tower...",
    "tools": [
      {
        "name": "web_search",
        "parameters": {
          "query": "hotels near Eiffel Tower Paris"
        }
      }
    ]
  }
}
```

**Response:**
```json
{
  "run_id": "run_abc123",
  "result": "I found several hotels near the Eiffel Tower: Hotel ABC (0.3 miles), Hotel XYZ (0.5 miles)..."
}
```

### Create Tasks

```
POST /api/v1/agent/create
```

Create new tasks based on previous results.

**Request Body:**
```json
{
  "run_id": "run_abc123",
  "last_task": "Find hotels near the Eiffel Tower",
  "result": "I found several hotels near the Eiffel Tower: Hotel ABC (0.3 miles), Hotel XYZ (0.5 miles)...",
  "completed_tasks": ["Find flights to Paris"]
}
```

**Response:**
```json
{
  "run_id": "run_abc123",
  "new_tasks": [
    "Compare prices for Hotel ABC and Hotel XYZ",
    "Check availability for dates June 10-15"
  ]
}
```

### Summarize Results

```
POST /api/v1/agent/summarize
```

Generate a summary of the agent run results.

**Request Body:**
```json
{
  "run_id": "run_abc123",
  "results": [
    "Found flights: AA123 ($450), BA456 ($520)",
    "Selected Hotel ABC ($150/night)",
    "Created itinerary for 5 days"
  ]
}
```

**Response:**
```json
{
  "run_id": "run_abc123",
  "summary": "I've planned your 5-day trip to Paris. You'll be flying with American Airlines ($450) and staying at Hotel ABC ($150/night) near the Eiffel Tower. Your itinerary includes visits to the Louvre, Montmartre, and a Seine river cruise."
}
```

## Memory Endpoints

### Save Memory

```
POST /api/v1/memory
```

Save information to the agent's memory.

### Retrieve Memory

```
GET /api/v1/memory/{memory_id}
```

Retrieve information from the agent's memory.

## User Endpoints

### Get User Profile

```
GET /api/v1/user/profile
```

Retrieve the user's profile information.

### Update User Preferences

```
PUT /api/v1/user/preferences
```

Update the user's travel preferences. 