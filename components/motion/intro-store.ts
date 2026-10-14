import { useSyncExternalStore } from 'react'

let done = false
const listeners = new Set<() => void>()

/** Called by the intro loader once the page can start animating in. */
export function markIntroDone() {
  if (done) return
  done = true
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** `false` until the intro loader has finished (or was skipped). */
export function useIntroDone() {
  return useSyncExternalStore(
    subscribe,
    () => done,
    () => false
  )
}
