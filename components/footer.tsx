import {
  ArrowRight,
  ArrowUp,
  Github,
  Instagram,
  Linkedin,
  Mail,
  type LucideIcon
} from 'lucide-react'
import Link from 'next/link'

import { WHATSAPP_URL } from '@/lib/site'

import RFECLogo from './logo'
import { Reveal } from './motion/reveal'
import { SectionDecor } from './motion/section-decor'

const SOCIALS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: 'https://github.com/rfecommunity', label: 'GitHub', icon: Github },
  {
    href: 'https://www.linkedin.com/company/recife-front-end-community/',
    label: 'LinkedIn',
    icon: Linkedin
  },
  {
    href: 'https://instagram.com/rfecommunity',
    label: 'Instagram',
    icon: Instagram
  },
  {
    href: 'mailto:recifefrontendcommunity@gmail.com',
    label: 'E-mail',
    icon: Mail
  }
]

const COLUMNS = [
  {
    title: 'Explorar',
    links: [
      { href: '/', label: 'Início' },
      { href: '/#about', label: 'Quem somos' },
      { href: '/#mission', label: 'Nossa missão' },
      { href: '/#partners', label: 'Parceiros' }
    ]
  },
  {
    title: 'Comunidade',
    links: [
      { href: '/eventos', label: 'Próximos eventos' },
      { href: '/eventos?status=past', label: 'Eventos passados' },
      { href: '/cracha', label: 'Crie seu crachá' },
      { href: '/#join', label: 'Faça parte' }
    ]
  }
]

const linkClass =
  'group relative inline-block rounded-sm text-sm text-zinc-400 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none'

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-zinc-950 pt-16 text-white md:pt-24">
      <SectionDecor />
      <div className="relative container mx-auto px-4 md:px-6">
        <Reveal>
          <div className="relative mb-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 p-8 md:mb-20 md:p-12">
            <div className="rfec-orb absolute -top-20 -right-20 size-72 rounded-full bg-white/20 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-3xl font-semibold md:text-5xl">
                  Faça parte da comunidade.
                </h2>
                <p className="font-display mt-3 max-w-xl text-lg font-semibold text-white/80">
                  Eventos, networking e troca de experiências para quem constrói
                  a web em Recife.
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-zinc-950 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              >
                Entrar na RFEC
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          <div className="space-y-4 md:max-w-sm">
            <RFECLogo variant="light" className="h-auto w-[140px]" />
            <p className="text-sm leading-relaxed text-zinc-400">
              Recife Front-End Community — conectando desenvolvedores e
              impulsionando o conhecimento.
            </p>
            <div className="flex gap-3 pt-1">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-500 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-white">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Reveal y={60} className="mt-12 select-none">
          <p
            aria-hidden
            className="bg-gradient-to-b from-white/25 to-transparent bg-clip-text text-center text-[22vw] leading-none font-black tracking-tighter text-transparent md:text-[16vw]"
          >
            RFEC
          </p>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 md:flex-row">
          <p className="text-center text-xs text-zinc-500 md:text-left">
            &copy;{' '}
            <span className="tabular-nums">{new Date().getFullYear()}</span>{' '}
            Recife Front-End Community. Todos os direitos reservados.
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:border-blue-500 hover:text-white"
          >
            Voltar ao topo
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
