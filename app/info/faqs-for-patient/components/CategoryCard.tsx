"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  CreditCard, 
  Building2, 
  Stethoscope, 
  Home,
  MessageSquare,
  Globe,
  Heart
} from "lucide-react";

interface FAQCategory {
  category: string;
  iconName: string;
  description: string;
  color: string;
  questions: { question: string; answer: string; helpful?: string[] }[];
}

interface CategoryCardProps {
  category: FAQCategory;
  index: number;
}

const iconMap = {
  "Plane": Plane,
  "CreditCard": CreditCard,
  "Building2": Building2,
  "Stethoscope": Stethoscope,
  "Home": Home,
  "MessageSquare": MessageSquare,
  "Globe": Globe,
  "Heart": Heart
};

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  indigo: "bg-indigo-100 text-indigo-600",
  rose: "bg-rose-100 text-rose-600",
  emerald: "bg-emerald-100 text-emerald-600",
  amber: "bg-amber-100 text-amber-600"
};

export const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const IconComponent = iconMap[category.iconName as keyof typeof iconMap] || Plane;
  
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[category.color as keyof typeof colorClasses]}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.category}</h3>
          <p className="text-gray-600 text-sm">{category.description}</p>
          <p className="text-sm text-gray-500 mt-2">{category.questions.length} questions</p>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={() => {
        const element = document.getElementById(`category-${index}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}>
        View Questions
      </Button>
    </Card>
  );
};
