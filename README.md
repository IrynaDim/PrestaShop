# 🧪 Playwright UI Test Suite for PrestaShop Demo

This is a **pet project** that implements automated UI tests for the [PrestaShop demo site](https://demo.prestashop.com/).

The project uses **Playwright** with a **Page Object Model** architecture, and organizes business logic into dedicated **Steps classes**. This structure ensures modularity, scalability, and readability of the test code.

## 🔍 What is tested?

- Product sorting by name and price
- Adding products to the cart
- Product customization
- End-to-end checkout flow
- UI content: buttons, labels, newsletter sections
- User registration with validation checks
- Dropdown menus, language selection, and footer texts

## 🛠️ Setup

You can run tests in two ways:

✅ Using the predefined script in ```package.json```
This project includes the following script:

```json
"scripts": {
  "test": "npx playwright test"
}
```

✅ Running tests directly via CLI

``` npx playwright test ```


