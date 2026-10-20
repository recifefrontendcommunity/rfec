import { ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * External registration CTA (Sympla). Registration is never handled on-platform.
 * Reuses the `Button asChild` external-link pattern from the site Header.
 */
export function RegistrationButton({
  url,
  className,
  label = 'Inscreva-se'
}: {
  url?: string
  className?: string
  label?: string
}) {
  if (!url) return null

  return (
    <Button
      asChild
      size="lg"
      className={cn(
        'h-12 bg-blue-500 px-8 text-base text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600',
        className
      )}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        {label} <ExternalLink />
      </a>
    </Button>
  )
}
