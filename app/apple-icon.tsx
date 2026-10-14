import { ImageResponse } from 'next/og'

import { LOGO_MARK_PATH, LOGO_MARK_VIEWBOX } from '@/components/logo-mark-path'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#2B7FFF'
      }}
    >
      <svg width="120" height="126" viewBox={LOGO_MARK_VIEWBOX} fill="none">
        <path d={LOGO_MARK_PATH} fill="#FFFFFF" />
      </svg>
    </div>,
    size
  )
}
