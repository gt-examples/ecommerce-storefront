# Ecommerce Storefront

A multilingual e-commerce storefront demonstrating GT internationalization with locale-aware pricing, pluralized counts, and stock status branching.

**[Live Demo](https://ecommerce-storefront.generaltranslation.dev)** | **[General Translation Docs](https://generaltranslation.com/docs)**

## About

This example app showcases a realistic e-commerce storefront with product listings, a shopping cart, and checkout flow — all fully internationalized using [General Translation](https://generaltranslation.com). It demonstrates locale-aware currency formatting, pluralization for item counts, and conditional stock status rendering across multiple languages.

## GT Features Used

- `<T>` — JSX translation
- `<Currency>` — Locale-aware currency formatting
- `<Num>` — Number formatting
- `<Plural>` — Pluralization
- `<Branch>` — Conditional rendering by stock level
- `<LocaleSelector>` — Language picker
- `tx` — Server-side string translations
- `loadTranslations` — Local translation storage

## Getting Started

```bash
git clone https://github.com/gt-examples/ecommerce-storefront.git
cd ecommerce-storefront
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built With

- [Next.js](https://nextjs.org)
- [General Translation](https://generaltranslation.com) (gt-next)
- [Tailwind CSS](https://tailwindcss.com)
