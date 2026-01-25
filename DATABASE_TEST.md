# Database Connection Testing

## Test API Endpoints

The test API is available at `/api/test-db` with the following methods:

### GET - Test Connection & Retrieve Users
```bash
curl http://localhost:3000/api/test-db
```

**Response:**
```json
{
  "success": true,
  "message": "Database connection successful",
  "data": {
    "usersCount": 0,
    "users": []
  }
}
```

### POST - Create Test User
```bash
curl -X POST http://localhost:3000/api/test-db \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-01-25T..."
  }
}
```

### DELETE - Clear All Test Users
```bash
curl -X DELETE http://localhost:3000/api/test-db
```

**Response:**
```json
{
  "success": true,
  "message": "All users deleted successfully",
  "data": {
    "deletedCount": 1
  }
}
```

## Testing Steps

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the connection (GET):**
   Visit http://localhost:3000/api/test-db in your browser or use:
   ```powershell
   Invoke-WebRequest -Uri http://localhost:3000/api/test-db -Method GET
   ```

3. **Create a test user (POST):**
   ```powershell
   Invoke-RestMethod -Uri http://localhost:3000/api/test-db -Method POST -Body '{"name":"Test User","email":"test@example.com"}' -ContentType "application/json"
   ```

4. **Verify user was created (GET):**
   ```powershell
   Invoke-WebRequest -Uri http://localhost:3000/api/test-db -Method GET
   ```

5. **Clean up test data (DELETE):**
   ```powershell
   Invoke-WebRequest -Uri http://localhost:3000/api/test-db -Method DELETE
   ```

## What Was Created

- **User Model** (`lib/models/User.ts`): Sample Mongoose schema with name, email, and timestamp
- **Test API** (`app/api/test-db/route.ts`): Full CRUD endpoints to test database operations

## Troubleshooting

If you get connection errors:
- Ensure MongoDB is running locally or your Atlas cluster is accessible
- Verify your `MONGODB_URI` in `.env.local` is correct
- Check that your IP is whitelisted in MongoDB Atlas (if using cloud)
