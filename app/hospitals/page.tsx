import { Suspense } from 'react';
import HospitalsContent from './components/HospitalsContent';

export default function HospitalsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#209f00] mb-4"></div>
          <p className="text-gray-600">Loading hospitals...</p>
        </div>
      </div>
    }>
      <HospitalsContent />
    </Suspense>
  );
}
