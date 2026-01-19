# 🏥 Manal Healthcare - Modern Healthcare Website

A modern, responsive healthcare website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. This project showcases a complete healthcare platform with beautiful UI components, **11-language translation system**, dynamic query forms, intelligent search functionality, and best practices for React and Next.js development.

---

## ✨ Features

### 🎨 **Design & UI/UX**
- Clean, professional healthcare design with Tailwind CSS v4
- Fully responsive mobile-first design (optimized for all screen sizes)
- Smooth animations and transitions with Framer Motion
- Modern glassmorphism effects and gradient backgrounds
- Accessible components built with shadcn/ui

### 🌍 **Multi-Language Translation System (NEW!)**
- **11 languages supported** with SEO optimization
- Static translation dictionary (instant, free, no API limits)
- Languages: English, Arabic, Russian, Bengali, Hindi, French, Spanish, Portuguese, German, Chinese, Italian
- Country flags and search functionality
- Persistent language preference (localStorage)
- Automatic hreflang tags for SEO
- Translation demo page at `/translation-demo`

### 🔍 **Smart Search System**
- Unified search across treatments, doctors, and hospitals
- Real-time suggestions with auto-complete
- URL parameter support for direct search links
- Category-specific filtering
- Optimized search performance

### 📱 **Fully Responsive Design**
- Mobile, tablet, and desktop optimized
- Adaptive typography and spacing
- Touch-friendly navigation
- Optimized images for all screen sizes

### 🏥 **Core Features**
- **Doctors Directory** - Searchable listings with specialty filters
- **Hospitals Directory** - Advanced filtering (type, beds, emergency, parking)
- **Treatments Catalog** - 18+ medical treatments with detailed information
- **Testimonials System** - Patient reviews with carousel navigation
- **Blog Section** - Healthcare articles and news
- **Contact Forms** - Multiple query forms for patient engagement
- **WhatsApp Integration** - Direct messaging button

### ⚡ **Performance & Optimization**
- Next.js 16 App Router for optimal performance
- Image optimization with next/image
- Lazy loading and code splitting
- SEO meta tags and structured data
- Lighthouse score optimized

---

## 🛠️ Tech Stack

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **Framer Motion 12.25.0** - Animation library
- **Lucide React** - Beautiful icon library
- **Embla Carousel** - Touch-friendly carousel

---

## 📂 Project Structure

