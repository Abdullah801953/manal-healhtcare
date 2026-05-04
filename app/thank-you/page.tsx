
// app/thank-you/page.tsx (or pages/thank-you.tsx if using Pages Router)
"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

// ========== FONT CONFIGURATION ==========
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
});

// ========== ICONS ==========
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,12 2,6" />
  </svg>
);

// ========== DATA ==========
const services = [
  { icon: "🏥", label: "Hospital Selection & Booking" },
  { icon: "👨‍⚕️", label: "Right Doctor, Right Specialty" },
  { icon: "✈️", label: "Travel & Visa Assistance" },
  { icon: "🛎️", label: "Accommodation Support" },
  { icon: "💬", label: "Language & Communication Help" },
  { icon: "🔄", label: "Second Opinion Guidance" },
  { icon: "📋", label: "Treatment Plan Review" },
  { icon: "🏠", label: "Post-Treatment Follow-Up" },
];

const trustPills = [
  "🏅 NABH Accredited Hospitals",
  "🌍 JCI Certified Partners",
  "👨‍⚕️ Board-Certified Specialists",
  "📍 Pan-India Network",
  "🤝 Verified & Reviewed",
];

const steps = [
  { num: 1, title: "We Review Your Inquiry", desc: "Our team reads your message carefully and understands your medical need." },
  { num: 2, title: "Your Case Manager Reaches Out", desc: "A dedicated case manager will contact you via WhatsApp or Email — usually within a few hours." },
  { num: 3, title: "We Build Your Personal Care Plan", desc: "Based on your needs, we suggest the right hospital, doctor, and treatment options — clearly and simply." },
  { num: 4, title: "You Decide — No Pressure", desc: "You take your time. We answer all your questions until you feel fully comfortable and ready." },
];

const ctaButtons = [
  { label: "Chat on WhatsApp", href: "https://wa.me/917394966566?text=Hello%20Manal%20Healthcare%2C%20I%20just%20submitted%20my%20inquiry%20and%20would%20like%20to%20connect.", className: "btn-whatsapp", icon: <WhatsAppIcon />, external: true },
  { label: "Send an Email", href: "mailto:support@manalhealthcare.com?subject=Medical%20Inquiry%20Follow-Up", className: "btn-email", icon: <EmailIcon />, external: false },
];

const contactButtons = [
  { label: "Start WhatsApp Chat", href: "https://wa.me/917394966566", className: "btn-whatsapp", icon: <WhatsAppIcon />, external: true },
  { label: "support@manalhealthcare.com", href: "mailto:support@manalhealthcare.com", className: "btn-email", icon: <EmailIcon />, external: false },
];

// ========== ANIMATION VARIANTS ==========
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.58, 1] as const },
  },
} satisfies Variants;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
} satisfies Variants;

const popIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
} satisfies Variants;

const rippleVariants = {
  hidden: { scale: 0.6, opacity: 0.5 },
  visible: (custom: number) => ({
    scale: [0.6, 1.8],
    opacity: [0.5, 0],
    transition: { duration: 1.2, delay: custom, ease: [0, 0, 0.58, 1] as const },
  }),
} satisfies Variants;

const drawTick = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2, ease: [0.42, 0, 0.58, 1] as const },
  },
} satisfies Variants;

