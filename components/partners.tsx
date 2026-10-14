import { getPartners } from '@/sanity/lib/queries'

import { Reveal } from './motion/reveal'
import PartnersCarousel from './partners-carousel'
import TitleWithTag from './title-with-tag'

const Partners = async () => {
  const partners = await getPartners()

  return (
    <section id="partners" className="scroll-mt-20 px-5 py-20 lg:py-28">
      <div className="container mx-auto">
        <TitleWithTag className="mb-6 text-2xl md:text-3xl lg:text-4xl">
          Parceiros
        </TitleWithTag>
        <Reveal delay={0.1}>
          <p className="mb-6 text-base md:max-w-2xl md:text-lg">
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
