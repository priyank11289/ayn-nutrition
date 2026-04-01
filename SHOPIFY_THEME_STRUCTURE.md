# AYN Nutrition - Shopify Theme Structure

## Overview
This document outlines the complete Shopify Liquid theme structure for AYN Nutrition (aynnutrition.in), a premium Indian sports nutrition brand specializing in personalized creatine formulations.

---

## Theme File Structure

```
aynnutrition-theme/
├── assets/
│   ├── theme.css
│   ├── theme.js
│   ├── quiz.js
│   ├── cart-drawer.js
│   ├── animations.js
│   ├── custom-fonts.css
│   └── vendor/
│       ├── swiper.min.css
│       └── swiper.min.js
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/
│   ├── theme.liquid
│   ├── password.liquid
│   └── gift_card.liquid
├── locales/
│   ├── en.default.json
│   └── hi.json
├── sections/
│   ├── header.liquid
│   ├── hero.liquid
│   ├── problem-solution.liquid
│   ├── product-showcase.liquid
│   ├── quiz-widget.liquid
│   ├── science-section.liquid
│   ├── expert-panel.liquid
│   ├── how-it-works.liquid
│   ├── social-proof.liquid
│   ├── faq.liquid
│   ├── newsletter.liquid
│   ├── footer.liquid
│   ├── cart-drawer.liquid
│   ├── sticky-cart.liquid
│   ├── product-template.liquid
│   ├── collection-template.liquid
│   └── page-template.liquid
├── snippets/
│   ├── product-card.liquid
│   ├── product-form.liquid
│   ├── variant-selector.liquid
│   ├── price.liquid
│   ├── icon.liquid
│   ├── button.liquid
│   ├── badge.liquid
│   ├── trust-badges.liquid
│   ├── social-links.liquid
│   ├── payment-icons.liquid
│   ├── seo-schema.liquid
│   └── loading-spinner.liquid
├── templates/
│   ├── index.liquid
│   ├── product.liquid
│   ├── collection.liquid
│   ├── cart.liquid
│   ├── page.liquid
│   ├── blog.liquid
│   ├── article.liquid
│   ├── search.liquid
│   ├── 404.liquid
│   ├── customers/
│   │   ├── account.liquid
│   │   ├── activate_account.liquid
│   │   ├── addresses.liquid
│   │   ├── login.liquid
│   │   ├── order.liquid
│   │   ├── register.liquid
│   │   └── reset_password.liquid
│   └── gift_card.liquid
└── README.md
```

---

## Key Liquid Files

### 1. Layout Files

#### `layout/theme.liquid`
Main theme layout containing:
- HTML structure
- Head meta tags, SEO, schema markup
- CSS/JS asset loading
- Header and footer includes
- Cart drawer integration

```liquid
<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#1A1A2E">
  
  <link rel="canonical" href="{{ canonical_url }}">
  <link rel="preconnect" href="https://cdn.shopify.com" crossorigin>
  
  {%- if settings.favicon != blank -%}
    <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
  {%- endif -%}
  
  <title>{{ page_title }}{% if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif %}{% if current_page != 1 %} &ndash; Page {{ current_page }}{% endif %}{% unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless %}</title>
  
  {% render 'seo-schema' %}
  
  {{ content_for_header }}
  
  {{ 'theme.css' | asset_url | stylesheet_tag }}
  {{ 'custom-fonts.css' | asset_url | stylesheet_tag }}
  
  <script src="{{ 'theme.js' | asset_url }}" defer></script>
  <script src="{{ 'quiz.js' | asset_url }}" defer></script>
  <script src="{{ 'cart-drawer.js' | asset_url }}" defer></script>
</head>

<body class="template-{{ request.page_type }}">
  {% section 'header' %}
  
  <main id="MainContent" role="main" tabindex="-1">
    {{ content_for_layout }}
  </main>
  
  {% section 'footer' %}
  {% section 'cart-drawer' %}
  {% section 'sticky-cart' %}
  
  <div id="toast-container"></div>
</body>
</html>
```

