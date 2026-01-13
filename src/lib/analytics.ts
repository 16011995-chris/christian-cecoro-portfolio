export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Helper per tracking click progetti
export const trackProjectView = (projectTitle: string) => {
  trackEvent('view_project', 'engagement', projectTitle);
};

// Helper per tracking apertura lightbox
export const trackLightboxOpen = (imageName: string) => {
  trackEvent('open_lightbox', 'engagement', imageName);
};

// Helper per tracking form submit
export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', 'conversion', formName);
};
