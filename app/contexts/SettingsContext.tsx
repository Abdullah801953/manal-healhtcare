'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  const [settings, setSettings] = useState<Settings | null>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchSettings = async () => {
    try {
      console.log('Fetching settings from API...');
      const response = await fetch(`/api/settings?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API Response status:', response.status);
      const data = await response.json();
      console.log('API Response data:', data);

      if (data.success && data.data) {
        console.log('Setting settings to:', data.data);
        console.log('Social links:', {
          facebook: data.data.facebook,
          twitter: data.data.twitter,
          instagram: data.data.instagram,
          linkedin: data.data.linkedin,
        });
        setSettings(data.data);
      } else {
        console.error('API returned success: false or no data');
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