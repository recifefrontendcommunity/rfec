'use client'

import { useCallback, useEffect, useState } from 'react'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'

export type LightboxPhoto = {
  key: string
  thumb: string
  full: string
  alt: string
  caption?: string
}

const INITIAL_COUNT = 12
const STEP = 12

export function GalleryGrid({ photos }: { photos: LightboxPhoto[] }) {
  const [visible, setVisible] = useState(INITIAL_COUNT)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const isOpen = activeIndex !== null

  const close = useCallback(() => setActiveIndex(null), [])
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i - 1 + photos.length) % photos.length
      ),
    [photos.length]
  )
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  )

  useEffect(() => {
    if (!isOpen) return

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
      else if (event.key === 'ArrowLeft') prev()
      else if (event.key === 'ArrowRight') next()
    }

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close, prev, next])

  const active = activeIndex !== null ? photos[activeIndex] : null

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.slice(0, visible).map((photo, index) => (
          <li key={photo.key}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group bg-muted relative block aspect-[3/2] w-full overflow-hidden rounded-3xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              aria-label={photo.caption || `Abrir foto ${index + 1}`}
            >
              <Image
                src={photo.thumb}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </button>
          </li>
        ))}
      </ul>

      {visible < photos.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + STEP)}
            className="inline-flex h-11 items-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-semibold shadow-sm transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:text-blue-600"
          >
            Carregar mais ({photos.length - visible})
          </button>
        </div>
      )}

      {isOpen && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption || 'Foto do evento'}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute top-4 right-4 rounded-full p-2 text-white/80 transition-colors hover:text-white"
          >
            <X className="size-7" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  prev()
                }}
                aria-label="Foto anterior"
                className="absolute left-2 rounded-full p-2 text-white/80 transition-colors hover:text-white sm:left-6"
              >
                <ChevronLeft className="size-8" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  next()
                }}
                aria-label="Próxima foto"
                className="absolute right-2 rounded-full p-2 text-white/80 transition-colors hover:text-white sm:right-6"
              >
                <ChevronRight className="size-8" />
              </button>
            </>
          )}

          <figure
            className="relative flex max-h-full max-w-5xl flex-col items-center gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[75vh] w-[90vw] max-w-5xl">
              <Image
                src={active.full}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            {active.caption && (
              <figcaption className="text-center text-sm text-white/80">
                {active.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  )
}
