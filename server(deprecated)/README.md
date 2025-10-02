# Fastify Server with Stagehand

A Fastify server that provides web scraping functionality using Stagehand and Browserbase.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
   - `BROWSERBASE_API_KEY`: Your Browserbase API key
   - `BROWSERBASE_PROJECT_ID`: Your Browserbase project ID
   - `OPENAI_API_KEY`: Your OpenAI API key

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### POST /extract

Extract data from a webpage using AI-guided instructions.

**Request Body:**
```json
{
  "url": "https://example.com",
  "guide": "Extract all product names from the page"
}
```

**Response:**
```json
["Product 1", "Product 2", "Product 3"]
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Error Handling

The server returns appropriate HTTP status codes and error messages:

- `400`: Bad Request (validation errors)
- `500`: Internal Server Error

Error response format:
```json
{
  "success": false,
  "error": "Error message",
  "details": [] // Optional validation error details
}
```