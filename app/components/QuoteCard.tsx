"use client";

import { Card } from "@/components/ui/card";
import { Heart, Bone, Brain } from "lucide-react";
import Link from "next/link";

interface QuoteCardProps {
  title: string;
  price: string;
  icon: React.ElementType;
}

export const QuoteCard = ({ title, price, icon: Icon }: QuoteCardProps) => {
  return (
    <Card className="bg-[#e9eff4] border-none rounded-xl p-5 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="flex items-center gap-4">
        
        {/* Icon Circle */}
        <div style={{width: '48px', height: '48px', minWidth: '48px', minHeight: '48px'}} className="rounded-full bg-[#dbe3ea] flex items-center justify-center shrink-0 overflow-hidden">
          <Icon style={{width: '24px', height: '24px'}} className="text-green-500" />
        </div>

        {/* Content */}
        <div className="min-w-0 space-y-1">
          <h3 className="font-semibold text-black-700 text-lg">
            {title}
          </h3>

          <p className="text-gray-700 text-sm">
            Starting <span className="font-bold text-black">{price}</span>
          </p>

          <Link
            href="/contact"
            className="text-green-600 text-sm font-medium hover:underline"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </Card>
  );
};