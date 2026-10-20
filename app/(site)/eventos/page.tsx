import { CalendarX } from 'lucide-react'
import type { Metadata } from 'next'

import { EventCard } from '@/components/events/event-card'
import { EventFilterBar } from '@/components/events/event-filter-bar'
import { Pagination } from '@/components/events/pagination'
import { Reveal, StaggerItem, StaggerList } from '@/components/motion/reveal'
import { SectionDecor } from '@/components/motion/section-decor'
import {
  getEventTags,
  getPastEvents,
  getUpcomingEvents
} from '@/sanity/lib/queries'
import type { EventStatus } from '@/sanity/lib/types'

export const metadata: Metadata = {
  title: 'Eventos | RFEC',
  description:
    'Confira os próximos eventos da Recife Frontend Community e explore o histórico de encontros passados.',
  alternates: { canonical: '/eventos' }
}

type SearchParams = {
  status?: string
  tag?: string
  pagina?: string
}

export default async function EventsPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const { status: statusParam, tag = '', pagina } = await searchParams
  const status: EventStatus = statusParam === 'past' ? 'past' : 'upcoming'
  const page = Math.max(1, Number(pagina) || 1)

  const tags = await getEventTags()

  const past = status === 'past' ? await getPastEvents({ tag, page }) : null
  const events = status === 'past' ? past!.items : await getUpcomingEvents(tag)

  const totalPages = past ? Math.ceil(past.total / past.pageSize) : 1

  function buildHref(targetPage: number) {
    const params = new URLSearchParams()
    params.set('status', 'past')
    if (tag) params.set('tag', tag)
    if (targetPage > 1) params.set('pagina', String(targetPage))
    return `/eventos?${params.toString()}`
  }

  return (
    <>
      <header className="relative overflow-hidden bg-zinc-950 px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <SectionDecor />
        <div className="relative container mx-auto">
          <Reveal y={16}>
            <span className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-widest text-zinc-300 uppercase backdrop-blur-sm">
              Agenda RFEC
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
              Eventos
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-display mt-4 max-w-2xl text-lg font-semibold text-zinc-300 md:text-xl">
              Encontros, workshops e meetups da Recife Frontend Community.
              Participe dos próximos e revisite os que já aconteceram.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-10">
          <EventFilterBar tags={tags} status={status} activeTag={tag} />
        </div>

        {events.length > 0 ? (
          <StaggerList
            key={`${status}-${tag}-${page}`}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {events.map((event) => (
              <StaggerItem key={event._id}>
                <EventCard event={event} />
              </StaggerItem>
            ))}
          </StaggerList>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 py-20 text-center text-zinc-500">
            <CalendarX className="size-10" />
            <p>
              {status === 'past'
                ? 'Nenhum evento passado por aqui ainda.'
                : 'Nenhum evento próximo no momento. Volte em breve!'}
            </p>
          </div>
        )}

        {status === 'past' && totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              buildHref={buildHref}
            />
          </div>
        )}
      </div>
    </>
  )
}
