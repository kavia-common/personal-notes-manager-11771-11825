# Contributing

Thank you for considering contributing to the Notes frontend!

- Stack: Nuxt 3 (Vue 3), Vite, TypeScript, ESLint.
- App shell and theme variables live in `app.vue`.
- Components are under `components/`.
- State is handled via composables in `composables/`.

Development:
- npm install
- npm run dev (http://localhost:3000)
- npm run lint
- npm run build && npm run preview

Guidelines:
- Keep UI minimalistic and accessible.
- Use variables from `app.vue` for colors and surfaces.
- Persist note changes via the store (`useNotesStore`).
- Avoid adding server calls; persistence is localStorage.
- Prefer small, focused components with clear props/emits.
