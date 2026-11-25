# Portfolio AI Architecture & Maintenance Instructions

## 1. Core Goal

This project is designed to be maintained primarily through AI.

The main architectural goal is:

> Adding a new portfolio project should require minimal code changes and should normally require changing only the portfolio data and adding assets.

The visual design and application architecture should remain stable while new projects are added.

Do not optimize for unnecessary abstraction or enterprise-level architecture.

Optimize for:

* Low maintenance
* Predictable changes
* Strong type safety
* Data-driven projects
* Reusable project components
* Minimal changes when adding projects
* Safe AI-assisted development

---

## 2. Single Source of Truth & Bilingual Architecture

`lib/portfolio-data.ts` is the primary source of truth for portfolio project content.

`lib/site-content.ts` is the primary source of truth for all site-wide UI copy (sidebar, overview, grid headings, project detail chrome, resume/contact, metadata).

`lib/i18n.ts` defines the core bilingual types (`Locale`, `LocalizedString`, `LocalizableText`) and resolution helpers (`resolveText`, `getLocaleDir`, `getStableTextKey`).

`components/language-provider.tsx` manages active language state (`'en' | 'he'`), updates `<html lang dir>` and `document.title`, persists selection in `localStorage` (`portfolio-locale`), and exposes `useLanguage()` (`{ locale, dir, setLocale, toggleLocale, t }`).

A project should contain all information required to describe and render that project in **both** English (`en`) and Hebrew (`he`) within a single project object using `LocalizedString` (`{ en: string; he: string }`) or `LocalizableText` (`string | LocalizedString`).

Do not duplicate project objects across separate language files or create parallel `projectsEn` / `projectsHe` arrays. Structural fields (`id`, `category`, `icon`, `image`, `glyph`, media `url`s, `code` snippets, and block ordering) are defined once per project so any structural or media update applies to both languages automatically.

### Bilingual & RTL/LTR Rules for Components

When editing or creating UI components or new `ContentBlock` renderers:

* **Never hardcode UI copy inside components.** Put all site-wide UI strings in `lib/site-content.ts` and all project text in `lib/portfolio-data.ts`.
* **Always resolve text with `t(...)`** from `useLanguage()` (e.g., `{t(project.title)}`, `{t(siteContent.overview.heading)}`).
* **Use `getStableTextKey(...)`** for React `key` props on `LocalizableText` values so switching languages does not unnecessarily remount elements.
* **Use Tailwind logical properties instead of physical left/right classes** so English (`dir="ltr"`) and Hebrew (`dir="rtl"`) mirror cleanly:
  * Prefer `start-*` / `end-*`, `ps-*` / `pe-*`, `ms-*` / `me-*`, `border-s` / `border-e`, `text-start` / `text-end` over `left-*`, `right-*`, `pl-*`, `pr-*`, `ml-*`, `mr-*`, `border-l`, `border-r`, `text-left`.
* **Keep Hebrew typography legible:** When using wide `tracking-*` on English labels, scope it with `ltr:tracking-... rtl:tracking-normal`.
* **Handle directional icons & technical LTR blocks explicitly:**
  * Mirror directional arrows in RTL (`rtl:rotate-180`, `rtl:-scale-x-100`).
  * Keep code blocks, technical glyphs, emails, handles, and paths wrapped with `dir="ltr"` (and `text-left` for multi-line code) so punctuation and syntax are never inverted in Hebrew mode.

Do not duplicate project metadata in other files.

Do not create separate lists such as:

```ts
const PROJECTS_WITH_VIDEO = [...]
```

or:

```ts
const PROJECTS_WITH_GALLERY = [...]
```

or:

```ts
const PROJECTS_WITH_TIMELINE = [...]
```

If a project has a specific capability, that capability should be represented inside the project's data.

---

## 3. Adding a New Project

When adding a normal project:

### Allowed changes

* Add the project to `lib/portfolio-data.ts` (including both `en` and `he` strings for every `LocalizedString` field)
* Add required images/videos/assets under `public/`

### Do NOT modify

* `app/page.tsx`
* `components/project-detail.tsx`
* `lib/site-content.ts` (unless adding a new site-wide UI label)
* Existing project components
* Navigation
* Layout
* Existing rendering logic

unless the project requires a genuinely new content type that the system does not currently support.

A normal new project should not require a new React component.

---

## 4. Project Content Blocks

Projects use `contentBlocks` to describe their content.

A project can use any supported block type in any order and any combination.

For example:

```ts
contentBlocks: [
  text,
  video,
  steps,
]
```

Another project may use:

```ts
contentBlocks: [
  text,
  code,
  features,
  gallery,
]
```

There is NO requirement that all projects have the same structure.

The system should provide reusable building blocks while allowing each project to choose its own composition.

---

## 5. Type Safety

Do NOT use `any` for project data or content blocks.

Use the existing TypeScript types such as:

* `Project`
* `ContentBlock`
* `TextBlock`
* `TextBullet`
* `VideoBlock`
* `CodeBlock`
* `StepsBlock`
* `FeaturesBlock`
* `ImageBlock`
* `SpecsBlock`
* `Locale`
* `LocalizedString`
* `LocalizableText`

If a new content type is required, create a proper TypeScript type for it.

Do not bypass the type system with:

```ts
any
```

or unnecessary:

```ts
as any
```

The type system exists as a safety mechanism for AI-generated changes.

---

# 6. Adding a NEW Content Block Type

A new content type may be required when a project needs functionality that the current block system does not support.

Examples:

* Gallery
* Timeline
* Interactive diagram
* Comparison
* Architecture diagram
* Custom media presentation

