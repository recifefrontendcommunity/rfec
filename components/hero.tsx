import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

import { HeroBackground } from './motion/hero-background'
import { Reveal } from './motion/reveal'
import { SplitText } from './motion/split-text'
import { Button } from './ui/button'

const GRADIENT =
  'bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent'

const Hero = () => {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-zinc-950 text-white">
      <HeroBackground />
      <div className="relative container mx-auto px-5 py-20 text-center lg:py-28">
        <Reveal waitIntro y={16}>
          <span className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-widest text-zinc-300 uppercase shadow-sm backdrop-blur-sm">
            Recife Front-End Community
          </span>
        </Reveal>
        <SplitText
          as="h1"
          waitIntro
          delay={0.1}
          className="mb-6 text-5xl leading-[1.02] font-semibold tracking-tighter md:text-7xl md:text-balance lg:text-8xl"
          words={[
            { text: 'Conectando', br: true },
            { text: 'quem' },
            { text: 'constrói', className: GRADIENT },
            { text: 'a', className: GRADIENT },
            { text: 'web', className: GRADIENT },
            { text: 'em', br: false },
            { text: 'Recife' }
          ]}
        />
        <Reveal waitIntro delay={0.7}>
          <p className="font-display mb-8 text-lg font-semibold text-zinc-300 md:mx-auto md:max-w-2xl md:text-xl md:text-pretty">
            Somos uma comunidade que promove aprendizado, networking e troca de
            experiências para desenvolvedores front-end e entusiastas de
            tecnologia.
          </p>
        </Reveal>
        <Reveal waitIntro delay={0.9}>
          <Button
            asChild
            className="md:h-11 md:px-8 md:text-base"
            variant="secondary"
          >
            <Link href="#about">
              Saiba mais <ArrowDown className="animate-bounce" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
