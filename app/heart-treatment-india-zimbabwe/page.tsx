"use client";
import Image from "next/image";
import Rajesh from "@/public/Dr. Rajesh Sharma.jpg";
import Vishal from "@/public/Dr. Vishal Dhir.jpg";
import smita from "@/public/smrita.jpg";



import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Star,
  MessageCircle,
  Heart,
  Plane,
  FileText,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS — matching Manal Healthcare website theme
   Primary Green:   #16a34a  (green-600)
   Dark Green:      #14532d  (green-900)
   Deep Green:      #052e16  (green-950)
   CTA Red:         from-red-900 to-red-600  (matches TopBar)
   Light BG:        #f0fdf4  (green-50)
   Text Primary:    #14532d  (green-900)
   Text Muted:      #4b5563  (gray-600)
   Accent Amber:    #f59e0b  — only for star ratings
───────────────────────────────────────────────────────────── */

// ── animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};
const fadeLeft = {
  hidden: { opacity: 0, x: 56 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};
const VP = { once: true, margin: "-60px" };

// ─── NAVBAR ──────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    "Why India",
    "Treatments",
    "Doctors",
    "Hospitals",
    "Visa Help",
    "Patient Stories",
  ];
  return (
    <nav className="sticky top-0 z-50 bg-green-900 shadow-lg">
      <div className="bg-green-950 text-xs text-green-200 py-1 px-4 flex flex-wrap justify-center gap-4">
        <span>📞 +91 7394966566</span>
        <span>✉ info@manalhealthcare.com</span>
        <span>🕐 Available 24/7 for emergencies</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none tracking-tight">
              Manal
            </p>
            <p className="text-green-300 text-[10px] font-semibold tracking-widest uppercase leading-none">
              Healthcare
            </p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-green-100 hover:text-white text-sm font-semibold transition-colors duration-150"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-1.5 text-white bg-green-600 hover:bg-green-500 text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href="#"
            className="text-green-900 bg-white hover:bg-green-50 text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Free Treatment Plan
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-green-800 border-t border-green-700 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-green-100 text-sm font-semibold py-1 border-b border-green-700"
            >
              {l}
            </a>
          ))}
          <a
            href="#"
            className="mt-2 text-center text-green-900 bg-white hover:bg-green-50 font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            Free Treatment Plan
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────
function Hero() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    phone: "",
    treatment: "",
    condition: "",
  });

  const treatments = [
    "Coronary Artery Bypass Grafting (CABG)",
    "Heart Valve Replacement",
    "Angioplasty & Stenting",
    "Heart Transplant",
    "Pacemaker Implant",
    "Aortic Surgery",
    "Orthopedic Surgery",
    "Cancer Treatment",
    "Kidney Transplant",
    "Other",
  ];

  return (
    <section className="bg-linear-to-br from-green-900 via-green-800 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 55%, #4ade80 0%, transparent 50%), radial-gradient(circle at 80% 15%, #86efac 0%, transparent 45%)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-xs font-bold uppercase tracking-wider">
              For Patients in Zimbabwe Seeking Heart Treatment in India
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-[3.2rem] font-black text-white leading-tight mb-4"
          >
            World-Class Medical
            <br />
            Treatment in India
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-green-300 mb-6 italic"
          >
            Affordable. Proven. Guided.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-green-100 text-base leading-relaxed mb-8 max-w-lg"
          >
            Zimbabwe's cardiac hospitals cannot handle most complex heart
            conditions — and South Africa is expensive with long waiting lists.
            India's top hospitals perform the same procedures as the UK and USA,
            with senior surgeons, immediate availability, and costs 60–80%
            lower. Manal Healthcare is your dedicated guide from Harare to Delhi
            and back home.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            {[
              "💬 24/7 Support",
              "✈️ Travel & Visa Help",
              "🏥 Top Hospitals",
              "💰 Best Prices",
              "🔒 Fully Guided",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="bg-white hover:bg-green-50 text-green-900 font-black px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Free Treatment Plan →
            </a>
            <a
              href="https://wa.me/917394966566"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Message on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-green-900 px-6 py-4">
            <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-1">
              Free Consultation
            </p>
            <h2 className="text-white font-black text-xl">
              Get Your Treatment Plan
            </h2>
            <p className="text-green-200 text-xs mt-1">
              Our Cardiac specialists respond within 30 minutes
            </p>
          </div>
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="+XX XXX XXX XXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">
                Country
              </label>
              <select
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                <option value="">Select your country</option>
                <option>Zimbabwe</option>
                <option>Zambia</option>
                <option>South Africa</option>
                <option>Kenya</option>
                <option>Nigeria</option>
                <option>Ghana</option>
                <option>Saudi Arabia</option>
                <option>UAE</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">
                Treatment Needed
              </label>
              <select
                value={form.treatment}
                onChange={(e) =>
                  setForm({ ...form, treatment: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                <option value="">Select treatment needed</option>
                {treatments.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">
                Medical Condition / Diagnosis
              </label>
              <input
                type="text"
                placeholder="e.g. Blocked arteries, knee replacement..."
                value={form.condition}
                onChange={(e) =>
                  setForm({ ...form, condition: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">
                When can you travel to India? (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Within a month, 2–3 months..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5">
              Get My Free Treatment Plan →
            </button>
            <a
              href="https://wa.me/917394966566"
              className="flex items-center justify-center gap-2 w-full border-2 border-[#25D366] text-green-700 hover:bg-[#25D366] hover:text-white font-bold py-3 rounded-xl text-sm transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Message us on WhatsApp instead
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TESTIMONIAL BAR ─────────────────────────────────────────
function TestimonialBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.5 }}
      className="bg-green-800 py-5 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 rounded-full bg-green-600 border-2 border-white flex items-center justify-center text-white font-bold text-lg">
            T
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>
        <div className="text-white text-sm text-center sm:text-left">
          <span className="font-bold">
            "I had heart valve replacement surgery at a top hospital in Delhi
            through Manal Healthcare. From Zimbabwe to India — they handled
            everything. I came back home healthy and grateful."
          </span>
          <span className="text-green-200 ml-2 text-xs">
            — Tendai M., Harare, Zimbabwe
          </span>
        </div>
        <div className="shrink-0 ml-auto hidden sm:flex gap-2">
          {["⭐ 4.9/5 Rating", "200+ Patients", "15+ Hospitals"].map((s) => (
            <span
              key={s}
              className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── WHY CHOOSE ──────────────────────────────────────────────
const benefits = [
  {
    icon: "💰",
    title: "60–80% Lower Cost",
    desc: "India offers the same world-class surgery at 60–80% less than US, UK, or South African hospitals — with absolutely no compromise on quality.",
    stat: "$3,500",
    statLabel: "CABG starting from",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: "🏥",
    title: "NABH & JCI Accredited",
    desc: "Every hospital we work with holds international accreditation — the same standard as the best hospitals in Singapore, UK, and UAE.",
    stat: "500+",
    statLabel: "Beds in partner hospitals",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: "👨‍⚕️",
    title: "Senior Specialists Only",
    desc: "Your surgery is performed by senior consultant surgeons with 15–40+ years of experience, not residents or trainees.",
    stat: "25+",
    statLabel: "Years average experience",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: "🛂",
    title: "Medical Visa — We Handle It",
    desc: "We prepare your hospital invitation letter, medical documents, and guide you through the entire Indian medical visa process. Approved in days.",
    stat: "7–10",
    statLabel: "Days visa approval",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: "🚗",
    title: "No Waiting Lists",
    desc: "Parirenyatwa Hospital stopped performing cardiac surgeries due to specialist shortages. India has immediate availability — no referral needed, no waiting list.",
    stat: "0",
    statLabel: "Waiting list days",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: "🌐",
    title: "Dedicated Coordinator",
    desc: "Our patient coordinators guide you from airport pickup to discharge — handling hospital communication, translation, and logistics.",
    stat: "24/7",
    statLabel: "Support availability",
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

function WhyChoose() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="text-center mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-widest text-green-600 mb-2"
          >
            WHY US
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-green-900 mb-4"
          >
            Why international patients choose India for healthcare
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed"
          >
            India is home to world-class hospitals with international
            accreditation, zero waiting lists, and costs a fraction of Western
            alternatives — without any compromise on quality of care.
          </motion.p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              className="border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-xl hover:border-green-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 ${b.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}
              >
                {b.icon}
              </div>
              <h3 className="font-black text-green-900 text-base mb-2">
                {b.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {b.desc}
              </p>
              <div className="pt-3 border-t border-gray-200">
                <p className={`text-2xl font-black ${b.color}`}>{b.stat}</p>
                <p className="text-xs text-gray-400 font-semibold">
                  {b.statLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── SPECIALTIES ─────────────────────────────────────────────
const otherTreatments = [
  { icon: "🫀", name: "Angioplasty & Stenting", price: "From $3,000" },
  { icon: "🔬", name: "Heart Valve Replacement", price: "From $7,500" },
  { icon: "💉", name: "ASD VSD Closure", price: "From $5,800" },
  {
    icon: "🔪",
    name: "AVR Surgery (aortic valve replacement surgery)",
    price: "From $7,500",
  },
  { icon: "♥️", name: "ICD", price: "From $10,000-13,000" },
  { icon: "🩺", name: "Congenital Heart Defect", price: "From $4,000" },
  { icon: "📊", name: "Cardiac medical treatment", price: "From $2,500-3000" },
  { icon: "❓", name: "Not Sure? Get a Second Opinion", price: "Free" },
];

function Specialties() {
  return (
    <section className="py-16 md:py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="mb-10"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-widest text-green-600 mb-2"
          >
            CARDIAC EXPERTISE
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-green-900 mb-3"
          >
            Specialized cardiac care — every procedure covered
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-sm">
            From bypass surgery to heart transplants, our partner hospitals
            handle the full spectrum of cardiac procedures with exceptional
            success rates.
          </motion.p>
        </motion.div>

        {/* Featured CABG */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="bg-green-900 rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Most Requested
              </span>
            </div>
            <h3 className="text-white font-black text-2xl mb-3">
              Coronary Artery Bypass Grafting (CABG)
            </h3>
            <p className="text-green-200 text-sm leading-relaxed mb-4 max-w-xl">
              The most common heart surgery requested by international patients
              coming to India. Our partner hospitals perform hundreds of CABG
              procedures every month with exceptional outcomes and some of the
              highest success rates in the world.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "On-Pump CABG",
                "Off-Pump CABG",
                "Total Arterial",
                "Robotic-Assisted",
                "Minimally Invasive",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 text-green-100 text-xs font-semibold px-3 py-1 rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          <a href="/testimonials" className="text-green-300 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
  View Case Studies <ChevronRight className="w-4 h-4" />
</a>
          </div>
          <div className="shrink-0 text-center">
            <p className="text-green-400 font-black text-4xl">$4,500</p>
            <p className="text-green-200 text-xs">Starting from</p>
            <p className="text-gray-400 text-xs line-through mt-1">
              US $40,000+
            </p>
            <Link
  href="/contact"
  className="mt-4  bg-white hover:bg-green-50 text-green-900 font-black px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm"
>
  Get a Quote
</Link>
          </div>
        </motion.div>

        <p className="text-sm font-bold text-gray-500 mb-4">
          Other cardiac treatments available:
        </p>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {otherTreatments.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="bg-white border border-gray-100 rounded-xl p-4 hover:border-green-500 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <span className="text-2xl mb-2 block">{t.icon}</span>
              <p className="font-bold text-green-900 text-sm mb-1 group-hover:text-green-600 transition-colors">
                {t.name}
              </p>
              <p className="text-xs font-black text-green-600">{t.price}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── PROCESS STEPS ───────────────────────────────────────────
const steps = [
  {
    num: "01",
    icon: <FileText className="w-6 h-6" />,
    title: "Share Your Reports",
    desc: "Send us your diagnosis, imaging scans, or any available medical records. WhatsApp or email — we accept all formats.",
    color: "bg-green-600",
  },
  {
    num: "02",
    icon: <Calendar className="w-6 h-6" />,
    title: "Get Your Quote",
    desc: "Our senior specialists review your case and provide a detailed treatment plan with cost estimates from multiple top hospitals within 24 hours.",
    color: "bg-amber-500",
  },
  {
    num: "03",
    icon: <Plane className="w-6 h-6" />,
    title: "Visa & Travel",
    desc: "We prepare your Indian Medical Visa invitation letter, handle hotel bookings, airport transfers, and ensure a smooth arrival in Delhi or Mumbai.",
    color: "bg-emerald-600",
  },
  {
    num: "04",
    icon: <Heart className="w-6 h-6" />,
    title: "Arrive & Recover",
    desc: "Your coordinator meets you at the airport. You receive world-class treatment and are guided through recovery before returning home healthy.",
    color: "bg-green-500",
  },
];

function ProcessSteps() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-widest text-green-600 mb-2"
          >
            HOW IT WORKS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-green-900 mb-3"
          >
            From your country to India — in 4 simple steps
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-sm max-w-xl"
          >
            We have simplified the entire process so getting world-class
            treatment in India is stress-free, affordable, and fully guided from
            start to finish.
          </motion.p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((s, i) => (
            <motion.div key={s.num} variants={fadeUp} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-100 z-0 -translate-x-4" />
              )}
              <div className="relative z-10 flex flex-col items-start">
                <div
                  className={`w-16 h-16 ${s.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}
                >
                  {s.icon}
                </div>
                <span className="text-5xl font-black text-gray-100 absolute -top-2 -right-2 leading-none select-none">
                  {s.num}
                </span>
                <h3 className="font-black text-green-900 text-base mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="mt-10 text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-green-900 hover:bg-green-800 text-white font-black px-8 py-4 rounded-xl text-sm transition-colors shadow-lg"
          >
            Start My Treatment Journey <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── DOCTORS ─────────────────────────────────────────────────
const doctors = [
  {
    name: "Dr. Vishal Dhir",
    title: "Senior Cardiothoracic & Vascular Surgeon",
    hospital: "Senior Cardiothoracic & Vascular Surgeon",
    exp: "20+ years experience",
    surgeries: "10,000+ surgeries",
    spec: "CABG, Valve Replacement",
    image: Vishal,
  },
  {
    name: "Dr. Smita Mishra",
    title: "Senior Pediatric Cardiologist & Head of Pediatric Cardiology",
    hospital: "Manipal Hospital, Dwarka Sector 6, Delhi NCR",
    exp: "35+ years experience",
    surgeries: "15,000+ surgeries",
    spec: "Heart Transplant, CABG",
    image: smita,
  },
  {
    name: "Dr. Rajesh Sharma",
    title: "Senior Pediatric Cardiothoracic Surgeon /  Pediatric Cardiac Surgery",
    hospital: "Senior Pediatric Cardiothoracic Surgeon ",
    exp: "30+ years experience",
    surgeries: "8,000+ procedures",
    spec: "Angioplasty, Stenting",
    image: Rajesh,
  },
];
function Doctors() {
  return (
    <section className="py-16 md:py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-widest text-green-600 mb-2"
          >
            OUR DOCTORS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-green-900 mb-3"
          >
            Senior specialists — not junior residents
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-sm max-w-xl"
          >
            Every patient at Manal Healthcare is treated by top consultant-level
            surgeons at their respective partner hospitals — with decades of
            hands-on experience.
          </motion.p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-widest text-green-600 mb-2"
          >
            OUR DOCTORS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-green-900 mb-3"
          >
            Senior specialists — not junior residents
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-sm max-w-xl"
          >
            Every patient at Manal Healthcare is treated by top consultant-level
            surgeons at their respective partner hospitals — with decades of
            hands-on experience.
          </motion.p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="grid md:grid-cols-3 gap-6"
        >
          {doctors.map((d) => (
            <motion.div
              key={d.name}
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 relative">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-black text-green-900 text-base leading-tight">
                    {d.name}
                  </h3>
                  <p className="text-green-600 text-xs font-bold">{d.title}</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-3 mb-4">
                <p className="text-xs text-gray-500 font-semibold">
                  🏥 {d.hospital}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  {d.exp}
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                  {d.surgeries}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-semibold mb-4">
                Specialty: {d.spec}
              </p>
              <a href="/contact" className="w-full border-2 p-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white text-xs font-black py-2.5 rounded-xl transition-colors">
                Request Appointment
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOSPITALS ───────────────────────────────────────────────
const hospitals = [
  {
    name: "Apollo Hospitals, Delhi",
    rating: "★★★★★ 4.9",
    beds: "710 beds",
    type: "JCI + NABH Accredited",
    initials: "AH",
    color: "bg-green-600",
  },
  {
    name: "Fortis Escorts Heart Institute",
    rating: "★★★★★ 4.8",
    beds: "310 cardiac beds",
    type: "JCI + NABH Accredited",
    initials: "FE",
    color: "bg-red-500",
  },
  {
    name: "Medanta — The Medicity",
    rating: "★★★★★ 4.9",
    beds: "1,250 beds",
    type: "JCI Accredited",
    initials: "ME",
    color: "bg-emerald-600",
  },
  {
    name: "Max Super Speciality Hospital",
    rating: "★★★★☆ 4.7",
    beds: "500+ beds",
    type: "NABH Accredited",
    initials: "MS",
    color: "bg-green-700",
  },
];

function Hospitals() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-widest text-green-600 mb-2"
          >
            TOP HOSPITALS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-green-900 mb-3"
          >
            Internationally accredited partner hospitals
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-sm">
            Every hospital Manal Healthcare works with is NABH &amp; JCI
            accredited — the same standard as the best hospitals in the USA and
            Singapore.
          </motion.p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="grid sm:grid-cols-2 gap-5"
        >
          {hospitals.map((h) => (
            <motion.div
              key={h.name}
              variants={fadeUp}
              className="flex items-center gap-4 border border-gray-100 rounded-2xl p-5 hover:border-green-500 hover:shadow-md transition-all duration-200 group"
            >
              <div
                className={`w-14 h-14 ${h.color} rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0`}
              >
                {h.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-green-900 text-sm mb-1">
                  {h.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-amber-500 text-xs font-bold">
                    {h.rating}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-xs">{h.beds}</span>
                </div>
                <span className="inline-block mt-1 bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {h.type}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-green-600 transition-colors shrink-0" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── VISA SECTION ────────────────────────────────────────────
const visaSteps = [
  {
    num: "01",
    title: "We prepare your hospital letter",
    desc: "Manal Healthcare arranges the official hospital invitation letter and medical documentation required for your Indian Medical Visa application.",
  },
  {
    num: "02",
    title: "Apply at the Indian High Commission",
    desc: "You submit your visa application at the nearest Indian High Commission. We guide you on every document to bring and every form to fill.",
  },
  {
    num: "03",
    title: "Book your flights",
    desc: "We advise on the best flights from your city to Delhi or Mumbai with the lowest available fares for your travel dates.",
  },
  {
    num: "04",
    title: "We receive you at the airport",
    desc: "Our representative meets you at the airport with a name board. You are transferred directly to the hospital or hotel — zero stress.",
  },
];

function VisaSection() {
  return (
    <section className="py-16 md:py-24 bg-green-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #4ade80 0, #4ade80 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="max-w-2xl mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-widest text-green-400 mb-2"
          >
            VISA & TRAVEL
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-white mb-4"
          >
            The Indian medical visa process is simpler than you think
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-green-200 text-sm leading-relaxed"
          >
            The biggest concern many patients have is obtaining an Indian
            medical visa. Manal Healthcare guides every patient through the
            entire process — from hospital letter to landing in India.
          </motion.p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {visaSteps.map((s) => (
            <motion.div
              key={s.num}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
            >
              <p className="text-green-400 font-black text-3xl mb-3">{s.num}</p>
              <h3 className="text-white font-bold text-sm mb-2">{s.title}</h3>
              <p className="text-green-200 text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="bg-white/10 border border-white/20 rounded-2xl p-6 text-green-100 text-sm leading-relaxed"
        >
          <p>
            <span className="text-green-300 font-bold">Note: </span>
            We have helped hundreds of patients obtain Indian medical visas from
            Zimbabwe, Zambia, Kenya, Nigeria, and other countries. The approval
            rate is over 98% when applications are submitted correctly. Manal
            Healthcare checks all your documents before submission to ensure
            there are no errors.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PATIENT TESTIMONIALS ────────────────────────────────────
const testimonials = [
  {
    name: "Tendai Moyo",
    location: "Harare, Zimbabwe",
    rating: 5,
    text: "I could not believe valve replacement could be done at this price. We were quoted USD 42,000 in South Africa, but Manal Healthcare arranged the same surgery at Fortis Escorts for a fraction of that cost. The care was exceptional — I am back to normal life.",
    treatment: "Heart Valve Replacement",
    initials: "TM",
    color: "bg-green-600",
  },
  {
    name: "Simba M.",
    location: "Bulawayo, Zimbabwe",
    rating: 5,
    text: "My husband needed triple bypass surgery. We were nervous about travelling to India but Manal Healthcare was with us at every step — airport pickup, hospital coordination, doctor meetings. We felt safe the entire time. The surgeon had over 30 years of experience.",
    treatment: "Triple Bypass CABG",
    initials: "SM",
    color: "bg-emerald-600",
  },
];

function PatientTestimonials() {
  return (
    <section className="py-16 md:py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-widest text-green-600 mb-2"
          >
            PATIENT STORIES
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-green-900 mb-3"
          >
            Real patients. Real results.
          </motion.h2>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="grid md:grid-cols-2 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i <= t.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-green-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                  </div>
                </div>
                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  {t.treatment}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────
const faqs = [
  {
    q: "How do I know the hospital is genuinely high quality?",
    a: "All our partner hospitals hold JCI (Joint Commission International) and NABH accreditation — the highest international standards for hospital quality. These are the same certifications held by the best hospitals in Singapore, UK, and UAE. We only partner with hospitals that rank at the top tier for their respective specialties.",
  },
  {
    q: "What does the total cost actually include?",
    a: "Our treatment quotes include surgeon fees, anesthesiologist fees, hospital room, ICU stay, the surgery itself, medications during hospital stay, and post-operative check-ups before discharge. We provide a full cost breakdown before you travel — no surprises.",
  },
  {
    q: "Can a family member travel with me?",
    a: "Absolutely. We strongly encourage patients to bring one companion. We assist with their Medical Attendant Visa (separate from the Patient Visa) and can arrange affordable accommodation near the hospital.",
  },
  {
    q: "How long would I need to stay in India?",
    a: "For cardiac surgeries like CABG, plan for 3–4 weeks total — approximately 1 week in hospital and 2–3 weeks of recovery before the doctor clears you to fly home. Simpler procedures like angioplasty may require only 5–7 days.",
  },
  {
    q: "What support do I get after returning home?",
    a: "We provide 90-day post-treatment support. Our medical team is available on WhatsApp to review reports, advise on medications, and guide your local doctors on follow-up care.",
  },
  {
    q: "My local doctor in Zimbabwe said I need heart surgery but I don't know which hospital to trust. Where do I start?",
    a: "Start by sending us whatever you have — a local doctor's letter, an ECG report, or even just a description of your symptoms on WhatsApp. We have a senior Indian cardiologist review your case and tell you exactly what procedure is needed and at which hospital. This review is free. Most Zimbabwe patients who contact us without a full diagnosis have a complete treatment plan within 48 hours.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-widest text-green-600 mb-2"
          >
            COMMON QUESTIONS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-green-900"
          >
            Frequently asked questions
          </motion.h2>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="flex flex-col gap-3"
        >
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${open === i ? "border-green-500 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span
                  className={`text-sm font-bold pr-4 ${open === i ? "text-green-900" : "text-gray-700"}`}
                >
                  {f.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180 text-green-600" : "text-gray-400"}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 text-sm leading-relaxed px-5 pb-5">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── BOTTOM CTA ──────────────────────────────────────────────
function BottomCTA() {
  return (
    <section className="bg-green-900 py-16 md:py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={VP}
        className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-black uppercase tracking-widest text-green-400 mb-2"
        >
          FOR A BETTER LIFE
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight"
        >
          Get your personalised treatment plan
          <br />
          within 24 hours
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-green-200 text-sm mb-8 leading-relaxed"
        >
          Share your reports or describe your symptoms. A senior cardiac
          specialist reviews your case and sends a full treatment plan and cost
          estimate in USD — with no obligation, no upfront payment, and no
          pressure.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/contact"
            className="bg-white hover:bg-green-50 text-green-900 font-black px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Get My Free Treatment Plan →
          </a>
          <a
            href="https://wa.me/917394966566"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-black px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us Now
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── LANDING FOOTER ──────────────────────────────────────────
function LandingFooter() {
  return (
    <footer className="bg-green-950 text-green-200 py-10 px-4">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-green-700" />
            </div>
            <span className="text-white font-black text-base">
              Manal Healthcare
            </span>
          </div>
          <p className="text-xs leading-relaxed text-green-300">
            Connecting international patients with world-class medical care in
            India. Affordable, proven, and fully guided.
          </p>
        </div>
        <div>
          <p className="text-white font-bold text-sm mb-3">Treatments</p>
          {[
            "CABG Surgery",
            "Heart Valve Replacement",
            "Angioplasty",
            "Pacemaker",
            "Heart Transplant",
          ].map((t) => (
            <a
              key={t}
              href="#"
              className="block text-xs text-green-300 hover:text-green-100 mb-1.5 transition-colors"
            >
              {t}
            </a>
          ))}
        </div>
        <div>
          <p className="text-white font-bold text-sm mb-3">Services</p>
          {[
            "Hospital Selection",
            "Doctor Consultation",
            "Visa Assistance",
            "Airport Transfer",
            "Interpreter Services",
          ].map((s) => (
            <a
              key={s}
              href="#"
              className="block text-xs text-green-300 hover:text-green-100 mb-1.5 transition-colors"
            >
              {s}
            </a>
          ))}
        </div>
        <div>
          <p className="text-white font-bold text-sm mb-3">Contact</p>
          <div className="flex flex-col gap-2 text-xs text-green-300">
            <span>📞 +91 98765 43210</span>
            <span>✉ info@manalhealthcare.com</span>
            <span>💬 WhatsApp Available 24/7</span>
            <span>📍 Delhi, India</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 text-center text-xs text-green-400">
        © {new Date().getFullYear()} Manal Healthcare. All rights reserved. |{" "}
        <a href="#" className="hover:text-green-200">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="#" className="hover:text-green-200">
          Terms
        </a>
      </div>
    </footer>
  );
}

// ─── FLOATING WHATSAPP ───────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 220 }}
      whileHover={{ scale: 1.12, y: -4 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1eb85a] rounded-full flex items-center justify-center shadow-2xl"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </motion.a>
  );
}

// ─── STICKY MOBILE BAR ───────────────────────────────────────
function StickyMobileBar() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-3 shadow-2xl"
    >
      <a
        href="https://wa.me/919876543210"
        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-black text-sm py-3 rounded-xl"
      >
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </a>
      <a
        href="#contact"
        className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-black text-sm py-3 rounded-xl transition-colors"
      >
        Free Plan →
      </a>
    </motion.div>
  );
}

// ─── ROOT PAGE ───────────────────────────────────────────────
export default function ManalHealthcarePage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'DM Sans', 'Nunito Sans', system-ui, sans-serif" }}
    >
      {/* <Navbar /> */}
      <Hero />
      <TestimonialBar />
      <WhyChoose />
      <Specialties />
      <ProcessSteps />
      <Doctors />
      <Hospitals />
      <VisaSection />
      <PatientTestimonials />
      <FAQ />
      <BottomCTA />
      {/* <LandingFooter /> */}
      {/* <FloatingWhatsApp /> */}
      <StickyMobileBar />
    </div>
  );
}
