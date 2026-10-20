import { ArrowUpRight, CalendarDays, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { formatEventDay, formatEventTime } from '@/lib/events'
import { getImageUrl } from '@/sanity/lib/image'
import type { EventListItem } from '@/sanity/lib/types'

/**
 * Self-contained dark card: colors are explicit so it reads the same on the
 * dark home section and on the light `/eventos` listing.
 */
export function EventCard({ event }: { event: EventListItem }) {
  const banner = getImageUrl(event.banner, { width: 800, height: 450 })
  const { day, month } = formatEventDay(event.startAt)

  return (
    <Link
      href={`/eventos/${event.slug}`}
      className="rfec-shine group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-800">
        {banner ? (
          <Image
            src={banner}
            alt={event.banner?.alt || event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-500">
            <CalendarDays className="size-10" />
          </div>
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/10 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-col items-center rounded-xl bg-blue-500 px-3 py-1.5 leading-none shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
          <span className="text-xl font-extrabold">{day}</span>
          <span className="text-[0.65rem] font-bold tracking-widest uppercase">
            {month}
          </span>
        </div>

        {event.eventType && (
          <span className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-semibold backdrop-blur">
            {event.eventType.title}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-xl leading-snug font-extrabold text-white transition-colors group-hover:text-blue-400">
          {event.title}
        </h3>

        {event.shortDescription && (
          <p className="line-clamp-2 text-sm text-zinc-400">
            {event.shortDescription}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-1.5 pt-2 text-sm text-zinc-300">
          <time dateTime={event.startAt} className="flex items-center gap-2">
            <Clock className="size-4 text-blue-400" />
            {formatEventTime(event.startAt)}
          </time>
          {event.location?.name && (
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-blue-400" />
              {event.location.isOnline ? 'Online' : event.location.name}
            </p>
          )}
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <span
                key={tag.slug}
                className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-zinc-200"
              >
                #{tag.title}
              </span>
            ))}
          </div>
        )}

        <span className="flex items-center gap-1 pt-1 text-sm font-bold text-blue-400">
          Ver detalhes
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </Link>
  )
}
