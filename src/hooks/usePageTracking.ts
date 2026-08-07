import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';
import { trackMetaPageView } from '@/lib/metaPixel';

/**
 * Hook that automatically tracks page views on route changes
 * Must be used inside a component within BrowserRouter
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search);
    trackMetaPageView(location.pathname);
  }, [location]);
};

/**
 * Component wrapper for page tracking
 * Use this inside BrowserRouter to enable automatic tracking
 */
export const PageTracker = () => {
  usePageTracking();
  return null;
};
