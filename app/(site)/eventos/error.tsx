'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function EventosError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto flex flex-col items-center gap-4 px-4 pt-32 pb-24 text-center">
      <h1 className="text-2xl font-semibold">Algo deu errado</h1>
      <p className="text-muted-foreground max-w-md">
        Não foi possível carregar os eventos agora. Tente novamente em
        instantes.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  )
}
