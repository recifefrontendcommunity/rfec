import { User } from 'lucide-react'

import RFECLogo from '@/components/logo'
import { LOGO_MARK_PATH, LOGO_MARK_VIEWBOX } from '@/components/logo-mark-path'

import type { BadgeData } from './badge-config'

/** Fixed design size (px). Previews scale it down; downloads render it 1:1. */
export const BADGE_WIDTH = 340
export const BADGE_HEIGHT = 540

const FACE_STYLE = { width: BADGE_WIDTH, height: BADGE_HEIGHT } as const

function ClawMark({
  className,
  style
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox={LOGO_MARK_VIEWBOX}
      className={className}
      style={style}
      aria-hidden
    >
      <path d={LOGO_MARK_PATH} fill="currentColor" />
    </svg>
  )
}

/** Code-128-looking strip, deterministic per code. */
function Barcode({ code, color }: { code: string; color: string }) {
  const bars: number[] = []
  for (const char of code) {
    const n = char.charCodeAt(0)
    bars.push((n % 3) + 1, ((n >> 2) % 2) + 1, ((n >> 1) % 3) + 1)
  }
  return (
    <div className="flex h-7 items-stretch gap-[2px]" aria-hidden>
      {bars.map((width, index) => (
        <span
          key={index}
          style={{
            width,
            backgroundColor: color,
            opacity: index % 2 ? 0.55 : 0.9
          }}
        />
      ))}
    </div>
  )
}

/** Concentric contour lines, echoing the site's topographic hero. */
function Contours({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 340 540"
      className="absolute inset-0 size-full"
      fill="none"
      aria-hidden
    >
      {[70, 110, 150, 190, 230, 270].map((r, index) => (
        <ellipse
          key={r}
          cx="290"
          cy="120"
          rx={r * 1.25}
          ry={r}
          stroke={color}
          strokeOpacity={0.16 - index * 0.015}
        />
      ))}
    </svg>
  )
}

function Foil() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.07) 45%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.07) 55%, transparent 70%)'
      }}
    />
  )
}

