# Notes Backend (Express)

Simple RESTful API to manage notes with in-memory storage.

## Features
- CRUD endpoints:
  - POST /notes
  - GET /notes
  - GET /notes/:id
  - PUT /notes/:id
  - DELETE /notes/:id
- Healthcheck: GET /
- Seed route for demo: POST /seed
- CORS enabled
- JSON body parsing
- Request logging
- Centralized error handling and 404 for unknown routes
- Swagger UI at /docs

## Getting Started

1. Install dependencies:
   - Using npm: `npm install`
2. Configure environment (optional):
   - Copy `.env.example` to `.env` and adjust values.
   - Defaults: HOST=0.0.0.0, PORT=3001
3. Start the server:
   - Production: `npm start`
   - Development with watch: `npm run dev`

Server will listen on port 3001 by default.

## Endpoints

- GET `/`  
  Returns service health.
  Response: `{ "status": "ok", "message": "Service is healthy", "timestamp": "...", "environment": "development" }`

- POST `/seed`  
  Seeds two demo notes (overwrites in-memory store).  
  Response: `{ "message": "Seeded 2 notes", "count": 2 }`

- POST `/notes`  
  Create a note.
  - Body: `{ "title": "string", "content": "string (optional)" }`
  - Responses:
    - 201: `{ id, title, content, createdAt, updatedAt }`
    - 400: `{ "error": "Validation error: ..." }`

- GET `/notes`  
  List all notes.
  - 200: `[ { id, title, content, createdAt, updatedAt }, ... ]`

- GET `/notes/:id`  
  Get a note by id.
  - 200: `{ id, title, content, createdAt, updatedAt }`
  - 404: `{ "error": "Note not found" }`

- PUT `/notes/:id`  
  Update a note title/content.
  - Body: `{ "title": "string", "content": "string (optional)" }`
  - 200: `{ id, title, content, createdAt, updatedAt }`
  - 400: `{ "error": "Validation error: ..." }`
  - 404: `{ "error": "Note not found" }`

- DELETE `/notes/:id`  
  Delete a note.
  - 204: No content
  - 404: `{ "error": "Note not found" }`

## Errors
All errors return structured JSON:
`{ "error": "message" }`

## Swagger Docs
Visit `/docs` for OpenAPI UI.

## Notes
- Storage is in-memory and resets on process restart.
- No database dependencies are used.
