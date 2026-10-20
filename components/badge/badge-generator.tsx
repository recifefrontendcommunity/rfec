'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from 'framer-motion'
import {
  Check,
  Download,
  Hand,
  ImagePlus,
  Link2,
  RotateCcw,
  Save,
  Sparkles,
  Trash2
} from 'lucide-react'
import QRCode from 'qrcode'

import { WHATSAPP_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

import {
  MAX_TECHS,
  TECHS,
  THEMES,
  memberCode,
  type BadgeData
} from './badge-config'
import { BADGE_HEIGHT, BADGE_WIDTH, BadgeBack, BadgeFront } from './badge-face'

const STORAGE_KEY = 'rfec-badge-v2'
const PHOTO_SIZE = 480
const MAX_NAME = 36
const EASE = [0.22, 1, 0.36, 1] as const

type Stored = {
  name?: string
  photo?: string | null
  social?: string
  techs?: string[]
  themeId?: string
}

/** Center-crops to a square and downsizes so it fits localStorage. */
function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const side = Math.min(img.width, img.height)
      const canvas = document.createElement('canvas')
      canvas.width = PHOTO_SIZE
      canvas.height = PHOTO_SIZE
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('canvas'))
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(
        img,
        (img.width - side) / 2,
        (img.height - side) / 2,
        side,
        side,
        0,
        0,
        PHOTO_SIZE,
        PHOTO_SIZE
      )
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.9))
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('image'))
    }
    img.src = url
  })
}

