# Development Guide

## Getting Started

This guide will help you set up your development environment for working with the TravelMate AI Agent platform.

## Prerequisites

- Docker and Docker Compose
- Python 3.10+
- Node.js 16+
- Poetry (Python package manager)
- Git

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd travelmate
   ```

2. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your configuration details.

3. Start the development environment using Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - API Docs: http://localhost:8000/docs

## Development Workflow

### Backend Development (Python)

1. Navigate to the platform directory:
   ```bash
   cd platform
   ```

2. Install dependencies using Poetry:
   ```bash
   poetry install
   ```

3. Activate the virtual environment:
   ```bash
   poetry shell
   ```

4. Run the development server:
   ```bash
   python -m agent_platform
   ```

5. Run tests:
   ```bash
   pytest
   ```

### Frontend Development (Next.js)

1. Navigate to the next directory:
   ```bash
   cd next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Project Structure

### Backend

```
platform/
├── agent_platform/      # Main package
│   ├── web/             # Web server
│   │   ├── api/         # API endpoints
│   │   │   ├── agent/   # Agent endpoints
│   │   │   ├── auth/    # Auth endpoints
│   │   │   └── ...
│   ├── services/        # Business logic
│   ├── schemas/         # Data models
│   ├── db/              # Database models
│   └── ...
├── tests/               # Test suite
└── ...
```

### Frontend

```
next/
├── src/                 # Source code
│   ├── components/      # React components
│   ├── pages/           # Next.js pages
│   ├── styles/          # CSS/SCSS styles
│   ├── utils/           # Utility functions
│   └── ...
├── public/              # Static assets
└── ...
```

## Code Style and Best Practices

### Python

- Follow PEP 8 style guide
- Use type hints
- Document functions and classes with docstrings
- Run static type checking with mypy
- Format code with Black

### TypeScript/JavaScript

- Follow ESLint configuration
- Use TypeScript for type safety
- Format code with Prettier
- Follow React best practices

## Adding New Features

### Adding a New Agent Tool

1. Define the tool schema in `platform/agent_platform/web/api/agent/tools/`
2. Implement the tool handler
3. Register the tool in the tool registry
4. Update prompts to make the agent aware of the new tool
5. Add tests for the new tool

### Adding a New API Endpoint

1. Create a new file in the appropriate directory under `platform/agent_platform/web/api/`
2. Define the endpoint using FastAPI decorators
3. Add the endpoint to the router
4. Document the endpoint using FastAPI's built-in documentation features
5. Add tests for the new endpoint

## Deployment

The application can be deployed using Docker Compose or Kubernetes.

### Docker Compose Deployment

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes Deployment

Kubernetes manifests are located in the `k8s/` directory.

```bash
kubectl apply -f k8s/
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check that the database container is running
   - Verify connection parameters in `.env`

2. **API Authentication Issues**
   - Ensure OAuth credentials are correctly configured
   - Check that tokens have not expired

3. **Agent Execution Issues**
   - Verify OpenAI API key is valid
   - Check log files for detailed error messages 