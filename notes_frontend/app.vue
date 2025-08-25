<template>
  <div class="app-root">
    <NuxtRouteAnnouncer />
    <AppHeader
      :search="searchQuery"
      @update:search="onSearchUpdate"
      @new-note="onNewNote"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
    />
    <div class="layout">
      <Sidebar
        :notes="filteredNotes"
        :selected-id="selectedNoteId"
        :open="sidebarOpen"
        @select="onSelectNote"
        @delete="onDeleteNote"
      />
      <main class="main">
        <NoteEditor
          v-if="activeNote"
          :note="activeNote"
          @update="onUpdateNote"
          @delete="onDeleteNote"
        />
        <EmptyState v-else @create="onNewNote" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import Sidebar from '~/components/Sidebar.vue'
import NoteEditor from '~/components/NoteEditor.vue'
import EmptyState from '~/components/EmptyState.vue'
import { useNotesStore } from '~/composables/useNotesStore'

const sidebarOpen = ref(true)
const searchQuery = ref('')

const store = useNotesStore()

const notes = store.notes
const selectedNoteId = store.selectedNoteId

const activeNote = computed(() => notes.value.find(n => n.id === selectedNoteId.value))
const filteredNotes = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return notes.value
  return notes.value.filter(n =>
    n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
  )
})

function onSearchUpdate(v: string) {
  searchQuery.value = v
}

function onSelectNote(id: string) {
  store.select(id)
  // Auto-close sidebar on small screens after selection
  if (window.innerWidth < 1024) sidebarOpen.value = false
}

function onNewNote() {
  const id = store.create({
    title: 'Untitled',
    content: ''
  })
  store.select(id)
}

function onUpdateNote(payload: { id: string, title: string, content: string }) {
  store.update(payload.id, { title: payload.title, content: payload.content })
}

function onDeleteNote(id: string) {
  store.remove(id)
}

onMounted(() => {
  // Responsive initial state
  if (window.innerWidth < 1024) sidebarOpen.value = false
})

// Persist notes on change (handled internally by store as well, but we keep a shallow watch for selected id)
watch(selectedNoteId, (val) => {
  if (process.client) {
    localStorage.setItem('notes:selected', val ?? '')
  }
}, { immediate: true })
</script>

<style>
:root {
  --color-primary: #1976d2;
  --color-secondary: #424242;
  --color-accent: #fbc02d;
  --bg: #fafafa;
  --bg-elev: #ffffff;
  --text: #212121;
  --muted: #757575;
  --border: #e0e0e0;
}

* { box-sizing: border-box; }

html, body, #__nuxt, #__layout {
  height: 100%;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
}

.app-root {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 0;
  height: calc(100dvh - 64px);
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

.main {
  background: var(--bg);
  height: 100%;
  overflow: auto;
}

/* Utility */
.button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  background: var(--bg-elev);
  color: var(--text);
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s ease;
}
.button:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 10%, transparent);
}
.button.primary {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}
.button.accent {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #2d2d2d;
}

.input, .textarea {
  width: 100%;
  border: 1px solid var(--border);
  background: var(--bg-elev);
  color: var(--text);
  padding: 10px 12px;
  border-radius: 10px;
  outline: none;
  transition: 0.15s ease;
}
.input:focus, .textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 10%, transparent);
}
.textarea {
  min-height: 50vh;
  resize: vertical;
}

.icon {
  width: 18px;
  height: 18px;
  display: inline-block;
}
</style>
