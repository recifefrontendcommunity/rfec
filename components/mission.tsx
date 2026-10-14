import Image from 'next/image'

import { getImageUrl } from '@/sanity/lib/image'
import { getHomePage } from '@/sanity/lib/queries'

import { Parallax } from './motion/parallax'
import { Reveal } from './motion/reveal'
import TitleWithTag from './title-with-tag'

const Mission = async () => {
  const home = await getHomePage()
  const images = home?.missionImages ?? []
  const featured = images[0]
  const grid = images.slice(1, 3)

  const featuredUrl = getImageUrl(featured, { width: 1536, height: 1152 })

  return (
    <section id="mission" className="scroll-mt-20 px-5 py-20 lg:py-28">
      <div className="container mx-auto">
        <TitleWithTag className="mb-6 text-2xl md:text-3xl lg:text-4xl">
          Nossa Missão
        </TitleWithTag>
        <Reveal delay={0.1}>
          <p className="mb-6 text-base md:max-w-2xl md:text-lg">
            Promover troca de experiências, eventos e gerar oportunidades para
            as pessoas da comunidade se conectarem, aprenderem e brilharem no
            mundo da tecnologia.
          </p>
        </Reveal>
        <div className="grid h-96 grid-cols-1 grid-rows-3 gap-5 md:h-[28rem] lg:h-[36rem]">
          <div className="relative row-span-2 overflow-hidden rounded-lg bg-zinc-800">
            {featuredUrl && (
              <Parallax>
                <Image
                  src={featuredUrl}
                  alt={featured?.alt ?? ''}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover object-center"
                />
              </Parallax>
            )}
            <span className="absolute inset-0 bg-black/40"></span>
          </div>
          <div className="grid grid-cols-2 gap-5 overflow-hidden rounded-lg">
            {grid.map((image, index) => {
              const url = getImageUrl(image, { width: 512, height: 512 })
              return (
                <div
                  key={image.asset?._ref ?? index}
                  className="relative overflow-hidden rounded-lg bg-zinc-800"
                >
                  {url && (
                    <Parallax>
                      <Image
                        src={url}
                        alt={image.alt ?? ''}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover object-center"
                      />
                    </Parallax>
                  )}
                  <span className="absolute inset-0 bg-black/40"></span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