/** Accepts "linkedin.com/in/x" and turns it into a valid https URL, or null. */
function normalizeUrl(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed || /\s/.test(trimmed)) return null
  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`
  try {
    const url = new URL(withScheme)
    return url.hostname.includes('.') ? url.toString() : null
  } catch {
    return null
  }
}

function makeQr(text: string) {
  return QRCode.toDataURL(text, {
    margin: 1,
    width: 480,
    errorCorrectionLevel: 'M',
    color: { dark: '#0a1d4a', light: '#ffffff' }
  })
}

const FLOATERS = [
  { label: '</>', className: 'left-[2%] top-[14%]', delay: 0 },
  { label: 'React', className: 'right-[0%] top-[22%]', delay: 0.8 },
  { label: '#RFEC', className: 'left-[0%] bottom-[24%]', delay: 1.4 },
  { label: '{ }', className: 'right-[3%] bottom-[16%]', delay: 0.4 }
]

const glass = 'rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl'

export function BadgeGenerator() {
  const reduceMotion = useReducedMotion()

  const [name, setName] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)
  const [social, setSocial] = useState('')
  const [techs, setTechs] = useState<string[]>([])
  const [themeId, setThemeId] = useState(THEMES[0].id)
  const [qrCache, setQrCache] = useState<{ url: string; qr: string } | null>(
    null
  )
  const [groupQr, setGroupQr] = useState<string | null>(null)
  const [flipped, setFlipped] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [busy, setBusy] = useState<'front' | 'back' | 'both' | null>(null)
  const [scale, setScale] = useState(1)
  const [hydrated, setHydrated] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const theme = THEMES.find((item) => item.id === themeId) ?? THEMES[0]
  const code = memberCode(name)

  // Pointer-driven 3D tilt + moving glare on the preview only.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 18 }
  const tiltX = useSpring(useTransform(py, [0, 1], [10, -10]), spring)
  const tiltY = useSpring(useTransform(px, [0, 1], [-12, 12]), spring)
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.28), transparent 55%)`
  const glareOpacity = useMotionValue(0)

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
    glareOpacity.set(1)
  }
  function onPointerLeave() {
    px.set(0.5)
    py.set(0.5)
    glareOpacity.set(0)
  }

  const showToast = useCallback((message: string) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }, [])

  // Restore a previous session (storage can be blocked, so never assume it).
  // Deferred a tick so state is set from a callback, not the effect body.
  useEffect(() => {
    let cancelled = false
    Promise.resolve().then(() => {
      if (cancelled) return
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const data = JSON.parse(raw) as Stored
          setName(data.name ?? '')
          setPhoto(data.photo ?? null)
          setSocial(data.social ?? '')
          if (Array.isArray(data.techs))
            setTechs(
              data.techs
                .filter((t) => typeof t === 'string')
                .slice(0, MAX_TECHS)
            )
          if (data.themeId && THEMES.some((t) => t.id === data.themeId))
            setThemeId(data.themeId)
        }
      } catch {
        // ignore corrupt or blocked storage
      }
      setHydrated(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Keep the draft across reloads.
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name, photo, social, techs, themeId })
      )
    } catch {
      // quota exceeded or blocked — the badge still works in memory
    }
  }, [hydrated, name, photo, social, techs, themeId])

  useEffect(() => {
    makeQr(WHATSAPP_URL)
      .then(setGroupQr)
      .catch(() => setGroupQr(null))
  }, [])

  const socialUrl = normalizeUrl(social)
  useEffect(() => {
    if (!socialUrl) return
    const timer = setTimeout(() => {
      makeQr(socialUrl)
        .then((qr) => setQrCache({ url: socialUrl, qr }))
        .catch(() => setQrCache(null))
    }, 300)
    return () => clearTimeout(timer)
  }, [socialUrl])
  const socialQr = socialUrl && qrCache?.url === socialUrl ? qrCache.qr : null

  // Scale the fixed-size badge down on narrow screens.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / BADGE_WIDTH))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  async function handlePhotoFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      showToast('Escolha um arquivo de imagem.')
      return
    }
    try {
      setPhoto(await resizeImage(file))
      showToast('Foto adicionada!')
    } catch {
      showToast('Não foi possível ler essa imagem.')
    }
  }

  function toggleTech(tech: string) {
    setTechs((current) => {
      if (current.includes(tech)) return current.filter((t) => t !== tech)
      if (current.length >= MAX_TECHS) {
        showToast(`Escolha até ${MAX_TECHS} tecnologias.`)
        return current
      }
      return [...current, tech]
    })
  }

  function resetAll() {
    setName('')
    setPhoto(null)
    setSocial('')
    setTechs([])
    setThemeId(THEMES[0].id)
    showToast('Crachá reiniciado.')
  }

  async function celebrate() {
    const { default: confetti } = await import('canvas-confetti')
    confetti({
      particleCount: 140,
      spread: 85,
      origin: { y: 0.65 },
      colors: [theme.accent, theme.soft, '#ffffff']
    })
  }

  async function onSave() {
    if (!name.trim()) {
      showToast('Digite seu nome para salvar o crachá.')
      return
    }
    // Already auto-saved; this gives the feedback and the celebration.
    showToast('Crachá salvo neste navegador!')
    celebrate()
  }

  async function rasterize(side: 'front' | 'back') {
    const node = (side === 'front' ? frontRef : backRef).current
    if (!node) throw new Error('missing node')
    const { toPng } = await import('html-to-image')
    // First call warms fonts/images; Safari needs the second render.
    await toPng(node, { pixelRatio: 2, cacheBust: true })
    const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true })
    const link = document.createElement('a')
    link.download = `cracha-rfec-${side === 'front' ? 'frente' : 'verso'}.png`
    link.href = dataUrl
    link.click()
  }

  async function download(which: 'front' | 'back' | 'both') {
    if (which !== 'back' && !name.trim()) {
      showToast('Digite seu nome antes de baixar.')
      return
    }
    setBusy(which)
    try {
      if (which === 'front' || which === 'both') await rasterize('front')
      if (which === 'back' || which === 'both') await rasterize('back')
      showToast('Download iniciado!')
      if (which === 'both') celebrate()
    } catch {
      showToast('Não foi possível gerar a imagem. Tente de novo.')
    } finally {
      setBusy(null)
    }
  }

  const checklist = [
    { label: 'Nome', done: name.trim().length > 0 },
    { label: 'Foto', done: photo !== null },
    { label: 'Rede social', done: socialQr !== null },
    { label: 'Tecnologias', done: techs.length > 0 }
  ]
  const progress = Math.round(
    (checklist.filter((item) => item.done).length / checklist.length) * 100
  )

  const data: BadgeData = { name, photo, socialQr, techs, theme, code }

  const inputClass =
    'h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white outline-none transition-all placeholder:text-zinc-500 focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/20'
  const labelClass = 'mb-2 block text-sm font-bold text-white'
  const optional = <span className="font-medium text-zinc-500">(opcional)</span>

  return (
    <div className="relative container mx-auto px-4 pb-24">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        {/* ───────────── Preview ───────────── */}
        <div className="relative flex flex-col items-center lg:sticky lg:top-28">
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/3 left-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700"
            style={{ backgroundColor: theme.accent, opacity: 0.3 }}
          />
          {FLOATERS.map((item) => (
            <span
              key={item.label}
              aria-hidden
              className={cn(
                'rfec-anim rfec-float absolute hidden rounded-full border border-white/15 bg-zinc-900/70 px-4 py-1.5 font-mono text-xs text-zinc-300 xl:block',
                item.className
              )}
              style={{
                animationDelay: `${item.delay}s`,
                animationDuration: `${5 + item.delay}s`
              }}
            >
              {item.label}
            </span>
          ))}

          <div
            role="tablist"
            aria-label="Lado do crachá"
            className="relative mb-24 inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur"
          >
            {(['Frente', 'Verso'] as const).map((label, index) => {
              const active = flipped === (index === 1)
              return (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFlipped(index === 1)}
                  className={cn(
                    'relative rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                    active ? 'text-zinc-950' : 'text-zinc-400 hover:text-white'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="badge-side"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              )
            })}
          </div>

          <div ref={stageRef} className="relative w-full max-w-[340px]">
            {/* Lanyard */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-[72px] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
            >
              <span
                className="h-[60px] w-9 rounded-t-sm [mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
                style={{
                  background: `repeating-linear-gradient(135deg, ${theme.accent} 0 10px, ${theme.via} 10px 20px)`
                }}
              />
              <span className="-mt-1 h-5 w-7 rounded-md bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-500 shadow-lg" />
            </div>

            <motion.div
              animate={
                reduceMotion || flipped
                  ? { rotate: 0 }
                  : { rotate: [-1.2, 1.2, -1.2] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                transformOrigin: '50% -60px',
                height: BADGE_HEIGHT * scale
              }}
              className="[perspective:1400px]"
            >
              <div
                style={{
                  width: BADGE_WIDTH,
                  height: BADGE_HEIGHT,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left'
                }}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
              >
                <motion.div
                  style={{
                    rotateX: tiltX,
                    rotateY: tiltY,
                    transformStyle: 'preserve-3d',
                    width: BADGE_WIDTH,
                    height: BADGE_HEIGHT
                  }}
                >
                  <motion.div
                    role="button"
                    tabIndex={0}
                    onClick={() => setFlipped((value) => !value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setFlipped((value) => !value)
                      }
                    }}
                    aria-label="Virar o crachá"
                    className="relative block cursor-pointer rounded-[28px] outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50"
                    style={{
                      width: BADGE_WIDTH,
                      height: BADGE_HEIGHT,
                      transformStyle: 'preserve-3d'
                    }}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    <div
                      className="absolute inset-0 shadow-2xl [backface-visibility:hidden]"
                      style={{
                        borderRadius: 28,
                        boxShadow: `0 30px 80px -20px ${theme.accent}88`
                      }}
                    >
                      <BadgeFront {...data} />
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[28px] mix-blend-soft-light"
                        style={{ background: glare, opacity: glareOpacity }}
                      />
                    </div>
                    <div
                      className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                      style={{
                        borderRadius: 28,
                        boxShadow: `0 30px 80px -20px ${theme.accent}88`
                      }}
                    >
                      <BadgeBack groupQr={groupQr} theme={theme} code={code} />
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[28px] mix-blend-soft-light"
                        style={{ background: glare, opacity: glareOpacity }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <p className="relative mt-8 flex items-center gap-2 text-sm text-zinc-400">
            <Hand className="size-4" /> Passe o mouse e clique para virar
          </p>
        </div>

        {/* ───────────── Controls ───────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
          className={cn(glass, 'p-6 md:p-8')}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <h2 className="text-2xl text-white md:text-3xl">
              Personalize seu crachá
            </h2>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="size-3.5" /> Reiniciar
            </button>
          </div>

          <div className="mb-7 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between text-xs font-bold">
              <span className="text-zinc-300">Crachá completo</span>
              <span style={{ color: theme.soft }}>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${theme.accent}, ${theme.soft})`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {checklist.map((item) => (
                <li
                  key={item.label}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors',
                    item.done
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'bg-white/5 text-zinc-500'
                  )}
                >
                  <Check className="size-3" /> {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <label className="block">
              <span className={labelClass}>Seu nome</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={MAX_NAME}
                placeholder="Ex: Maria da Silva"
                autoComplete="name"
                className={inputClass}
              />
            </label>

            <fieldset>
              <legend className={labelClass}>Cor do crachá</legend>
              <div className="flex flex-wrap gap-3">
                {THEMES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={themeId === item.id}
                    aria-label={item.label}
                    title={item.label}
                    onClick={() => setThemeId(item.id)}
                    className={cn(
                      'relative flex size-11 items-center justify-center rounded-full transition-all duration-300 hover:scale-110',
                      themeId === item.id
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-950'
                        : 'ring-1 ring-white/10'
                    )}
                    style={{
                      background: `linear-gradient(135deg, ${item.via}, ${item.accent})`
                    }}
                  >
                    {themeId === item.id && (
                      <Check className="size-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelClass}>
                Suas tecnologias{' '}
                <span className="font-medium text-zinc-500">
                  ({techs.length}/{MAX_TECHS})
                </span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {TECHS.map((tech) => {
                  const on = techs.includes(tech)
                  return (
                    <button
                      key={tech}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleTech(tech)}
                      className={cn(
                        'rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-300 hover:scale-105',
                        on
                          ? 'border-transparent text-zinc-950'
                          : 'border-white/10 bg-white/5 text-zinc-300 hover:border-white/30'
                      )}
                      style={on ? { backgroundColor: theme.soft } : {}}
                    >
                      {tech}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div>
              <span className={labelClass}>Sua foto {optional}</span>
              <input
                type="file"
                accept="image/*"
                id="badge-photo"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  event.target.value = ''
                  handlePhotoFile(file)
                }}
              />
              <div className="flex items-stretch gap-3">
                <label
                  htmlFor="badge-photo"
                  onDragOver={(event) => {
                    event.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(event) => {
                    event.preventDefault()
                    setDragOver(false)
                    handlePhotoFile(event.dataTransfer.files?.[0])
                  }}
                  className={cn(
                    'flex min-h-20 flex-1 cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed px-4 py-3 text-sm transition-all focus-within:ring-4 focus-within:ring-blue-500/20',
                    dragOver
                      ? 'scale-[1.02] border-blue-400 bg-blue-500/10'
                      : 'border-white/15 bg-white/5 hover:border-white/30'
                  )}
                >
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo}
                      alt="Miniatura da foto"
                      className="size-14 shrink-0 rounded-full object-cover ring-2 ring-white/30"
                    />
                  ) : (
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-zinc-300">
                      <ImagePlus className="size-6" />
                    </span>
                  )}
                  <span className="text-zinc-300">
                    <strong className="block text-white">
                      {photo ? 'Trocar foto' : 'Escolher foto'}
                    </strong>
                    ou arraste uma imagem para cá
                  </span>
                </label>
                {photo && (
                  <button
                    type="button"
                    onClick={() => setPhoto(null)}
                    aria-label="Remover foto"
                    className="flex w-12 items-center justify-center rounded-2xl text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            </div>

            <label className="block">
              <span className={labelClass}>
                Link da sua rede social {optional}
              </span>
              <div className="relative">
                <Link2 className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-500" />
                <input
                  value={social}
                  onChange={(event) => setSocial(event.target.value)}
                  placeholder="linkedin.com/in/seu-perfil"
                  inputMode="url"
                  autoComplete="url"
                  className={cn(inputClass, 'pl-11')}
                />
              </div>
              <span
                className={cn(
                  'mt-2 block text-xs',
                  social && !socialUrl ? 'text-red-400' : 'text-zinc-500'
                )}
              >
                {social && !socialUrl
                  ? 'Esse link não parece válido.'
                  : 'Geramos um QR Code com esse link na frente do crachá.'}
              </span>
            </label>

            <button
              type="button"
              onClick={onSave}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{
                backgroundColor: theme.accent,
                boxShadow: `0 10px 30px -8px ${theme.accent}99`
              }}
            >
              <Save className="size-4" /> Salvar
            </button>

            <div className="grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
              {(['front', 'back'] as const).map((side) => (
                <button
                  key={side}
                  type="button"
                  disabled={busy !== null}
                  onClick={() => download(side)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-95 disabled:opacity-60"
                >
                  <Download className="size-4" />
                  {busy === side
                    ? 'Gerando…'
                    : side === 'front'
                      ? 'Baixar frente'
                      : 'Baixar verso'}
                </button>
              ))}
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => download('both')}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-zinc-950 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60 sm:col-span-2"
              >
                <Sparkles className="size-4" />
                {busy === 'both' ? 'Gerando…' : 'Baixar frente e verso'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Unscaled, untransformed copies: what gets rasterized on download. */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-[-10000px]"
      >
        <div
          ref={frontRef}
          style={{ width: BADGE_WIDTH, height: BADGE_HEIGHT }}
        >
          <BadgeFront {...data} />
        </div>
        <div ref={backRef} style={{ width: BADGE_WIDTH, height: BADGE_HEIGHT }}>
          <BadgeBack groupQr={groupQr} theme={theme} code={code} />
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/15 bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
