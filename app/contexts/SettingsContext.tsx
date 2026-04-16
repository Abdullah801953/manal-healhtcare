'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Department {
  name: string;
  phone: string;
  available: string;
}

interface Settings {
  siteName: string;
  siteEmail: string;
  sitePhone: string;
  whatsappNumber: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  // Contact page configuration
  emergencyPhone: string;
  supportEmail: string;
  postalCode: string;
  workingHoursWeekday: string;
  workingHoursWeekend: string;
  departments: Department[];
  mapEmbedUrl: string;
  mapLatitude: string;
  mapLongitude: string;
}

interface SettingsContextType {
  settings: Settings | null;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  siteName: 'Manal Healthcare',
  siteEmail: 'info@manalhealthcare.com',
  sitePhone: '+91 123 456 7890',
  whatsappNumber: '+91 987 654 3210',
  address: '123 Healthcare Street, New Delhi, India',
  facebook: '',
  twitter: '',
  instagram: '',
  linkedin: '',
  youtube: '',
  emergencyPhone: '',
  supportEmail: '',
  postalCode: '',
  workingHoursWeekday: 'Mon - Fri: 8:00 AM - 8:00 PM',
  workingHoursWeekend: 'Sat - Sun: 9:00 AM - 5:00 PM',
  departments: [],
  mapEmbedUrl: '',
  mapLatitude: '',
  mapLongitude: '',
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: false,
  refreshSettings: async () => {},
});

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(() => {
    // Try to load cached settings from localStorage on initial render
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('siteSettings');
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          // Use cached data if less than 5 minutes old
          if (Date.now() - timestamp < 5 * 60 * 1000) {
            return data;
          }
        }
      } catch {}
    }
    return defaultSettings;
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();

      if (data.success && data.data) {
        setSettings(data.data);
        // Cache in localStorage
        try {
          localStorage.setItem('siteSettings', JSON.stringify({
            data: data.data,
            timestamp: Date.now(),
          }));
        } catch {}
      } else {
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchSettings();
  }, []);

  // During SSR or before mount, use default settings
  if (!mounted) {
    return (
      <SettingsContext.Provider value={{ settings: defaultSettings, loading: true, refreshSettings: async () => {} }}>
        {children}
      </SettingsContext.Provider>
    );
  }

  const refreshSettings = async () => {
    setLoading(true);
    await fetchSettings();
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}