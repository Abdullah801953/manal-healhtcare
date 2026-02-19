"use client"
import { Bone, Brain, Heart } from "lucide-react";
import { QuoteCard } from "./QuoteCard";

const quoteData = [
  { title: "Knee Replacement", price: "$4000", icon: Bone },
  { title: "Hip Replacement", price: "$5500", icon: Bone },
  { title: "Brain Tumor", price: "$5000", icon: Brain },
  { title: "Heart Bypass Surgery", price: "$4500", icon: Heart },
  { title: "Valve Replacement", price: "$9500", icon: Heart },
  { title: "Breast Cancer", price: "$5000", icon: Heart },
  { title: "Lung Cancer", price: "$5500", icon: Brain },
  { title: "Rhinoplasty", price: "$1800", icon: Brain },
  { title: "Breast Implants", price: "$2750", icon: Heart },
  { title: "Hair Transplant", price: "$1400", icon: Brain },
  { title: "Cervical Cancer", price: "$4500", icon: Heart },
  { title: "Hysterectomy", price: "$3000", icon: Bone },
];

export default function QuoteSection() {
  return (
    <section className="py-5">
      <div className="container mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[#209F00] text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold max-w-4xl mx-auto">
            Lowest Quotes Assured
          </h2>
          <p className="font-semibold text-[30px] xs:text-sm sm:text-md md:text-2xl">
            We constantly negotiate better prices and alternatives without
            compromising treatment quality.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quoteData.map((item, index) => (
            <QuoteCard
              key={index}
              title={item.title}
              price={item.price}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}