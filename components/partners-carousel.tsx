'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { getImageUrl } from '@/sanity/lib/image'
import type { Partner } from '@/sanity/lib/types'

type PartnersCarouselProps = {
  partners: Partner[]
}

const EASE = [0.22, 1, 0.36, 1] as const

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE }
  }
}

const PartnerCard = ({ partner }: { partner: Partner }) => {
  const logoUrl = getImageUrl(partner.logo, { width: 480 })

  // Pointer position inside the card, 0..1 (0.5 = centered).
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 200, damping: 20 }
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), spring)
  const glow = useMotionTemplate`radial-gradient(280px circle at ${useTransform(px, (v) => `${v * 100}%`)} ${useTransform(py, (v) => `${v * 100}%`)}, rgba(59,130,246,0.18), transparent 70%)`

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  const content = (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      {partner.website && (
        <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-all duration-300 group-hover:rotate-12 group-hover:bg-blue-500 group-hover:text-white">
          <ArrowUpRight className="size-4" />
        </span>
      )}
      <div className="relative flex h-32 w-full items-center justify-center">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={partner.logo?.alt ?? `Logo ${partner.name}`}
            width={240}
            height={128}
            className="max-h-full w-auto max-w-full rounded-lg object-contain grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
          />
        )}
      </div>
      <span className="relative flex flex-col items-center gap-1 font-semibold">
        {partner.name}
        <span className="h-0.5 w-0 rounded-full bg-blue-500 transition-all duration-300 group-hover:w-full" />
      </span>
    </>
  )

  const className =
    'group relative flex h-full flex-col items-center gap-5 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'

  return (
    <motion.li
      variants={itemVariants}
      className="[perspective:900px]"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="h-full"
      >
        {partner.website ? (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar ${partner.name}`}
            className={className}
          >
            {content}
          </a>
        ) : (
          <div className={className}>{content}</div>
        )}
      </motion.div>
    </motion.li>
  )
}

const PartnersCarousel = ({ partners }: PartnersCarouselProps) => {
  return (
    <div className="container mx-auto">
      <motion.ul
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      >
        {partners.map((partner) => (
          <PartnerCard key={partner._id} partner={partner} />
        ))}
      </motion.ul>
    </div>
  )
}

export default PartnersCarousel
