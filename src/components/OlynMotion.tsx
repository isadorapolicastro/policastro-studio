import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@fontsource-variable/manrope/index.css'
import '../styles/olyn-motion.css'

gsap.registerPlugin(ScrollTrigger)

const base = import.meta.env.BASE_URL
const img = (f: string) => `${base}projetos/olyn/${f}`

type Parte = { t: string; d?: boolean; quebra?: boolean }
// Frases tiradas da própria landing page da OLYN.
const FRASES: Parte[][] = [
  [{ t: 'Seu' }, { t: 'treino.', quebra: true }, { t: 'Do', d: true }, { t: 'seu', d: true }, { t: 'jeito.', d: true }],
  [{ t: 'Treino' }, { t: 'em' }, { t: 'grupo.', quebra: true }, { t: 'Entrega', d: true }, { t: 'individual.', d: true }],
  [{ t: 'Academia' }, { t: 'para' }, { t: 'quem', quebra: true }, { t: 'não', d: true }, { t: 'gosta', d: true }, { t: 'de', d: true }, { t: 'academia.', d: true }],
  [{ t: 'Clareza' }, { t: 'no' }, { t: 'movimento.', quebra: true }, { t: 'Força', d: true }, { t: 'com', d: true }, { t: 'significado.', d: true }],
  [{ t: 'Seu' }, { t: 'próximo' }, { t: 'nível', quebra: true }, { t: 'começa', d: true }, { t: 'aqui.', d: true }],
]
const ASSINATURA: Parte[] = [{ t: 'Treine' }, { t: 'com' }, { t: 'intenção.', d: true }]
const FATIAS = 7

function Titulo({ partes, classe = '' }: { partes: Parte[]; classe?: string }) {
  const linha = (eco: number) => (
    <p className={`om-titulo ${classe} ${eco ? `om-eco om-eco${eco}` : 'om-principal'}`} aria-hidden={eco ? true : undefined}>
      {partes.map((p, i) => (
        <span key={i}>
          <span className="om-palavra">
            <span className={`om-int${p.d ? ' om-destaque' : ''}`}>{p.t}</span>
          </span>
          {p.quebra && <br />}
        </span>
      ))}
    </p>
  )
  return <div className="om-titulo-grupo">{linha(2)}{linha(1)}{linha(0)}</div>
}

