export type BadgeTheme = {
  id: string
  label: string
  from: string
  via: string
  to: string
  accent: string
  soft: string
}

export const THEMES: BadgeTheme[] = [
  {
    id: 'blue',
    label: 'Azul RFEC',
    from: '#020617',
    via: '#0a1d4a',
    to: '#12306e',
    accent: '#2b7fff',
    soft: '#7db4ff'
  },
  {
    id: 'violet',
    label: 'Violeta',
    from: '#0b0620',
    via: '#2a1065',
    to: '#4c1d95',
    accent: '#8b5cf6',
    soft: '#c4b5fd'
  },
  {
    id: 'emerald',
    label: 'Esmeralda',
    from: '#02130e',
    via: '#064e3b',
    to: '#065f46',
    accent: '#10b981',
    soft: '#6ee7b7'
  },
  {
    id: 'sunset',
    label: 'Pôr do sol',
    from: '#1a0a05',
    via: '#7c2d12',
    to: '#9a3412',
    accent: '#f97316',
    soft: '#fdba74'
  }
]

export const TECHS = [
  'React',
  'TypeScript',
  'JavaScript',
  'CSS',
  'HTML',
  'Next.js',
  'Vue',
  'Angular',
  'Node.js',
  'Tailwind',
  'Figma',
  'Acessibilidade'
] as const

export const MAX_TECHS = 4

export type BadgeData = {
  name: string
  photo: string | null
  socialQr: string | null
  techs: string[]
  theme: BadgeTheme
  /** Stable member code derived from the name, e.g. RFEC-0421. */
  code: string
}

/** Deterministic 4-digit code so the same name always gets the same badge. */
export function memberCode(name: string): string {
  const clean = name.trim().toLowerCase()
  if (!clean) return 'RFEC-0000'
  let hash = 7
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) % 9973
  }
  return `RFEC-${String(hash).padStart(4, '0')}`
}
