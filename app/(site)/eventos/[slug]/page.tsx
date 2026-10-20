import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { EventAgenda } from '@/components/events/event-agenda'
import { EventGalleryPreview } from '@/components/events/event-gallery-preview'
import { EventJsonLd } from '@/components/events/event-json-ld'
import { EventPastAssets } from '@/components/events/event-past-assets'
import { EventSpeakers } from '@/components/events/event-speakers'
import { EventSponsors } from '@/components/events/event-sponsors'
import { RichText } from '@/components/events/portable-text'
import { RegistrationButton } from '@/components/events/registration-button'
import { Reveal } from '@/components/motion/reveal'
import { SectionDecor } from '@/components/motion/section-decor'
import { formatEventDateTime, isPastEvent } from '@/lib/events'
import { absoluteUrl } from '@/lib/site'
import { getImageUrl } from '@/sanity/lib/image'
import { getEventBySlug, getEventSlugs } from '@/sanity/lib/queries'

export async function generateStaticParams() {
  const slugs = await getEventSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return { title: 'Evento não encontrado | RFEC' }
  }

  const title = event.seo?.title || event.title
  const description = event.seo?.description || event.shortDescription
  const ogImage = getImageUrl(event.seo?.ogImage ?? event.banner, {
    width: 1200,
    height: 630
  })
  const canonical = `/eventos/${event.slug}`

  return {
    title: `${title} | RFEC`,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonical,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] })
    }
  }
}

export default async function EventDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) notFound()

  const banner = getImageUrl(event.banner, { width: 1600, height: 720 })
  const past = isPastEvent(event)
  const locationText = event.location?.isOnline
    ? 'Online'
    : [event.location?.name, event.location?.address]
        .filter(Boolean)
        .join(' — ')

  return (
    <article className="pb-16">
      <EventJsonLd event={event} url={absoluteUrl(`/eventos/${event.slug}`)} />

      <div className="relative overflow-hidden bg-zinc-950 px-4 pt-28 pb-12 text-white md:pb-16">
        <SectionDecor />
        <div className="relative container mx-auto">
          <Link
            href="/eventos"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 backdrop-blur transition-colors hover:border-blue-500 hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Voltar para eventos
          </Link>

          {banner && (
            <Reveal delay={0.1} className="mt-6">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl bg-zinc-800 shadow-2xl ring-1 ring-white/10">
                <Image
                  src={banner}
                  alt={event.banner?.alt || event.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl py-8 md:py-12">
          <header className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              {event.eventType && (
                <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                  {event.eventType.title}
                </span>
              )}
              {event.tags?.map((tag) => (
                <span
                  key={tag.slug}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700"
                >
                  #{tag.title}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">
              {event.title}
            </h1>

            <div className="grid gap-3 sm:grid-cols-2">
              <p className="flex items-center gap-3 rounded-3xl border border-zinc-200 bg-white p-4 text-sm font-semibold shadow-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                  <CalendarDays className="size-5" />
                </span>
                <time dateTime={event.startAt}>
                  {formatEventDateTime(event.startAt)}
                </time>
              </p>
              {locationText && (
                <p className="flex items-center gap-3 rounded-3xl border border-zinc-200 bg-white p-4 text-sm font-semibold shadow-sm">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                    <MapPin className="size-5" />
                  </span>
                  {event.location?.mapUrl ? (
                    <a
                      href={event.location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:text-blue-600 hover:underline"
                    >
                      {locationText}
                    </a>
                  ) : (
                    locationText
                  )}
                </p>
              )}
            </div>

            {!past && event.registrationUrl && (
              <div className="pt-2">
                <RegistrationButton url={event.registrationUrl} />
              </div>
            )}
          </header>

          <div className="mt-12 space-y-14">
            {event.fullDescription && (
              <section aria-label="Sobre o evento">
                <RichText value={event.fullDescription} />
              </section>
            )}

            <Reveal>
              <EventAgenda items={event.agenda} />
            </Reveal>
            <Reveal>
              <EventSpeakers speakers={event.speakers} />
            </Reveal>
            <Reveal>
              <EventGalleryPreview
                slug={event.slug}
                highlights={event.gallery?.highlights}
                photoCount={event.gallery?.photoCount}
                externalAlbumUrl={event.gallery?.externalAlbumUrl}
              />
            </Reveal>
            <Reveal>
              {past && <EventPastAssets assets={event.pastAssets} />}
            </Reveal>
            <Reveal>
              <EventSponsors sponsors={event.sponsors} />
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  )
}
