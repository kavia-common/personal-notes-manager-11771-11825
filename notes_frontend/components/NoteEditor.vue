<template>
  <section class="editor">
    <div class="toolbar">
      <input
        class="input title"
        type="text"
        v-model="local.title"
        placeholder="Note title"
        aria-label="Note title"
      />
      <div class="actions">
        <button class="button" @click="share" title="Copy shareable text" aria-label="Copy shareable text">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 17l-3 3m0 0l3 3m-3-3h12a4 4 0 0 0 4-4V7" />
          </svg>
          Copy
        </button>
        <button class="button" @click="$emit('delete', note.id)" title="Delete note" aria-label="Delete note">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  d="M3 6h18M8 6v12m8-12v12M10 6l1-2h2l1 2M6 6l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
          </svg>
          Delete
        </button>
        <button class="button primary" @click="saveNow" title="Save" aria-label="Save note">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Save
        </button>
      </div>
    </div>
    <textarea
      class="textarea content"
      v-model="local.content"
      placeholder="Start typing your note here..."
      aria-label="Note content"
    />
    <div class="meta">
      <span>Last updated: {{ time(note.updatedAt) }}</span>
      <span>Created: {{ time(note.createdAt) }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue'
import type { Note } from '~/composables/useNotesStore'

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  (e: 'update', payload: { id: string; title: string; content: string }): void
  (e: 'delete', id: string): void
}>()

const local = reactive({
  title: props.note.title,
  content: props.note.content
})

// Keep local state synced when note changes
watch(() => props.note.id, () => {
  local.title = props.note.title
  local.content = props.note.content
})

// Autosave behavior
let timer: any
watch(local, () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    emit('update', { id: props.note.id, title: local.title, content: local.content })
  }, 500)
}, { deep: true })

function saveNow() {
  emit('update', { id: props.note.id, title: local.title, content: local.content })
}

function time(ts: number) {
  try {
    const d = new Date(ts)
    return d.toLocaleString()
  } catch { return '' }
}

async function share() {
  const text = `# ${local.title || 'Untitled'}\n\n${local.content || ''}`
  try {
    await navigator.clipboard.writeText(text)
    // Optional UX: flash or toast could be added
  } catch {
    // swallow
  }
}
</script>

<style scoped>
.editor {
  height: 100%;
  padding: 16px;
  max-width: 1000px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.title {
  flex: 1;
  font-weight: 700;
  font-size: 18px;
}

.actions {
  display: inline-flex;
  gap: 8px;
}

.content {
  width: 100%;
  min-height: calc(100dvh - 64px - 120px);
  line-height: 1.6;
}

.meta {
  margin-top: 12px;
  display: flex;
  gap: 16px;
  color: var(--muted);
  font-size: 12px;
}

@media (max-width: 640px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .actions {
    justify-content: flex-end;
  }
}
</style>
