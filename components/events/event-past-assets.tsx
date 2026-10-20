import { FileText, Github, Link2, Video } from 'lucide-react'

import type { PastAssets } from '@/sanity/lib/types'

export function EventPastAssets({ assets }: { assets?: PastAssets }) {
  if (!assets) return null

  const hasContent =
    assets.slidesUrl ||
    assets.videoUrls?.length ||
    assets.repositories?.length ||
    assets.resources?.length

  if (!hasContent) return null

  const linkClass =
    'inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600'

  return (
    <section aria-labelledby="assets-heading">
      <h2 id="assets-heading" className="mb-6 text-3xl font-semibold">
        Materiais
      </h2>
      <div className="flex flex-col gap-3">
        {assets.slidesUrl && (
          <a
            href={assets.slidesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <FileText className="size-4" /> Slides
          </a>
        )}

        {assets.videoUrls?.map((url) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Video className="size-4" /> Vídeo
          </a>
        ))}

        {assets.repositories?.map((repo, index) => (
          <a
            key={repo._key ?? index}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Github className="size-4" /> {repo.label}
          </a>
        ))}

        {assets.resources?.map((resource, index) => (
          <a
            key={resource._key ?? index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Link2 className="size-4" /> {resource.label}
          </a>
        ))}
      </div>
    </section>
  )
}
