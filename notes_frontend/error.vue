<template>
  <div class="error">
    <div class="card">
      <h2>Something went wrong</h2>
      <p>{{ (error as any)?.message || 'Unexpected error' }}</p>
      <NuxtLink to="/" class="button">Back home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: unknown }>()
</script>

<style scoped>
.error {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: var(--bg);
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
.button {
  display: inline-block;
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  color: var(--text);
  background: var(--bg-elev);
  text-decoration: none;
}
</style>
