/// <reference types="vite/client" />

interface Calendly {
  initPopupWidget(options: { url: string }): void;
}

interface Window {
  Calendly: Calendly;
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
