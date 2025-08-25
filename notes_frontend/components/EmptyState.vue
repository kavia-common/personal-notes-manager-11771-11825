<template>
  <div class="empty">
    <div class="card">
      <div class="logo">
        <span class="dot" />
      </div>
      <h2>Welcome to Notes</h2>
      <p>Create your first note to get started.</p>
      <button class="button primary" @click="$emit('create')">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14" />
        </svg>
        Create note
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'create'): void }>()
</script>

<style scoped>
.empty {
  min-height: calc(100dvh - 64px);
  display: grid;
  place-items: center;
  padding: 24px;
}

.card {
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  color: var(--text);
  width: min(560px, 92vw);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}

.logo {
  display: grid;
  place-items: center;
}

.dot {
  width: 16px;
  height: 16px;
  background: var(--color-accent);
  border-radius: 50%;
  margin-bottom: 8px;
  box-shadow: 0 0 0 6px color-mix(in oklab, var(--color-accent) 16%, transparent);
}

h2 {
  margin: 8px 0 6px;
}

p {
  margin: 0 0 16px;
  color: var(--muted);
}
</style>