---

### 2. Section Files

#### `sections/header.liquid`
Sticky header with blur effect, navigation, search, account, and cart.

**Schema Settings:**
```json
{
  "name": "Header",
  "settings": [
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Logo"
    },
    {
      "type": "range",
      "id": "logo_width",
      "min": 50,
      "max": 250,
      "step": 10,
      "default": 100,
      "unit": "px",
      "label": "Logo width"
    },
    {
      "type": "link_list",
      "id": "menu",
      "default": "main-menu",
      "label": "Menu"
    },
    {
      "type": "checkbox",
      "id": "enable_sticky_header",
      "default": true,
      "label": "Enable sticky header"
    }
  ]
}
```

---

#### `sections/hero.liquid`
Split-screen hero section with product showcase.

**Schema Settings:**
```json
{
  "name": "Hero",
  "settings": [
    {
      "type": "text",
      "id": "badge_text",
      "default": "India's First Personalized Creatine",
      "label": "Badge Text"
    },
    {
      "type": "text",
      "id": "headline",
      "default": "India's First Personalized Creatine Formulations",
      "label": "Headline"
    },
    {
      "type": "textarea",
      "id": "subheadline",
      "default": "Science-backed, goal-specific nutrition designed for your unique performance needs.",
      "label": "Subheadline"
    },
    {
      "type": "text",
      "id": "primary_cta_text",
      "default": "Find Your Formula",
      "label": "Primary CTA Text"
    },
    {
      "type": "url",
      "id": "primary_cta_link",
      "label": "Primary CTA Link"
    },
    {
      "type": "text",
      "id": "secondary_cta_text",
      "default": "Shop Creatine",
      "label": "Secondary CTA Text"
    },
    {
      "type": "url",
      "id": "secondary_cta_link",
      "label": "Secondary CTA Link"
    },
    {
      "type": "image_picker",
      "id": "hero_image",
      "label": "Hero Product Image"
    }
  ],
  "presets": [
    {
      "name": "Hero"
    }
  ]
}
```

---

#### `sections/product-showcase.liquid`
Product cards with variant selectors and quick add to cart.

**Schema Settings:**
```json
{
  "name": "Product Showcase",
  "settings": [
    {
      "type": "text",
      "id": "section_title",
      "default": "Choose Your Advantage",
      "label": "Section Title"
    },
    {
      "type": "product",
      "id": "product_1",
      "label": "Product 1 (Junior Safe)"
    },
    {
      "type": "product",
      "id": "product_2",
      "label": "Product 2 (Hair Safe)"
    },
    {
      "type": "product",
      "id": "product_3",
      "label": "Product 3 (Pro Athlete)"
    },
    {
      "type": "product",
      "id": "bundle_product",
      "label": "Bundle Product"
    }
  ],
  "presets": [
    {
      "name": "Product Showcase"
    }
  ]
}
```

---

#### `sections/quiz-widget.liquid`
Interactive product recommendation quiz.

**Schema Settings:**
```json
{
  "name": "Quiz Widget",
  "settings": [
    {
      "type": "text",
      "id": "section_title",
      "default": "Not Sure Which One?",
      "label": "Section Title"
    },
    {
      "type": "textarea",
      "id": "description",
      "default": "Take our 60-second quiz to find your perfect formula.",
      "label": "Description"
    },
    {
      "type": "product",
      "id": "recommendation_1",
      "label": "Junior Safe Recommendation"
    },
    {
      "type": "product",
      "id": "recommendation_2",
      "label": "Hair Safe Recommendation"
    },
    {
      "type": "product",
      "id": "recommendation_3",
      "label": "Pro Athlete Recommendation"
    }
  ],
  "presets": [
    {
      "name": "Quiz Widget"
    }
  ]
}
```

---

#### `sections/cart-drawer.liquid`
Slide-out cart drawer with item management.

