import { getPartners } from '@/sanity/lib/queries'

import { Reveal } from './motion/reveal'
import { SectionDecor } from './motion/section-decor'
import PartnersCarousel from './partners-carousel'
import TitleWithTag from './title-with-tag'

const Partners = async () => {
  const partners = await getPartners()

  return (
    <section
      id="partners"
      className="relative scroll-mt-20 overflow-hidden px-5 py-20 lg:py-28"
    >
      <SectionDecor tone="light" />
      <div className="relative container mx-auto">
        <TitleWithTag className="mb-6 text-3xl font-semibold md:text-5xl lg:text-6xl">
          Parceiros
        </TitleWithTag>
        <Reveal delay={0.1}>
          <p className="font-display mb-6 text-lg font-semibold text-zinc-600 md:max-w-2xl md:text-xl">
            Conheça nossos parceiros que colaboram para o sucesso da Recife
            Front-End Community.
          </p>
        </Reveal>
      </div>
      {partners.length > 0 && <PartnersCarousel partners={partners} />}
    </section>
  )
}

export default Partners