```
manal-healthcare/
├── app/                          # Next.js App Router
│   ├── about/                    # About page with team & mission
│   │   ├── page.tsx
│   │   └── components/           # About page components
│   ├── blogs/                    # Blog section
│   │   ├── page.tsx
│   │   ├── [id]/                # Individual blog posts
│   │   └── data.ts              # Blog data
│   ├── contact/                  # Contact page
│   │   ├── page.tsx
│   │   └── components/           # Contact form & info
│   ├── doctors/                  # Doctors directory
│   │   ├── page.tsx             # Doctors listing with filters
│   │   ├── [id]/                # Individual doctor pages
│   │   ├── data.ts              # Doctor data
│   │   └── components/          # Doctor components
│   ├── hospitals/                # Hospitals directory
│   │   ├── page.tsx             # Hospitals listing with filters
│   │   ├── [id]/                # Individual hospital pages
│   │   ├── data.ts              # Hospital data
│   │   └── components/          # Hospital components
│   ├── treatments/               # Treatments catalog
│   │   ├── page.tsx             # Treatments listing (18+ treatments)
│   │   ├── [id]/                # Individual treatment pages
│   │   ├── data.ts              # Treatment data
│   │   └── components/          # Treatment components
│   ├── testimonials/             # Patient testimonials
│   │   ├── page.tsx
│   │   ├── data.ts
│   │   └── components/          # Testimonial components
│   ├── translation-demo/         # Translation feature demo (NEW!)
│   │   └── page.tsx             # Interactive translation examples
│   ├── info/                     # Information pages
│   │   ├── medical-tourism/
│   │   ├── plan-your-travel/
│   │   ├── privacy-policy/
│   │   └── terms-conditions/
│   ├── components/               # Shared React components
│   │   ├── Header.tsx           # Main header container
│   │   ├── TopBar.tsx           # Top contact bar with social links
│   │   ├── MainNav.tsx          # Desktop navigation with search
│   │   ├── MobileNav.tsx        # Mobile hamburger menu
│   │   ├── Hero.tsx             # Hero section with smart search (NEW!)
│   │   ├── InfoCards.tsx        # Information cards grid
│   │   ├── Services.tsx         # Services carousel
│   │   ├── OurServices.tsx      # About services section
│   │   ├── AboutSection.tsx     # About company section
│   │   ├── ServicesMarquee.tsx  # Infinite scrolling banner
│   │   ├── Testimonials.tsx     # Customer testimonials carousel
│   │   ├── LabTestBooking.tsx   # Lab test booking cards
│   │   ├── DoctorsShowcase.tsx  # Doctors grid showcase
│   │   ├── NewsletterSection.tsx # Newsletter subscription
│   │   ├── BlogSection.tsx      # Blog posts grid
│   │   ├── FAQSection.tsx       # FAQ accordion
│   │   ├── QueryFormModal.tsx   # Popup consultation form
│   │   ├── LanguageSelector.tsx # Language selector modal (NEW!)
│   │   ├── Translate.tsx        # Translation wrapper component (NEW!)
│   │   ├── SEOMetaTags.tsx      # SEO hreflang tags (NEW!)
│   │   ├── WhatsAppButton.tsx   # Floating WhatsApp button
│   │   └── Footer.tsx           # Site footer
│   ├── contexts/                 # React Context providers (NEW!)
│   │   └── LanguageContext.tsx  # Language state & translation logic
│   ├── data/                     # Static data (NEW!)
│   │   └── translations.ts      # Translation dictionary (11 languages)
│   ├── lib/                      # Utility functions
│   │   └── treatments.ts        # Treatment categories with icons
│   ├── globals.css              # Global styles & Tailwind config
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Homepage
│
├── components/                   # shadcn/ui components
│   └── ui/
│       ├── button.tsx
│       ├── sheet.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── dialog.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── accordion.tsx
│       └── navigation-menu.tsx
│
├── public/                       # Static assets
│   ├── logo.png                 # Brand logo
│   ├── doctor.png               # Hero doctor image
│   ├── about-img.png            # About section image
│   ├── facebook.svg, instagram.svg, etc. # Social icons
│   └── [other images]
│
├── lib/                          # Shared utilities
│   └── utils.ts                 # Helper functions
│
├── Documentation Files (NEW!)    # Comprehensive guides
│   ├── TRANSLATION_GUIDE.md     # Complete translation system guide
│   ├── TRANSLATION_USAGE_GUIDE.md # How to use translations
│   ├── TRANSLATION_EXAMPLE.md   # Real-world examples
│   ├── SETUP_COMPLETE.md        # Setup summary
│   ├── LANGUAGE_TRANSLATION.md  # Technical docs
│   └── TRANSLATION_SETUP_COMPLETE.md # Setup checklist
│
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS v4 configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
└── package.json                  # Dependencies
```

---

## 🎨 Components Overview

### Header Components
- **Header** - Main header wrapper with sticky positioning and backdrop blur
- **TopBar** - Contact information, location, and social media links
- **MainNav** - Desktop navigation with dropdowns and search
- **MobileNav** - Responsive mobile menu with sheet drawer
- **LanguageSelector** - 11-language selector modal with search (NEW!)

### Content Sections
- **Hero** - Hero section with smart search and auto-suggestions (UPDATED!)
- **InfoCards** - Grid of information cards (300+ patients, 200+ hospitals)
- **Services** - Carousel of 18+ medical treatments with icons
- **OurServices** - About services with feature list
- **AboutSection** - Company information with animations
- **ServicesMarquee** - Infinite scrolling services banner
- **Testimonials** - Patient testimonials with carousel navigation
- **LabTestBooking** - Lab test packages with pricing
- **DoctorsShowcase** - Featured doctors showcase
- **NewsletterSection** - Newsletter subscription form
- **BlogSection** - Latest healthcare articles
- **FAQSection** - Frequently asked questions accordion
- **QueryFormModal** - Auto-popup consultation form

### Translation Components (NEW!)
- **Translate** - Wrapper component for translatable text
- **LanguageSelector** - Language picker with 11 languages
- **SEOMetaTags** - Automatic hreflang tags for SEO
- **LanguageContext** - Global language state management

