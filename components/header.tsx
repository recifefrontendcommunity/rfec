'use client'

import { useState } from 'react'

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll
} from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import RFECLogo from './logo'
import { Button } from './ui/button'

const EASE = [0.22, 1, 0.36, 1] as const

const LINKS = [
  { href: '/#about', label: 'Quem somos' },
  { href: '/#mission', label: 'Missão' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/cracha', label: 'Crachá' },
  { href: '/#partners', label: 'Parceiros' }
]

const Header = () => {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Slide away while reading downwards, come back as soon as the user scrolls up.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(latest > previous && latest > 160 && !open)
    setScrolled(latest > 24)
  })

  return (
    <motion.header
      className="sticky top-3 z-30 h-0 w-full overflow-visible px-3 md:px-6"
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div
        className={cn(
          'container mx-auto rounded-[29px] border px-4 py-2 transition-all duration-300 md:rounded-full md:px-6',
          'backdrop-blur-xl backdrop-saturate-150',
          scrolled
            ? 'border-white/15 bg-zinc-950/80 shadow-xl shadow-black/20'
            : 'border-white/10 bg-zinc-950/50'
        )}
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            aria-label="Página inicial da RFEC"
            className="justify-self-start"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <RFECLogo
                variant="light"
                className="h-auto w-[100px] md:w-[124px]"
              />
            </motion.div>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-1 md:flex"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative rounded-full px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                <span className="absolute inset-0 scale-90 rounded-full bg-white/10 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <Button
              asChild
              className="group hidden bg-blue-500 text-white hover:bg-blue-600 sm:inline-flex"
            >
              <Link href="/#join">
                Faça Parte
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <button
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              aria-label="Menu mobile"
              className="overflow-hidden md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="flex flex-col gap-1 pt-3 pb-2">
                {[...LINKS, { href: '/#join', label: 'Faça Parte' }].map(
                  (link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index, ease: EASE }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-base font-semibold text-zinc-100 transition-colors hover:bg-white/10"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
