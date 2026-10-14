import Hero from '@/components/hero'
import Join from '@/components/join'
import Mission from '@/components/mission'
import Partners from '@/components/partners'
import TickerBand from '@/components/ticker-band'
import UpcomingEvents from '@/components/upcoming-events'
import WhoWeAre from '@/components/who-we-are'

export default function Home() {
  return (
    <>
      <Hero />
      <TickerBand />
      <WhoWeAre />
      <Mission />
      <UpcomingEvents />
      <Join />
      <Partners />
    </>
  )
}
