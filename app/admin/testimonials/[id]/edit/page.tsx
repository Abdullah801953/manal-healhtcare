"use client";

import { TestimonialForm } from "../../components/TestimonialForm";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/testimonials");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/testimonials">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Testimonial</h1>
          <p className="text-gray-600 mt-1">Update testimonial information</p>
        </div>
      </div>

      {/* Form */}
      <TestimonialForm testimonialId={params.id} onSuccess={handleSuccess} />
    </div>
  );
}
