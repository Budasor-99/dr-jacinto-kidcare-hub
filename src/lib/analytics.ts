// Google Analytics 4 Helper Functions
// Measurement ID: G-M16WB3CEP5

/**
 * Track a page view event
 */
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

/**
 * Track a generic event
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params);
  }
};

/**
 * Track appointment request (generate_lead event)
 */
export const trackAppointmentRequest = (params?: {
  source?: string;
  child_age?: string;
}) => {
  trackEvent('generate_lead', {
    event_category: 'conversion',
    event_label: 'appointment_request',
    ...params,
  });
};

/**
 * Track WhatsApp click (contact event)
 */
export const trackWhatsAppClick = (source?: string) => {
  trackEvent('contact', {
    event_category: 'engagement',
    event_label: 'whatsapp_click',
    contact_method: 'whatsapp',
    source,
  });
};

/**
 * Track phone click (contact event)
 */
export const trackPhoneClick = (phoneNumber?: string, source?: string) => {
  trackEvent('contact', {
    event_category: 'engagement',
    event_label: 'phone_click',
    contact_method: 'phone',
    phone_number: phoneNumber,
    source,
  });
};
