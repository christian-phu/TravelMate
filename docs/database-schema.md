# Database Schema

## Overview

TravelMate uses a hybrid database approach combining relational data (MySQL) for structured information and vector storage (Pinecone) for semantic search capabilities. This document outlines the database schema, relationships, and key fields.

## Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│              │       │              │       │              │
│    Users     │───1:N─┤   AgentRuns  │───1:N─┤   Tasks      │
│              │       │              │       │              │
└──────────────┘       └──────────────┘       └──────────────┘
       │                      │                     │
       │                      │                     │
       │                      │                     │
       │                ┌─────┴─────┐               │
       │                │           │               │
       └───────1:N──────┤ UserPlans │               │
                        │           │               │
                        └───────────┘               │
                             │                      │
                             │                      │
┌──────────────┐       ┌─────┴─────┐         ┌─────┴─────┐
│              │       │           │         │           │
│  Destinations│◄──M:N─┤   Plans   │◄───1:N──┤ ToolCalls │
│              │       │           │         │           │
└──────────────┘       └───────────┘         └───────────┘
                                                   │
                                                   │
┌──────────────┐                            ┌─────┴─────┐
│              │                            │           │
│  Memories    │◄────────────────vector─────┤ VectorDB  │
│              │                            │           │
└──────────────┘                            └───────────┘
```

## Database Tables

### Users

Stores user account information and preferences.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary Key |
| email | VARCHAR(255) | User email address (unique) |
| name | VARCHAR(255) | User's full name |
| created_at | TIMESTAMP | Account creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| travel_preferences | JSON | Stored travel preferences |
| auth_provider | VARCHAR(50) | OAuth provider name |
| auth_id | VARCHAR(255) | ID from auth provider |

### AgentRuns

Tracks each agent execution run.

| Column | Type | Description |
|--------|------|-------------|
| run_id | UUID | Primary Key |
| user_id | UUID | Foreign Key to Users |
| goal | TEXT | The user-specified goal |
| status | ENUM | 'running', 'completed', 'failed', 'paused' |
| created_at | TIMESTAMP | Run start timestamp |
| completed_at | TIMESTAMP | Run completion timestamp |
| model_settings | JSON | LLM model settings |
| last_error | TEXT | Last error message if failed |

### Tasks

Individual tasks within an agent run.

| Column | Type | Description |
|--------|------|-------------|
| task_id | UUID | Primary Key |
| run_id | UUID | Foreign Key to AgentRuns |
| parent_task_id | UUID | Self-reference for subtasks (nullable) |
| task_type | ENUM | 'analyze', 'execute', 'create', 'summarize' |
| description | TEXT | Task description |
| status | ENUM | 'pending', 'running', 'completed', 'failed' |
| created_at | TIMESTAMP | Task creation timestamp |
| completed_at | TIMESTAMP | Task completion timestamp |
| result | TEXT | Task execution result |
| order | INT | Execution order within run |

### ToolCalls

Records of tool execution.

| Column | Type | Description |
|--------|------|-------------|
| call_id | UUID | Primary Key |
| task_id | UUID | Foreign Key to Tasks |
| tool_name | VARCHAR(100) | Name of tool called |
| parameters | JSON | Tool parameters |
| result | TEXT | Tool execution result |
| error | TEXT | Error message if failed (nullable) |
| created_at | TIMESTAMP | Call timestamp |
| duration_ms | INT | Execution duration in milliseconds |

### Plans

Travel plans created by users.

| Column | Type | Description |
|--------|------|-------------|
| plan_id | UUID | Primary Key |
| user_id | UUID | Foreign Key to Users |
| title | VARCHAR(255) | Plan title |
| start_date | DATE | Start date of travel |
| end_date | DATE | End date of travel |
| created_at | TIMESTAMP | Plan creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| status | ENUM | 'draft', 'confirmed', 'completed', 'canceled' |
| notes | TEXT | User notes |

### UserPlans

Connects users to plans (for shared plans).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary Key |
| user_id | UUID | Foreign Key to Users |
| plan_id | UUID | Foreign Key to Plans |
| role | ENUM | 'owner', 'editor', 'viewer' |
| created_at | TIMESTAMP | Association timestamp |

### Destinations

Travel destinations information.

| Column | Type | Description |
|--------|------|-------------|
| destination_id | UUID | Primary Key |
| name | VARCHAR(255) | Destination name |
| country | VARCHAR(100) | Country |
| region | VARCHAR(100) | Region/State/Province |
| type | ENUM | 'city', 'attraction', 'accommodation', 'restaurant' |
| address | TEXT | Full address |
| latitude | DECIMAL | Geographic latitude |
| longitude | DECIMAL | Geographic longitude |
| metadata | JSON | Additional information |

### PlanDestinations

Connects plans to destinations (many-to-many).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary Key |
| plan_id | UUID | Foreign Key to Plans |
| destination_id | UUID | Foreign Key to Destinations |
| visit_date | DATE | Planned visit date |
| visit_time | TIME | Planned visit time |
| duration_minutes | INT | Planned visit duration |
| notes | TEXT | Visit notes |
| order | INT | Order in itinerary |

### Memories

Long-term storage for agent memory.

| Column | Type | Description |
|--------|------|-------------|
| memory_id | UUID | Primary Key |
| user_id | UUID | Foreign Key to Users |
| type | VARCHAR(50) | Memory type |
| content | TEXT | Memory content |
| created_at | TIMESTAMP | Storage timestamp |
| relevance_score | FLOAT | Importance/relevance score |
| metadata | JSON | Additional context |

## Vector Database Schema (Pinecone)

### VectorStorage

| Field | Type | Description |
|-------|------|-------------|
| id | STRING | Unique identifier |
| values | VECTOR | Embedding vector |
| metadata | OBJECT | Associated metadata |

Metadata typically includes:
- memory_id (links to SQL database)
- user_id
- text_chunk
- source
- timestamp

## Indexing Strategy

1. **SQL Indexes**:
   - Primary keys on all ID fields
   - Foreign key indexes
   - Indexes on frequently queried fields (email, status)
   - Composite indexes on (user_id, created_at) and other common query patterns

2. **Vector Indexes**:
   - Pinecone vector index optimized for similarity search
   - Metadata filtering for efficient queries

## Data Access Patterns

The application primarily accesses data through SQLAlchemy ORM with the following patterns:

1. **User Authentication Flow**:
   ```python
   user = session.query(User).filter(User.email == email).first()
   ```

2. **Agent Run Creation**:
   ```python
   agent_run = AgentRun(user_id=user_id, goal=goal, status="running")
   session.add(agent_run)
   ```

3. **Task Execution**:
   ```python
   task = session.query(Task).filter(Task.task_id == task_id).first()
   task.status = "completed"
   task.result = result
   ```

4. **Vector Search**:
   ```python
   results = pinecone_index.query(
       vector=embeddings,
       filter={"user_id": user_id},
       top_k=5
   )
   ```

## Migration Strategy

Database migrations are managed using Alembic with the following workflow:

1. Generate migration script:
   ```bash
   alembic revision --autogenerate -m "Description of changes"
   ```

2. Review and edit the generated script

3. Apply migration:
   ```bash
   alembic upgrade head
   ```

4. Rollback if needed:
   ```bash
   alembic downgrade -1
   ```

## Backup and Recovery

1. **MySQL Backups**:
   - Daily automated backups
   - Point-in-time recovery capability
   - 30-day retention policy

2. **Pinecone Backups**:
   - Periodic index snapshots
   - Metadata stored in MySQL as backup

## Data Archiving

Older data is archived based on the following policies:

1. Completed agent runs older than 90 days are archived
2. User data is retained indefinitely or until account deletion
3. Vector embeddings are periodically pruned based on relevance score 