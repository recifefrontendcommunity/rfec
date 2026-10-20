import { CalendarDays, Rocket, Sparkles } from 'lucide-react'
import Image from 'next/image'

import { getImageUrl } from '@/sanity/lib/image'
import { getHomePage } from '@/sanity/lib/queries'

import { Parallax } from './motion/parallax'
import { Reveal, StaggerItem, StaggerList } from './motion/reveal'
import { SectionDecor } from './motion/section-decor'
import TitleWithTag from './title-with-tag'

const GOALS = [
  {
    icon: CalendarDays,
    title: 'Eventos e troca de experiências',
    text: 'Encontros que reúnem a comunidade para compartilhar o que se vive no dia a dia.'
  },
  {
    icon: Rocket,
    title: 'Oportunidades',
    text: 'Abrir portas para quem está começando ou querendo dar o próximo passo.'
  },
  {
    icon: Sparkles,
    title: 'Brilhar na tecnologia',
    text: 'Conectar, aprender e crescer juntos no mundo da tecnologia.'
  }
]

const Mission = async () => {
  const home = await getHomePage()
  const images = home?.missionImages ?? []
  const featured = images[0]
  const grid = images.slice(1, 3)

  const featuredUrl = getImageUrl(featured, { width: 1536, height: 1152 })

  return (
    <section
      id="mission"
      className="relative scroll-mt-20 overflow-hidden px-5 py-20 lg:py-28"
    >
      <SectionDecor tone="light" />
      <div className="relative container mx-auto grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <TitleWithTag className="mb-6 text-3xl font-semibold md:text-5xl lg:text-6xl">
            Nossa Missão
          </TitleWithTag>
          <Reveal delay={0.1}>
            <p className="font-display mb-8 text-2xl leading-tight font-bold text-zinc-900 md:text-3xl lg:text-4xl">
              Promover troca de experiências, eventos e gerar oportunidades para
              as pessoas da comunidade se{' '}
              <span className="text-blue-500">conectarem</span>,{' '}
              <span className="text-blue-500">aprenderem</span> e{' '}
              <span className="text-blue-500">brilharem</span> no mundo da
              tecnologia.
            </p>
          </Reveal>

          <StaggerList className="flex flex-col gap-3">
            {GOALS.map(({ icon: Icon, title, text }, index) => (
              <StaggerItem key={title}>
                <div className="group flex items-start gap-4 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:translate-x-2 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-500 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-extrabold text-zinc-900">{title}</h3>
                    <p className="text-sm text-zinc-600">{text}</p>
                  </div>
                  <span className="text-3xl leading-none font-extrabold text-zinc-200 transition-colors group-hover:text-blue-200">
                    0{index + 1}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>

        <Reveal x={40} y={0} delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            <div className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-800 shadow-xl">
              {featuredUrl && (
                <Parallax>
                  <Image
                    src={featuredUrl}
                    alt={featured?.alt ?? ''}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </Parallax>
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-blue-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-2deg]">
                Juntos vamos mais longe
              </span>
            </div>
            {grid.map((image, index) => {
              const url = getImageUrl(image, { width: 640, height: 640 })
              return (
                <div
                  key={image.asset?._ref ?? index}
                  className="group relative aspect-square overflow-hidden rounded-3xl bg-zinc-800 shadow-lg"
                >
                  {url && (
                    <Parallax>
                      <Image
                        src={url}
                        alt={image.alt ?? ''}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      />
                    </Parallax>
                  )}
                  <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-transparent" />
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Mission
