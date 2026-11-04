import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/kashi-motion.css'

gsap.registerPlugin(ScrollTrigger)

const base = import.meta.env.BASE_URL
const img = (f: string) => `${base}projetos/kashi/${f}`

type Parte = { t: string; d?: boolean }
const FRASES: { id: string; partes: Parte[] }[] = [
  { id: 'f1', partes: [{ t: 'Respire' }, { t: 'fundo.', d: true }] },
  { id: 'f2', partes: [{ t: 'Você' }, { t: 'está' }, { t: 'em' }, { t: 'casa.', d: true }] },
  { id: 'f3', partes: [{ t: 'A' }, { t: 'cidade' }, { t: 'da' }, { t: 'luz,', d: true }, { t: 'em' }, { t: 'casa.', d: true }] },
  { id: 'f4', partes: [{ t: 'Bem-vinda(o),' }, { t: 'tire' }, { t: 'os' }, { t: 'sapatos', d: true }, { t: 'aqui.', d: true }] },
  { id: 'f5', partes: [{ t: 'Um' }, { t: 'momento' }, { t: 'de' }, { t: 'cuidado', d: true }, { t: 'para' }, { t: 'quem' }, { t: 'você' }, { t: 'ama.' }] },
]
const TAGLINE: Parte[] = [{ t: 'Um' }, { t: 'lugar' }, { t: 'de' }, { t: 'luz,' }, { t: 'cuidado', d: true }, { t: 'e', d: true }, { t: 'presença.', d: true }]

/** Título com três camadas: a principal e dois ecos que seguem atrasados (rastro). */
function Titulo({ partes, classe = '' }: { partes: Parte[]; classe?: string }) {
  const linha = (eco: number) => (
    <p className={`km-titulo ${classe} ${eco ? `km-eco km-eco${eco}` : 'km-principal'}`} aria-hidden={eco ? true : undefined}>
      {partes.map((p, i) => (
        <span key={i} className="km-palavra">
          <span className={`km-int${p.d ? ' km-destaque' : ''}`}>{p.t}</span>
        </span>
      ))}
    </p>
  )
  return (
    <div className="km-titulo-grupo">
      {linha(2)}
      {linha(1)}
      {linha(0)}
    </div>
  )
}

/** Símbolo da Kashi separado em partes, para montar o logo em cena. */
function Simbolo({ id }: { id: string }) {
  const s = { stroke: '#F4F0E8', strokeWidth: 10, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }
  return (
    <svg id={id} className="km-simbolo" viewBox="352 280 730 740" aria-hidden="true">
      <path className="km-p" d="M378.5 721.166C366.929 670.398 366.944 617.675 378.543 566.913C390.143 516.151 413.028 468.653 445.5 427.948C477.972 387.243 519.196 354.376 566.112 331.787C613.028 309.199 664.429 297.469 716.5 297.469C768.57 297.469 819.972 309.199 866.887 331.787C913.803 354.376 955.027 387.243 987.499 427.948C1019.97 468.653 1042.86 516.151 1054.46 566.913C1066.05 617.675 1066.07 670.398 1054.5 721.166" {...s} />
      <path className="km-p" d="M716.5 403.966V442.1M572.633 442.1L595.167 473.3M860.367 442.1L837.833 473.3M482.5 539.166L517.167 556.5M950.5 539.166L915.833 556.5" {...s} stroke="#F2B696" />
      <path className="km-p" d="M716.5 670.9C764.364 670.9 803.166 632.098 803.166 584.234C803.166 536.369 764.364 497.567 716.5 497.567C668.635 497.567 629.833 536.369 629.833 584.234C629.833 632.098 668.635 670.9 716.5 670.9Z" fill="#F2B696" />
      <path className="km-p" d="M524.1 884.1V709.033L624.633 629.3M808.366 629.3L908.9 709.033V884.1" {...s} />
      <path className="km-p" d="M680 897.867V818.133C680 808.02 684.018 798.32 691.169 791.169C698.32 784.018 708.02 780 718.133 780C728.247 780 737.946 784.018 745.098 791.169C752.249 798.32 756.267 808.02 756.267 818.133V913.5L680 897.867Z" fill="#B45F37" />
      <path className="km-p" d="M402.767 894.5C612.5 823.433 806.633 979.433 1030.23 894.5M482.5 974.233C645.433 934.367 768.5 1031.43 950.5 974.233" {...s} stroke="#6CC1C2" />
      <path className="km-p" d="M515.433 858.1C475.567 811.3 470.367 767.967 475.567 710.767M915.833 868.5C957.433 826.9 966.1 778.367 960.9 726.367" {...s} strokeWidth={5} />
      <path className="km-p" d="M477.3 764.5C425.3 757.567 411.434 721.167 421.834 689.967C463.434 691.7 492.9 724.633 477.3 764.5ZM482.5 795.7C487.7 747.167 517.167 731.567 551.834 738.5C544.9 774.9 515.434 797.433 482.5 795.7ZM517.167 859.833C468.634 863.3 442.634 840.767 439.167 813.033C477.3 806.1 510.234 825.167 517.167 859.833ZM960.901 780.1C924.501 771.433 908.9 740.233 915.834 709.033C955.701 714.233 976.501 741.967 960.901 780.1ZM953.967 814.767C964.367 776.633 993.834 762.767 1025.03 773.167C1016.37 807.833 988.634 825.167 953.967 814.767ZM917.567 870.233C912.367 830.367 888.101 809.567 856.901 818.233C860.367 854.633 886.367 875.433 917.567 870.233Z" fill="#6CC1C2" />
    </svg>
  )
}

