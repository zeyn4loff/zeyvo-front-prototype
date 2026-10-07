# Zeyvo Online - Project Development Guidelines & User Rules

> [!IMPORTANT]
> This document contains mandatory project rules and developer guidelines specified by the project owner. Every change across the codebase must strictly follow these instructions.

---

## 1. Strictly Prohibited: No Emojis / Smileys as Icons
* **NO EMOJIS** (смайлики / эмодзи): Never use emoji characters (e.g. ✂️, 💈, 💇, 💅, 💼, 💄, ✨, 👁️, 💆, 💎, etc.) as UI icons, avatars, badges, or buttons.
* **Always use clean SVG icons**:
  - Use vector SVG icons with `fill="none" stroke="currentColor" stroke-width="2"`.
  - Icon keys in data structures must be semantic strings (e.g., `'scissors'`, `'barber'`, `'spa'`, `'nail'`, `'makeup'`, `'cosmetics'`, `'briefcase'`), NOT emoji characters.
  - Render icons through standard SVG helper functions (such as `getCategoryIconSvg` or `getRoleIconSvg`).

---

## 2. Strictly Prohibited: No CAPS LOCK / Uppercase Text
* **Never use all-caps text**: Do not use `uppercase` or `tracking-wider` Tailwind classes on headers, table columns, badges, buttons, or form labels.
* **Sentence and Title Casing**: Use clean title case or normal sentence case (e.g., `"Vəzifə və ixtisas"`, `"Cəmi məbləğ"`, `"Status"`).
* Avoid `.toUpperCase()` on labels and headings.

---

## 3. UI Consistency & Form Controls
* **No Duplicate Icons in Selects**: Ensure dropdown `<select>` elements never have duplicate arrow icons. When styling custom selects, either use `appearance-none` with one clean SVG chevron, or standard styling without extra overlay icons.
* **Segmented Controls & Sub-tabs**: Modules with multiple sub-sections (Products, Staff, etc.) must use the top segmented navigation (`renderSegmentedTabs`) with item counters and clean active states.
* **Standard Pagination**: Tables must implement unified pagination (`renderTablePagination`) with items-per-page options (10, 25, 50, 100), page navigation arrows, and total items counters.
* **Full CRUD Operations**: Every management section must support full CRUD:
  - List of items with filters and search
  - Adding new items via dedicated modal/action
  - Editing existing items with data pre-filled
  - Deleting items with safety confirmation dialogs

---

## 4. Design System & Aesthetics
* **Color Palette**:
  - Primary Accent: Zeyvo Yellow (`#FFDD2D`, hover `#FCC520`)
  - Primary Dark / Text: Graphite (`#101114`)
  - Neutral Backgrounds: Slate (`bg-slate-50`, `bg-slate-100`, `bg-white`)
  - Borders: `border-slate-200/90` or `border-slate-100`
* **Typography**: Clean sans-serif, standard font weights (`font-semibold`, `font-bold`), soft shadows (`shadow-2xs`, `shadow-xs`).

---

## 5. Strictly Prohibited: No Icons in Modal Headers
* **No Icon Badges in Modal Headers**: Modals must NEVER have icon badges, squircle containers, or decorative SVG icons placed next to the title in the modal header.
* **Standard Clean Modal Header**:
  - Left side: Plain text title `<h3>` and optional description `<p>` only.
  - Right side: Standard round close button (`✕`) with SVG close icon.
  - Never add category, action, or status icon containers (`w-10 h-10 rounded-2xl`, etc.) next to the title in modal headers.

