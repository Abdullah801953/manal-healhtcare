# Header Component Documentation

## Overview
A fully responsive header component built with Next.js 16, shadcn/ui, Tailwind CSS v4, and TypeScript. The header matches the provided design and follows Next.js best practices for code reusability.

## Components Structure

### 1. **Header** (Main Component)
- Location: `app/components/Header.tsx`
- Sticky header that stays at the top of the page
- Combines TopBar, MainNav, and MobileNav components
- Responsive logo with gradient background

### 2. **TopBar**
- Location: `app/components/TopBar.tsx`
- Hidden on mobile devices (lg breakpoint and above only)
- Features:
  - Contact information (phone, email, address) with Lucide icons
  - Help/Support/Contact text
  - Social media links (Facebook, Instagram, X/Twitter, LinkedIn)

### 3. **MainNav**
- Location: `app/components/MainNav.tsx`
- Desktop navigation menu
- Features:
  - 9 navigation links
  - Language selector button with arrow icon
  - Smooth hover transitions
  - Hidden on mobile (lg breakpoint and above)

### 4. **MobileNav**
- Location: `app/components/MobileNav.tsx`
- Mobile hamburger menu using shadcn/ui Sheet component
- Features:
  - Slide-in drawer from the right
  - All navigation links with chevron icons
  - Language selector
  - Visible only on mobile/tablet (below lg breakpoint)

## Technologies Used

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe code
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components (Button, Sheet)
- **Lucide React**: Icon library
- **Framer Motion**: Animation library (available for future enhancements)

## Features

✅ Fully responsive design (mobile, tablet, desktop)
✅ Sticky header that stays on scroll
✅ Component-based architecture for reusability
✅ Type-safe with TypeScript
✅ Accessible with proper ARIA labels
✅ Smooth transitions and hover effects
✅ Mobile-friendly hamburger menu
✅ SEO-friendly with semantic HTML

## Responsive Breakpoints

- **Mobile**: < 1024px - Shows mobile nav with hamburger menu
- **Desktop**: ≥ 1024px - Shows full navigation and top bar

## Installation

The following packages were installed:

```bash
npm install lucide-react framer-motion
npx shadcn@latest init
npx shadcn@latest add button sheet
```

## Usage

Import and use the Header component in your layout or page:

```tsx
import Header from './components/Header';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        {/* Your page content */}
      </main>
    </>
  );
}
```

## Customization

### Navigation Links
Edit the navigation links in:
- Desktop: `app/components/MainNav.tsx` - `navigationLinks` array
- Mobile: `app/components/MobileNav.tsx` - `mobileNavigationLinks` array

### Contact Information
Edit contact details in `app/components/TopBar.tsx`

### Logo
Modify the logo in `app/components/Header.tsx` inside the Link component

### Colors
The component uses Tailwind's color palette. Key colors:
- Primary accent: `green-500` to `emerald-600` (logo gradient)
- Text: `gray-700`, `gray-900`
- Hover: `primary` (from shadcn theme)

## File Structure

```
app/
├── components/
│   ├── Header.tsx       # Main header component
│   ├── TopBar.tsx       # Top contact bar
│   ├── MainNav.tsx      # Desktop navigation
│   ├── MobileNav.tsx    # Mobile navigation
│   └── Footer.tsx       # (existing)
├── page.tsx             # Updated to include Header
└── globals.css          # Tailwind styles
components/
└── ui/
    ├── button.tsx       # shadcn/ui Button
    └── sheet.tsx        # shadcn/ui Sheet
public/
└── logo.svg            # Logo asset
```

## Best Practices Followed

1. **"use client" directive**: All interactive components properly marked
2. **Code splitting**: Separate components for better maintainability
3. **Type safety**: Full TypeScript support
4. **Accessibility**: Proper semantic HTML and ARIA labels
5. **Performance**: Optimized with Next.js Link component for navigation
6. **Responsive design**: Mobile-first approach
7. **Reusability**: Modular component structure
8. **DRY principle**: Navigation links stored in arrays for easy maintenance

## Browser Support

Modern browsers supporting:
- CSS Grid and Flexbox
- ES6+ JavaScript features
- CSS custom properties

---

Built with ❤️ following Next.js and React best practices.
