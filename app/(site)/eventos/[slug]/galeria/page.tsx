import { ArrowLeft, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  GalleryGrid,
  type LightboxPhoto
} from '@/components/events/gallery-grid'
import { getImageUrl } from '@/sanity/lib/image'
import { getEventGallery, getEventSlugs } from '@/sanity/lib/queries'

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
  const event = await getEventGallery(slug)

  if (!event) return { title: 'Galeria não encontrada | RFEC' }

  return {
    title: `Galeria — ${event.title} | RFEC`,
    description: `Fotos do evento ${event.title} da Recife Frontend Community.`,
    alternates: { canonical: `/eventos/${event.slug}/galeria` }
  }
}

export default async function EventGalleryPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventGallery(slug)

  if (!event) notFound()

  const { externalAlbumUrl } = event.gallery ?? {}

  const photos: LightboxPhoto[] = (event.gallery?.photos ?? []).flatMap(
    (photo) => {
      const thumb = getImageUrl(photo.image, { width: 600, height: 400 })
      const full = getImageUrl(photo.image, { width: 1600 })
      if (!thumb || !full) return []
      return [
        {
          key: photo._key,
          thumb,
          full,
          alt: photo.image?.alt || photo.caption || '',
          caption: photo.caption
        }
      ]
    }
  )

  const hasPhotos = photos.length > 0

  if (!hasPhotos && !externalAlbumUrl) notFound()

  return (
    <div className="container mx-auto px-4 pt-28 pb-12 md:pb-16">
      <Link
        href={`/eventos/${event.slug}`}
        className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:border-blue-500 hover:text-blue-600"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />{' '}
        Voltar para o evento
      </Link>

      <header className="mt-6 mb-8">
        <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">
          Galeria
        </h1>
        <p className="text-muted-foreground mt-2">{event.title}</p>
      </header>

      {hasPhotos && <GalleryGrid photos={photos} />}

      {externalAlbumUrl && (
        <a
          href={externalAlbumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600"
        >
          Ver álbum completo <ExternalLink className="size-4" />
        </a>
      )}
    </div>
  )
}
