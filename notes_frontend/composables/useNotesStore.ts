import { ref, watch } from 'vue'

export type Note = {
  id: string
  title: string
  content: string
  updatedAt: number
  createdAt: number
}

type NewNote = Partial<Pick<Note, 'title' | 'content'>>

/**
 * PUBLIC_INTERFACE
 * useNotesStore
 * Minimal, localStorage-backed notes store with CRUD and selection.
 */
export function useNotesStore() {
  const notes = ref<Note[]>([])
  const selectedNoteId = ref<string | null>(null)

  // Load from localStorage
  if (process.client) {
    const saved = localStorage.getItem('notes:data')
    const sel = localStorage.getItem('notes:selected')
    if (saved) {
      try {
        notes.value = JSON.parse(saved)
      } catch { /* noop */ }
    }
    if (sel) selectedNoteId.value = sel || null
  }

  // Persist
  watch(notes, (val) => {
    if (process.client) {
      localStorage.setItem('notes:data', JSON.stringify(val))
    }
  }, { deep: true })

  function genId() {
    return crypto?.randomUUID?.() ?? `note_${Date.now()}_${Math.random().toString(36).slice(2)}`
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new note and return its id.
   */
  function create(payload: NewNote): string {
    const id = genId()
    const now = Date.now()
    const note: Note = {
      id,
      title: (payload.title ?? '').trim(),
      content: (payload.content ?? '').trim(),
      createdAt: now,
      updatedAt: now,
    }
    notes.value = [note, ...notes.value]
    return id
  }

  // PUBLIC_INTERFACE
  /**
   * Update an existing note by id.
   */
  function update(id: string, payload: NewNote) {
    const idx = notes.value.findIndex(n => n.id === id)
    if (idx === -1) return
    const existing = notes.value[idx]
    notes.value[idx] = {
      ...existing,
      title: payload.title !== undefined ? payload.title : existing.title,
      content: payload.content !== undefined ? payload.content : existing.content,
      updatedAt: Date.now(),
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a note by id.
   */
  function remove(id: string) {
    notes.value = notes.value.filter(n => n.id !== id)
    if (selectedNoteId.value === id) {
      selectedNoteId.value = notes.value[0]?.id ?? null
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Select note by id.
   */
  function select(id: string | null) {
    selectedNoteId.value = id
  }

  return {
    notes,
    selectedNoteId,
    create,
    update,
    remove,
    select,
  }
}
