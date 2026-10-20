import { BookOpen, Handshake, MapPin, Users } from 'lucide-react'
import Image from 'next/image'

import { getImageUrl } from '@/sanity/lib/image'
import { getHomePage } from '@/sanity/lib/queries'

import { Parallax } from './motion/parallax'
import { Reveal, StaggerItem, StaggerList } from './motion/reveal'
import { SectionDecor } from './motion/section-decor'
import TitleWithTag from './title-with-tag'

const PILLARS = [
  {
    icon: BookOpen,
    title: 'Aprendizado',
    text: 'Conteúdo prático e acessível para evoluir na carreira front-end.'
  },
  {
    icon: Users,
    title: 'Conexão',
    text: 'Pessoas da área se encontrando, criando laços e oportunidades.'
  },
  {
    icon: Handshake,
    title: 'Troca de experiências',
    text: 'Quem sabe ensina, quem quer aprender participa. Todo mundo cresce.'
  }
]

const WhoWeAre = async () => {
  const home = await getHomePage()
  const images = home?.aboutImages ?? []
  const featured = images[0]
  const grid = images.slice(1, 4)

  const featuredUrl = getImageUrl(featured, { width: 1536, height: 1152 })

  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-zinc-950 px-5 py-20 text-white lg:py-28"
    >
      <SectionDecor />
      <div className="relative container mx-auto">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <TitleWithTag className="mb-6 text-3xl font-semibold md:text-5xl lg:text-6xl">
              Quem somos
            </TitleWithTag>
            <Reveal delay={0.1}>
              <p className="font-display text-lg font-semibold text-zinc-300 md:text-xl">
                Uma comunidade que prioriza aprendizado, conexão e troca de
                experiências para devs front-end e entusiastas de tecnologia no
                Recife.
              </p>
            </Reveal>
          </div>

          <StaggerList className="grid gap-4 sm:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white/10">
                  <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-500 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mb-1 text-sm font-extrabold">{title}</h3>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    {text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>

        <Reveal delay={0.1}>
          <div className="grid h-[30rem] grid-cols-1 grid-rows-3 gap-4 md:h-[32rem] lg:h-[36rem] xl:h-[44rem]">
            <div className="group relative row-span-2 overflow-hidden rounded-3xl bg-zinc-800 ring-1 ring-white/10">
              {featuredUrl && (
                <Parallax>
                  <Image
                    src={featuredUrl}
                    alt={featured?.alt ?? ''}
                    fill
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </Parallax>
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm font-bold backdrop-blur transition-transform duration-300 group-hover:-translate-y-1">
                <MapPin className="size-4 text-blue-400" />
                Recife, Pernambuco
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {grid.map((image, index) => {
                const url = getImageUrl(image, { width: 640, height: 640 })
                return (
                  <div
                    key={image.asset?._ref ?? index}
                    className={`group relative overflow-hidden rounded-3xl bg-zinc-800 ring-1 ring-white/10 transition-all duration-300 hover:ring-blue-500/60 ${
                      index === 0 ? 'col-span-2' : ''
                    }`}
                  >
                    {url && (
                      <Parallax>
                        <Image
                          src={url}
                          alt={image.alt ?? ''}
                          fill
                          sizes="(min-width: 1024px) 33vw, 50vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                      </Parallax>
                    )}
                    <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-transparent" />
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default WhoWeAre