// ========== MAIN COMPONENT ==========
export default function ThankYouPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={`${dmSans.variable} ${cormorant.variable} font-sans min-h-screen`}
      style={{ backgroundColor: "var(--cream)", color: "var(--text-dark)" }}
    >
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative overflow-hidden text-center px-6 pt-[72px] pb-20"
        style={{ background: "linear-gradient(145deg, #0F4A4A 0%, #1A6B6B 55%, #1E7A6A 100%)" }}
      >
        <div className="absolute -top-[60px] -right-[60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.04)" }} />
        <div className="absolute -bottom-20 -left-10 w-[260px] h-[260px] rounded-full pointer-events-none" style={{ background: "rgba(196,148,58,0.12)" }} />

        <div className="relative mx-auto mb-7 w-[72px] h-[72px]">
          <motion.div
            className="absolute inset-0 rounded-full bg-white/30"
            variants={rippleVariants}
            custom={0}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            variants={rippleVariants}
            custom={0.3}
            initial="hidden"
            animate="visible"
          />
          <motion.svg
            className="w-full h-full relative z-10"
            viewBox="0 0 52 52"
            variants={popIn}
            initial="hidden"
            animate="visible"
            style={{ background: "rgba(255,255,255,0.12)", borderRadius: "50%", backdropFilter: "blur(2px)" }}
          >
            <circle cx="26" cy="26" r="25" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <circle cx="26" cy="26" r="25" fill="none" stroke="#4ECDC4" strokeWidth="2.5" strokeDasharray="157" strokeDashoffset="157" />
            <motion.path
              fill="none"
              stroke="#4ECDC4"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 26 L24 34 L38 18"
              variants={drawTick}
              initial="hidden"
              animate="visible"
            />
          </motion.svg>
        </div>

        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full mb-7 px-4 py-1.5 text-[0.78rem] font-medium tracking-widest uppercase" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#D4EDEA" }}>
          <span className="w-[7px] h-[7px] rounded-full inline-block animate-pulse" style={{ background: "#4ECDC4" }} />
          Inquiry Received
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-cormorant font-semibold text-white mb-5"
          style={{ fontSize: "clamp(2.4rem, 6vw, 3.8rem)", lineHeight: "1.15" }}
        >
          Your inquiry is<br />
          <em className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-white bg-[length:200%_auto] animate-shimmer" style={{ fontStyle: "italic" }}>
            safely with us.
          </em>
        </motion.h1>
        <motion.p variants={fadeUp} className="mx-auto max-w-[520px] font-light" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.82)" }}>
          Thank you for reaching out. We&apos;re truly glad you trusted us — and we&apos;re already here to help you take the next step.
        </motion.p>
      </motion.section>

      {/* Main Content */}
      <main className="max-w-[780px] mx-auto px-5 pb-20">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
          {/* Thank You Card */}
          <motion.div variants={fadeUp}>
            <Card className="rounded-[20px] border p-6 md:p-10" style={{ backgroundColor: "var(--warm-white)", borderColor: "var(--border)", boxShadow: "0 4px 32px rgba(26,107,107,0.08)" }}>
              <CardContent className="p-0">
                <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: "var(--gold)" }}>A Message From Us</p>
                <h2 className="font-cormorant text-[1.7rem] font-semibold mb-3.5" style={{ color: "var(--teal)" }}>You&apos;ve taken a brave first step.</h2>
                <p className="font-light text-[0.95rem] mb-3" style={{ color: "var(--text-mid)" }}>We know that reaching out for medical help — especially from abroad — takes courage. Thank you for trusting Manal Healthcare with your care.</p>
                <p className="font-light text-[0.95rem]" style={{ color: "var(--text-mid)" }}>Your message has been received. Our team will review your inquiry and personally get in touch with you very soon. You are not alone in this.</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Case Manager Card */}
          <motion.div variants={fadeUp}>
            <Card className="rounded-2xl p-7" style={{ backgroundColor: "var(--teal-pale)", border: "1.5px solid rgba(26,107,107,0.15)" }}>
              <CardContent className="p-0 flex gap-5 items-start">
                <div className="flex-shrink-0 w-[52px] h-[52px] rounded-full flex items-center justify-center text-[1.4rem]" style={{ backgroundColor: "var(--teal)" }}>👤</div>
                <div>
                  <h3 className="font-cormorant text-[1.25rem] font-semibold mb-1.5" style={{ color: "var(--teal)" }}>Your Dedicated Case Manager</h3>
                  <p className="font-light text-[0.9rem]" style={{ color: "var(--text-mid)" }}>A personal case manager will be assigned to you shortly. They will connect with you directly — via WhatsApp or Email — to understand your needs, answer your questions, and guide you step by step.</p>
                  <p className="mt-2.5 text-[0.85rem] font-medium" style={{ color: "var(--teal)" }}>Response time: usually within a few hours on working days.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Card */}
          <motion.div variants={fadeUp}>
            <Card className="text-center rounded-[20px] p-6 md:p-10" style={{ backgroundColor: "var(--warm-white)", borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <p className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase mb-2.5" style={{ color: "var(--text-soft)" }}>Don&apos;t want to wait?</p>
                <h2 className="font-cormorant text-[1.6rem] mb-2" style={{ color: "var(--text-dark)" }}>Connect with us right now</h2>
                <p className="text-[0.88rem] mb-7" style={{ color: "var(--text-soft)" }}>Our team is available to answer your questions directly — no waiting, no forms.</p>
                <div className="flex flex-wrap gap-3.5 justify-center">
                  {ctaButtons.map(({ label, href, className, icon, external }) => (
                    <Button key={label} asChild className={`${className} rounded-full px-7 py-3.5 h-auto font-medium gap-2.5`} style={{ backgroundColor: className === "btn-whatsapp" ? "#25D366" : "var(--warm-white)", color: className === "btn-whatsapp" ? "#fff" : "var(--teal)", border: className === "btn-email" ? "1.5px solid var(--teal)" : "none" }}>
                      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {icon} {label}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* How We Help Card */}
          <motion.div variants={fadeUp}>
            <Card className="rounded-[20px] p-6 md:p-10" style={{ backgroundColor: "var(--warm-white)", borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: "var(--gold)" }}>How We Help</p>
                <h2 className="font-cormorant text-[1.7rem] font-semibold mb-3.5" style={{ color: "var(--teal)" }}>We make medical travel easy for you.</h2>
                <p className="font-light text-[0.95rem] mb-3" style={{ color: "var(--text-mid)" }}>We know that medical travel can feel overwhelming — especially when you&apos;re in a different country, speaking a different language, and dealing with a health concern.</p>
                <p className="font-light text-[0.95rem]" style={{ color: "var(--text-mid)" }}>That&apos;s why Manal Healthcare exists. We sit by your side through every step — from your first question to the day you go back home, healthy and cared for.</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Services Grid */}
          <motion.div variants={fadeUp}>
            <Card className="rounded-[20px] p-6 md:p-10" style={{ backgroundColor: "var(--warm-white)", borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: "var(--gold)" }}>Our Services</p>
                <h2 className="font-cormorant text-[1.7rem] font-semibold mb-5" style={{ color: "var(--teal)" }}>Everything we do for you</h2>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2">
                  {services.map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-[0.88rem] border transition-all hover:translate-x-1" style={{ backgroundColor: "var(--cream)", borderColor: "var(--border)", color: "var(--text-mid)" }}>
                      <span className="text-[1.1rem] flex-shrink-0">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trust Strip */}
          <motion.div variants={fadeUp}>
            <Card className="rounded-[20px] p-9 text-center text-white" style={{ background: "linear-gradient(135deg, #0F4A4A, #1A6B6B)" }}>
              <CardContent className="p-0">
                <h2 className="font-cormorant text-[1.7rem] mb-2.5">Trusted Hospitals. Certified Doctors.</h2>
                <p className="font-light text-[0.9rem] max-w-[480px] mx-auto mb-7" style={{ color: "rgba(255,255,255,0.75)" }}>We only work with accredited hospitals and experienced specialists across India — so you always receive care you can trust.</p>
                <div className="flex flex-wrap gap-2.5 justify-center">
                  {trustPills.map((pill) => (
                    <Badge key={pill} className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.82rem] font-normal" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#D4EDEA" }}>
                      {pill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Steps */}
          <motion.div variants={fadeUp}>
            <Card className="rounded-[20px] p-6 md:p-10" style={{ backgroundColor: "var(--warm-white)", borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: "var(--gold)" }}>What Happens Next</p>
                <h2 className="font-cormorant text-[1.7rem] font-semibold mb-5" style={{ color: "var(--teal)" }}>Your next 4 simple steps</h2>
                <div className="flex flex-col gap-4 mt-5">
                  {steps.map(({ num, title, desc }) => (
                    <div key={num} className="flex items-start gap-4 group">
                      <div className="font-cormorant text-[1.1rem] font-semibold flex-shrink-0 w-[38px] h-[38px] rounded-full flex items-center justify-center transition-transform group-hover:scale-105" style={{ backgroundColor: "var(--gold-light)", border: "1.5px solid var(--gold)", color: "var(--gold)" }}>{num}</div>
                      <div>
                        <h4 className="font-medium text-[0.97rem] mb-0.5" style={{ color: "var(--text-dark)" }}>{title}</h4>
                        <p className="font-light text-[0.86rem]" style={{ color: "var(--text-soft)" }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy Card */}
          <motion.div variants={fadeUp}>
            <Card className="flex items-start gap-4 rounded-2xl p-6" style={{ backgroundColor: "var(--gold-light)", borderColor: "rgba(196,148,58,0.25)" }}>
              <span className="text-[1.6rem] flex-shrink-0">🔒</span>
              <div>
                <h4 className="font-medium text-[0.97rem] mb-1" style={{ color: "var(--text-dark)" }}>Your Information is Safe With Us</h4>
                <p className="font-light text-[0.86rem]" style={{ color: "var(--text-mid)" }}>We take your privacy very seriously. Your personal and medical details are kept completely confidential and are never shared without your permission. We follow strict data protection practices at all times.</p>
              </div>
            </Card>
          </motion.div>

          {/* Contact Again */}
          <motion.div variants={fadeUp}>
            <Card className="text-center rounded-[20px] p-6 md:p-10" style={{ backgroundColor: "var(--warm-white)", borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: "var(--gold)" }}>Need Help Right Now?</p>
                <h2 className="font-cormorant text-[1.7rem] font-semibold mb-3.5" style={{ color: "var(--teal)" }}>We&apos;re just a message away</h2>
                <p className="font-light text-[0.95rem] max-w-[440px] mx-auto mb-7" style={{ color: "var(--text-mid)" }}>Whether you have a simple question or want to share more details about your health — please reach out. We&apos;re happy to listen.</p>
                <div className="flex flex-wrap gap-3.5 justify-center">
                  {contactButtons.map(({ label, href, className, icon, external }) => (
                    <Button key={label} asChild className={`${className} rounded-full px-7 py-3.5 h-auto font-medium gap-2.5`} style={{ backgroundColor: className === "btn-whatsapp" ? "#25D366" : "var(--warm-white)", color: className === "btn-whatsapp" ? "#fff" : "var(--teal)", border: className === "btn-email" ? "1.5px solid var(--teal)" : "none" }}>
                      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {icon} {label}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Legal Note */}
          <motion.div variants={fadeUp}>
            <div className="rounded-2xl p-6 text-[0.82rem] border" style={{ backgroundColor: "var(--cream)", borderColor: "var(--border)", color: "var(--text-soft)" }}>
              <strong style={{ color: "var(--text-mid)", fontWeight: 500 }}>A note about our role:</strong> Manal Health Care acts solely as a medical tourism facilitator and does not provide medical advice, diagnosis, or treatment. All healthcare services are rendered exclusively by independent hospitals and licensed medical professionals. We make no representations or warranties regarding treatment outcomes and expressly disclaim any liability for complications, losses, or damages arising from such services. Use of our services does not establish a doctor–patient relationship. By using our services, you agree to and accept our Terms & Conditions.
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Global styles (CSS variables & keyframes) */}
      <style jsx global>{`
        :root {
          --cream: #FAF7F2;
          --warm-white: #FFFDF9;
          --teal: #1A6B6B;
          --teal-light: #2A8B8B;
          --teal-pale: #EAF4F4;
          --gold: #C4943A;
          --gold-light: #F5E6CC;
          --text-dark: #1C1C1E;
          --text-mid: #4A4A4F;
          --text-soft: #8A8A95;
          --border: #E5E0D8;
        }
        .font-cormorant {
          font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
        }
        .font-sans {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .btn-whatsapp {
          background: #25D366;
          color: #fff;
          box-shadow: 0 4px 20px rgba(37,211,102,0.35);
          transition: all 0.25s;
        }
        .btn-whatsapp:hover {
          background: #1EBE59;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(37,211,102,0.45);
        }
        .btn-email {
          background: var(--warm-white);
          color: var(--teal);
          border: 1.5px solid var(--teal);
          transition: all 0.25s;
        }
        .btn-email:hover {
          background: var(--teal);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(26,107,107,0.2);
        }
      `}</style>
    </div>
  );
}