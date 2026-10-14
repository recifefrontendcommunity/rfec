import { draftMode } from 'next/headers'

import { DisableDraftMode } from '@/components/events/disable-draft-mode'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { IntroLoader } from '@/components/motion/intro-loader'
import { MotionProvider } from '@/components/motion/motion-provider'
import { ScrollProgress } from '@/components/motion/scroll-progress'

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <MotionProvider>
      <IntroLoader />
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
      {isDraftMode && <DisableDraftMode />}
    </MotionProvider>
  )
}
