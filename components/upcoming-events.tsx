import { ArrowRight, CalendarX } from 'lucide-react'
import Link from 'next/link'

import { EventCard } from '@/components/events/event-card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getUpcomingEvents } from '@/sanity/lib/queries'

import { Reveal, StaggerItem, StaggerList } from './motion/reveal'
import TitleWithTag from './title-with-tag'

const UpcomingEvents = async () => {
  const events = await getUpcomingEvents()
  const visibleEvents = events.slice(0, 3)
  const hasEvents = visibleEvents.length > 0

  return (
    <section
      id="events"
      className="scroll-mt-20 bg-zinc-950 px-5 py-20 text-white lg:py-28"
    >
      <div className="container mx-auto">
        <TitleWithTag className="mb-6 text-2xl md:text-3xl lg:text-4xl">
          Próximos Eventos
        </TitleWithTag>
        <Reveal delay={0.1}>
          <p className="mb-6 text-base md:max-w-2xl md:text-lg">
            Confira o que está por vir na comunidade e participe dos nossos
            próximos encontros.
          </p>
        </Reveal>
        {hasEvents ? (
          <StaggerList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleEvents.map((event) => (
              <StaggerItem key={event._id}>
                <EventCard event={event} />
              </StaggerItem>
            ))}
          </StaggerList>
        ) : (
          <div
            className={cn(
              'mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl',
              'border border-white/10 bg-white/5 px-6 py-12 text-center'
            )}
          >
            <CalendarX className="size-10 text-zinc-500" />
            <p className="text-lg font-semibold text-white">
              Nenhum evento agendado no momento
            </p>
            <p className="text-sm text-zinc-400">
              Fique de olho! Em breve teremos novos encontros da comunidade.
            </p>
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <Button asChild variant="secondary">
            <Link href="/eventos">
              Ver todos os eventos <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents
