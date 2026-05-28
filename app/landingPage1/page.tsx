"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Check,
  Star,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Users,
  Award,
  Heart,
  Plane,
  FileText,
  Calendar,
  MapPin,
  Activity,
  Stethoscope,
  Building2,
  Globe,
  Menu,
  X,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS
   Primary Navy:   #0c2340
   Gold Accent:    #e9a319
   Teal Accent:    #1b9e8f
   Light BG:       #f5f8fc
   Section BG:     #eef2f7
   Dark Section:   #0c2340
   Text Primary:   #1a2332
   Text Muted:     #64748b
───────────────────────────────────────────────────────────── */

// ─── NAVBAR ───────────────────────────────────────────────────
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
    <nav className="sticky top-0 z-50 bg-[#0c2340] shadow-lg">
      {/* Top info bar */}
      <div className="bg-[#0a1c33] text-xs text-blue-200 py-1 px-4 flex flex-wrap justify-center gap-4">
        <span>📞 +91 98765 43210</span>
        <span>✉ info@manalhealthcare.com</span>
        <span>🕐 Available 24/7 for emergencies</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#e9a319] rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none tracking-tight">
              Manal
            </p>
            <p className="text-[#e9a319] text-[10px] font-semibold tracking-widest uppercase leading-none">
              Healthcare
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-blue-100 hover:text-[#e9a319] text-sm font-semibold transition-colors duration-150"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-1.5 text-white bg-[#1b9e8f] hover:bg-[#158a7c] text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href="#"
            className="text-[#0c2340] bg-[#e9a319] hover:bg-[#d4921a] text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            Free Treatment Plan
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0d2a45] border-t border-blue-800 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-blue-100 text-sm font-semibold py-1 border-b border-blue-800"
            >
              {l}
            </a>
          ))}
          <a
            href="#"
            className="mt-2 text-center text-[#0c2340] bg-[#e9a319] font-bold px-4 py-2.5 rounded-lg"
          >
            Free Treatment Plan
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────
function Hero() {
  const [form, setForm] = useState({
    name: "",
    country: "Zimbabwe",
    phone: "",
    treatment: "",
    condition: "",
    message: "",
  });

  const treatments = [
    "Coronary Artery Bypass Grafting (CABG)",
    "Heart Valve Replacement",
    "Angioplasty & Stenting",
    "Heart Transplant",
    "Pacemaker Implant",
    "Aortic Surgery",
  ];

  return (
    <section className="bg-gradient-to-br from-[#0c2340] via-[#0f2d50] to-[#0c2340] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #e9a319 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1b9e8f 0%, transparent 40%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#e9a319]/20 border border-[#e9a319]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e9a319] animate-pulse" />
            <span className="text-[#e9a319] text-xs font-bold uppercase tracking-wider">
              Trusted by patients from Zimbabwe
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-black text-white leading-tight mb-4">
            World-Class Heart
            <br />
            Treatment in India
          </h1>
          <p className="text-3xl md:text-4xl font-black text-[#e9a319] mb-6 italic">
            Affordable. Proven. Guided.
          </p>

          <p className="text-blue-200 text-base leading-relaxed mb-8 max-w-lg">
            If you or a loved one needs cardiac treatment and looking for a
            trustworthy hospital in India, Manal Healthcare was made for you. We
            offer end-to-end cardiac care — from diagnosis to recovery — at
            India's top-ranked heart hospitals.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              "💬 Hindi Support",
              "✈️ Travel Help",
              "🏥 Top Hospitals",
              "💰 Best Prices",
              "🔒 All Insurance",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-[#e9a319] hover:bg-[#d4921a] text-[#0c2340] font-black px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
            >
              Get Free Treatment Plan →
            </a>
            <a
              href="https://wa.me/919876543210"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Message on WhatsApp
            </a>
          </div>
        </div>

        {/* Right: Treatment plan form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[#0c2340] px-6 py-4">
            <p className="text-[#e9a319] text-xs font-bold uppercase tracking-widest mb-1">
              Free Consultation
            </p>
            <h2 className="text-white font-black text-xl">
              Get Your Treatment Plan
            </h2>
            <p className="text-blue-200 text-xs mt-1">
              Our specialists respond within 30 minutes
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
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e9a319] focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="+263 7X XXX XXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e9a319] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">
                Country
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e9a319] bg-white">
                <option>Zimbabwe</option>
                <option>Zambia</option>
                <option>South Africa</option>
                <option>Kenya</option>
                <option>Nigeria</option>
                <option>Other African Country</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">
                Heart Problem / Surgery (CABG)
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e9a319] bg-white">
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
                Existing Heart Conditions / Diagnosis
              </label>
              <input
                type="text"
                placeholder="e.g. Blocked arteries, heart failure..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e9a319]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">
                When can you travel to India? (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Within a month, 2-3 months..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e9a319]"
              />
            </div>

            <button className="w-full bg-[#e9a319] hover:bg-[#d4921a] text-white font-black py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform">
              Get My Free Treatment Plan →
            </button>

            <a
              href="https://wa.me/919876543210"
              className="flex items-center justify-center gap-2 w-full border-2 border-[#25D366] text-[#1a8040] hover:bg-[#25D366] hover:text-white font-bold py-3 rounded-xl text-sm transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Message us on WhatsApp instead
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIAL BAR ──────────────────────────────────────────
function TestimonialBar() {
  return (
    <div className="bg-[#2d6a4f] py-5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden border-2 border-white">
            <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-4 h-4 text-[#e9a319] fill-[#e9a319]"
              />
            ))}
          </div>
        </div>
        <div className="text-white text-sm text-center sm:text-left">
          <span className="font-bold">
            "Thief Ambi Valve Replacement surgery at Medar Heart Institute through Manal Healthcare. From Zimbabwe to
            Delhi — they handled everything. I came back home healthy."
          </span>
          <span className="text-green-200 ml-2 text-xs">
            — Tendai M., Harare Zimbabwe
          </span>
        </div>
        <div className="flex-shrink-0 ml-auto hidden sm:flex gap-2">
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
    </div>
  );
}

// ─── WHY CHOOSE ───────────────────────────────────────────────
const benefits = [
  {
    icon: "💰",
    title: "60-80% Lower Cost",
    desc: "India offers the same world-class cardiac surgery for 60-80% less than US, UK, or South African hospitals with no compromise on quality.",
    stat: "$3,500",
    statLabel: "CABG starting from",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: "🏥",
    title: "NABH & JCI Accredited Hospitals",
    desc: "Every hospital we work with holds international accreditation — the same standard as the best hospitals in Singapore, UK, and UAE.",
    stat: "500+",
    statLabel: "Beds in partner hospitals",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: "👨‍⚕️",
    title: "Senior Specialists — No Junior Doctors",
    desc: "Your cardiac surgery is performed by senior consultant surgeons with 15–40+ years of experience, not residents or trainees.",
    stat: "25+",
    statLabel: "Years average experience",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: "🛂",
    title: "Medical Visa — We Handle It",
    desc: "We prepare your invitation letter, hospital documents, and guide you through the entire Indian medical visa process. Approved in days.",
    stat: "7-10",
    statLabel: "Days visa approval",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: "🚗",
    title: "No Waiting Lists",
    desc: "Unlike NHS or public hospitals in Zimbabwe, India has zero waiting lists for cardiac surgery. Book and travel within 2 weeks.",
    stat: "0",
    statLabel: "Waiting list days",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: "🌐",
    title: "Someone With You Every Step",
    desc: "Our dedicated patient coordinators who speak your language accompany you from airport pickup to discharge and back home.",
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
        <div className="text-center mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#e9a319] mb-2">
            WHY US
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0c2340] mb-4">
            Why Zimbabwean patients choose India for cardiac care
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            India has multiple world-class cardiac surgery companies in the top 5 for the job — an achievement all of the rest, with no waiting lists.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 ${b.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}
              >
                {b.icon}
              </div>
              <h3 className="font-black text-[#0c2340] text-base mb-2">
                {b.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {b.desc}
              </p>
              <div className="pt-3 border-t border-gray-100">
                <p className={`text-2xl font-black ${b.color}`}>{b.stat}</p>
                <p className="text-xs text-gray-400 font-semibold">
                  {b.statLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SPECIALTIES ──────────────────────────────────────────────
const otherTreatments = [
  { icon: "🫀", name: "Angioplasty & Stenting", price: "From $2,800" },
  { icon: "🔬", name: "Heart Valve Replacement", price: "From $4,500" },
  { icon: "💉", name: "Pacemaker Implant", price: "From $3,200" },
  { icon: "🔪", name: "Aortic Surgery", price: "From $5,500" },
  { icon: "♥️", name: "Heart Transplant", price: "From $18,000" },
  { icon: "🩺", name: "Congenital Heart Defect", price: "From $4,000" },
  { icon: "📊", name: "Heart Failure Treatment", price: "From $2,200" },
  { icon: "❓", name: "Not Sure? Get a Second Opinion", price: "Free" },
];

function Specialties() {
  return (
    <section className="py-16 md:py-24 bg-[#f5f8fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-[#e9a319] mb-2">
            CARDIAC EXPERTISE
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0c2340] mb-3">
            Our primary speciality — and every treatment within it
          </h2>
          <p className="text-gray-500 text-sm">
            Whatever you need done for the heart, you need to know — a diagnosis in hand.
          </p>
        </div>

        {/* Featured CABG card */}
        <div className="bg-[#0c2340] rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#e9a319] text-[#0c2340] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Most Requested in Zimbabwe
              </span>
            </div>
            <h3 className="text-white font-black text-2xl mb-3">
              Coronary Artery Bypass Grafting (CABG)
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-4 max-w-xl">
              The most common heart surgery requested by African patients visiting India. Our partner hospitals perform hundreds of CABG procedures every month with exceptional success rates.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["On-Pump CABG", "Off-Pump CABG", "Total Arterial", "Robotic-Assisted", "Minimally Invasive"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full border border-white/20"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
            <button className="text-[#e9a319] text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View Case Studies <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-shrink-0 text-center">
            <p className="text-[#e9a319] font-black text-4xl">$3,500</p>
            <p className="text-blue-200 text-xs">Starting from</p>
            <p className="text-gray-400 text-xs line-through mt-1">
              US $40,000+
            </p>
            <button className="mt-4 bg-[#e9a319] hover:bg-[#d4921a] text-[#0c2340] font-black px-5 py-2.5 rounded-xl text-sm transition-colors">
              Get a Quote
            </button>
          </div>
        </div>

        {/* Other treatments grid */}
        <p className="text-sm font-bold text-gray-500 mb-4">
          Other cardiac treatments — find what you are looking for:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherTreatments.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-gray-100 rounded-xl p-4 hover:border-[#e9a319] hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <span className="text-2xl mb-2 block">{t.icon}</span>
              <p className="font-bold text-[#0c2340] text-sm mb-1 group-hover:text-[#e9a319] transition-colors">
                {t.name}
              </p>
              <p className="text-xs font-black text-[#1b9e8f]">{t.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS STEPS ────────────────────────────────────────────
const steps = [
  {
    num: "01",
    icon: <FileText className="w-6 h-6" />,
    title: "Share Your Reports",
    desc: "Send us your diagnosis reports, ECGs, echocardiograms or any available medical records from Zimbabwe. WhatsApp or email — we accept all formats.",
    color: "bg-blue-500",
  },
  {
    num: "02",
    icon: <Calendar className="w-6 h-6" />,
    title: "Get Your Quote",
    desc: "Our senior cardiac specialists review your case and provide a detailed treatment plan with cost estimates from multiple top hospitals within 24 hours.",
    color: "bg-[#e9a319]",
  },
  {
    num: "03",
    icon: <Plane className="w-6 h-6" />,
    title: "Visa & Travel",
    desc: "We prepare your Indian Medical Visa invitation letter, handle hotel bookings, airport transfers, and ensure a smooth arrival in Delhi or Mumbai.",
    color: "bg-[#1b9e8f]",
  },
  {
    num: "04",
    icon: <Heart className="w-6 h-6" />,
    title: "Arrive & Recover",
    desc: "Your dedicated coordinator meets you at the airport. You receive world-class cardiac surgery and are guided through recovery before returning home healthy.",
    color: "bg-green-500",
  },
];

function ProcessSteps() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#e9a319] mb-2">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0c2340] mb-3">
            From Harare to India — in 4 steps
          </h2>
          <p className="text-gray-500 text-sm max-w-xl">
            We have simplified the process so that getting world-class cardiac treatment in India from Zimbabwe or any other country while we confidently offer you nothing we cannot
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {/* Connector line */}
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
                <h3 className="font-black text-[#0c2340] text-base mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#0c2340] hover:bg-[#1a3a5c] text-white font-black px-8 py-4 rounded-xl text-sm transition-colors shadow-lg"
          >
            Start My Treatment Journey <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── DOCTORS ──────────────────────────────────────────────────
const doctors = [
  {
    name: "Dr. Tapaswin Sharma",
    title: "Chief Cardiac Surgeon",
    hospital: "Medanta – The Medicity",
    exp: "32 years experience",
    surgeries: "10,000+ surgeries",
    spec: "CABG, Valve Replacement",
    initials: "TS",
  },
  {
    name: "Dr. Z.S. Meharwal",
    title: "Head of Cardiothoracic Surgery",
    hospital: "Fortis Escorts Heart Institute",
    exp: "30+ years experience",
    surgeries: "15,000+ surgeries",
    spec: "Heart Transplant, CABG",
    initials: "ZM",
  },
  {
    name: "Dr. Dabbir Singh",
    title: "Senior Interventional Cardiologist",
    hospital: "Max Super Speciality Hospital",
    exp: "25 years experience",
    surgeries: "8,000+ procedures",
    spec: "Angioplasty, Stenting",
    initials: "DS",
  },
];

function Doctors() {
  return (
    <section className="py-16 md:py-24 bg-[#f5f8fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#e9a319] mb-2">
            OUR DOCTORS
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0c2340] mb-3">
            Senior cardiac specialists — not junior residents
          </h2>
          <p className="text-gray-500 text-sm max-w-xl">
            Every patient at Manal Healthcare is operated on by top consultant-level cardiac surgeons in their respective partner hospitals. These are the surgeons who operate on patients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {doctors.map((d) => (
            <div
              key={d.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0c2340] to-[#1a3a5c] flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                  {d.initials}
                </div>
                <div>
                  <h3 className="font-black text-[#0c2340] text-base leading-tight">
                    {d.name}
                  </h3>
                  <p className="text-[#1b9e8f] text-xs font-bold">{d.title}</p>
                </div>
              </div>

              <div className="bg-[#f5f8fc] rounded-xl p-3 mb-4">
                <p className="text-xs text-gray-500 font-semibold">
                  🏥 {d.hospital}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  {d.exp}
                </span>
                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  {d.surgeries}
                </span>
              </div>

              <p className="text-xs text-gray-400 font-semibold mb-4">
                Specialty: {d.spec}
              </p>

              <button className="w-full border-2 border-[#0c2340] text-[#0c2340] hover:bg-[#0c2340] hover:text-white text-xs font-black py-2.5 rounded-xl transition-colors">
                Request Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOSPITALS ────────────────────────────────────────────────
const hospitals = [
  {
    name: "Apollo Hospitals, Delhi",
    rating: "★★★★★ 4.9",
    beds: "710 beds",
    type: "JCI + NABH Accredited",
    initials: "AH",
    color: "bg-blue-600",
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
    color: "bg-teal-600",
  },
  {
    name: "Max Super Speciality Hospital",
    rating: "★★★★☆ 4.7",
    beds: "500+ beds",
    type: "NABH Accredited",
    initials: "MS",
    color: "bg-purple-600",
  },
];

function Hospitals() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#e9a319] mb-2">
            TOP HOSPITALS
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0c2340] mb-3">
            Hospitals that have treated patients from Zimbabwe
          </h2>
          <p className="text-gray-500 text-sm">
            Every hospital Manal Healthcare works with is NABH & JCI accredited — the same standard as the best hospitals in the USA and Singapore.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {hospitals.map((h) => (
            <div
              key={h.name}
              className="flex items-center gap-4 border border-gray-100 rounded-2xl p-5 hover:border-[#e9a319] hover:shadow-md transition-all duration-200 group"
            >
              <div
                className={`w-14 h-14 ${h.color} rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0`}
              >
                {h.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-[#0c2340] text-sm mb-1">
                  {h.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#e9a319] text-xs font-bold">
                    {h.rating}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-xs">{h.beds}</span>
                </div>
                <span className="inline-block mt-1 bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {h.type}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#e9a319] transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── VISA SECTION ─────────────────────────────────────────────
const visaSteps = [
  {
    num: "01",
    title: "We prepare your hospital letter",
    desc: "Manal Healthcare arranges the official hospital invitation letter and medical documentation required for your Indian Medical Visa application.",
  },
  {
    num: "02",
    title: "Apply at the Indian High Commission",
    desc: "You submit your visa application at the Indian High Commission in Harare or Lusaka. We guide you on every document to bring.",
  },
  {
    num: "03",
    title: "Book your flights",
    desc: "We advise on the best direct or connecting flights from Harare to Delhi or Mumbai with lowest fares available for your travel dates.",
  },
  {
    num: "04",
    title: "We receive you at the airport",
    desc: "Our representative meets you at the airport with a name board. You are transferred directly to the hospital or hotel — zero stress.",
  },
];

function VisaSection() {
  return (
    <section className="py-16 md:py-24 bg-[#0c2340] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #e9a319 0, #e9a319 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#e9a319] mb-2">
            VISA & TRAVEL
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Zimbabwe to India — the visa process is simpler than you think
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed">
            The biggest concern Zimbabwean patients have is how to get an Indian medical visa. Manal Healthcare guides every patient through the entire process — from hospital letter to landing in India.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {visaSteps.map((s) => (
            <div
              key={s.num}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
            >
              <p className="text-[#e9a319] font-black text-3xl mb-3">
                {s.num}
              </p>
              <h3 className="text-white font-bold text-sm mb-2">{s.title}</h3>
              <p className="text-blue-200 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-blue-100 text-sm leading-relaxed">
          <p>
            <span className="text-[#e9a319] font-bold">Note: </span>
            We have helped hundreds of patients obtain Indian medical visas from Zimbabwe, Zambia, Kenya, and other African countries. The approval rate is over 98% when applications are made correctly. Manal Healthcare will check all your documents before submission to ensure there are no errors. A correct application is always approved by the Indian High Commission.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── PATIENT TESTIMONIALS ─────────────────────────────────────
const testimonials = [
  {
    name: "Tendai Moyo",
    location: "Harare, Zimbabwe",
    rating: 5,
    text: "I could not believe Valve Replacement could be done at this low price. We were quoted USD 42,000 in South Africa but Manal Healthcare found us Fortis Escorts where it was done for a fraction of that price. The care was exceptional. I am back to normal life.",
    treatment: "Heart Valve Replacement",
    initials: "TM",
    color: "bg-blue-500",
  },
  {
    name: "Simba M.",
    location: "Bulawayo, Zimbabwe",
    rating: 5,
    text: "My husband had triple bypass surgery. We were scared about travelling to India but Manal Healthcare was with us every step. The airport pickup, hospital coordination, doctor meetings — everything. We felt safe the entire time. The surgeon had 30 years of experience. I can't believe the difference.",
    treatment: "Triple Bypass CABG",
    initials: "SM",
    color: "bg-teal-500",
  },
];

function PatientTestimonials() {
  return (
    <section className="py-16 md:py-24 bg-[#f5f8fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#e9a319] mb-2">
            PATIENT STORIES
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0c2340] mb-3">
            Patients from Africa who came to India through Manal Healthcare
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= t.rating
                        ? "text-[#e9a319] fill-[#e9a319]"
                        : "text-gray-200"
                    }`}
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
                    <p className="font-bold text-[#0c2340] text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                  </div>
                </div>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  {t.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────
const faqs = [
  {
    q: "How do I know the hospital is actually good and top enough?",
    a: "All our partner hospitals hold JCI (Joint Commission International) and NABH accreditation — the highest international standards for hospital quality. These are the same certifications held by the best hospitals in Singapore, UK, and UAE. We only partner with hospitals that rank in the top tier for cardiac care in India.",
  },
  {
    q: "What does the total cost actually include?",
    a: "Our treatment quotes include surgeon fees, anesthesiologist fees, hospital room, ICU stay, surgery itself, medications during hospital stay, and post-operative check-ups before discharge. We provide a detailed cost breakdown before you travel so there are no surprises.",
  },
  {
    q: "Can a family member travel with me from Zimbabwe?",
    a: "Absolutely. We strongly encourage patients to bring one family member or companion. We assist with their Medical Attendant Visa (separate from the Patient Visa) and can arrange accommodation nearby the hospital at affordable rates.",
  },
  {
    q: "How long would I need to stay in India?",
    a: "For most cardiac surgeries like CABG, plan for 3-4 weeks total — approximately 1 week in hospital and 2-3 weeks recovery before the doctor clears you to fly home. Simpler procedures like angioplasty may require only 5-7 days.",
  },
  {
    q: "What if something goes wrong after I return to Zimbabwe?",
    a: "We provide 90-day post-treatment support. Our medical team is available on WhatsApp to review reports, advise on medications, and guide your local doctors. We also have partnerships with cardiologists in Harare for follow-up consultations.",
  },
  {
    q: "I don't have a confirmed diagnosis yet — can Manal Healthcare still help?",
    a: "Yes, absolutely. Many patients come to us without a clear diagnosis. We can arrange a diagnostic consultation with a senior Indian cardiologist via video call before your travel, or help you get the right tests done in India at very affordable rates.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#e9a319] mb-2">
            COMMON QUESTIONS
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0c2340]">
            Questions from Zimbabwean patients
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                open === i
                  ? "border-[#e9a319] shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span
                  className={`text-sm font-bold pr-4 ${
                    open === i ? "text-[#0c2340]" : "text-gray-700"
                  }`}
                >
                  {f.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    open === i
                      ? "rotate-180 text-[#e9a319]"
                      : "text-gray-400"
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BOTTOM CTA ───────────────────────────────────────────────
function BottomCTA() {
  return (
    <section className="bg-[#0c2340] py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-[#e9a319] mb-2">
          FOR A BETTER LIFE
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          Get your heart treatment plan
          <br />
          within 24 hours
        </h2>
        <p className="text-blue-200 text-sm mb-8 leading-relaxed">
          Share your medical reports with us and receive a personalized cardiac treatment plan with hospital options, costs, and timelines — no obligations or upfront fees.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="bg-[#e9a319] hover:bg-[#d4921a] text-[#0c2340] font-black px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            Get My Free Treatment Plan →
          </a>
          <a
            href="https://wa.me/919876543210"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-black px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us Now
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#060f1c] text-blue-200 py-10 px-4">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#e9a319] rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-black text-base">
              Manal Healthcare
            </span>
          </div>
          <p className="text-xs leading-relaxed text-blue-300">
            Connecting African patients with world-class cardiac care in India. Affordable, proven, guided.
          </p>
        </div>
        <div>
          <p className="text-white font-bold text-sm mb-3">Treatments</p>
          {["CABG Surgery", "Heart Valve Replacement", "Angioplasty", "Pacemaker", "Heart Transplant"].map((t) => (
            <a key={t} href="#" className="block text-xs text-blue-300 hover:text-[#e9a319] mb-1.5 transition-colors">
              {t}
            </a>
          ))}
        </div>
        <div>
          <p className="text-white font-bold text-sm mb-3">Services</p>
          {["Hospital Selection", "Doctor Consultation", "Visa Assistance", "Airport Transfer", "Interpreter Services"].map((s) => (
            <a key={s} href="#" className="block text-xs text-blue-300 hover:text-[#e9a319] mb-1.5 transition-colors">
              {s}
            </a>
          ))}
        </div>
        <div>
          <p className="text-white font-bold text-sm mb-3">Contact</p>
          <div className="flex flex-col gap-2 text-xs text-blue-300">
            <span>📞 +91 98765 43210</span>
            <span>✉ info@manalhealthcare.com</span>
            <span>💬 WhatsApp Available 24/7</span>
            <span>📍 Delhi, India</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 text-center text-xs text-blue-400">
        © {new Date().getFullYear()} Manal Healthcare. All rights reserved. |{" "}
        <a href="#" className="hover:text-[#e9a319]">Privacy Policy</a> |{" "}
        <a href="#" className="hover:text-[#e9a319]">Terms</a>
      </div>
    </footer>
  );
}

// ─── FLOATING WHATSAPP ────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1eb85a] rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 hover:-translate-y-1 transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}

// ─── STICKY BOTTOM BAR (mobile) ───────────────────────────────
function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-3 shadow-2xl">
      <a
        href="https://wa.me/919876543210"
        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-black text-sm py-3 rounded-xl"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </a>
      <a
        href="#contact"
        className="flex-1 flex items-center justify-center bg-[#e9a319] text-[#0c2340] font-black text-sm py-3 rounded-xl"
      >
        Free Plan →
      </a>
    </div>
  );
}

// ─── ROOT PAGE ────────────────────────────────────────────────
export default function ManalHealthcarePage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', 'Nunito Sans', system-ui, sans-serif" }}>
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
      {/* <Footer /> */}
      {/* <FloatingWhatsApp /> */}
      <StickyMobileBar />
    </div>
  );
}