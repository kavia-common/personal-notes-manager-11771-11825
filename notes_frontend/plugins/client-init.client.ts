export default defineNuxtPlugin(() => {
  // Polyfill crypto.randomUUID if not available (older browsers)
  if (process.client) {
    if (typeof window.crypto === 'object' && typeof window.crypto.randomUUID !== 'function') {
      // Simple UUID v4 polyfill fallback
      // Not cryptographically secure; acceptable for local IDs
      // eslint-disable-next-line no-extend-native
      ;(window.crypto as any).randomUUID = () =>
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = (Math.random() * 16) | 0
          const v = c === 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        })
    }

    // Add a class to body when using keyboard navigation for focus styles
    let usingKeyboard = false
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        usingKeyboard = true
        document.documentElement.classList.add('using-keyboard')
      }
    }
    const onMouse = () => {
      if (usingKeyboard) {
        usingKeyboard = false
        document.documentElement.classList.remove('using-keyboard')
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onMouse)

    // Cleanup on HMR/dispose
    if (import.meta && (import.meta as any).hot) {
      (import.meta as any).hot.dispose(() => {
        window.removeEventListener('keydown', onKey)
        window.removeEventListener('mousedown', onMouse)
      })
    }
  }
})
