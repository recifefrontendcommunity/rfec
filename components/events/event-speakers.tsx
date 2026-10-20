import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  type LucideIcon
} from 'lucide-react'
import Image from 'next/image'

import { RichText } from '@/components/events/portable-text'
import { getImageUrl } from '@/sanity/lib/image'
import type { Speaker } from '@/sanity/lib/types'

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  x: Twitter,
  instagram: Instagram,
  website: Globe,
  other: Globe
}

export function EventSpeakers({ speakers }: { speakers?: Speaker[] }) {
  if (!speakers?.length) return null

  return (
    <section aria-labelledby="speakers-heading">
      <h2 id="speakers-heading" className="mb-6 text-3xl font-semibold">
        Palestrantes
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2">
        {speakers.map((speaker) => {
          const photo = getImageUrl(speaker.photo, { width: 160, height: 160 })
          return (
            <li
              key={speaker._id}
              className="flex gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-500/30">
                {photo && (
                  <Image
                    src={photo}
                    alt={speaker.photo?.alt || speaker.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{speaker.name}</h3>
                {(speaker.role || speaker.company) && (
                  <p className="text-muted-foreground text-sm">
                    {[speaker.role, speaker.company]
                      .filter(Boolean)
                      .join(' @ ')}
                  </p>
                )}
                {speaker.bio && (
                  <div className="text-muted-foreground text-sm [&_p]:mb-2">
                    <RichText value={speaker.bio} />
                  </div>
                )}
                {speaker.social && speaker.social.length > 0 && (
                  <div className="mt-1 flex gap-3">
                    {speaker.social.map((link, index) => {
                      const Icon =
                        SOCIAL_ICONS[link.platform ?? 'other'] ?? Globe
                      if (!link.url) return null
                      return (
                        <a
                          key={link._key ?? index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.platform ?? 'Link'}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Icon className="size-5" />
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
