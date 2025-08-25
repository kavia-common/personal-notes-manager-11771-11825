 /**
  * PUBLIC_INTERFACE
  * useFormat
  * Provide small formatting helpers.
  */
export function useFormat() {
  // PUBLIC_INTERFACE
  /**
   * Format a timestamp to a local string.
   */
  function dateTime(ts: number): string {
    try {
      const d = new Date(ts)
      return d.toLocaleString()
    } catch {
      return ''
    }
  }
  return { dateTime }
}
