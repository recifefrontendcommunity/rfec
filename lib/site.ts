/** Canonical site origin, used for metadata, sitemap, robots and JSON-LD. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://recifefrontend.com.br'
).replace(/\/$/, '')

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** WhatsApp group invite for joining the community. */
export const WHATSAPP_URL = 'https://chat.whatsapp.com/JFCteWc1fCY7e88y4hKUA6'