export function BadgeFront({
  name,
  photo,
  socialQr,
  techs,
  theme,
  code
}: BadgeData) {
  return (
    <div
      style={{
        ...FACE_STYLE,
        background: `linear-gradient(160deg, ${theme.from} 0%, ${theme.via} 55%, ${theme.to} 100%)`
      }}
      className="relative flex flex-col overflow-hidden rounded-[28px] text-white"
    >
      <Contours color={theme.soft} />
      <span
        aria-hidden
        className="absolute -top-24 -right-16 size-64 rounded-full blur-3xl"
        style={{ backgroundColor: theme.accent, opacity: 0.35 }}
      />
      <ClawMark
        className="absolute -bottom-10 -left-14 h-[260px] w-auto -rotate-12"
        style={{ color: theme.soft, opacity: 0.06 }}
      />
      <Foil />

      <span className="absolute top-3 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full bg-white/25" />

      <div className="relative flex items-center justify-between px-6 pt-9">
        <RFECLogo variant="light" className="h-auto w-[104px]" />
        <span
          className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-widest"
          style={{
            borderColor: `${theme.soft}66`,
            color: theme.soft
          }}
        >
          {new Date().getFullYear()}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center px-6 pt-5">
        <div
          className="rounded-full p-1 shadow-2xl"
          style={{
            background: `conic-gradient(from 200deg, ${theme.accent}, ${theme.soft}, ${theme.accent}, ${theme.via}, ${theme.accent})`,
            boxShadow: `0 0 40px ${theme.accent}66`
          }}
        >
          <div
            className="flex size-[148px] items-center justify-center overflow-hidden rounded-full border-4"
            style={{
              borderColor: theme.from,
              backgroundColor: theme.via
            }}
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt="Foto do crachá"
                className="size-full object-cover"
              />
            ) : (
              <User
                className="size-14"
                strokeWidth={1.5}
                style={{ color: theme.soft }}
              />
            )}
          </div>
        </div>

        <p
          className="font-display mt-4 w-full text-center leading-tight font-extrabold break-words"
          style={{ fontSize: name.length > 14 ? 24 : 30 }}
        >
          {name || 'Seu Nome'}
        </p>

        <span
          className="mt-2 rounded-full px-3 py-1 text-[11px] font-bold"
          style={{ backgroundColor: theme.accent, color: '#fff' }}
        >
          {'</ Membro Oficial >'}
        </span>

        {techs.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {techs.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-2.5 py-0.5 font-mono text-[10px]"
                style={{
                  borderColor: `${theme.soft}55`,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  color: theme.soft
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div
          className="mt-auto mb-5 flex w-full items-center justify-between gap-3 rounded-2xl border p-3"
          style={{
            borderColor: 'rgba(255,255,255,0.12)',
            backgroundColor: 'rgba(255,255,255,0.07)'
          }}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className="font-mono text-[11px] font-bold tracking-widest"
              style={{ color: theme.soft }}
            >
              {code}
            </span>
            <Barcode code={code} color="#ffffff" />
          </div>
          {socialQr ? (
            <div className="rounded-xl bg-white p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={socialQr}
                alt="QR Code da rede social"
                className="size-[62px]"
              />
            </div>
          ) : (
            <div
              className="flex size-[74px] items-center justify-center rounded-xl"
              style={{ backgroundColor: theme.accent }}
            >
              <ClawMark className="h-11 w-auto text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function BadgeBack({
  groupQr,
  theme,
  code
}: {
  groupQr: string | null
  theme: BadgeData['theme']
  code: string
}) {
  return (
    <div
      style={{
        ...FACE_STYLE,
        background: `linear-gradient(200deg, ${theme.from} 0%, ${theme.via} 55%, ${theme.to} 100%)`
      }}
      className="relative flex flex-col items-center overflow-hidden rounded-[28px] px-8 pt-12 text-white"
    >
      <Contours color={theme.soft} />
      <ClawMark
        className="absolute -right-12 -bottom-10 h-[330px] w-auto -rotate-12"
        style={{ color: theme.soft, opacity: 0.07 }}
      />
      <span
        aria-hidden
        className="absolute -bottom-24 -left-16 size-64 rounded-full blur-3xl"
        style={{ backgroundColor: theme.accent, opacity: 0.3 }}
      />
      <Foil />
      <span className="absolute top-3 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full bg-white/25" />

      <RFECLogo variant="light" className="relative h-auto w-[140px]" />

      <h3 className="font-display relative mt-8 text-center text-[32px] leading-none font-extrabold">
        Entre na <span style={{ color: theme.soft }}>RFEC</span>
      </h3>
      <p className="relative mt-3 text-center text-sm font-medium text-white/70">
        Escaneie e faça parte da nossa comunidade.
      </p>

      <div
        className="relative mt-6 flex size-[186px] items-center justify-center rounded-3xl bg-white p-3"
        style={{ boxShadow: `0 0 50px ${theme.accent}55` }}
      >
        {groupQr ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={groupQr}
            alt="QR Code do grupo da RFEC"
            className="size-full"
          />
        ) : (
          <span className="text-xs text-zinc-400">Gerando QR…</span>
        )}
      </div>

      <div className="relative mt-5 flex flex-wrap justify-center gap-1.5">
        {['#comunidade', '#frontend', '#recife'].map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-2.5 py-0.5 font-mono text-[10px]"
            style={{ borderColor: `${theme.soft}55`, color: theme.soft }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative mt-auto mb-6 flex flex-col items-center gap-2">
        <Barcode code={code} color="#ffffff" />
        <p className="text-[10px] font-semibold tracking-[0.3em] text-white/50 uppercase">
          Recife Front-End Community
        </p>
      </div>
    </div>
  )
}
