import { StaticImageData } from "next/image";
import blogHero from "@/public/blog-hero.jpg";

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  content2?: string;
  content3?: string;
  image: StaticImageData;

  // SEO + UI fields
  date: string;
  category: string;
  bullets: string[];
  subheading: string;
  extraImages: StaticImageData[];
}

export const blogsData: Blog[] = [
  {
    id: "1",
    slug: "blog-1",
    title: "Selecting the Best Sunscreen for Your Skin Type",
    excerpt: "Learn how to choose the right sunscreen for your skin.",
    content:
      "Sunscreen is one of the most important skincare products you can use daily. Whether you have oily, dry, combination, or sensitive skin, selecting the right sunscreen can protect you from harmful UV rays while complementing your skin's unique needs. In this comprehensive guide, we'll explore everything you need to know about choosing the perfect sunscreen for your skin type, understanding SPF ratings, and identifying key ingredients that make a difference.",
    content2:
      "The importance of daily sunscreen use cannot be overstated. UV radiation from the sun can cause premature aging, dark spots, and increase your risk of skin cancer. Many people make the mistake of only applying sunscreen on sunny days or during beach trips, but dermatologists recommend wearing it every single day, regardless of the weather. Even on cloudy days, up to 80% of UV rays can penetrate through clouds and affect your skin.",
    content3:
      "When shopping for sunscreen, you'll encounter various formulations including lotions, creams, gels, sprays, and sticks. Each has its advantages depending on your lifestyle and preferences. For facial use, many people prefer lightweight, non-greasy formulas that won't clog pores or interfere with makeup application. Body sunscreens, on the other hand, may be more moisturizing and come in larger, more economical sizes.",
    image: blogHero,
    date: "2025-01-10",
    category: "Skincare",
    bullets: [
      "Understand your specific skin type and its unique characteristics",
      "Choose the appropriate SPF level - minimum SPF 30 for daily use",
      "Check for broad-spectrum protection against both UVA and UVB rays",
      "Look for non-comedogenic formulas if you have acne-prone skin",
      "Consider water-resistant options for active lifestyles",
    ],
    subheading: "Why Two Approach: Choosing Traditional Therapy vs Modern Treatment Plans is Essential for Next Gen Skin Health",
    extraImages: [blogHero, blogHero],
  },
  {
    id: "2",
    slug: "blog-2",
    title: "Selecting the Best Sunscreen for Your Skin Type",
    excerpt: "Learn how to choose the right sunscreen for your skin.",
    content:
      "Sunscreen is one of the most important skincare products you can use daily. Whether you have oily, dry, combination, or sensitive skin, selecting the right sunscreen can protect you from harmful UV rays while complementing your skin's unique needs. In this comprehensive guide, we'll explore everything you need to know about choosing the perfect sunscreen for your skin type, understanding SPF ratings, and identifying key ingredients that make a difference.",
    content2:
      "The importance of daily sunscreen use cannot be overstated. UV radiation from the sun can cause premature aging, dark spots, and increase your risk of skin cancer. Many people make the mistake of only applying sunscreen on sunny days or during beach trips, but dermatologists recommend wearing it every single day, regardless of the weather. Even on cloudy days, up to 80% of UV rays can penetrate through clouds and affect your skin.",
    content3:
      "When shopping for sunscreen, you'll encounter various formulations including lotions, creams, gels, sprays, and sticks. Each has its advantages depending on your lifestyle and preferences. For facial use, many people prefer lightweight, non-greasy formulas that won't clog pores or interfere with makeup application. Body sunscreens, on the other hand, may be more moisturizing and come in larger, more economical sizes.",
    image: blogHero,
    date: "2025-01-10",
    category: "Skincare",
    bullets: [
      "Understand your specific skin type and its unique characteristics",
      "Choose the appropriate SPF level - minimum SPF 30 for daily use",
      "Check for broad-spectrum protection against both UVA and UVB rays",
      "Look for non-comedogenic formulas if you have acne-prone skin",
      "Consider water-resistant options for active lifestyles",
    ],
    subheading: "Why Two Approach: Choosing Traditional Therapy vs Modern Treatment Plans is Essential for Next Gen Skin Health",
    extraImages: [blogHero, blogHero],
  },
  {
    id: "3",
    slug: "blog-3",
    title: "Selecting the Best Sunscreen for Your Skin Type",
    excerpt: "Learn how to choose the right sunscreen for your skin.",
    content:
      "Sunscreen is one of the most important skincare products you can use daily. Whether you have oily, dry, combination, or sensitive skin, selecting the right sunscreen can protect you from harmful UV rays while complementing your skin's unique needs. In this comprehensive guide, we'll explore everything you need to know about choosing the perfect sunscreen for your skin type, understanding SPF ratings, and identifying key ingredients that make a difference.",
    content2:
      "The importance of daily sunscreen use cannot be overstated. UV radiation from the sun can cause premature aging, dark spots, and increase your risk of skin cancer. Many people make the mistake of only applying sunscreen on sunny days or during beach trips, but dermatologists recommend wearing it every single day, regardless of the weather. Even on cloudy days, up to 80% of UV rays can penetrate through clouds and affect your skin.",
    content3:
      "When shopping for sunscreen, you'll encounter various formulations including lotions, creams, gels, sprays, and sticks. Each has its advantages depending on your lifestyle and preferences. For facial use, many people prefer lightweight, non-greasy formulas that won't clog pores or interfere with makeup application. Body sunscreens, on the other hand, may be more moisturizing and come in larger, more economical sizes.",
    image: blogHero,
    date: "2025-01-10",
    category: "Skincare",
    bullets: [
      "Understand your specific skin type and its unique characteristics",
      "Choose the appropriate SPF level - minimum SPF 30 for daily use",
      "Check for broad-spectrum protection against both UVA and UVB rays",
      "Look for non-comedogenic formulas if you have acne-prone skin",
      "Consider water-resistant options for active lifestyles",
    ],
    subheading: "Why Two Approach: Choosing Traditional Therapy vs Modern Treatment Plans is Essential for Next Gen Skin Health",
    extraImages: [blogHero, blogHero],
  },
  {
    id: "4",
    slug: "blog-4",
    title: "Selecting the Best Sunscreen for Your Skin Type",
    excerpt: "Learn how to choose the right sunscreen for your skin.",
    content:
      "Sunscreen is one of the most important skincare products you can use daily. Whether you have oily, dry, combination, or sensitive skin, selecting the right sunscreen can protect you from harmful UV rays while complementing your skin's unique needs. In this comprehensive guide, we'll explore everything you need to know about choosing the perfect sunscreen for your skin type, understanding SPF ratings, and identifying key ingredients that make a difference.",
    content2:
      "The importance of daily sunscreen use cannot be overstated. UV radiation from the sun can cause premature aging, dark spots, and increase your risk of skin cancer. Many people make the mistake of only applying sunscreen on sunny days or during beach trips, but dermatologists recommend wearing it every single day, regardless of the weather. Even on cloudy days, up to 80% of UV rays can penetrate through clouds and affect your skin.",
    content3:
      "When shopping for sunscreen, you'll encounter various formulations including lotions, creams, gels, sprays, and sticks. Each has its advantages depending on your lifestyle and preferences. For facial use, many people prefer lightweight, non-greasy formulas that won't clog pores or interfere with makeup application. Body sunscreens, on the other hand, may be more moisturizing and come in larger, more economical sizes.",
    image: blogHero,
    date: "2025-01-10",
    category: "Skincare",
    bullets: [
      "Understand your specific skin type and its unique characteristics",
      "Choose the appropriate SPF level - minimum SPF 30 for daily use",
      "Check for broad-spectrum protection against both UVA and UVB rays",
      "Look for non-comedogenic formulas if you have acne-prone skin",
      "Consider water-resistant options for active lifestyles",
    ],
    subheading: "Why Two Approach: Choosing Traditional Therapy vs Modern Treatment Plans is Essential for Next Gen Skin Health",
    extraImages: [blogHero, blogHero],
  },
  {
    id: "5",
    slug: "blog-5",
    title: "Selecting the Best Sunscreen for Your Skin Type",
    excerpt: "Learn how to choose the right sunscreen for your skin.",
    content:
      "Sunscreen is one of the most important skincare products you can use daily. Whether you have oily, dry, combination, or sensitive skin, selecting the right sunscreen can protect you from harmful UV rays while complementing your skin's unique needs. In this comprehensive guide, we'll explore everything you need to know about choosing the perfect sunscreen for your skin type, understanding SPF ratings, and identifying key ingredients that make a difference.",
    content2:
      "The importance of daily sunscreen use cannot be overstated. UV radiation from the sun can cause premature aging, dark spots, and increase your risk of skin cancer. Many people make the mistake of only applying sunscreen on sunny days or during beach trips, but dermatologists recommend wearing it every single day, regardless of the weather. Even on cloudy days, up to 80% of UV rays can penetrate through clouds and affect your skin.",
    content3:
      "When shopping for sunscreen, you'll encounter various formulations including lotions, creams, gels, sprays, and sticks. Each has its advantages depending on your lifestyle and preferences. For facial use, many people prefer lightweight, non-greasy formulas that won't clog pores or interfere with makeup application. Body sunscreens, on the other hand, may be more moisturizing and come in larger, more economical sizes.",
    image: blogHero,
    date: "2025-01-10",
    category: "Skincare",
    bullets: [
      "Understand your specific skin type and its unique characteristics",
      "Choose the appropriate SPF level - minimum SPF 30 for daily use",
      "Check for broad-spectrum protection against both UVA and UVB rays",
      "Look for non-comedogenic formulas if you have acne-prone skin",
      "Consider water-resistant options for active lifestyles",
    ],
    subheading: "Why Two Approach: Choosing Traditional Therapy vs Modern Treatment Plans is Essential for Next Gen Skin Health",
    extraImages: [blogHero, blogHero],
  },

  {
    id: "6",
    slug: "blog-6",
    title: "Understanding the Role of a Primary Care Physician",
    excerpt: "Discover why a primary care physician is essential.",
    content:
      "A primary care physician (PCP) serves as your healthcare quarterback, coordinating all aspects of your medical care and serving as your first point of contact for health concerns. They manage preventive care, diagnose and treat common illnesses, monitor chronic conditions, and provide referrals to specialists when needed.",
    content2:
      "Regular visits to your primary care physician allow for continuous monitoring of your health status, early detection of potential problems, and personalized preventive care strategies. Your PCP maintains your complete medical history, understands your health goals and concerns, and can provide holistic care that considers all aspects of your physical and mental health.",
    content3:
      "In today's complex healthcare system, having a trusted primary care physician who knows your medical history and can coordinate your care across different specialists and facilities is invaluable. They can help you navigate insurance coverage, understand treatment options, and make informed decisions about your health.",
    image: blogHero,
    date: "2025-01-12",
    category: "Healthcare",
    bullets: [
      "Comprehensive preventive healthcare and wellness screenings",
      "Early diagnosis and treatment of acute and chronic conditions",
      "Coordinated treatment plans across multiple specialists",
      "Management of chronic diseases like diabetes and hypertension",
    ],
    subheading: "Your First Point of Contact for Comprehensive Healthcare",
    extraImages: [blogHero, blogHero],
  },
];
