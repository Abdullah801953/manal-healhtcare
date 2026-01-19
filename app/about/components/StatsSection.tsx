'use client';

import { useEffect, useState } from 'react';
import { Users, Award, Building2, Heart } from 'lucide-react';

interface StatItem {
  icon: typeof Users;
  value: number;
  label: string;
  suffix: string;
}

export function StatsSection() {
  const stats: StatItem[] = [
    {
      icon: Users,
      value: 50000,
      label: 'Patients Treated',
      suffix: '+',
    },
    {
      icon: Award,
      value: 25,
      label: 'Years of Excellence',
      suffix: '+',
    },
    {
      icon: Building2,
      value: 15,
      label: 'Healthcare Facilities',
      suffix: '',
    },
    {
      icon: Heart,
      value: 98,
      label: 'Patient Satisfaction',
      suffix: '%',
    },
  ];

  return (
    <section className="py-20 px-4 bg-linear-to-br from-[#209f00] to-emerald-600">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Transforming lives through quality healthcare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/90 text-lg font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return <>{count.toLocaleString()}{suffix}</>;
}
