<template>
  <aside class="sidebar" :class="{ open: open }" aria-label="Notes list">
    <div class="sidebar-inner">
      <div class="section-head">
        <span class="section-title">All Notes</span>
        <span class="count">{{ notes.length }}</span>
      </div>
      <ul class="list" role="list">
        <li v-for="n in sortedNotes" :key="n.id">
          <button
            class="item"
            :class="{ active: n.id === selectedId }"
            @click="$emit('select', n.id)"
          >
            <div class="item-header">
              <span class="title">{{ n.title || 'Untitled' }}</span>
              <button
                class="del-btn"
                title="Delete note"
                aria-label="Delete note"
                @click.stop="$emit('delete', n.id)"
              >
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        d="M3 6h18M8 6v12m8-12v12M10 6l1-2h2l1 2M6 6l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
                </svg>
              </button>
            </div>
            <div class="preview">
              {{ preview(n.content) }}
            </div>
            <div class="meta">
              {{ formatDate(n.updatedAt) }}
            </div>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Note } from '~/composables/useNotesStore'

const props = defineProps<{
  notes: Note[]
  selectedId: string | null
  open: boolean
}>()

defineEmits<{
  (e: 'select', id: string): void
  (e: 'delete', id: string): void
}>()

const sortedNotes = computed(() =>
  [...props.notes].sort((a, b) => b.updatedAt - a.updatedAt)
)

function preview(content: string, size = 80) {
  const t = content.replace(/\s+/g, ' ').trim()
  return t.length > size ? t.slice(0, size) + '…' : t || 'No content'
}

function formatDate(ts: number) {
  try {
    const d = new Date(ts)
    return d.toLocaleString()
  } catch {
    return ''
  }
}
</script>

<style scoped>
.sidebar {
  background: var(--bg-elev);
  border-right: 1px solid var(--border);
  height: 100%;
  overflow: hidden auto;
  width: 300px;
}

.sidebar-inner {
  padding: 12px;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 4px 10px 4px;
}

.section-title {
  font-weight: 700;
  color: var(--text);
}

.count {
  font-size: 12px;
  color: var(--muted);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 999px;
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  width: 100%;
  text-align: left;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.2s ease;
}
.item:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 10%, transparent);
  background: #fff;
}
.item.active {
  border-color: var(--color-primary);
  background: #fff;
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 12%, transparent);
}

.item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.title {
  font-weight: 600;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 210px;
}

.del-btn {
  background: transparent;
  color: var(--muted);
  border: none;
  display: inline-grid;
  place-items: center;
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;
}
.del-btn:hover { color: #b71c1c; background: #fdeaea; }

.preview {
  margin-top: 8px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.4;
  min-height: 18px;
}

.meta {
  margin-top: 8px;
  font-size: 12px;
  color: var(--muted);
}

@media (max-width: 1024px) {
  .sidebar {
    position: absolute;
    z-index: 10;
    width: 86%;
    max-width: 360px;
    transform: translateX(-105%);
    transition: transform 0.25s ease;
    box-shadow: 0 8px 36px rgba(0,0,0,0.12);
    height: calc(100dvh - 64px);
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