When adding a new block type, extend the existing content-block architecture.

For example, a new Gallery block might look conceptually like:

```ts
type GalleryBlock = {
  type: 'gallery'
  title?: LocalizedString
  images: string[]
}
```

A Timeline might look conceptually like:

```ts
type TimelineBlock = {
  type: 'timeline'
  title?: LocalizedString
  events: TimelineEvent[]
}
```

The exact structure should be chosen according to the requirements of the component.

---

## 7. Files That Should Change When Adding a NEW Content Block

When introducing a genuinely new content type, normally modify these areas:

### A. `lib/portfolio-data.ts`

Add the new TypeScript type and include it in the `ContentBlock` union.

Example:

```ts
type ContentBlock =
  | TextBlock
  | VideoBlock
  | CodeBlock
  | StepsBlock
  | FeaturesBlock
  | GalleryBlock
```

Also define the data structure required by the new block.

---

### B. `components/project-detail.tsx`

Add rendering support for the new block type inside the existing block-rendering system.

For example:

```ts
case 'gallery':
  ...
```

Do not create project-specific rendering logic.

The renderer must work for every project that uses the new block type.

---

### C. `lib/portfolio-data.ts`

Use the new block in the relevant project.

Example:

```ts
contentBlocks: [
  {
    type: 'gallery',
    title: { en: 'Screenshots', he: 'צילומי מסך' },
    images: [
      '/images/project-a-1.png',
      '/images/project-a-2.png',
    ],
  },
]
```

After the block type has been implemented, adding the same block to another project should require changing only that project's data.

---

## 8. Important Rule for New Components

If a new component is needed, it should be implemented as a reusable content-block capability.

Do NOT create a component that exists only for one project unless there is a strong architectural reason.

Bad:

```text
FSMProjectSpecialGallery
```

Better:

```text
GalleryBlock
```

Then:

```text
Project A → gallery
Project B → gallery
Project C → gallery
```

All projects use the same reusable capability.

---

## 9. Do Not Create Project-Specific Exceptions

Avoid code such as:

```ts
if (project.id === 'fsm') {
  ...
}
```

or:

```ts
if (project.id === 'special-project') {
  ...
}
```

Project-specific behavior should normally be represented by project data.

The rendering system should not need to know the identities of individual projects.

---

## 10. `app/page.tsx`

`app/page.tsx` is part of the application shell.

It should remain as stable as possible.

Do not modify it when adding:

* A normal project
* A video
* A gallery
* A timeline
* A new content block

If a genuinely new application-level feature requires modifying `app/page.tsx`, explain why before making the change.

---

## 11. `components/project-detail.tsx`

This component is responsible for displaying projects.

It should remain generic.

It should not contain logic specific to individual projects.

When adding a new content-block type, extend the existing rendering mechanism rather than creating project-specific logic. Every new block renderer must resolve translatable fields via `useLanguage().t`, use logical Tailwind spacing/alignment classes for RTL/LTR parity, and mark code or syntax-heavy content with `dir="ltr"`.

Do not perform unrelated refactors while adding a new block.

---

## 12. Assets & External Media Storage

Media assets (project images and video clips) are hosted externally on Cloudflare R2 under `MEDIA_BASE_URL` defined in `lib/media.ts`, and local `public/images/`, `public/clips/`, and `public/projects/` folders are ignored in `.gitignore`.

Use `getMediaUrl(...)` from `lib/media.ts` for all project images and video URLs, and follow predictable asset path conventions inside the R2 `media/` bucket using the project ID:

```ts
image: getMediaUrl('/images/project-id/hero.png')
url: getMediaUrl('/clips/project-id/demo.mp4')
```

Example paths on external storage:

```text
media/images/project-id/hero.png
media/images/project-id/project-id-1.png
media/clips/project-id/demo.mp4
```

Do not commit large binary images/videos to `public/images/` or `public/clips/`, and do not hardcode the R2 domain repeatedly across project entries—always use `getMediaUrl(...)`.

---

## 13. Before Making Architectural Changes

If a requested feature cannot be implemented using the existing project/content-block architecture:

1. Explain why.
2. Identify which files need to change.
3. Explain whether the change affects existing projects.
4. Prefer extending the existing architecture over creating a parallel system.
5. Do not perform unrelated refactors.

---

## 14. Preserve Existing Behavior

When modifying the architecture:

* Preserve existing visual design.
* Preserve existing project content.
* Preserve existing navigation.
* Preserve existing animations and interactions.
* Preserve existing responsive behavior.
* Do not change unrelated components.

After changes, verify that all existing projects still render correctly.

---

## 15. Definition of Done

A change is considered complete when:

* TypeScript has no errors (`tsc --noEmit`).
* The project builds successfully.
* Existing projects still work in both English (`en` / LTR) and Hebrew (`he` / RTL).
* All new text fields provide both `en` and `he` translations (`LocalizedString`) and no untranslated strings are hardcoded in components.
* Existing visual behavior is preserved across both LTR and RTL layouts.
* No unnecessary `any` was introduced.
* No project-specific exceptions were introduced.
* No duplicate project metadata was created.
* A reusable new content type works for more than one project.
* Adding another project using the new content type requires only project data and assets.

---

## 16. Most Important Principle

Always prefer this:

```text
Project Data
     ↓
Reusable Content Blocks
     ↓
Generic Renderer
     ↓
UI
```

over this:

```text
Project
     ↓
Special Case
     ↓
Special Component
     ↓
Special Logic
```

The objective is not to make every project look the same.

The objective is to make the underlying system reusable while allowing every project to have its own content, order, and composition.
