import { ImageResponse } from 'next/og'

import { LOGO_MARK_PATH, LOGO_MARK_VIEWBOX } from '@/components/logo-mark-path'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#2B7FFF',
        borderRadius: 14
      }}
    >
      <svg width="44" height="46" viewBox={LOGO_MARK_VIEWBOX} fill="none">
        <path d={LOGO_MARK_PATH} fill="#FFFFFF" />
      </svg>
    </div>,
    size
  )
}
