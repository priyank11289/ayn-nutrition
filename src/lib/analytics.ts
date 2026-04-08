
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Initialize GA4
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) return;

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(script2);
};

// Log Page Views
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Log Specific Events
export const event = ({ action, category, label, value, ...rest }: GtagEvent) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

// Ecommerce Events
export const trackProductView = (product: any) => {
  event({
    action: 'view_item',
    items: [{
      item_id: product.slug,
      item_name: product.name,
      item_brand: 'AYN Nutrition',
      price: product.variants[0].price,
      quantity: 1
    }]
  });
};

export const trackAddToCart = (product: any, variant: string, servings: number, price: number) => {
  event({
    action: 'add_to_cart',
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_variant: `${variant} - ${servings} Servings`,
      price: price,
      quantity: 1
    }]
  });
};

export const trackBeginCheckout = (items: any[], total: number) => {
  event({
    action: 'begin_checkout',
    value: total,
    currency: 'INR',
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_variant: `${item.variant} - ${item.servings} Servings`,
      price: item.price,
      quantity: item.quantity
    }))
  });
};

export const trackPurchase = (items: any[], total: number, transactionId: string) => {
  event({
    action: 'purchase',
    transaction_id: transactionId,
    value: total,
    currency: 'INR',
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_variant: `${item.variant} - ${item.servings} Servings`,
      price: item.price,
      quantity: item.quantity
    }))
  });
};
