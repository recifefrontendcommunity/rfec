import Image from 'next/image'

import { getImageUrl } from '@/sanity/lib/image'
import type { Sponsor } from '@/sanity/lib/types'

export function EventSponsors({ sponsors }: { sponsors?: Sponsor[] }) {
  if (!sponsors?.length) return null

  return (
    <section aria-labelledby="sponsors-heading">
      <h2 id="sponsors-heading" className="mb-6 text-3xl font-semibold">
        Patrocinadores
      </h2>
      <ul className="flex flex-wrap items-center gap-6">
        {sponsors.map((sponsor) => {
          const logo = getImageUrl(sponsor.logo, { width: 200 })
          const content = logo ? (
            <Image
              src={logo}
              alt={sponsor.logo?.alt || sponsor.name}
              width={160}
              height={80}
              className="h-16 w-auto object-contain"
            />
          ) : (
            <span className="font-medium">{sponsor.name}</span>
          )

          return (
            <li key={sponsor._id}>
              {sponsor.website ? (
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sponsor.name}
                  className="block rounded-2xl border border-zinc-200 bg-white p-4 opacity-80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:opacity-100 hover:shadow-lg"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
