import { IdCard, QrCode, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

import { BadgeGenerator } from '@/components/badge/badge-generator'
import { Reveal } from '@/components/motion/reveal'
import { SectionDecor } from '@/components/motion/section-decor'

export const metadata: Metadata = {
  title: 'Crie seu Crachá | RFEC',
  description:
    'Gere o seu crachá oficial da Recife Front-End Community, personalize com nome, foto, tecnologias e QR Code e baixe a frente e o verso.',
  alternates: { canonical: '/cracha' }
}

const HIGHLIGHTS = [
  { icon: IdCard, label: 'Frente e verso' },
  { icon: QrCode, label: 'QR Codes automáticos' },
  { icon: Sparkles, label: '4 cores para escolher' }
]

export default function BadgePage() {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white">
      <SectionDecor />
      <header className="relative container mx-auto px-4 pt-36 pb-16 text-center md:pt-44">
        <Reveal y={16}>
          <span className="mb-5 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-widest text-zinc-300 uppercase backdrop-blur-sm">
            Identidade RFEC
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-5xl tracking-tighter md:text-7xl">
            Crie seu{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Crachá
            </span>{' '}
            da Comunidade
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="font-display mx-auto mt-5 max-w-xl text-lg font-semibold text-zinc-300 md:text-xl">
            Personalize, vire, salve e baixe. Em poucos cliques a sua identidade
            RFEC está pronta.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white/10"
              >
                <Icon className="size-4 text-blue-400" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </header>
      <div className="relative pt-10">
        <BadgeGenerator />
      </div>
    </div>
  )
}
