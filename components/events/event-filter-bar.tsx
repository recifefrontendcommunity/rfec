'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import type { EventStatus } from '@/sanity/lib/types'
import type { TagRef } from '@/sanity/lib/types'

const STATUS_TABS: { value: EventStatus; label: string }[] = [
  { value: 'upcoming', label: 'Próximos' },
  { value: 'past', label: 'Passados' }
]

export function EventFilterBar({
  tags,
  status,
  activeTag
}: {
  tags: TagRef[]
  status: EventStatus
  activeTag: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function update(next: { status?: EventStatus; tag?: string }) {
    const params = new URLSearchParams(searchParams.toString())

    if (next.status !== undefined) params.set('status', next.status)
    if (next.tag !== undefined) {
      if (next.tag) params.set('tag', next.tag)
      else params.delete('tag')
    }
    // Any filter change resets pagination.
    params.delete('pagina')

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="tablist"
        aria-label="Filtrar eventos por período"
        className="inline-flex rounded-full border border-zinc-200 bg-zinc-100 p-1"
      >
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={status === tab.value}
            onClick={() => update({ status: tab.value })}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300',
              status === tab.value
                ? 'bg-white text-zinc-950 shadow-md'
                : 'text-zinc-500 hover:text-zinc-950'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tags.length > 0 && (
        <label className="text-muted-foreground flex items-center gap-2 text-sm">
          <span className="sr-only sm:not-sr-only">Tag:</span>
          <select
            value={activeTag}
            onChange={(event) => update({ tag: event.target.value })}
            className="focus-visible:ring-ring h-10 rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 shadow-sm transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
          >
            <option value="">Todas as tags</option>
            {tags.map((tag) => (
              <option key={tag.slug} value={tag.slug}>
                {tag.title}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  )
}