### Page Components

#### Doctors Directory
- **HeroBanner** - Doctors page hero section
- **DoctorCard** - Individual doctor display card with specialty
- **CategoryFilter** - Filter doctors by 15+ specialties
- **SearchBar** - Search doctors by name or specialty
- **Pagination** - Navigate through doctor listings (9 per page)

#### Hospitals Directory
- **HospitalHero** - Hospitals page hero section
- **HospitalCard** - Individual hospital card with facilities
- **AdvancedFilters** - Filter by type, beds, emergency, parking
- **SearchBar** - Search hospitals by name, city, or type
- **Pagination** - Navigate through hospital listings (6 per page)

#### Treatments Catalog
- **TreatmentHero** - Treatments page hero
- **TreatmentCard** - Treatment card with pricing and description
- **CategoryFilter** - Filter by 18+ treatment categories
- **SearchBar** - Search treatments by name
- **Pagination** - Navigate through treatment listings (9 per page)

#### Testimonials
- **TestimonialsHero** - Testimonials page hero
- **TestimonialCard** - Patient review card with rating
- **TestimonialFilters** - Filter by rating and category
- **WhyTrustUs** - Trust indicators section
- **CTASection** - Call-to-action for patient stories

#### Contact & About Pages
- **ContactForm** - Multi-step contact form with validation
- **ContactInfo** - Contact details, address, and hours
- **SocialConnect** - Social media links and integration
- **AboutHero** - About page hero section
- **TeamSection** - Medical team showcase
- **MissionVision** - Company mission, vision, and values
- **StatsSection** - Company statistics and achievements
- **Accreditations** - Medical certifications and awards

### UI Components (shadcn/ui)
- **Button** - Multiple variants (default, outline, ghost, etc.)
- **Sheet** - Drawer/dialog for mobile menu
- **Input** - Form input fields with validation
- **Select** - Dropdown select component
- **Dialog** - Modal dialogs and popups
- **Card** - Content container with variants
- **Carousel** - Touch-friendly image/content carousel
- **Accordion** - Collapsible FAQ sections
- **NavigationMenu** - Accessible dropdown navigation
- **NavigationMenu** - Accessible dropdown navigation

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** or **yarn** or **pnpm**
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/manal-healthcare.git
   cd manal-healthcare
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📝 Available Scripts

```bash
npm run dev      # Start development server (hot reload)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint for code quality
npm run type-check # Run TypeScript type checking
```

---

## 🌍 Using the Translation System

### Quick Start

1. **Wrap text with Translate component**
   ```tsx
   import { Translate } from '@/app/components/Translate';
   
   <h1><Translate>Welcome to Manal Healthcare</Translate></h1>
   <p><Translate>Your trusted medical tourism partner</Translate></p>
   ```

2. **User changes language**
   - Click "Language" button in navigation
   - Select from 11 available languages
   - Text translates instantly

3. **Add new translations**
   Edit `app/data/translations.ts`:
   ```typescript
   "Your New Text": {
     hi: "आपका नया पाठ",
     ar: "النص الجديد الخاص بك",
     ru: "Ваш новый текст",
     // ... other languages
   }
   ```

### Supported Languages

| Language | Code | Target Market |
|----------|------|---------------|
| 🇺🇸 English | `en` | Global |
| 🇸🇦 Arabic | `ar` | Middle East |
| 🇷🇺 Russian | `ru` | Russia & CIS |
| 🇧🇩 Bengali | `bn` | Bangladesh |
| 🇮🇳 Hindi | `hi` | India |
| 🇫🇷 French | `fr` | France & Africa |
| 🇪🇸 Spanish | `es` | Spain & Latin America |
| 🇵🇹 Portuguese | `pt` | Portugal & Brazil |
| 🇩🇪 German | `de` | Germany |
| 🇨🇳 Chinese | `zh` | China |
| 🇮🇹 Italian | `it` | Italy |

### Translation Features

- ✅ **Zero Cost** - No API fees or subscriptions
- ✅ **Instant Translation** - No loading time
- ✅ **SEO Optimized** - hreflang tags for search engines
- ✅ **Persistent** - Language preference saved in localStorage
- ✅ **Demo Page** - View examples at `/translation-demo`

