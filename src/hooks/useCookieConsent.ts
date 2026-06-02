import { useState, useEffect } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Carrega preferências salvas
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
        setHasConsent(true);
        
        // Aplica as preferências
        applyPreferences(parsed);
      } catch (error) {
        console.error('Erro ao carregar preferências de cookies:', error);
      }
    }
  }, []);

  const applyPreferences = (prefs: CookiePreferences) => {
    // Analytics (Google Analytics, etc)
    if (prefs.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }

    // Marketing (Facebook Pixel, Google Ads, etc)
    if (prefs.marketing) {
      enableMarketing();
    } else {
      disableMarketing();
    }
  };

  const enableAnalytics = () => {
    // Exemplo: Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const disableAnalytics = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  const enableMarketing = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('consent', 'grant');
    }
  };

  const disableMarketing = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('consent', 'revoke');
    }
  };

  const updatePreferences = (newPreferences: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setPreferences(newPreferences);
    setHasConsent(true);
    applyPreferences(newPreferences);
  };

  const clearConsent = () => {
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    setPreferences(null);
    setHasConsent(false);
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    clearConsent,
  };
}
