# Digital Access Ticket System Backend

A complete backend API for managing digital access tickets built with Node.js, TypeScript, Express, and MongoDB.

## Features

- ✅ Create tickets with unique UUIDs (immediately activated)
- ✅ View all tickets and their statuses
- ✅ Deactivate tickets manually (mark as 'used')
- ✅ Clean folder structure with separation of concerns
- ✅ TypeScript for type safety
- ✅ MongoDB with Mongoose ODM
- ✅ Environment configuration with dotenv
- ✅ Comprehensive error handling
- ✅ Request logging and health checks

## Project Structure

```
src/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── models/         # MongoDB models/schemas
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript type definitions
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/digital_tickets
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/digital_tickets
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Create Ticket
```http
POST /api/tickets
```
Creates a new ticket with unique UUID and active status.

**Response:**
```json
{
  "success": true,
  "message": "Ticket created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "deactivatedAt": null
  }
}
```

### Get All Tickets
```http
GET /api/tickets
GET /api/tickets?status=active
GET /api/tickets?status=used
```
Retrieves all tickets with optional status filtering.

**Response:**
```json
{
  "success": true,
  "message": "Tickets retrieved successfully",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "deactivatedAt": null
    }
  ]
}
```

### Get Ticket by ID
```http
GET /api/tickets/:id
```
Retrieves a specific ticket by its unique ID.

### Deactivate Ticket
```http
PATCH /api/tickets/:id/deactivate
```
Marks a ticket as 'used' and sets the deactivatedAt timestamp.

**Response:**
```json
{
  "success": true,
  "message": "Ticket deactivated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "used",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "deactivatedAt": "2024-01-15T12:45:00.000Z"
  }
}
```

### Get Ticket Statistics
```http
GET /api/tickets/stats
```
Returns ticket statistics including total, active, and used counts.

**Response:**
```json
{
  "success": true,
  "message": "Ticket statistics retrieved successfully",
  "data": {
    "total": 100,
    "active": 75,
    "used": 25
  }
}
```

### Health Check
```http
GET /health
```
Returns API health status.

## Database Schema

### Ticket Model
```typescript
{
  id: string;           // UUID (unique identifier)
  status: 'active' | 'used';  // Ticket status
  createdAt: Date;      // Creation timestamp
  deactivatedAt?: Date; // Deactivation timestamp (optional)
}
```

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors, already used tickets)
- `404` - Not Found
- `409` - Conflict (duplicate entries)
- `500` - Internal Server Error

## Environment Variables

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/digital_tickets

# Database Name
DB_NAME=digital_tickets
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (placeholder)

### Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in `.env` file
3. The application will automatically connect and create the database

## Testing the API

You can test the API using tools like Postman, curl, or any HTTP client:

```bash
# Create a ticket
curl -X POST http://localhost:3000/api/tickets

# Get all tickets
curl http://localhost:3000/api/tickets

# Get active tickets only
curl http://localhost:3000/api/tickets?status=active

# Deactivate a ticket
curl -X PATCH http://localhost:3000/api/tickets/TICKET_ID/deactivate

# Get statistics
curl http://localhost:3000/api/tickets/stats

# Health check
curl http://localhost:3000/health
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables
3. Start the server:
```bash
npm start
```

## License

This project is licensed under the MIT License.