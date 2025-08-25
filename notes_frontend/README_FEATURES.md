# Notes Frontend (Nuxt 3)

A minimalistic, modern, light-themed notes app with:
- CRUD: Create, Read, Update, Delete notes
- Search by title or content
- Responsive layout with sidebar list and main editor
- LocalStorage persistence (no backend required)
- Keyboard- and mobile-friendly

## Design
- Colors:
  - Primary: #1976d2
  - Secondary: #424242
  - Accent: #fbc02d
- Layout:
  - Header with app controls and search
  - Sidebar (collapsible on mobile) with notes list
  - Main area for viewing/editing selected note

## Development
- npm install
- npm run dev
- Open http://localhost:3000

Data is stored in LocalStorage keys:
- notes:data
- notes:selected
