# 🏥 Manal Healthcare - Modern Healthcare Website

A modern, responsive healthcare website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. This project showcases a complete healthcare platform with beautiful UI components, multi-language support, dynamic query forms, and best practices for React and Next.js development.

---

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with Tailwind CSS v4
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Fast Performance** - Optimized with Next.js 16 and App Router
- 🎭 **Smooth Animations** - Framer Motion for engaging user experience
- 🌍 **Multi-Language Support** - Integrated language translation system
- 📝 **Query Form Modal** - Auto-popup consultation form for user engagement
- 🏥 **Doctors Directory** - Searchable and filterable doctor listings
- 🏨 **Hospitals Directory** - Comprehensive hospital information and filtering
- 💬 **Testimonials System** - Patient reviews with pagination
- 🔬 **Treatments Catalog** - Detailed treatment information and pricing
- ♿ **Accessible** - Built with shadcn/ui for accessibility standards
- 🔧 **Type Safe** - Full TypeScript support throughout
- 🎯 **Component-Based** - Reusable, maintainable component architecture
- 🔍 **SEO Optimized** - Next.js Image optimization and meta tags

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
│   ├── contact/                  # Contact page
│   │   ├── page.tsx
│   │   └── components/           # Contact form & info
│   ├── doctors/                  # Doctors directory
│   │   ├── page.tsx             # Doctors listing
│   │   ├── [id]/                # Individual doctor pages
│   │   ├── data.ts              # Doctor data
│   │   └── components/          # Doctor components
│   ├── hospitals/                # Hospitals directory
│   │   ├── page.tsx             # Hospitals listing
│   │   ├── [id]/                # Individual hospital pages
│   │   ├── data.ts              # Hospital data
│   │   └── components/          # Hospital components
│   ├── treatments/               # Treatments catalog
│   │   ├── page.tsx             # Treatments listing
│   │   ├── [id]/                # Individual treatment pages
│   │   ├── data.ts              # Treatment data
│   │   └── components/          # Treatment components
│   ├── testimonials/             # Patient testimonials
│   │   ├── page.tsx
│   │   ├── data.ts
│   │   └── components/          # Testimonial components
│   ├── api/                      # API routes
│   │   ├── languages/           # Language options
│   │   └── translate/           # Translation endpoint
│   ├── components/               # Shared React components
│   │   ├── Header.tsx           # Main header container
│   │   ├── TopBar.tsx           # Top contact bar
│   │   ├── MainNav.tsx          # Desktop navigation
│   │   ├── MobileNav.tsx        # Mobile menu
│   │   ├── Hero.tsx             # Hero section with search
│   │   ├── InfoCards.tsx        # Information cards grid
│   │   ├── Services.tsx         # Services carousel
│   │   ├── AboutSection.tsx     # About company section
│   │   ├── ServicesMarquee.tsx  # Infinite scrolling banner
│   │   ├── Testimonials.tsx     # Customer testimonials
│   │   ├── LabTestBooking.tsx   # Lab test booking cards
│   │   ├── DoctorsShowcase.tsx  # Doctors grid with filtering
│   │   ├── NewsletterSection.tsx # Newsletter subscription
│   │   ├── BlogSection.tsx      # Blog posts grid
│   │   ├── FAQSection.tsx       # FAQ accordion
│   │   ├── QueryFormModal.tsx   # Popup consultation form
│   │   ├── LanguageSwitcher.tsx # Language selector
│   │   ├── GoogleTranslateWidget.tsx # Google Translate integration
│   │   ├── PageTranslator.tsx   # Page translation component
│   │   └── Footer.tsx           # Site footer
│   ├── contexts/                 # React Context providers
│   │   └── LanguageContext.tsx  # Language state management
│   ├── lib/                      # Utility functions
│   │   └── i18n/                # Internationalization
│   │       ├── languages.ts     # Language definitions
│   │       └── translations.ts  # Translation data
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
│
├── components/                   # shadcn/ui components
│   └── ui/
│       ├── button.tsx
│       ├── sheet.tsx
│       ├── input.tsx
│       ├── carousel.tsx
│       ├── accordion.tsx
│       ├── dialog.tsx
│       ├── select.tsx
│       └── navigation-menu.tsx
│
├── public/                       # Static assets
│   ├── doctor-img 1.png
│   ├── doctor-img2 1.png
│   ├── blog-1.jpg
│   └── [other images]
│
├── lib/                          # Utility functions
│   └── utils.ts
│
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
├── LANGUAGE_SETUP.md             # Language setup documentation
└── package.json                  # Dependencies
```

---

## 🎨 Components Overview

### Header Components
- **Header** - Main header wrapper with sticky positioning
- **TopBar** - Contact information and social media links
- **MainNav** - Desktop navigation with language selector
- **MobileNav** - Responsive mobile menu with sheet drawer
- **LanguageSwitcher** - Multi-language support dropdown

### Content Sections
- **Hero** - Main hero section with search functionality and animations
- **InfoCards** - Grid of information cards with hover effects
- **Services** - Carousel of healthcare services
- **AboutSection** - Company information with feature highlights
- **ServicesMarquee** - Infinite scrolling services banner
- **Testimonials** - Customer testimonials carousel
- **LabTestBooking** - Lab test packages with booking options
- **DoctorsShowcase** - Filterable grid of doctors by specialty
- **NewsletterSection** - Newsletter subscription with email form
- **BlogSection** - Latest news and articles grid
- **FAQSection** - Frequently asked questions with accordion
- **QueryFormModal** - Auto-popup consultation form with file upload

### Page Components

#### Doctors Directory
- **HeroBanner** - Doctors page hero section
- **DoctorCard** - Individual doctor display card
- **CategoryFilter** - Filter doctors by specialty
- **Pagination** - Navigate through doctor listings

#### Hospitals Directory
- **HospitalHero** - Hospitals page hero section
- **HospitalCard** - Individual hospital display card
- **AdvancedFilters** - Multi-criteria hospital filtering
- **Pagination** - Navigate through hospital listings

#### Treatments Catalog
- Treatment listing and detail pages
- Treatment categories and pricing
- Related treatments suggestions

#### Testimonials
- **TestimonialsHero** - Testimonials page hero
- **TestimonialCard** - Individual testimonial display
- **TestimonialFilters** - Filter by rating and category
- **WhyTrustUs** - Trust indicators section
- **CTASection** - Call-to-action for submissions

#### Contact & About Pages
- **ContactForm** - Multi-step contact form
- **ContactInfo** - Contact details and map
- **SocialConnect** - Social media integration
- **AboutHero** - About page hero section
- **TeamSection** - Team members showcase
- **MissionVision** - Company mission and vision
- **ValuesSection** - Core values display

### UI Components (shadcn/ui)
- Button - Multiple variants and sizes
- Sheet - Drawer/dialog component
- Input - Form input fields
- Carousel - Touch-friendly image carousel
- Accordion - Collapsible content sections
- Dialog - Modal dialogs
- Select - Dropdown selections
- Navigation Menu - Accessible navigation

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ 
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🎨 Customization

### Adding New Components

1. Create component in `app/components/`
2. Use TypeScript interfaces for props
3. Import in `app/page.tsx`
4. Follow existing patterns for consistency

### Styling

- Uses **Tailwind CSS v4** utility classes
- Custom colors in Tailwind config
- Framer Motion for animations
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

### Images

- Place images in `public/` folder
- Use Next.js `Image` component for optimization
- Format: `/image-name.png` or `/image-name.jpg`

---

## 🏗️ Component Patterns

### Reusability
All components follow these patterns:
- **TypeScript interfaces** for type safety
- **Default props** for flexibility
- **Composition** over inheritance
- **Framer Motion** for animations
- **Responsive design** mobile-first

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