export default function OlynMotion() {
  const caixa = useRef<HTMLDivElement>(null)
  const palco = useRef<HTMLDivElement>(null)
  const linhaDoTempo = useRef<gsap.core.Timeline | null>(null)
  const [escala, setEscala] = useState(1)
  const [tocando, setTocando] = useState(true)
  const [semMovimento] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

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
      gsap.set('.om-cena', { autoAlpha: 0 })

      const entraTitulo = (cena: string, t: number) => {
        ;[0, 1, 2].forEach((eco) => {
          tl.fromTo(`${cena} ${eco ? `.om-eco${eco}` : '.om-principal'} .om-int`, { yPercent: 115 }, { yPercent: 0, duration: 0.75, stagger: 0.07 }, t + eco * 0.06)
        })
        tl.fromTo(`${cena} .om-eco1`, { opacity: 0.35 }, { opacity: 0, duration: 1, ease: 'power2.out' }, t + 0.45)
        tl.fromTo(`${cena} .om-eco2`, { opacity: 0.16 }, { opacity: 0, duration: 1, ease: 'power2.out' }, t + 0.45)
      }
      const entraUi = (cena: string, t: number) => {
        tl.fromTo(`${cena} .om-ui`, { x: 200, skewX: -6, opacity: 0, filter: 'blur(16px)' }, { x: 0, skewX: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9 }, t)
        tl.fromTo(`${cena} .om-ui-eco`, { x: 300, opacity: 0.4 }, { x: 0, opacity: 0, duration: 1.1 }, t + 0.04)
      }
      const saiCena = (cena: string, t: number) => {
        tl.to(`${cena} .om-principal .om-int`, { yPercent: -115, duration: 0.5, ease: 'power3.in', stagger: 0.03 }, t)
        tl.to(`${cena} .om-ui`, { x: -160, opacity: 0, filter: 'blur(14px)', duration: 0.6, ease: 'power3.in' }, t)
        tl.fromTo(`${cena} .om-ui-eco`, { x: 0, opacity: 0.3 }, { x: -80, opacity: 0, duration: 0.6, ease: 'power2.in' }, t)
        tl.set(cena, { autoAlpha: 0 }, t + 0.65)
      }

      // 0–3 s · abertura: o símbolo acende como uma tocha
      tl.set('.om-abertura', { autoAlpha: 1 }, 0)
      tl.from('.om-abertura .om-icone', { y: 120, scale: 0.6, opacity: 0, filter: 'blur(24px)', duration: 1.3 }, 0.2)
      tl.from('.om-abertura .om-brilho', { scale: 0.2, opacity: 0, duration: 1.6, ease: 'power2.out' }, 0.3)
      tl.to('.om-abertura', { scale: 1.1, opacity: 0, filter: 'blur(16px)', duration: 0.7, ease: 'power3.in' }, 2.4)

      // 3–23 s · cinco frases
      ;['.om-f1', '.om-f2', '.om-f3', '.om-f4', '.om-f5'].forEach((cena, i) => {
        const t = 3 + i * 4
        tl.set(cena, { autoAlpha: 1 }, t)
        entraTitulo(cena, t)
        entraUi(cena, t + 0.2)
        if (i === 1) tl.from('.om-f2 .om-vaga', { scale: 0, duration: 0.5, ease: 'back.out(3)', stagger: 0.12 }, t + 0.9)
        if (i === 4) tl.to('.om-f5 .om-cta', { scale: 1.05, duration: 0.3, yoyo: true, repeat: 3, ease: 'power1.inOut' }, t + 1.3)
        saiCena(cena, t + 3.25)
      })

      // 23–27 s · fatias da chama se juntam e formam o símbolo
      tl.set('.om-forma', { autoAlpha: 1 }, 23)
      tl.from('.om-fatia', {
        x: (i: number) => (i % 2 ? 1100 : -1100),
        skewX: (i: number) => (i % 2 ? -20 : 20),
        opacity: 0,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.12,
      }, 23.1)
      tl.from('.om-forma .om-brilho', { scale: 0.2, opacity: 0, duration: 1.2 }, 24.6)
      tl.to('.om-forma', { scale: 0.55, y: -230, duration: 1.1, ease: 'power3.inOut' }, 26)

      // 27–30 s · logo e assinatura
      tl.set('.om-final', { autoAlpha: 1 }, 27)
      tl.from('.om-final .om-logo', { yPercent: 30, opacity: 0, duration: 0.9 }, 27)
      entraTitulo('.om-final', 27.4)
      tl.to({}, { duration: 2 }, 28.4)

      if (semMovimento) {
        tl.progress(0.97).pause()
        return
      }
      ScrollTrigger.create({
        trigger: caixa.current, start: 'top 75%', end: 'bottom 20%',
        onEnter: () => tl.play(), onEnterBack: () => tl.play(), onLeave: () => tl.pause(), onLeaveBack: () => tl.pause(),
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
    <figure className="om">
      <div ref={caixa} className="om-caixa" style={{ height: 1080 * escala }}>
        <div
          ref={palco}
          className="om-palco"
          style={{ transform: `scale(${escala})` }}
          role="img"
          aria-label="Apresentação animada da OLYN: Seu treino. Do seu jeito. Treino em grupo. Entrega individual. Academia para quem não gosta de academia. Clareza no movimento. Força com significado. Seu próximo nível começa aqui. OLYN Centro de Treinamento, treine com intenção."
        >
          <div className="om-grade" aria-hidden="true" />

          <div className="om-cena om-abertura om-centro">
            <span className="om-brilho" />
            <img className="om-icone" src={img('icone.png')} alt="" />
          </div>

          <div className="om-cena om-f1">
            <Titulo partes={FRASES[0]} />
            <div className="om-ui-area">
              <div className="om-ui-eco om-celular" />
              <div className="om-ui om-celular"><img src={img('site-celular.webp')} alt="" /></div>
            </div>
          </div>

          <div className="om-cena om-f2">
            <Titulo partes={FRASES[1]} />
            <div className="om-ui-area">
              <div className="om-ui-eco om-cartao" />
              <div className="om-ui om-cartao">
                <span className="om-cartao-rotulo">Método OLYN</span>
                <span className="om-cartao-titulo">OLYN GROUP</span>
                <span className="om-cartao-sub">Circuito Progressivo Individualizado</span>
                <div className="om-vagas" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => <span key={i} className="om-vaga" />)}
                </div>
                <span className="om-cartao-sub">Até 4 alunos por horário</span>
              </div>
            </div>
          </div>

          <div className="om-cena om-f3">
            <Titulo partes={FRASES[2]} classe="om-titulo--menor" />
            <div className="om-ui-area">
              <div className="om-ui-eco om-foto" />
              <div className="om-ui om-foto"><img src={img('estrutura-05.webp')} alt="" /></div>
            </div>
          </div>

          <div className="om-cena om-f4">
            <Titulo partes={FRASES[3]} classe="om-titulo--menor" />
            <div className="om-ui-area">
              <div className="om-ui-eco om-navegador" />
              <div className="om-ui om-navegador">
                <div className="om-barra"><i /><i /><i /><span>olynct.com.br</span></div>
                <img src={img('site-hero.webp')} alt="" />
              </div>
            </div>
          </div>

          <div className="om-cena om-f5">
            <Titulo partes={FRASES[4]} />
            <div className="om-ui-area">
              <div className="om-ui-eco om-cta-area" />
              <div className="om-ui om-cta-area">
                <span className="om-cartao-rotulo">08 · Aula experimental</span>
                <span className="om-cta">Agendar aula experimental <b aria-hidden="true">↗</b></span>
                <span className="om-cartao-sub">Pelo WhatsApp, em todos os pontos da página</span>
              </div>
            </div>
          </div>

          <div className="om-cena om-forma om-centro">
            <span className="om-brilho" />
            <div className="om-chama">
              {Array.from({ length: FATIAS }, (_, i) => (
                <img
                  key={i}
                  className="om-fatia"
                  src={img('icone.png')}
                  alt=""
                  style={{ clipPath: `inset(${(i * 100) / FATIAS}% 0 ${100 - ((i + 1) * 100) / FATIAS}% 0)` }}
                />
              ))}
            </div>
          </div>

          <div className="om-cena om-final om-centro om-final-layout">
            <img className="om-logo" src={img('logo-claro.png')} alt="" />
            <Titulo partes={ASSINATURA} classe="om-titulo--assinatura" />
          </div>
        </div>
      </div>
      <figcaption className="om-controles mono">
        <button type="button" onClick={alternar} aria-pressed={!tocando}>{tocando ? '[ Pausar ]' : '[ Reproduzir ]'}</button>
        <button type="button" onClick={reiniciar}>[ Recomeçar ]</button>
        <span className="suave">Apresentação · 30 s · 1920×1080</span>
      </figcaption>
    </figure>
  )
}