📖 **Full Documentation**: See `TRANSLATION_GUIDE.md` for complete details

---

## 🎨 Customization

### Adding New Components

1. Create component in `app/components/`
2. Use TypeScript interfaces for props
3. Add translations to `app/data/translations.ts`
4. Import in your page
5. Follow existing patterns for consistency

### Styling

- Uses **Tailwind CSS v4** utility classes
- Custom brand colors: `#209F00` (primary green)
- Framer Motion for smooth animations
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Mobile-first design approach

### Images

- Place images in `public/` folder
- Use Next.js `Image` component for optimization
- Formats supported: `.png`, `.jpg`, `.webp`, `.svg`
- Automatic image optimization and lazy loading
- Recommended sizes:
  - Hero images: 1920x1080px
  - Doctor/Hospital images: 800x800px
  - Icons: 64x64px (SVG preferred)

---

## 🏗️ Component Patterns

### Reusability
All components follow these patterns:
- **TypeScript interfaces** for type safety and autocomplete
- **Default props** for flexibility and reusability
- **Composition** over inheritance (React best practices)
- **Framer Motion** for smooth animations and transitions
- **Responsive design** with mobile-first approach
- **Accessibility** (ARIA labels, keyboard navigation)
- **SEO friendly** (semantic HTML, proper headings)

Example:
```tsx
interface ComponentProps {
  title?: string;
  description?: string;
}

export function Component({ 
  title = "Default Title",
  description = "Default description" 
}: ComponentProps) {
  // Component logic
}
```

---

## 🔧 Configuration Files

- **next.config.ts** - Next.js configuration
- **tsconfig.json** - TypeScript compiler options
- **tailwind.config.ts** - Tailwind CSS customization
- **components.json** - shadcn/ui configuration
- **eslint.config.mjs** - Code linting rules
- **postcss.config.mjs** - PostCSS plugins

---

## 📦 Key Dependencies

```json
{
  "next": "16.1.1",
  "react": "19.2.3",
  "typescript": "^5",
  "tailwindcss": "^4",
  "framer-motion": "^12.25.0",
  "lucide-react": "^0.562.0",
  "embla-carousel-react": "^8.6.0"
}
```

---

## 🌟 Features Breakdown

### Query Form Modal
- Auto-popup after 2 seconds on homepage
- Required fields: Name, Country, WhatsApp Number, Problem Description
- Optional fields: Email, Medical Reports (file upload)
- Single-session display (shows once per visit)
- Hidden scrollbar for clean UI
- Red close button for easy dismissal
- Form submission with loading states

### Multi-Language Support
- Language switcher in navigation
- Context-based language management
- API routes for translation
- Google Translate widget integration
- Persistent language selection
- Support for multiple languages

### Doctors Directory
- Searchable doctor database
- Filter by specialty (Cardiology, Neurology, Orthopedics, etc.)
- Detailed doctor profiles with experience and qualifications
- Pagination for easy navigation
- Individual doctor detail pages

### Hospitals Directory
- Comprehensive hospital listings
- Advanced filtering system (location, specialties, services)
- Hospital ratings and reviews
- Facility information and contact details
- Individual hospital detail pages

### Treatments Catalog
- Detailed treatment information
- Pricing and duration details
- Related treatments suggestions
- Category-based organization

### Testimonials System
- Patient reviews and ratings
- Filter by rating (1-5 stars)
- Pagination support
- Trust indicators
- Call-to-action for new testimonials

### Animations
- Scroll-triggered animations with Framer Motion
- Hover effects on cards and buttons
- Smooth transitions between sections
- Staggered animations for lists

### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### Performance
- Next.js Image optimization
- Code splitting with App Router
- Lazy loading components
- Optimized bundle size

### Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly

---

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

---

## 🎯 Best Practices

- ✅ Component-based architecture
- ✅ TypeScript for type safety
- ✅ Reusable component patterns
- ✅ Clean code organization
- ✅ Consistent naming conventions
- ✅ Proper error handling
- ✅ Performance optimization
- ✅ Accessibility standards

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Developer

Built with ❤️ using modern web technologies

---

## 📞 Support

For support and questions, please contact the development team.

---

**Happy Coding! 🚀**
