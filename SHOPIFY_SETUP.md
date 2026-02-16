# Shopify Buy Button Setup — AgGen

## Overview

AgGen uses Shopify Buy Buttons for e-commerce. The site is hosted on GitHub Pages; Shopify handles the cart, checkout, and payment processing.

## Prerequisites

1. **Shopify Store**: Create a Shopify store (or use the existing Resonate Life Labs store)
2. **Shopify Buy Button Channel**: Install the "Buy Button" sales channel from Shopify admin
3. **Products Created**: Set up the following products in Shopify:
   - **AgGen Soil Restore** — Foundation Formula ($89/acre treatment)
   - **AgGen Growth Max** — Performance Formula ($149/acre treatment)
   - **AgGen Complete System** — Enterprise Solution (custom pricing / contact form)

## Integration Steps

### 1. Get Your Shopify Credentials

From your Shopify admin:
- Go to **Sales Channels → Buy Button**
- Click **Create a Buy Button** for each product
- Note the **domain** (e.g., `your-store.myshopify.com`)
- Note the **Storefront Access Token**

### 2. Add the Shopify Buy SDK

Add this script to `index.html` and `products.html` before the closing `</body>` tag:

```html
<script src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"></script>
```

### 3. Initialize Buy Buttons

Create a new file `js/shopify-integration.js` or add to `main.js`:

```javascript
(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

  // Configuration
  var SHOPIFY_DOMAIN = 'your-store.myshopify.com';         // ← Replace
  var STOREFRONT_TOKEN = 'your-storefront-access-token';    // ← Replace

  // Product IDs — get these from Shopify admin
  var PRODUCTS = {
    'AgGen Soil Restore':    'gid://shopify/Product/XXXXXXXXX',  // ← Replace
    'AgGen Growth Max':      'gid://shopify/Product/XXXXXXXXX',  // ← Replace
    'AgGen Complete System': 'gid://shopify/Product/XXXXXXXXX'   // ← Replace
  };

  // AgGen brand colors
  var COLORS = {
    primary:    '#2C4A1E',
    primaryAlt: '#4A7C2E',
    amber:      '#C17817',
    text:       '#1a1a1a',
    bg:         '#ffffff'
  };

  function loadScript() {
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initButtons();
    } else {
      var script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      script.onload = initButtons;
      (document.getElementsByTagName('head')[0] || document.body).appendChild(script);
    }
  }

  function initButtons() {
    var client = ShopifyBuy.buildClient({
      domain: SHOPIFY_DOMAIN,
      storefrontAccessToken: STOREFRONT_TOKEN
    });

    var ui = ShopifyBuy.UI.init(client);

    // Find all buy button containers and initialize
    document.querySelectorAll('.shopify-buy-button[data-product-name]').forEach(function(el) {
      var productName = el.getAttribute('data-product-name');
      var productId = PRODUCTS[productName];
      if (!productId) return;

      // Clear placeholder content
      el.innerHTML = '';

      ui.createComponent('product', {
        id: productId,
        node: el,
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
          product: {
            iframe: false,
            contents: { img: false, title: false, price: false, description: false },
            templates: { button: '<button class="btn btn--primary btn--full">Add to Cart</button>' },
            styles: {
              button: {
                'background-color': COLORS.primary,
                'border-radius': '999px',
                'font-weight': '700',
                ':hover': { 'background-color': COLORS.primaryAlt }
              }
            }
          },
          cart: {
            styles: {
              button: {
                'background-color': COLORS.primary,
                ':hover': { 'background-color': COLORS.primaryAlt }
              }
            }
          }
        }
      });
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadScript();
  } else {
    document.addEventListener('DOMContentLoaded', loadScript);
  }
})();
```

### 4. Replace Placeholder Buttons

Once Shopify is integrated, the SDK will automatically replace the placeholder buttons inside `.shopify-buy-button` containers with real "Add to Cart" buttons.

### 5. Test Checkout Flow

1. Click "Add to Cart" on any product
2. Verify the Shopify cart slides out / appears
3. Complete a test purchase using Shopify's test mode
4. Verify order appears in Shopify admin

## Product Setup in Shopify Admin

### AgGen Soil Restore — Foundation Formula
- **Price**: $89.00
- **SKU**: AGGEN-SR-001
- **Description**: Foundation soil remediation formula. Rebuilds microbial diversity in depleted soils. Targeted consortium of beneficial microorganisms. 30-day treatment cycle. Up to 10 acres.
- **Tags**: soil-restore, foundation, remediation

### AgGen Growth Max — Performance Formula
- **Price**: $149.00
- **SKU**: AGGEN-GM-001
- **Description**: Full-spectrum performance formula. NPK breakdown, 44% moisture retention, complete nutrient uptake activation. 60-day treatment cycle. 1-100+ acres.
- **Tags**: growth-max, performance, npk, popular

### AgGen Complete System — Enterprise Solution
- **Price**: Contact for pricing (use "Request Quote" button → contact form)
- **SKU**: AGGEN-CS-001
- **Description**: Enterprise-grade solution with custom soil analysis, tailored formulation, agronomist support. 50+ acres.
- **Tags**: complete-system, enterprise, custom

## Color Customization

Match the AgGen brand palette in Shopify Buy Button settings:
- **Primary**: `#2C4A1E` (Deep Agricultural Green)
- **Secondary**: `#4A7C2E` (Vibrant Green)
- **Accent**: `#C17817` (Rich Amber)
- **Background**: `#ffffff`
- **Text**: `#1a1a1a`

## Shipping & Tax

Configure in Shopify admin:
- Shipping zones and rates for agricultural products
- Tax settings per state/region
- Any agricultural product exemptions

## Notes

- The Complete System product uses a contact form instead of direct purchase (custom pricing)
- Consider adding subscription/recurring purchase options for repeat customers
- Shopify Buy Buttons work alongside the GitHub Pages static site — no server required
- For questions, refer to [Shopify Buy Button documentation](https://shopify.dev/docs/storefronts/headless/buy-button)