**Key Features:**
- Add/remove items
- Quantity adjustment
- Dynamic price updates
- Free shipping progress bar
- Checkout button

---

### 3. Template Files

#### `templates/product.liquid`
Product page template with variant selection.

```liquid
{% section 'product-template' %}
```

#### `templates/collection.liquid`
Collection page for "All Creatine" and category pages.

```liquid
{% section 'collection-template' %}
```

#### `templates/cart.liquid`
Cart page (fallback when drawer is disabled).

```liquid
{% section 'main-cart' %}
```

---

### 4. Snippet Files

#### `snippets/product-card.liquid`
Reusable product card component.

**Parameters:**
- `product`: Product object
- `show_vendor`: Boolean
- `show_rating`: Boolean
- `show_quick_add`: Boolean

#### `snippets/product-form.liquid`
Product form with variant selector and add to cart.

**Parameters:**
- `product`: Product object
- `section_id`: String
- `show_quantity`: Boolean

#### `snippets/variant-selector.liquid`
Variant selection component (buttons or dropdown).

#### `snippets/seo-schema.liquid`
JSON-LD schema markup for products, organization, and breadcrumbs.

```liquid
{% comment %} Product Schema {% endcomment %}
{% if template == 'product' %}
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": {{ product.title | json }},
  "image": {{ product.featured_image | image_url | json }},
  "description": {{ product.description | strip_html | truncate: 200 | json }},
  "brand": {
    "@type": "Brand",
    "name": "AYN Nutrition"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": {{ product.selected_or_first_available_variant.price | money_without_currency | json }},
    "availability": "https://schema.org/InStock"
  }
}
</script>
{% endif %}
```

---

## Product Setup

### Product Types

1. **Junior Safe Creatine**
   - Tags: `junior-safe`, `teen-friendly`, `bone-support`
   - Variants: 30 Servings, 60 Servings
   - Flavors: Unflavored, Fruit Punch, Blue Raspberry

2. **Hair Safe Creatine**
   - Tags: `hair-safe`, `dht-blocker`, `hair-protection`
   - Variants: 30 Servings, 60 Servings
   - Flavors: Unflavored, Mango, Strawberry Kiwi

3. **Pro Athletes Creatine**
   - Tags: `pro-athlete`, `elite`, `triple-blend`
   - Variants: 30 Servings, 60 Servings
   - Flavors: Unflavored, Green Apple, Watermelon

4. **Complete Stack (Bundle)**
   - Tags: `bundle`, `stack`, `value`
   - Contains all three products

### Metafields

```
product.metafields.custom.key_ingredients (multi_line_text)
product.metafields.custom.benefits (multi_line_text)
product.metafields.custom.suggested_use (multi_line_text)
product.metafields.custom.warnings (multi_line_text)
product.metafields.custom.badge_text (single_line_text)
product.metafields.custom.science_backed (boolean)
```

---

## Color Scheme (CSS Variables)

```css
:root {
  --color-primary-dark: #1A1A2E;
  --color-accent-teal: #00D4AA;
  --color-secondary-sand: #F7F3E9;
  --color-cta-coral: #FF6B6B;
  --color-white: #FFFFFF;
  --color-text-dark: #2D2D2D;
  --color-text-light: #6B7280;
  --color-accent-blue: #60A5FA;
  --color-accent-purple: #A78BFA;
}
```

---

## JavaScript Components

### `assets/quiz.js`
Product recommendation quiz logic.

```javascript
class AYNQuiz {
  constructor() {
    this.currentQuestion = 0;
    this.answers = {};
    this.questions = [
      {
        id: 'goal',
        question: "What's your primary goal?",
        options: [
          { id: 'muscle', label: 'Muscle Building', icon: 'dumbbell' },
          { id: 'hair', label: 'Hair Health', icon: 'heart' },
          { id: 'safe', label: 'Safe Performance', icon: 'activity' },
          { id: 'power', label: 'Maximum Power', icon: 'zap' }
        ]
      },
      // ... more questions
    ];
  }
  
  getRecommendation() {
    // Logic to determine product based on answers
    const { goal, concerns } = this.answers;
    
    if (concerns === 'hair-loss' || goal === 'hair') {
      return 'hair-safe';
    }
    if (concerns === 'bone-health' || goal === 'safe') {
      return 'junior-safe';
    }
    return 'pro-athlete';
  }
}
```

