import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/showreel.css'

gsap.registerPlugin(ScrollTrigger)

const CHAO = 800
const R = 46 // raio da bolinha

// Trajetória da bolinha: queda + três quiques, em segmentos parabólicos.
const SEGMENTOS = [
  { x0: 200, x1: 560, h: 0, queda: true, d: 0.62 },
  { x0: 560, x1: 940, h: 420, d: 0.78 },
  { x0: 940, x1: 1220, h: 210, d: 0.56 },
  { x0: 1220, x1: 1400, h: 90, d: 0.38 },
]
const DURACAO_QUIQUE = SEGMENTOS.reduce((a, s) => a + s.d, 0)

function posicao(t: number) {
  let resto = t
  for (const s of SEGMENTOS) {
    if (resto <= s.d) {
      const u = resto / s.d
      const x = s.x0 + (s.x1 - s.x0) * u
      const y = s.queda ? 160 + (CHAO - R - 160) * u * u : CHAO - R - s.h * 4 * u * (1 - u)
      const contato = (s.queda ? u > 0.94 : u < 0.06 || u > 0.94)
      const velocidade = s.queda ? u : Math.abs(2 * u - 1)
      const sx = contato ? 1.38 : 1 - 0.14 * velocidade
      const sy = contato ? 0.62 : 1 + 0.22 * velocidade
      return { x, y, sx, sy }
    }
    resto -= s.d
  }
  const s = SEGMENTOS[SEGMENTOS.length - 1]
  return { x: s.x1, y: CHAO - R, sx: 1, sy: 1 }
}

const PALAVRAS = [
  { id: 'estrategia', texto: 'ESTRATÉGIA', nota: 'organiza' },
  { id: 'identidade', texto: 'IDENTIDADE', nota: 'carimba!' },
  { id: 'interface', texto: 'INTERFACE', nota: 'encaixa no grid' },
  { id: 'movimento', texto: 'MOVIMENTO', nota: 'desliza →' },
]

