import { cn } from '@/lib/utils'

type SectionDecorProps = {
  /** Light sections get softer, darker-tinted dots; dark ones get white dots. */
  tone?: 'dark' | 'light'
  className?: string
}

/**
 * Decorative backdrop for a section: a faded dot grid plus two slowly drifting
 * blurred blue orbs. Purely visual — place it as the first child of a
 * `relative overflow-hidden` section.
 */
export function SectionDecor({ tone = 'dark', className }: SectionDecorProps) {
  const dot = tone === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(24,24,27,0.10)'

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-0', className)}
    >
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage: `radial-gradient(${dot} 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />
      <div className="rfec-orb absolute -top-24 -right-24 size-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div
        className="rfec-orb absolute -bottom-32 -left-24 size-96 rounded-full bg-sky-400/15 blur-3xl"
        style={{ animationDelay: '-6s' }}
      />
    </div>
  )
}
