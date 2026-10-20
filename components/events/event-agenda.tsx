import { Clock } from 'lucide-react'

import type { AgendaItem } from '@/sanity/lib/types'

export function EventAgenda({ items }: { items?: AgendaItem[] }) {
  if (!items?.length) return null

  return (
    <section aria-labelledby="agenda-heading">
      <h2 id="agenda-heading" className="mb-6 text-3xl font-semibold">
        Programação
      </h2>
      <ol className="space-y-4">
        {items.map((item) => {
          const time = [item.startTime, item.endTime]
            .filter(Boolean)
            .join(' – ')
          return (
            <li
              key={item._key}
              className="flex flex-col gap-1 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 sm:flex-row sm:gap-6"
            >
              {time && (
                <div className="flex items-center gap-1.5 text-sm font-bold text-blue-500 sm:w-32 sm:shrink-0">
                  <Clock className="size-4" />
                  {time}
                </div>
              )}
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{item.title}</h3>
                {item.speaker?.name && (
                  <p className="text-muted-foreground text-sm">
                    {item.speaker.name}
                    {item.speaker.role ? ` · ${item.speaker.role}` : ''}
                  </p>
                )}
                {item.description && (
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
