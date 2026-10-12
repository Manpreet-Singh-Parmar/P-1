## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## ScamShield Design Rules — Apply to Every Future Change

ScamShield must look like a modern investigative document, not a generic AI SaaS application.

Visual identity:
- Warm off-white paper background.
- Near-black ink typography.
- One restrained vermilion accent.
- Serif editorial headings.
- Clean sans-serif body text.
- Monospaced technical identifiers.
- Fine borders.
- Generous whitespace.
- Minimal or no shadows.
- Small, deliberate labels.

Interaction design:
- Highlight evidence in the original message.
- Use numbered annotations.
- Present reports like carefully typeset documents.
- Use compact controls and clear section hierarchy.
- Prefer meaningful typography and layout over decorative graphics.
- Use responsive layouts that preserve the investigative-document feel on mobile.

Never add:
- AI gradients.
- Glowing elements.
- Glassmorphism.
- Giant rounded cards.
- Floating orbs.
- Generic chatbot layouts.
- Unnecessary animations.
- Fake analytics.
- Invented trust badges.
- Decorative elements that do not communicate information.

Every visual element must serve a functional purpose.

Before changing the interface, inspect the existing design tokens and components. Reuse them rather than creating a second design system.

Do not replace the entire frontend when implementing a new feature.

Preserve the existing layout, spacing, typography, and colour palette unless a specific accessibility or usability problem requires a change.
