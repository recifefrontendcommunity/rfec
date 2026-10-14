import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import Link from 'next/link'

import RFECLogo from './logo'
import { Reveal } from './motion/reveal'

const Footer = () => {
  return (
    <footer className="bg-zinc-950 py-12 text-white md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.5fr_1fr] md:gap-8 lg:gap-16">
          <div className="space-y-3 md:max-w-sm">
            <RFECLogo variant="light" className="h-auto w-[140px]" />
            <p className="text-muted-foreground text-sm">
              Recife Front-End Community - Conectando desenvolvedores e
              impulsionando o conhecimento.
            </p>
            <div className="border-muted-foreground/40 flex space-x-3 border-b pb-8 md:border-0 md:pt-1 md:pb-0">
              <a
                href="https://github.com/rfecommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/recife-front-end-community/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/rfecommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:recifefrontendcommunity@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                aria-label="E-mail"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Sobre a RFEC</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="rounded-sm text-sm hover:text-zinc-300 hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Início
              </Link>
              <Link
                href="/eventos"
                className="rounded-sm text-sm hover:text-zinc-300 hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Eventos
              </Link>
              <Link
                href="/#about"
                className="rounded-sm text-sm hover:text-zinc-300 hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Quem Somos
              </Link>
              <Link
                href="/#mission"
                className="rounded-sm text-sm hover:text-zinc-300 hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Nossa Missão
              </Link>
              <Link
                href="/#join"
                className="rounded-sm text-sm hover:text-zinc-300 hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Faça Parte
              </Link>
              <Link
                href="/#partners"
                className="rounded-sm text-sm hover:text-zinc-300 hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Parceiros
              </Link>
            </nav>
          </div>
        </div>

        <Reveal y={60} className="mt-10 select-none">
          <p
            aria-hidden
            className="text-center text-[22vw] leading-none font-black tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgb(82_82_91)] md:text-[16vw]"
          >
            RFEC
          </p>
        </Reveal>

        <div className="border-muted-foreground/40 mt-6 flex flex-col items-center justify-between border-t pt-6 md:mt-10 md:flex-row">
          <p className="text-muted-foreground text-center text-xs md:text-left">
            &copy;{' '}
            <span className="tabular-nums">{new Date().getFullYear()}</span>{' '}
            Recife Front-End Community. <br className="md:hidden" /> Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
