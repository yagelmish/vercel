# Portfolio Architecture

IMPORTANT:

1. portfolio-data.ts is the single source of truth
   for portfolio projects.

2. When adding a project, do NOT modify:
   - app/page.tsx
   - project rendering components
   - navigation
   - layout

3. Add the project only to portfolio-data.ts.

4. Use existing ContentBlock types whenever possible.

5. Do not create new component types for a single project.

6. If a new content type is genuinely required,
   explain why before modifying the architecture.
