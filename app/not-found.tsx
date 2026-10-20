import { ArrowLeft, CalendarDays, Home, IdCard } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { HeroBackground } from '@/components/motion/hero-background'
import { MotionProvider } from '@/components/motion/motion-provider'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Página não encontrada | RFEC',
  robots: { index: false }
}

const SUGGESTIONS = [
  { href: '/', label: 'Página inicial', icon: Home },
  { href: '/eventos', label: 'Eventos', icon: CalendarDays },
  { href: '/cracha', label: 'Crie seu crachá', icon: IdCard }
]

/**
 * Global 404. It renders outside the `(site)` layout, so it brings its own
 * header and footer.
 */
export default function NotFound() {
  return (
    <MotionProvider>
      <Header />
      <main className="relative isolate flex min-h-svh items-center overflow-hidden bg-zinc-950 text-white">
        <HeroBackground />
        <div className="relative container mx-auto px-5 py-32 text-center">
          <Reveal y={16}>
            <span className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-widest text-zinc-300 uppercase backdrop-blur-sm">
              Erro 404
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              aria-hidden
              className="rfec-float bg-gradient-to-b from-blue-300 via-blue-500 to-blue-900 bg-clip-text [font-family:var(--font-rubik)] text-[9rem] leading-none font-black tracking-tighter text-transparent select-none sm:text-[13rem] lg:text-[16rem]"
            >
              404
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="mb-4 text-3xl tracking-tighter md:text-5xl">
              Esta página saiu do <span className="text-blue-500">deploy</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-display mx-auto mb-10 max-w-xl text-lg font-semibold text-zinc-300">
              O endereço que você tentou acessar não existe ou foi movido. Que
              tal voltar para um lugar conhecido?
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="flex flex-wrap items-center justify-center gap-3">
              {SUGGESTIONS.map(({ href, label, icon: Icon }, index) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={
                      index === 0
                        ? 'group inline-flex h-12 items-center gap-2 rounded-full bg-blue-500 px-7 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:bg-blue-600 active:scale-95'
                        : 'group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:bg-white/10 active:scale-95'
                    }
                  >
                    {index === 0 ? (
                      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <Icon className="size-4 text-blue-400" />
                    )}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </main>
      <Footer />
    </MotionProvider>
  )
}
