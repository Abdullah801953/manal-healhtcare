# Manal Healthcare

A full-stack medical tourism platform built with **Next.js 16**, **TypeScript**, **MongoDB**, **Tailwind CSS v4**, and **shadcn/ui**. Features a complete admin dashboard, patient inquiry system, dynamic content management, and automatic multi-language translation.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.1 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix UI) |
| Animations | Framer Motion 12 |
| Database | MongoDB + Mongoose 9 |
| Auth | bcryptjs |
| Icons | Lucide React |
| File Upload | react-dropzone |

---

## Features

### Public Website
- Homepage with hero, services carousel, doctors showcase, testimonials, blogs, FAQ, and newsletter
- **Doctors Directory** — searchable, filterable, paginated with dedicated profile pages
- **Hospitals Directory** — searchable with detail pages showing related doctors
- **Treatments Catalog** — 18+ treatments with pricing, categories, and detail pages
- **Testimonials** — patient reviews with rating filter
- **Blog** — articles with detail pages
- **Contact Page** — inquiry form with medical report upload (up to 10MB)
- **Multi-language** — 11 languages via Google Translate API with 7-day caching

### Admin Dashboard (`/admin`)
- Secure login with bcrypt-hashed credentials
- Full CRUD for: Doctors, Hospitals, Treatments, Testimonials, Blogs, FAQs
- Inquiry management (new → contacted → completed)
- Newsletter subscriber management
- Website settings (WhatsApp number, social links, contact info)
- File upload for images (organized by type under `public/uploads/`)

---

## Project Structure

```
app/
├── (main)/              # Route group — main layout
├── (website)/           # Route group — website layout
├── about/               # About page
├── admin/               # Admin dashboard (protected)
│   ├── login/
│   ├── doctors/
│   ├── hospitals/
│   ├── treatments/
│   ├── testimonials/
│   ├── blogs/
│   ├── faqs/
│   ├── inquiries/
│   ├── newsletter/
│   └── settings/
├── api/                 # API routes
│   ├── doctors/
│   ├── hospitals/
│   ├── treatments/
│   ├── testimonials/
│   ├── blogs/
│   ├── faqs/
│   ├── inquiries/
│   ├── newsletter/
│   ├── settings/
│   ├── translate/
│   └── upload/
├── blogs/[id]/
├── contact/
├── doctors/[slug]/
├── hospitals/[id]/
├── info/                # Static info pages
├── testimonials/
├── treatments/[slug]/
└── components/          # Shared components

components/ui/           # shadcn/ui components
lib/
├── mongodb.ts           # DB connection
├── utils.ts
└── models/              # Mongoose models
    ├── Admin.ts
    ├── Blog.ts
    ├── Doctor.ts
    ├── FAQ.ts
    ├── Hospital.ts
    ├── Inquiry.ts
    ├── Newsletter.ts
    ├── Settings.ts
    ├── Testimonial.ts
    ├── Treatment.ts
    └── User.ts

scripts/                 # DB seeding scripts
public/uploads/          # Uploaded files (mapped as Docker volume)
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/manal-healthcare
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

```bash
# 3. Seed the database (optional)
npm run seed:admin
npm run seed:treatments
npm run seed:testimonials
npm run seed:blogs

# 4. Start development server
npm run dev
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login

---

## Available Scripts

```bash
npm run dev              # Development server with hot reload
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

npm run seed:admin       # Create admin user
npm run seed:treatments  # Seed treatments
npm run seed:testimonials # Seed testimonials
npm run seed:blogs       # Seed blog posts
```

---

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d --build
```

The `docker-compose.yml` maps `./uploads` to `/app/public/uploads` so uploaded images persist across container restarts.

Environment variables required in production:
- `MONGODB_URI`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

---

## API Reference

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | List doctors (supports `?hospital=` filter) |
| GET | `/api/doctors/[slug]` | Get doctor by slug |
| GET | `/api/hospitals` | List hospitals |
| GET | `/api/hospitals/[id]` | Get hospital by ID |
| GET | `/api/treatments` | List treatments |
| GET | `/api/treatments/[slug]` | Get treatment by slug |
| GET | `/api/testimonials` | List testimonials |
| GET | `/api/blogs` | List blogs (supports `?status=published`) |
| GET | `/api/blogs/[id]` | Get blog by ID |
| GET | `/api/faqs` | List FAQs |
| GET | `/api/settings` | Get website settings |
| POST | `/api/inquiries` | Submit patient inquiry |
| POST | `/api/newsletter` | Subscribe to newsletter |
| POST | `/api/translate` | Translate text (Google Translate) |
| POST | `/api/upload` | Upload file (types: doctors, hospitals, treatments, blogs, medical-reports) |

### Admin (Protected — require valid session)
All public routes also accept `POST`, `PUT`, `DELETE` when authenticated.

---

## Translation System

- **Provider**: Google Translate API (free tier)
- **Caching**: 7 days in browser localStorage
- **Languages**: English, Arabic, Russian, Bengali, Hindi, French, Spanish, Portuguese, German, Chinese, Italian
- **Mechanism**: `AutoTranslate` component monitors DOM changes and translates new content automatically

To add a language, add it to the `languages` array in `app/components/LanguageSelector.tsx`.

---

## Security Notes

- Admin passwords are hashed with bcryptjs
- Sensitive config lives in `.env.local` (excluded from git)
- File uploads are validated for type and size (10MB max)
- MongoDB queries use Mongoose ODM (no raw query injection)

---

## License

Proprietary — all rights reserved.
