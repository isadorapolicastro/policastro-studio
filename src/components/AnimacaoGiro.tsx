import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/animacao-giro.css'

gsap.registerPlugin(ScrollTrigger)

const P = 'M20 20H56A60 60 0 0 1 56 140V200H20ZM56 54A26 26 0 0 1 56 106Z'
const PALAVRAS = [
  { t: 'Marca', cor: 'ga-branco' },
  { t: 'Interface', cor: 'ga-roxo' },
  { t: 'Imagem', cor: 'ga-branco' },
]
const ECOS = [0.28, 0.16, 0.08]

/** Uma metade do símbolo numa camada própria: girar a camada é girar em volta do ponto central. */
function Metade({ classe, cor, girada }: { classe: string; cor: string; girada?: boolean }) {
  return (
    <svg className={`ga-camada-simbolo ${classe}`} viewBox="10 10 176 280" aria-hidden="true">
      <path d={P} fill={cor} fillRule="evenodd" transform={girada ? 'rotate(180 98 150)' : undefined} />
    </svg>
  )
}

function Letras({ texto }: { texto: string }) {
  return <>{texto.split('').map((l, i) => <span key={i} className="ga-letra">{l}</span>)}</>
}

/**
 * Abertura da home. Roteiro (15 s, em ciclo):
 * o ponto acende → as duas metades orbitam e travam no giro → cada giro de 180° troca as cores
 * e revela uma palavra → mergulho no ponto: "duas metades, um estúdio" → assinatura.
 */