function Seta({ d, classe = '' }: { d: string; classe?: string }) {
  return (
    <svg className={`rr-seta ${classe}`} viewBox="0 0 200 200" aria-hidden="true">
      <path d={d} fill="none" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export default function ShowreelEstudio() {
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
    const raiz = palco.current
    if (!raiz) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1, defaults: { ease: 'power4.out' } })
      linhaDoTempo.current = tl
      gsap.set('.rr-cena', { autoAlpha: 0 })

      const entra = (cena: string, t: number) => {
        tl.set(cena, { autoAlpha: 1 }, t)
        tl.fromTo(cena, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power3.inOut' }, t)
      }
      const sai = (cena: string, t: number) => tl.set(cena, { autoAlpha: 0 }, t)
      const nota = (sel: string, t: number) => {
        tl.fromTo(`${sel} .rr-seta path`, { strokeDasharray: 400, strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, t)
        tl.fromTo(`${sel} .rr-nota-texto`, { opacity: 0, y: 12, rotate: -4 }, { opacity: 1, y: 0, rotate: -4, duration: 0.4 }, t + 0.15)
      }

      // ── Cena 1 · bolinha quicando com rastro, vira o ponto final da frase (0–3,4 s)
      entra('.rr-c1', 0)
      const bola = raiz.querySelector<HTMLElement>('.rr-bola')!
      const fantasmas = gsap.utils.toArray<HTMLElement>('.rr-fantasma')
      fantasmas.forEach((f, i) => {
        const tt = ((i + 1) / (fantasmas.length + 1)) * DURACAO_QUIQUE
        const p = posicao(tt)
        gsap.set(f, { x: p.x - R, y: p.y - R, scaleX: p.sx, scaleY: p.sy, opacity: 0 })
        tl.to(f, { opacity: 1, duration: 0.05 }, 0.3 + tt)
        tl.to(f, { opacity: 0, duration: 0.6 }, 2.6)
      })
      const proxy = { t: 0 }
      gsap.set(bola, { x: 200 - R, y: 160 - R })
      tl.to(proxy, {
        t: DURACAO_QUIQUE, duration: DURACAO_QUIQUE, ease: 'none',
        onUpdate: () => { const p = posicao(proxy.t); gsap.set(bola, { x: p.x - R, y: p.y - R, scaleX: p.sx, scaleY: p.sy, transformOrigin: '50% 100%' }) },
      }, 0.3)
      nota('.rr-nota-estica', 0.9)
      nota('.rr-nota-achata', 1.5)
      tl.from('.rr-c1 .rr-frase .rr-int', { yPercent: 110, duration: 0.8, stagger: 0.08 }, 1.9)
      tl.to(['.rr-nota-estica', '.rr-nota-achata'], { opacity: 0, duration: 0.3 }, 2.2)
      tl.to(bola, {
        x: () => noPalco().x - R + 18,
        y: () => noPalco().y - R + 18,
        scaleX: 0.42, scaleY: 0.42, transformOrigin: '50% 50%', duration: 0.7, ease: 'back.out(2)',
      }, 2.35)
      sai('.rr-c1', 3.4)
      tl.set(bola, { autoAlpha: 0 }, 3.4)

      // ── Cena 2 · palavras animadas pelo próprio significado (3,4–7,4 s)
      entra('.rr-c2', 3.4)
      const t2 = 3.6
      tl.set('.rr-p-estrategia', { autoAlpha: 1 }, t2)
      tl.from('.rr-p-estrategia .rr-letra', {
        x: () => gsap.utils.random(-500, 500), y: () => gsap.utils.random(-300, 300), rotate: () => gsap.utils.random(-90, 90), opacity: 0,
        duration: 0.7, ease: 'expo.out', stagger: 0.015,
      }, t2)
      nota('.rr-p-estrategia', t2 + 0.3)
      tl.set('.rr-p-estrategia', { autoAlpha: 0 }, t2 + 0.95)

      tl.set('.rr-p-identidade', { autoAlpha: 1 }, t2 + 0.95)
      tl.from('.rr-p-identidade .rr-palavra', { scale: 2.8, opacity: 0, duration: 0.32, ease: 'power4.in' }, t2 + 0.95)
      tl.to('.rr-c2', { x: 14, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t2 + 1.27)
      tl.set('.rr-c2', { x: 0 }, t2 + 1.55)
      nota('.rr-p-identidade', t2 + 1.3)
      tl.set('.rr-p-identidade', { autoAlpha: 0 }, t2 + 1.95)

      tl.set('.rr-p-interface', { autoAlpha: 1 }, t2 + 1.95)
      tl.from('.rr-p-interface .rr-letra', {
        y: (i: number) => (i % 2 ? 120 : -120), opacity: 0, duration: 0.45, ease: 'back.out(3)', stagger: 0.04,
      }, t2 + 1.95)
      nota('.rr-p-interface', t2 + 2.3)
      tl.set('.rr-p-interface', { autoAlpha: 0 }, t2 + 2.95)

      tl.set('.rr-p-movimento', { autoAlpha: 1 }, t2 + 2.95)
      tl.fromTo('.rr-p-movimento .rr-palavra', { x: -1400, skewX: -18 }, { x: 0, skewX: 0, duration: 0.7, ease: 'expo.out' }, t2 + 2.95)
      tl.fromTo('.rr-p-movimento .rr-rastro', { x: -1400, opacity: 0.5 }, { x: 0, opacity: 0, duration: 0.95, ease: 'expo.out', stagger: 0.06 }, t2 + 2.95)
      nota('.rr-p-movimento', t2 + 3.2)
      sai('.rr-c2', 7.4)

      // ── Cena 3 · gráfico de easing: linear × ease in-out (7,4–9,6 s)
      entra('.rr-c3', 7.4)
      tl.fromTo('.rr-curva', { strokeDasharray: 1400, strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.15 }, 7.7)
      tl.fromTo('.rr-pista-linear .rr-ponto-pista', { x: 0 }, { x: 640, duration: 1.4, ease: 'none' }, 7.8)
      tl.fromTo('.rr-pista-ease .rr-ponto-pista', { x: 0 }, { x: 640, duration: 1.4, ease: 'power3.inOut' }, 7.8)
      nota('.rr-c3 .rr-nota-ease', 8.6)
      sai('.rr-c3', 9.6)

      // ── Cena 4 · cobrinha de pontos no grid (follow-through) (9,6–11,4 s)
      entra('.rr-c4', 9.6)
      const pontos = gsap.utils.toArray<HTMLElement>('.rr-cobra')
      const cobra = { u: 0 }
      const caminho = (u: number) => ({ x: 260 + 1400 * u, y: 540 + 220 * Math.sin(u * Math.PI * 3) })
      tl.to(cobra, {
        u: 1, duration: 1.6, ease: 'power2.inOut',
        onUpdate: () => pontos.forEach((p, i) => { const q = caminho(Math.max(0, cobra.u - i * 0.028)); gsap.set(p, { x: q.x, y: q.y }) }),
      }, 9.8)
      nota('.rr-c4 .rr-nota-follow', 10.3)
      sai('.rr-c4', 11.4)

      // ── Cena 5 · dial carregando até 100% com antecipação (11,4–13,2 s)
      entra('.rr-c5', 11.4)
      const dial = { v: 0 }
      const numero = raiz.querySelector<HTMLElement>('.rr-dial-num')!
      const arco = raiz.querySelector<SVGCircleElement>('.rr-dial-arco')!
      const C = 2 * Math.PI * 220
      gsap.set(arco, { strokeDasharray: C, strokeDashoffset: C })
      tl.to('.rr-dial', { rotate: -18, scale: 0.94, duration: 0.3, ease: 'power2.out' }, 11.6)
      tl.to('.rr-dial', { rotate: 0, scale: 1, duration: 0.5, ease: 'back.out(3)' }, 11.9)
      tl.to(dial, {
        v: 100, duration: 0.9, ease: 'power3.out',
        onUpdate: () => { numero.textContent = `${Math.round(dial.v)}%`; arco.style.strokeDashoffset = String(C * (1 - dial.v / 100)) },
      }, 11.9)
      tl.to('.rr-dial', { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1 }, 12.8)
      nota('.rr-c5 .rr-nota-ant', 11.7)
      sai('.rr-c5', 13.2)

      // ── Cena 6 · assinatura + nota manuscrita (13,2–15,5 s)
      entra('.rr-c6', 13.2)
      tl.from('.rr-c6 .rr-int', { yPercent: 110, duration: 0.8, stagger: 0.08 }, 13.4)
      tl.from('.rr-c6 .rr-ponto-final', { scale: 0, duration: 0.6, ease: 'back.out(3)' }, 14.0)
      nota('.rr-c6 .rr-nota-cta', 14.2)
      tl.to({}, { duration: 1.2 }, 14.6)

      if (semMovimento) {
        tl.progress(0.98).pause()
        return
      }
      ScrollTrigger.create({
        trigger: caixa.current, start: 'top 85%', end: 'bottom 10%',
        onEnter: () => tl.play(), onEnterBack: () => tl.play(), onLeave: () => tl.pause(), onLeaveBack: () => tl.pause(),
      })
    }, raiz)

    function noPalco() {
      const e = raiz!.getBoundingClientRect().width / 1920 || 1
      const pt = raiz!.querySelector<HTMLElement>('.rr-ponto')!.getBoundingClientRect()
      const pr = raiz!.getBoundingClientRect()
      return { x: (pt.left - pr.left) / e, y: (pt.top - pr.top) / e }
    }
    return () => ctx.revert()
  }, [semMovimento])

  function alternar() {
    const tl = linhaDoTempo.current
    if (!tl) return
    if (tl.paused()) { tl.play(); setTocando(true) } else { tl.pause(); setTocando(false) }
  }

  const letras = (t: string) => t.split('').map((l, i) => <span key={i} className="rr-letra">{l}</span>)

  return (
    <figure className="rr">
      <div ref={caixa} className="rr-caixa" style={{ height: 1080 * escala }}>
        <div
          ref={palco}
          className="rr-palco"
          style={{ transform: `scale(${escala})` }}
          role="img"
          aria-label="Showreel do POLICASTROSTUDIO: uma bolinha quica e vira o ponto final de Marca, interface e imagem; as palavras estratégia, identidade, interface e movimento se animam pelo próprio significado; um gráfico compara movimento linear e suave; uma cobrinha de pontos mostra continuidade; um dial carrega até 100%; e a assinatura Estúdio criativo, POLICASTROSTUDIO, convida para conversar."
        >
          {/* Cena 1 */}
          <div className="rr-cena rr-claro rr-c1">
            <div className="rr-chao" />
            {Array.from({ length: 12 }, (_, i) => <span key={i} className="rr-fantasma" />)}
            <div className="rr-nota rr-nota-estica"><span className="rr-nota-texto">estica</span><Seta d="M20 30 C 90 10, 150 40, 170 140" /></div>
            <div className="rr-nota rr-nota-achata"><Seta d="M180 170 C 120 160, 60 120, 30 40" /><span className="rr-nota-texto">achata!</span></div>
            <p className="rr-frase">
              <span className="rr-pal"><span className="rr-int">MARCA,</span></span>{' '}
              <span className="rr-pal"><span className="rr-int rr-violeta">INTERFACE</span></span>{' '}
              <span className="rr-pal"><span className="rr-int">&amp;&nbsp;IMAGEM</span></span>
              <span className="rr-ponto" />
            </p>
          </div>

          {/* Cena 2 */}
          <div className="rr-cena rr-escuro rr-c2">
            {PALAVRAS.map((p) => (
              <div key={p.id} className={`rr-palavra-cena rr-p-${p.id}`}>
                {p.id === 'movimento' && [0, 1, 2].map((k) => <p key={k} className="rr-palavra rr-rastro" aria-hidden="true">{p.texto}</p>)}
                <p className={`rr-palavra${p.id === 'interface' ? ' rr-caixas' : ''}`}>{letras(p.texto)}</p>
                <div className="rr-nota rr-nota-palavra"><Seta d="M30 170 C 40 100, 100 40, 180 30" /><span className="rr-nota-texto">{p.nota}</span></div>
              </div>
            ))}
          </div>

          {/* Cena 3 */}
          <div className="rr-cena rr-claro rr-c3">
            <svg className="rr-grafico" viewBox="0 0 760 560" aria-hidden="true">
              <path d="M40 20 V 520 H 740" fill="none" stroke="#0B0B0C" strokeWidth="3" />
              <path className="rr-curva" d="M40 520 L 740 20" fill="none" stroke="#8A8A86" strokeWidth="6" />
              <path className="rr-curva" d="M40 520 C 420 520, 360 20, 740 20" fill="none" stroke="#5B3FE0" strokeWidth="8" />
              <text x="560" y="300" className="rr-legenda" fill="#8A8A86">linear</text>
              <text x="430" y="90" className="rr-legenda" fill="#5B3FE0">ease in-out</text>
            </svg>
            <div className="rr-pistas">
              <div className="rr-pista rr-pista-linear"><span className="rr-ponto-pista" /><span className="rr-pista-rotulo">linear</span></div>
              <div className="rr-pista rr-pista-ease"><span className="rr-ponto-pista" /><span className="rr-pista-rotulo">ease in-out</span></div>
              <div className="rr-nota rr-nota-ease"><Seta d="M30 40 C 80 120, 120 150, 180 160" /><span className="rr-nota-texto">mais natural</span></div>
            </div>
          </div>

          {/* Cena 4 */}
          <div className="rr-cena rr-escuro rr-c4">
            <div className="rr-grid-pontos" />
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} className="rr-cobra" style={{ width: 56 - i * 2.4, height: 56 - i * 2.4, margin: `${-(56 - i * 2.4) / 2}px 0 0 ${-(56 - i * 2.4) / 2}px`, opacity: 1 - i * 0.05 }} />
            ))}
            <div className="rr-nota rr-nota-follow"><span className="rr-nota-texto">follow-through: o resto segue</span><Seta d="M20 20 C 70 60, 120 120, 150 180" /></div>
          </div>

          {/* Cena 5 */}
          <div className="rr-cena rr-claro rr-c5">
            <div className="rr-dial">
              <svg viewBox="0 0 520 520" aria-hidden="true">
                <circle cx="260" cy="260" r="220" fill="none" stroke="#CFCDC7" strokeWidth="28" />
                <circle className="rr-dial-arco" cx="260" cy="260" r="220" fill="none" stroke="#5B3FE0" strokeWidth="28" strokeLinecap="round" transform="rotate(-90 260 260)" />
              </svg>
              <span className="rr-dial-num">0%</span>
            </div>
            <div className="rr-nota rr-nota-ant"><span className="rr-nota-texto">antecipação: recua antes de ir</span><Seta d="M180 30 C 120 50, 60 100, 30 170" /></div>
          </div>

          {/* Cena 6 */}
          <div className="rr-cena rr-escuro rr-c6">
            <p className="rr-cargo"><span className="rr-pal"><span className="rr-int">ESTÚDIO CRIATIVO /</span></span></p>
            <p className="rr-assinatura">
              <span className="rr-pal"><span className="rr-int">POLICASTRO<span className="rr-leve">STUDIO</span></span></span>
              <span className="rr-ponto-final" />
            </p>
            <div className="rr-nota rr-nota-cta"><Seta d="M30 30 C 60 120, 120 160, 190 170" /><span className="rr-nota-texto">vamos conversar?</span></div>
          </div>

          <span className="rr-bola" />
        </div>
      </div>
      <figcaption className="rr-controles mono">
        <button type="button" onClick={alternar} aria-pressed={!tocando}>{tocando ? '[ Pausar ]' : '[ Reproduzir ]'}</button>
        <span className="suave">Showreel · princípios de animação · 15 s</span>
      </figcaption>
    </figure>
  )
}