### `assets/cart-drawer.js`
Cart drawer functionality with AJAX updates.

```javascript
class AYNCartDrawer {
  constructor() {
    this.drawer = document.querySelector('[data-cart-drawer]');
    this.toggleButtons = document.querySelectorAll('[data-cart-toggle]');
    this.init();
  }
  
  async addItem(variantId, quantity = 1) {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity })
    });
    
    if (response.ok) {
      await this.updateCart();
      this.open();
    }
  }
  
  async updateCart() {
    const response = await fetch('/cart.js');
    const cart = await response.json();
    this.renderCart(cart);
  }
}
```

---

## Setup Instructions

### 1. Theme Installation

```bash
# Download theme from Shopify Theme Store or upload ZIP
cd ~/Downloads
unzip aynnutrition-theme.zip

# Or use Shopify CLI
shopify theme init aynnutrition-theme
```

### 2. Required Apps

- **Judge.me** or **Loox** - Product reviews
- **Klaviyo** - Email marketing integration
- **Recharge** - Subscription management (optional)
- **Stamped.io** - Loyalty program (optional)

### 3. Navigation Setup

Create these menus in Shopify Admin:

**Main Menu:**
- Shop → /collections/all
- Formulations → /pages/formulations
- Science → /pages/science
- About → /pages/about
- Blog → /blogs/news

**Footer Menu:**
- Privacy Policy → /pages/privacy
- Terms → /pages/terms
- Shipping → /pages/shipping
- Returns → /pages/returns

### 4. Page Templates

Create these pages:
- `/pages/science` - Science & Transparency
- `/pages/about` - About AYN Nutrition
- `/pages/formulations` - Detailed formulation info

### 5. Collection Setup

Create collections:
- **All Products** - All creatine products
- **Junior Safe** - Products tagged with `junior-safe`
- **Hair Safe** - Products tagged with `hair-safe`
- **Pro Athletes** - Products tagged with `pro-athlete`
- **Bundles** - Products tagged with `bundle`

---

## Performance Optimization

### Image Optimization
- Use Shopify's CDN with `image_url` filter
- Implement lazy loading with `loading="lazy"`
- Use WebP format where supported
- Specify width/height to prevent CLS

### CSS/JS Optimization
- Minify assets in production
- Defer non-critical JavaScript
- Use `preload` for critical fonts
- Implement critical CSS inlining

### SEO Checklist
- [ ] Meta titles and descriptions
- [ ] Alt text for all images
- [ ] Structured data (JSON-LD)
- [ ] Canonical URLs
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Page speed optimization
- [ ] Mobile responsiveness

---

## Testing Checklist

### Functionality
- [ ] Add to cart works
- [ ] Variant selection updates price
- [ ] Cart drawer opens/closes smoothly
- [ ] Quantity updates work
- [ ] Remove item works
- [ ] Quiz recommendation is accurate
- [ ] Newsletter signup works
- [ ] Search functionality works
- [ ] Mobile menu works

### Cross-browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Responsive
- [ ] Desktop (1920px)
- [ ] Laptop (1440px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

## Support & Maintenance

### Regular Tasks
- Update inventory
- Monitor customer reviews
- Check for broken links
- Update blog content
- Analyze quiz completion rates

### Seasonal Updates
- Festival promotions (Diwali, New Year)
- Summer fitness campaigns
- New Year resolution campaigns
- IPL/Cricket season promotions

---

## Contact

For theme support:
- Email: support@aynnutrition.in
- Documentation: https://aynnutrition.in/pages/theme-docs

---

*Last Updated: March 2024*
*Version: 1.0.0*