export default function AnimacaoGiro() {
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
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.6, defaults: { ease: 'power4.out' } })
      linhaDoTempo.current = tl
      gsap.set(['.ga-palavra', '.ga-duas', '.ga-assinatura'], { autoAlpha: 0 })
      gsap.set('.ga-tela-roxa', { clipPath: 'circle(0px at 960px 540px)' })

      // ── 0–2,4 s · o ponto acende e a órbita se desenha
      tl.fromTo('.ga-eixo', { scale: 0 }, { scale: 1, duration: 0.8, ease: 'back.out(3)' }, 0.2)
      tl.to('.ga-eixo', { scale: 1.45, duration: 0.22, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0.9)
      tl.fromTo('.ga-orbita', { strokeDashoffset: 2100 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.5)

      // ── 2,4–5 s · as metades orbitam em sentidos opostos e travam
      tl.fromTo('.ga-metade-a', { rotation: -720, scale: 0.15, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 2.2, ease: 'expo.out' }, 2.4)
      tl.fromTo('.ga-metade-b', { rotation: 720, scale: 0.15, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 2.2, ease: 'expo.out' }, 2.4)
      ECOS.forEach((op, i) => {
        tl.fromTo(`.ga-eco-a${i}`, { rotation: -720, scale: 0.15, opacity: op }, { rotation: 0, scale: 1, opacity: 0, duration: 2.2 + 0.15 * (i + 1), ease: 'expo.out' }, 2.4 + 0.06 * (i + 1))
        tl.fromTo(`.ga-eco-b${i}`, { rotation: 720, scale: 0.15, opacity: op }, { rotation: 0, scale: 1, opacity: 0, duration: 2.2 + 0.15 * (i + 1), ease: 'expo.out' }, 2.4 + 0.06 * (i + 1))
      })
      tl.to('.ga-orbita', { opacity: 0, duration: 0.5 }, 3.8)
      tl.fromTo('.ga-anel', { attr: { r: 20 }, opacity: 0.9 }, { attr: { r: 520 }, opacity: 0, duration: 1.1, ease: 'power2.out' }, 4.15)
      tl.fromTo('.ga-simbolo', { scale: 1.06 }, { scale: 1, duration: 0.5, ease: 'back.out(4)' }, 4.15)

      // ── 5–9 s · o símbolo vai para a esquerda; cada giro de 180° troca as cores e a palavra
      tl.to('.ga-simbolo', { x: -470, scale: 0.78, duration: 0.9, ease: 'power3.inOut' }, 5)
      PALAVRAS.forEach((_, i) => {
        const t = 5.6 + i * 1.25
        const sel = `.ga-palavra-${i}`
        if (i > 0) tl.to('.ga-giro', { rotation: `+=180`, duration: 0.7, ease: 'back.inOut(1.6)' }, t - 0.35)
        tl.set(sel, { autoAlpha: 1 }, t)
        tl.from(`${sel} .ga-letra`, { yPercent: 120, skewY: 12, duration: 0.6, stagger: 0.035 }, t)
        if (i < PALAVRAS.length - 1) tl.to(`${sel} .ga-letra`, { yPercent: -120, duration: 0.35, ease: 'power3.in', stagger: 0.02 }, t + 0.85)
        if (i < PALAVRAS.length - 1) tl.set(sel, { autoAlpha: 0 }, t + 1.25)
      })
      tl.to('.ga-palavra-2 .ga-letra', { yPercent: -120, duration: 0.35, ease: 'power3.in', stagger: 0.02 }, 8.55)
      tl.set('.ga-palavra-2', { autoAlpha: 0 }, 8.95)

      // ── 9–11,8 s · mergulho no ponto: duas metades, um estúdio
      tl.to('.ga-simbolo', { x: 0, scale: 1, duration: 0.55, ease: 'power3.inOut' }, 8.7)
      tl.to('.ga-simbolo', { scale: 9, duration: 0.7, ease: 'power3.in' }, 9.25)
      tl.to('.ga-tela-roxa', { clipPath: 'circle(1200px at 960px 540px)', duration: 0.55, ease: 'power3.in' }, 9.55)
      tl.set('.ga-simbolo', { opacity: 0 }, 10.1)
      tl.set('.ga-duas', { autoAlpha: 1 }, 10)
      tl.from('.ga-duas .ga-linha-int', { yPercent: 110, duration: 0.7, stagger: 0.12 }, 10.05)
      tl.from('.ga-pessoa', { y: 30, opacity: 0, duration: 0.6, stagger: 0.12 }, 10.45)
      tl.to('.ga-duas', { autoAlpha: 0, duration: 0.3 }, 11.55)

      // ── 11,8–15 s · volta ao ponto e assina
      tl.set('.ga-simbolo', { opacity: 1, scale: 0.15, x: -420 }, 11.7)
      tl.to('.ga-tela-roxa', { clipPath: 'circle(0px at 960px 540px)', duration: 0.6, ease: 'power3.inOut' }, 11.7)
      tl.to('.ga-simbolo', { scale: 0.62, duration: 1, ease: 'expo.out' }, 12.05)
      tl.fromTo('.ga-anel', { attr: { r: 20 }, opacity: 0.8 }, { attr: { r: 400 }, opacity: 0, duration: 1, ease: 'power2.out' }, 12.1)
      tl.set('.ga-assinatura', { autoAlpha: 1 }, 12.2)
      tl.from('.ga-assinatura .ga-linha-int', { yPercent: 110, duration: 0.8, stagger: 0.1 }, 12.25)
      tl.from('.ga-assinatura .ga-rodape', { opacity: 0, y: 16, duration: 0.6 }, 12.9)
      tl.to('.ga-eixo', { scale: 1.4, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 13.4)
      tl.to({}, { duration: 1.4 }, 13.6)
      tl.to(['.ga-assinatura', '.ga-simbolo'], { opacity: 0, duration: 0.5, ease: 'power2.in' }, 15)

      if (semMovimento) {
        tl.progress(0.9).pause()
        return
      }
      ScrollTrigger.create({
        trigger: caixa.current, start: 'top 85%', end: 'bottom 10%',
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

  return (
    <figure className="ga">
      <div ref={caixa} className="ga-caixa" style={{ height: 1080 * escala }}>
        <div
          ref={palco}
          className="ga-palco"
          style={{ transform: `scale(${escala})` }}
          role="img"
          aria-label="Animação do símbolo POLICASTROSTUDIO: um ponto roxo acende, duas metades giram em volta dele e se encaixam formando o símbolo; a cada giro aparecem as palavras marca, interface e imagem; depois, duas metades, um estúdio: Isadora e Guilherme; e a assinatura POLICASTROSTUDIO."
        >
          <svg className="ga-camada" viewBox="0 0 1920 1080" aria-hidden="true">
            <circle className="ga-orbita" cx="960" cy="540" r="330" fill="none" stroke="#3A3A3D" strokeWidth="2" strokeDasharray="2100" />
            <circle className="ga-anel" cx="960" cy="540" r="0" fill="none" stroke="#7B61FF" strokeWidth="3" opacity="0" />
          </svg>

          <div className="ga-simbolo-area">
            <div className="ga-simbolo">
              <div className="ga-giro">
                {ECOS.map((_, i) => (
                  <span key={i}>
                    <Metade classe={`ga-eco-a${i}`} cor="#F2F2EE" />
                    <Metade classe={`ga-eco-b${i}`} cor="#7B61FF" girada />
                  </span>
                ))}
                <Metade classe="ga-metade-a" cor="#F2F2EE" />
                <Metade classe="ga-metade-b" cor="#7B61FF" girada />
              </div>
              <svg className="ga-camada-simbolo ga-eixo" viewBox="10 10 176 280" aria-hidden="true">
                <circle cx="98" cy="150" r="13" fill="#7B61FF" />
              </svg>
            </div>
          </div>

          {PALAVRAS.map((p, i) => (
            <p key={p.t} className={`ga-palavra ga-palavra-${i} ${p.cor}`}><Letras texto={p.t} /></p>
          ))}

          <div className="ga-tela-roxa" aria-hidden="true">
            <div className="ga-duas">
              <p className="ga-frase-grande">
                <span className="ga-linha"><span className="ga-linha-int">Duas metades,</span></span>
                <span className="ga-linha"><span className="ga-linha-int ga-branco">um estúdio.</span></span>
              </p>
              <div className="ga-pessoas">
                <span className="ga-pessoa"><b>Isadora</b> UX/UI · Produto · Digital</span>
                <span className="ga-pessoa"><b>Guilherme</b> Direção de arte · Branding · Gráfico</span>
              </div>
            </div>
          </div>

          <div className="ga-assinatura">
            <p className="ga-nome">
              <span className="ga-linha"><span className="ga-linha-int">Policastro</span></span>
              <span className="ga-linha"><span className="ga-linha-int ga-leve">Studio</span></span>
            </p>
            <p className="ga-rodape">Marca, interface &amp; imagem · Gravataí, RS</p>
          </div>
        </div>
      </div>
      <figcaption className="ga-controles mono">
        <button type="button" onClick={alternar} aria-pressed={!tocando}>{tocando ? '[ Pausar ]' : '[ Reproduzir ]'}</button>
        <span className="suave">O giro · 15 s</span>
      </figcaption>
    </figure>
  )
}
