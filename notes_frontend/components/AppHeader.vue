<template>
  <header class="header">
    <div class="left">
      <button class="icon-btn" aria-label="Toggle sidebar" @click="$emit('toggle-sidebar')">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      </button>
      <div class="brand">
        <span class="dot" />
        <span class="title">Notes</span>
      </div>
    </div>
    <div class="center">
      <input
        class="input search"
        type="search"
        :value="search"
        @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        placeholder="Search notes..."
        aria-label="Search notes by title or content"
      />
    </div>
    <div class="right">
      <button class="button accent" @click="$emit('new-note')">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14" />
        </svg>
        New
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  search: string
}>()

defineEmits<{
  (e: 'update:search', v: string): void
  (e: 'new-note'): void
  (e: 'toggle-sidebar'): void
}>()
</script>

<style scoped>
.header {
  height: 64px;
  background: var(--bg-elev);
  border-bottom: 1px solid var(--border);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
}

.left, .right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.center {
  display: flex;
  justify-content: center;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: var(--text);
}

.brand .dot {
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 15%, transparent);
}

.title {
  letter-spacing: 0.3px;
}

.search {
  width: min(680px, 60vw);
}

.icon-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-grid;
  place-items: center;
  cursor: pointer;
}
.icon-btn:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 10%, transparent);
}

@media (max-width: 1024px) {
  .header {
    grid-template-columns: auto 1fr auto;
  }
  .search {
    width: 100%;
  }
}
</style>
