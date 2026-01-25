# Admin Authentication Setup Guide

## 🔐 Admin Login System

The admin authentication system has been successfully implemented with the following features:

### Features
- ✅ Protected admin routes - redirects to login if not authenticated
- ✅ Automatic redirect to dashboard after successful login
- ✅ Logout functionality that clears session
- ✅ Already logged-in check (redirects to dashboard if visiting login page while authenticated)
- ✅ Loading states and error handling
- ✅ Secure password hashing with bcrypt

## 🚀 How to Use

### 1. Setup MongoDB Connection
Ensure your `.env.local` file has the MongoDB URI:
```env
MONGODB_URI=mongodb://localhost:27017/manal-healthcare
```

### 2. Start Development Server
```powershell
npm run dev
```

### 3. Create First Admin User
Run this command in PowerShell:
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/admin/create -Method POST -Body '{"email":"admin@manalhealthcare.com","password":"admin123","name":"Admin User","secretKey":"create-admin-2026"}' -ContentType "application/json"
```

### 4. Login Flow

**Visit:** http://localhost:3000/admin

**What happens:**
1. System checks if you're logged in
2. If NOT logged in → Redirects to `/admin/login`
3. Enter credentials
4. If correct → Redirects to `/admin` (dashboard)
5. If incorrect → Shows error message

**Test Credentials:**
- Email: `admin@manalhealthcare.com`
- Password: `admin123`

### 5. Logout
Click the "Logout" button in the sidebar to clear session and return to login page.

## 🔒 Authentication Flow

```
User visits /admin
    ↓
Check localStorage for 'admin' data
    ↓
├─ Found → Show Admin Dashboard
│
└─ Not Found → Redirect to /admin/login
       ↓
   Enter Credentials
       ↓
   API validates credentials
       ↓
   ├─ Valid → Store in localStorage → Redirect to /admin
   │
   └─ Invalid → Show error message
```

## 📁 Files Created/Modified

1. **lib/models/Admin.ts** - Admin user model
2. **app/api/admin/login/route.ts** - Login API endpoint
3. **app/api/admin/create/route.ts** - Create admin endpoint
4. **app/admin/components/AdminAuthWrapper.tsx** - Auth protection wrapper
5. **app/admin/layout.tsx** - Updated with auth wrapper and logout
6. **app/admin/login/page.tsx** - Login UI with API integration

## 🛡️ Security Notes

- Passwords are hashed using bcrypt
- Admin data is stored in localStorage (client-side)
- For production, consider implementing JWT tokens and server-side sessions
- Change the secretKey in the create admin endpoint before deployment
- Consider removing the create admin endpoint after initial setup

## 🔧 Customization

### Change Login Redirect
Edit `app/admin/components/AdminAuthWrapper.tsx` line 30:
```typescript
router.push("/admin/login"); // Change to your login page
```

### Change After-Login Redirect
Edit `app/admin/login/page.tsx` line 43:
```typescript
router.push("/admin"); // Change to your dashboard page
```

### Add More Admin Fields
Edit `lib/models/Admin.ts` to add more fields like phone, avatar, etc.
