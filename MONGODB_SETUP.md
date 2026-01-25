# MongoDB Connection Setup with Mongoose

This project uses Mongoose as the MongoDB ODM (Object Data Modeling) library. Follow these steps to set up the connection:

## Setup Instructions

1. **Create `.env.local` file**
   Copy the example environment file and update it with your MongoDB connection string:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Add your MongoDB URI**
   Open `.env.local` and add your MongoDB connection string:
   
   **For local MongoDB:**
   ```
   MONGODB_URI=mongodb://localhost:27017/manal-healthcare
   ```
   
   **For MongoDB Atlas (Cloud):**
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/manal-healthcare?retryWrites=true&w=majority
   ```

## Usage

### Define a Mongoose Model

```typescript
// lib/models/User.ts
import mongoose, { Schema, Model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
```

### Using Mongoose in API Routes

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const user = await User.create(body);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
```

### Using in Server Components

```typescript
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export default async function UsersPage() {
  await connectDB();
  const users = await User.find({}).lean();
  
  return (
    <div>
      {users.map((user) => (
        <div key={user._id.toString()}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Connection Details

- The connection uses a singleton pattern with global caching to prevent multiple connections
- Connection pooling is automatically managed by Mongoose
- The connection is established lazily on first use
- Models should use `mongoose.models.ModelName || mongoose.model()` pattern to prevent recompilation in development

## Benefits of Using Mongoose

- **Schema validation**: Define and enforce data structure
- **Type safety**: Full TypeScript support with typed models
- **Middleware**: Pre/post hooks for save, update, delete operations
- **Population**: Easy reference population between documents
- **Virtuals**: Computed properties that aren't stored in MongoDB

## Notes

- Never commit `.env.local` to version control
- Make sure `.env.local` is in your `.gitignore`
- For production, set the `MONGODB_URI` environment variable in your hosting platform
