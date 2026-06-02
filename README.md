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
| Animations | Framer Motion |
| Database | MongoDB + Mongoose |
| Auth | bcryptjs + JWT |
| Icons | Lucide React |
| File Upload | react-dropzone |
| Container | Docker + Docker Compose |
| CI/CD | GitHub Actions → Docker Hub → Watchtower |

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
│   ├── admin/
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
│   ├── upload/
│   └── uploads/
├── blogs/[id]/
├── contact/
├── doctors/[slug]/
├── hospitals/[id]/
├── info/                # Static info pages (privacy, terms, disclaimer, etc.)
├── testimonials/
├── treatments/[slug]/
└── components/          # Shared page components

components/ui/           # shadcn/ui components
lib/
├── auth.ts
├── mailer.ts
├── mongodb.ts
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
    └── Treatment.ts

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
JWT_SECRET=your_jwt_secret_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@email.com
SMTP_PASS=your_smtp_password
INQUIRY_RECIPIENT_EMAIL=recipient@email.com
INQUIRY_CC_EMAIL=cc@email.com
```

```bash
# 3. Seed the database (optional)
npx tsx scripts/seed-admin.ts
npx tsx scripts/seed-treatments.ts
npx tsx scripts/seed-testimonials.ts
npx tsx scripts/seed-blogs.ts
npx tsx scripts/seed-faqs.ts

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

# Database seeding (run once on fresh installs)
npx tsx scripts/seed-admin.ts        # Create admin user
npx tsx scripts/seed-treatments.ts   # Seed treatments
npx tsx scripts/seed-testimonials.ts # Seed testimonials
npx tsx scripts/seed-blogs.ts        # Seed blog posts
npx tsx scripts/seed-faqs.ts         # Seed FAQs
```

---

## Docker & Deployment

### Local Docker

```bash
docker-compose up -d --build
```

### Production CI/CD

1. **Push to `main`** → GitHub Actions builds the Docker image and pushes it to Docker Hub (`abdullahdkc/manal-healthcare-docker:latest`).
2. **Watchtower** (running on VPS) polls Docker Hub every 5 minutes, pulls the new image, and restarts the container automatically.

No manual SSH or webhook is needed — deployment is fully automatic after `git push`.

### Environment Variables (VPS)

Stored in `/docker/manal-healthcare/.env` on the server:

```env
MONGODB_URI=...
JWT_SECRET=...
SMTP_HOST=...
SMTP_PORT=...
SMTP_SECURE=...
SMTP_USER=...
SMTP_PASS=...
INQUIRY_RECIPIENT_EMAIL=...
INQUIRY_CC_EMAIL=...
DOCKER_USERNAME=...
DOCKER_PASSWORD=...
```

### Uploaded Files

The `docker-compose.yml` maps `./uploads` → `/app/public/uploads` so hospital, doctor, and blog images persist across container restarts. Files are stored at `/docker/manal-healthcare/uploads/` on the VPS host.

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
| GET | `/api/health` | Health check (used by Docker healthcheck) |
| POST | `/api/inquiries` | Submit patient inquiry |
| POST | `/api/newsletter` | Subscribe to newsletter |
| POST | `/api/translate` | Translate text (Google Translate) |
| POST | `/api/upload` | Upload file (doctors, hospitals, treatments, blogs, medical-reports) |

### Admin (Protected — require valid session)
All public routes also accept `POST`, `PUT`, `DELETE` when authenticated via the admin session cookie.

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
- Sessions are managed with signed JWT cookies
- Sensitive config lives in `.env.local` / `.env` (excluded from git)
- File uploads are validated for type and size (10MB max)
- MongoDB queries use Mongoose ODM (no raw query injection)
- Production container runs on `127.0.0.1:3000` (nginx reverse proxy only — not exposed publicly)

---

## License

Proprietary — all rights reserved.