export default function KashiMotion() {
  const caixa = useRef<HTMLDivElement>(null)
  const palco = useRef<HTMLDivElement>(null)
  const linhaDoTempo = useRef<gsap.core.Timeline | null>(null)
  const [escala, setEscala] = useState(1)
  const [tocando, setTocando] = useState(true)
  const [semMovimento] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  // O palco tem 1920x1080 e é reduzido para caber na largura disponível.
  useEffect(() => {
    const el = caixa.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setEscala(e.contentRect.width / 1920))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2, defaults: { ease: 'power4.out' } })
      linhaDoTempo.current = tl
      gsap.set('.km-cena', { autoAlpha: 0 })

      const entraTitulo = (cena: string, t: number) => {
        ;[0, 1, 2].forEach((eco) => {
          const sel = `${cena} ${eco ? `.km-eco${eco}` : '.km-principal'} .km-int`
          tl.fromTo(sel, { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.09 }, t + eco * 0.07)
        })
        tl.fromTo(`${cena} .km-eco1`, { opacity: 0.22 }, { opacity: 0, duration: 1.2, ease: 'power2.out' }, t + 0.5)
        tl.fromTo(`${cena} .km-eco2`, { opacity: 0.1 }, { opacity: 0, duration: 1.2, ease: 'power2.out' }, t + 0.5)
      }
      const saiCena = (cena: string, t: number) => {
        tl.to(`${cena} .km-principal .km-int`, { yPercent: -115, duration: 0.6, ease: 'power3.in', stagger: 0.04 }, t)
        tl.to(`${cena} .km-ui`, { x: -120, opacity: 0, filter: 'blur(14px)', duration: 0.7, ease: 'power3.in' }, t)
        tl.to(`${cena} .km-ui-eco`, { x: -60, opacity: 0.25, duration: 0.35, ease: 'power2.in' }, t)
        tl.to(`${cena} .km-ui-eco`, { opacity: 0, duration: 0.35 }, t + 0.35)
        tl.set(cena, { autoAlpha: 0 }, t + 0.75)
      }
      const entraUi = (cena: string, t: number) => {
        tl.fromTo(`${cena} .km-ui`, { x: 160, scale: 0.92, opacity: 0, filter: 'blur(18px)' }, { x: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.1 }, t)
        tl.fromTo(`${cena} .km-ui-eco`, { x: 240, opacity: 0.3 }, { x: 0, opacity: 0, duration: 1.3 }, t + 0.05)
      }

      // 0–3 s · abertura com o logo
      tl.set('.km-abertura', { autoAlpha: 1 }, 0)
      tl.from('#km-sim-a', { scale: 0.6, opacity: 0, filter: 'blur(20px)', duration: 1.4 }, 0.2)
      tl.from('.km-abertura .km-nome', { yPercent: 40, opacity: 0, duration: 1 }, 0.8)
      tl.to('.km-abertura', { scale: 1.08, opacity: 0, filter: 'blur(16px)', duration: 0.8, ease: 'power3.in' }, 2.4)
      tl.set('.km-abertura', { autoAlpha: 0, clearProps: 'filter,scale' }, 3.2)

      // 3–23 s · cinco frases, 4 s cada
      FRASES.forEach((f, i) => {
        const cena = `.km-${f.id}`
        const t = 3 + i * 4
        tl.set(cena, { autoAlpha: 1 }, t)
        entraTitulo(cena, t)
        entraUi(cena, t + 0.25)
        saiCena(cena, t + 3.2)
      })

      // 23–27 s · as partes se juntam e formam o logo
      tl.set('.km-forma', { autoAlpha: 1 }, 23)
      tl.from('#km-sim-b .km-p', {
        x: () => gsap.utils.random(-900, 900),
        y: () => gsap.utils.random(-500, 500),
        rotate: () => gsap.utils.random(-120, 120),
        scale: () => gsap.utils.random(0.3, 1.8),
        opacity: 0,
        duration: 2.2,
        ease: 'expo.out',
        stagger: 0.12,
      }, 23.1)
      tl.to('.km-forma', { scale: 0.62, y: -240, duration: 1.2, ease: 'power3.inOut' }, 26.2)

      // 27–30 s · logo e assinatura
      tl.set('.km-final', { autoAlpha: 1 }, 27)
      tl.from('.km-final .km-nome', { yPercent: 30, opacity: 0, duration: 1 }, 27)
      entraTitulo('.km-final', 27.5)
      tl.to({}, { duration: 2 }, 28.5)

      if (semMovimento) {
        tl.progress(0.97).pause()
        return
      }
      ScrollTrigger.create({
        trigger: caixa.current,
        start: 'top 75%',
        end: 'bottom 20%',
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.pause(),
        onLeaveBack: () => tl.pause(),
      })
    }, palco)
    return () => ctx.revert()
  }, [semMovimento])

  function alternar() {
    const tl = linhaDoTempo.current
    if (!tl) return
    if (tl.paused()) { tl.play(); setTocando(true) } else { tl.pause(); setTocando(false) }
  }
  function reiniciar() {
    linhaDoTempo.current?.restart()
    setTocando(true)
  }

  return (
    <figure className="km">
      <div ref={caixa} className="km-caixa" style={{ height: 1080 * escala }}>
        <div
          ref={palco}
          className="km-palco"
          style={{ transform: `scale(${escala})` }}
          role="img"
          aria-label="Apresentação animada da Kashi: Respire fundo. Você está em casa. A cidade da luz, em casa. Bem-vinda(o), tire os sapatos aqui. Um momento de cuidado para quem você ama. Kashi, um lugar de luz, cuidado e presença."
        >
          <div className="km-grade" aria-hidden="true" />

          <div className="km-cena km-abertura km-centro">
            <Simbolo id="km-sim-a" />
            <img className="km-nome" src={img('kashi-nome-claro.svg')} alt="" />
          </div>

          <div className="km-cena km-f1">
            <Titulo partes={FRASES[0].partes} />
            <div className="km-ui-area">
              <div className="km-ui-eco km-celular" />
              <div className="km-ui km-celular">
                <div className="km-post">
                  <span>Respire <em>fundo</em></span>
                </div>
                <div className="km-post-rodape"><b>kashiespaco_</b> Ayurveda &amp; Yogaterapia</div>
              </div>
            </div>
          </div>

          <div className="km-cena km-f2">
            <Titulo partes={FRASES[1].partes} />
            <div className="km-ui-area">
              <div className="km-ui-eco km-navegador" />
              <div className="km-ui km-navegador"><img src={img('site.webp')} alt="" /></div>
            </div>
          </div>

          <div className="km-cena km-f3">
            <Titulo partes={FRASES[2].partes} />
            <div className="km-ui-area">
              <div className="km-ui-eco km-arco" />
              <div className="km-ui km-arco"><img src={img('pratica.webp')} alt="" /><span className="km-sol" /></div>
            </div>
          </div>

          <div className="km-cena km-f4">
            <Titulo partes={FRASES[3].partes} classe="km-titulo--menor" />
            <div className="km-ui-area">
              <div className="km-ui-eco km-quadro" />
              <div className="km-ui km-quadro"><img src={img('placa.webp')} alt="" /></div>
            </div>
          </div>

          <div className="km-cena km-f5">
            <Titulo partes={FRASES[4].partes} classe="km-titulo--menor" />
            <div className="km-ui-area">
              <div className="km-ui-eco km-vale" />
              <div className="km-ui km-vale">
                <span className="km-vale-rotulo">Vale-presente</span>
                <span className="km-vale-texto">Um momento <em>de cuidado</em><br />para quem você ama.</span>
                <img src={img('kashi-nome-claro.svg')} alt="" />
              </div>
            </div>
          </div>

          <div className="km-cena km-forma km-centro">
            <Simbolo id="km-sim-b" />
          </div>

          <div className="km-cena km-final km-centro km-final-layout">
            <img className="km-nome" src={img('kashi-nome-claro.svg')} alt="" />
            <Titulo partes={TAGLINE} classe="km-titulo--tagline" />
          </div>
        </div>
      </div>
      <figcaption className="km-controles mono">
        <button type="button" onClick={alternar} aria-pressed={!tocando}>{tocando ? '[ Pausar ]' : '[ Reproduzir ]'}</button>
        <button type="button" onClick={reiniciar}>[ Recomeçar ]</button>
        <span className="suave">Apresentação · 30 s · 1920×1080</span>
      </figcaption>
    </figure>
  )
}
