import { Marquee } from './motion/marquee'

const WORDS = ['Frontend', 'Recife', 'Comunidade', 'React', 'Eventos', 'Rede']

const Item = ({ word, outline }: { word: string; outline?: boolean }) => (
  <span className="flex items-center">
    <span
      className={
        outline
          ? 'px-6 text-5xl font-black tracking-tight text-transparent uppercase [-webkit-text-stroke:1.5px_white] md:px-10 md:text-7xl'
          : 'px-6 text-5xl font-black tracking-tight text-white uppercase md:px-10 md:text-7xl'
      }
    >
      {word}
    </span>
    <span className="text-3xl text-zinc-950 md:text-5xl">✦</span>
  </span>
)

/** Rotated blue ticker band between hero and "Quem somos". */
const TickerBand = () => {
  return (
    <div
      className="relative z-10 overflow-x-clip bg-zinc-950 py-8 md:py-12"
      aria-hidden
    >
      <div className="-mx-8 -rotate-2 overflow-hidden bg-blue-500 py-4 shadow-xl md:py-6">
        <Marquee speed={-5}>
          {WORDS.map((word, i) => (
            <Item key={word} word={word} outline={i % 2 === 1} />
          ))}
        </Marquee>
        <Marquee speed={5} className="mt-2">
          {[...WORDS].reverse().map((word, i) => (
            <Item key={word} word={word} outline={i % 2 === 0} />
          ))}
        </Marquee>
      </div>
    </div>
  )
}

export default TickerBand
