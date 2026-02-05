/// <reference types="vite/client" />

interface Window {
  fbq: (
    action: string,
    event: string,
    params?: Record<string, string>
  ) => void;
  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    params?: Record<string, any>
  ) => void;
  dataLayer: any[];
}
