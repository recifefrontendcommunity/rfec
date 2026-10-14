import { ImageResponse } from 'next/og'

import RFECLogo from '@/components/logo'

export const alt = 'RFEC — Recife Frontend Community'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
        color: '#ffffff'
      }}
    >
      <RFECLogo variant="light" width={780} height={235} />
      <div style={{ fontSize: 40, color: '#a1a1aa', display: 'flex' }}>
        Recife Frontend Community
      </div>
      <div
        style={{
          width: 160,
          height: 6,
          borderRadius: 3,
          background: '#2B7FFF',
          display: 'flex'
        }}
      />
    </div>,
    size
  )
}
