import type { EventListItem } from '@/sanity/lib/types'

const TIME_ZONE = 'America/Recife'
const LOCALE = 'pt-BR'

/** "12 de março de 2025" */
export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: TIME_ZONE
  }).format(new Date(iso))
}

/** "12 de março de 2025, 19:00" */
export function formatEventDateTime(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIME_ZONE
  }).format(new Date(iso))
}

/** { day: "25", month: "out" } */
export function formatEventDay(iso: string): { day: string; month: string } {
  const parts = new Intl.DateTimeFormat(LOCALE, {
    day: '2-digit',
    month: 'short',
    timeZone: TIME_ZONE
  }).formatToParts(new Date(iso))
  const pick = (type: string) =>
    parts.find((part) => part.type === type)?.value.replace('.', '') ?? ''
  return { day: pick('day'), month: pick('month') }
}

/** "19:00" */
export function formatEventTime(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIME_ZONE
  }).format(new Date(iso))
}

/**
 * True once the event has finished. Mirrors the GROQ filter
 * (`coalesce(endAt, startAt) < now`) so UI and queries agree.
 */
export function isPastEvent(
  event: Pick<EventListItem, 'startAt' | 'endAt'>
): boolean {
  const reference = event.endAt ?? event.startAt
  return new Date(reference).getTime() < Date.now()
}
