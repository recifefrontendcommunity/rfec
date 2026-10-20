import { ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { getImageUrl } from '@/sanity/lib/image'
import type { GalleryPhoto } from '@/sanity/lib/types'

/**
 * Highlights-only preview shown on the event page. The full set lives on the
 * dedicated gallery route so we never load an entire album eagerly.
 */
export function EventGalleryPreview({
  slug,
  highlights,
  photoCount = 0,
  externalAlbumUrl
}: {
  slug: string
  highlights?: GalleryPhoto[]
  photoCount?: number
  externalAlbumUrl?: string
}) {
  const hasHighlights = Boolean(highlights?.length)
  if (!hasHighlights && !externalAlbumUrl) return null

  const hasMore = photoCount > (highlights?.length ?? 0)

  return (
    <section aria-labelledby="gallery-heading">
      <div className="mb-6 flex items-center justify-between">
        <h2 id="gallery-heading" className="text-3xl font-semibold">
          Galeria
        </h2>
        {(hasMore || photoCount > 0) && (
          <Link
            href={`/eventos/${slug}/galeria`}
            className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4"
          >
            Ver galeria completa <ArrowRight className="size-4" />
          </Link>
        )}
      </div>

      {hasHighlights && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {highlights!.map((photo) => {
            const src = getImageUrl(photo.image, { width: 480, height: 320 })
            if (!src) return null
            return (
              <div
                key={photo._key}
                className="group bg-muted relative aspect-[3/2] overflow-hidden rounded-3xl"
              >
                <Image
                  src={src}
                  alt={photo.image?.alt || photo.caption || ''}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            )
          })}
        </div>
      )}

      {externalAlbumUrl && (
        <a
          href={externalAlbumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4"
        >
          Ver álbum completo <ExternalLink className="size-4" />
        </a>
      )}
    </section>
  )
}
