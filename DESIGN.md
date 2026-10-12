---
version: 1.0
name: ScamShield Design System
description: The ScamShield design system — an investigative-document aesthetic. Warm paper ground, near-black ink, one restrained vermilion accent, serif editorial headings, hairline rules, and numbered annotations. This document records the tokens that live in frontend/src/styles/tokens.css and the layout behaviour of the components built on them, so future changes reuse the existing system instead of inventing a second one.
---

## Overview

ScamShield presents fraud evidence the way a case file presents documents: a warm off-white sheet, near-black ink, one vermilion accent reserved for warnings and interactive states, thin rules instead of shadows, and small tracked labels that behave like archival stamps. Screens are typeset, not decorated — hierarchy is carried by typography, hairlines, and whitespace.

## Colors

| Token | Value | Use |
|---|---|---|
| `--color-background` | `#f7f5f0` | Page ground — warm off-white paper |
| `--color-panel` | `#fcfbf8` | Raised surfaces: cards, inputs, menu |
| `--color-panel-inset` | `#f2efe8` | Disabled/inset fields |
| `--color-border` | `#dcd8cf` | Hairline rules and quiet borders |
| `--color-border-strong` | `#bfbaae` | Structural borders: textarea, table tabs |
| `--color-text` | `#24231f` | Primary ink — headings, body |
| `--color-text-secondary` | `#77736b` | Labels, hints, metadata |
| `--color-accent` | `#b54432` | The single accent — errors, active states |
| `--color-accent-soft` | `#f3e3df` | Rejection/warning wash |
| `--color-success` | `#536b57` | Muted confirmations — "case logged" |
| `--color-success-soft` | `#e4e9e2` | Success wash |

Only these colours exist. No gradients, glows, or second accent family.

## Typography

| Token | Stack | Size | Use |
|---|---|---|---|
| `--font-serif` | Iowan Old Style → Palatino → Georgia | — | Editorial headings |
| `--font-sans` | Inter → Helvetica → Arial | — | Body, UI, labels |
| `--font-mono` | SFMono → Menlo → Consolas | — | Case refs, counts, identifiers |

| Token | Size | Use |
|---|---|---|
| `--text-micro` | 11px | Section labels, stamps, metadata |
| `--text-small` | 13px | Notes, table values, hints |
| `--text-body` | 15px | Body copy, controls |
| `--text-lead` | 17px | Intro paragraph |
| `--text-h3` | 18px | Sub headings |
| `--text-h2` | 24px | Section headings |
| `--text-h1` | 34px | Page heading |

Labels are uppercase with `--tracking-label: 0.14em`. Body runs at `--leading-body: 1.7`.

## Layout

- `--column-width: 1100px` — the measure for header, main, and footer.
- `--gutter: 1.25rem` — side padding inside the measure.
- `--radius: 2px` — near-square, archival. No rounded-card language.
- Spacing scale: `--space-1` … `--space-8` (4px → 64px, 4px base unit).
- Structure: header → `main` → footer. Depth comes from 1px rules only; there are no shadows.

## Components

- **AppHeader** — two-tier masthead. Row 1: wordmark + descriptor left, language toggle + privacy indicator right (tools sit behind the menu button on phones). Row 2: numbered nav strip (01 Investigate, 02 Replay, 03 Connected Reports) under a hairline, always visible ≥860px.
- **InputTabs** — hairline tab strip (01 Message, 02 Screenshot); collapses to equal-width tabs ≤480px.
- **MessageInput** — monospaced textarea for the pasted evidence, with character count and a do-not-edit hint.
- **ScreenshotUpload** — dashed dropzone; once filled, a definition list records file name, type, size, and modified timestamp.
- **AnalyseButton** — full-width on phones, auto-width ≥600px.
- **AnalysisPanel** — the filed report surface: "case logged" stamp, mono metadata list, then the notice and planned Phase 2 output.
- **PhaseNotice / PlaceholderPage** — unstarted sections (Replay, Connected Reports) with their case strip and planned scope.
- **SectionLabel** — small label + rule + mono aside; the recurring section hierarchy device.

## Responsive behaviour

| Width | Behaviour |
|---|---|
| ≤ 400px | Tabs compact; both tabs stay on one row |
| ≤ 480px | Tabs equal-width, "empty" hint hidden |
| ≤ 560px | Definition-list rows stack label above value |
| ≤ 639px | Header descriptor hidden; nav and tools collapse behind the menu button |
| ≥ 600px | AnalyseButton shrinks to auto width |
| ≥ 860px | Header shows the two-tier masthead; nav strip always visible |
| ≥ 900px | Investigate workspace becomes asymmetric: primary column + 260px margin notes |

## Interaction

- Evidence is highlighted with numbered annotations, not badges.
- Reports read as typeset documents: rules and spacing do the separating.
- Controls are compact; focus is a 2px accent outline.

## Do

- Reuse the tokens above — extend the scale, never fork it.
- Keep the accent vermilion and sparse (errors, active tab underline, note numbers).
- Set headings in the serif stack and identifiers in mono.

## Don't

- No gradients, glows, glassmorphism, orbs, shadows, or giant rounded cards.
- No fake analytics, risk scores, or trust badges the system has not produced.
- No second design system — inspect `tokens.css` and the module CSS before adding styles.
