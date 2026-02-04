import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';
import Hospital from '@/lib/models/Hospital';
import Treatment from '@/lib/models/Treatment';
import Blog from '@/lib/models/Blog';
import Testimonial from '@/lib/models/Testimonial';
import Inquiry from '@/lib/models/Inquiry';

export async function GET() {
  try {
    await connectDB();

    // Fetch counts in parallel
    const [
      doctorsCount,
      hospitalsCount,
      treatmentsCount,
      blogsCount,
      testimonialsCount,
      totalInquiriesCount,
      newInquiriesCount,
      recentInquiries,
      pendingTestimonials,
    ] = await Promise.all([
      Doctor.countDocuments(),
      Hospital.countDocuments(),
      Treatment.countDocuments(),
      Blog.countDocuments(),
      Testimonial.countDocuments(),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Inquiry.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email medicalCondition createdAt status'),
      Testimonial.find({ status: 'pending' })
        .sort({ createdAt: -1 })
        .limit(3)
        .select('name treatment rating createdAt'),
    ]);

    // Calculate inquiry statistics
    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - 7);
    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 14);
    const thisMonthStart = new Date();
    thisMonthStart.setMonth(thisMonthStart.getMonth() - 1);

    const [thisWeekInquiries, lastWeekInquiries, thisMonthInquiries] = await Promise.all([
      Inquiry.countDocuments({ createdAt: { $gte: thisWeekStart } }),
      Inquiry.countDocuments({
        createdAt: { $gte: lastWeekStart, $lt: thisWeekStart },
      }),
      Inquiry.countDocuments({ createdAt: { $gte: thisMonthStart } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          doctors: doctorsCount,
          hospitals: hospitalsCount,
          treatments: treatmentsCount,
          blogs: blogsCount,
          testimonials: testimonialsCount,
          totalInquiries: totalInquiriesCount,
          newInquiries: newInquiriesCount,
        },
        inquiryStats: {
          thisWeek: thisWeekInquiries,
          lastWeek: lastWeekInquiries,
          thisMonth: thisMonthInquiries,
        },
        recentInquiries: recentInquiries.map((inquiry: any) => ({
          id: inquiry._id.toString(),
          name: inquiry.name,
          email: inquiry.email,
          subject: inquiry.medicalCondition,
          date: inquiry.createdAt,
          status: inquiry.status,
        })),
        pendingTestimonials: pendingTestimonials.map((testimonial: any) => ({
          id: testimonial._id.toString(),
          name: testimonial.name,
          treatment: testimonial.treatment,
          rating: testimonial.rating,
          date: testimonial.createdAt,
        })),
      },
    });
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch dashboard statistics',
      },
      { status: 500 }
    );
  }
}
