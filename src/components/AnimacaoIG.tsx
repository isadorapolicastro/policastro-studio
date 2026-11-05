import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { G_TRACO } from './Simbolo'
import '../styles/animacao-ig.css'

gsap.registerPlugin(ScrollTrigger)

const PALAVRAS = ['Marca', 'Interface', 'Imagem']

/**
 * Abertura da home a partir do símbolo IG1. Roteiro (15 s, em ciclo):
 * o I sobe e pisca como um cursor → o G se desenha em volta dele → o cursor digita marca, interface
 * e imagem → as iniciais se abrem nos nomes Isadora e Guilherme → assinatura POLICASTROSTUDIO.
 */
export default function AnimacaoIG() {
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
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.6, defaults: { ease: 'power4.out' } })
      linhaDoTempo.current = tl
      const traco = raiz.querySelector<SVGPathElement>('.ig-g')!
      const L = traco.getTotalLength()
      gsap.set(traco, { strokeDasharray: `${L} ${L + 4}`, strokeDashoffset: L + 2, opacity: 0 })
      gsap.set(['.ig-digitar', '.ig-nomes', '.ig-assinatura'], { autoAlpha: 0 })
      gsap.set('.ig-letra', { display: 'none' })

      // ── 0–2,2 s · o I sobe e pisca como um cursor
      tl.fromTo('.ig-i', { attr: { y: 182, height: 0 } }, { attr: { y: 18, height: 164 }, duration: 0.9, ease: 'expo.out' }, 0.2)
      tl.to('.ig-i', { opacity: 0, duration: 0.01, repeat: 3, yoyo: true, repeatDelay: 0.28 }, 1.2)

      // ── 2,2–4,6 s · o G se desenha em volta do I
      tl.set(traco, { opacity: 1 }, 2.2)
      tl.to(traco, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, 2.2)
      tl.fromTo('.ig-anel', { attr: { r: 30 }, opacity: 0.9 }, { attr: { r: 560 }, opacity: 0, duration: 1.1, ease: 'power2.out', immediateRender: false }, 3.6)
      tl.fromTo('.ig-simbolo', { scale: 1.05 }, { scale: 1, duration: 0.5, ease: 'back.out(4)' }, 3.65)

      // ── 4,6–8,9 s · o símbolo vai para a esquerda e o cursor digita
      tl.to('.ig-simbolo', { x: -560, scale: 0.62, duration: 0.9, ease: 'power3.inOut' }, 4.4)
      tl.set('.ig-digitar', { autoAlpha: 1 }, 5.1)
      tl.to('.ig-cursor', { opacity: 0, duration: 0.01, repeat: 9, yoyo: true, repeatDelay: 0.32 }, 5.1)
      let t = 5.3
      PALAVRAS.forEach((p, i) => {
        const letras = gsap.utils.toArray<HTMLElement>(`.ig-palavra-${i} .ig-letra`)
        letras.forEach((l, k) => tl.set(l, { display: 'inline-block' }, t + k * 0.075))
        t += letras.length * 0.075 + 0.55
        if (i < PALAVRAS.length - 1) {
          letras.slice().reverse().forEach((l, k) => tl.set(l, { display: 'none' }, t + k * 0.035))
          t += letras.length * 0.035 + 0.12
        }
      })
      tl.to('.ig-digitar', { autoAlpha: 0, duration: 0.3 }, 8.6)

      // ── 8,9–11,8 s · as iniciais se abrem nos nomes
      tl.to('.ig-simbolo', { opacity: 0, scale: 0.4, duration: 0.4, ease: 'power3.in' }, 8.6)
      tl.set('.ig-nomes', { autoAlpha: 1 }, 8.95)
      tl.from('.ig-nomes .ig-inicial', { scaleY: 0, duration: 0.5, ease: 'expo.out', transformOrigin: '50% 100%', stagger: 0.15 }, 9)
      tl.from('.ig-nomes .ig-resto', { xPercent: -105, duration: 0.8, ease: 'expo.out', stagger: 0.15 }, 9.35)
      tl.from('.ig-nomes .ig-area', { opacity: 0, y: 14, duration: 0.5, stagger: 0.15 }, 9.8)
      tl.from('.ig-nomes .ig-titulo-nomes', { opacity: 0, y: -14, duration: 0.5 }, 10)
      tl.to('.ig-nomes .ig-resto', { xPercent: -105, duration: 0.5, ease: 'power3.in', stagger: 0.08 }, 11.2)
      tl.to('.ig-nomes', { autoAlpha: 0, duration: 0.3 }, 11.6)

      // ── 11,8–15 s · assinatura
      tl.set('.ig-simbolo', { x: -500, scale: 0.15 }, 11.7)
      tl.to('.ig-simbolo', { opacity: 1, scale: 0.6, duration: 0.9, ease: 'expo.out' }, 11.8)
      tl.fromTo('.ig-anel', { attr: { r: 30 }, opacity: 0.8 }, { attr: { r: 420 }, opacity: 0, duration: 1, ease: 'power2.out', immediateRender: false }, 11.9)
      tl.set('.ig-assinatura', { autoAlpha: 1 }, 12.1)
      tl.from('.ig-assinatura .ig-linha-int', { yPercent: 110, duration: 0.8, stagger: 0.1 }, 12.15)
      tl.from('.ig-assinatura .ig-rodape', { opacity: 0, y: 16, duration: 0.6 }, 12.8)
      tl.to({}, { duration: 1.6 }, 13.4)
      tl.to(['.ig-assinatura', '.ig-simbolo'], { opacity: 0, duration: 0.5, ease: 'power2.in' }, 15)

      if (semMovimento) {
        tl.progress(0.9).pause()
        return
      }
      ScrollTrigger.create({
        trigger: caixa.current, start: 'top 85%', end: 'bottom 10%',
        onEnter: () => tl.play(), onEnterBack: () => tl.play(), onLeave: () => tl.pause(), onLeaveBack: () => tl.pause(),
      })
    }, raiz)
    return () => ctx.revert()
  }, [semMovimento])

  function alternar() {
    const tl = linhaDoTempo.current
    if (!tl) return
    if (tl.paused()) { tl.play(); setTocando(true) } else { tl.pause(); setTocando(false) }
  }

  return (
    <figure className="ig">
      <div ref={caixa} className="ig-caixa" style={{ height: 1080 * escala }}>
        <div
          ref={palco}
          className="ig-palco"
          style={{ transform: `scale(${escala})` }}
          role="img"
          aria-label="Animação do símbolo POLICASTROSTUDIO: um I roxo sobe e pisca como um cursor, um G branco se desenha em volta dele, o cursor digita marca, interface e imagem, as iniciais se abrem nos nomes Isadora e Guilherme e aparece a assinatura POLICASTROSTUDIO."
        >
          <svg className="ig-camada" viewBox="0 0 1920 1080" aria-hidden="true">
            <circle className="ig-anel" cx="960" cy="540" r="0" fill="none" stroke="#7B61FF" strokeWidth="3" opacity="0" />
          </svg>

          <div className="ig-simbolo-area">
            <svg className="ig-simbolo" viewBox="23 8 174 184" aria-hidden="true">
              <path className="ig-g" d={G_TRACO} fill="none" stroke="#F2F2EE" strokeWidth="26" />
              <rect className="ig-i" x="33" y="18" width="26" height="164" fill="#7B61FF" />
            </svg>
          </div>

          <div className="ig-digitar">
            {PALAVRAS.map((p, i) => (
              <span key={p} className={`ig-palavra ig-palavra-${i}`}>
                {p.split('').map((l, k) => <span key={k} className="ig-letra">{l}</span>)}
              </span>
            ))}
            <span className="ig-cursor" />
          </div>

          <div className="ig-nomes">
            <p className="ig-titulo-nomes">Duas iniciais, um estúdio.</p>
            <div className="ig-pessoa">
              <p className="ig-nome-linha"><span className="ig-inicial ig-inicial-i" /><span className="ig-mascara"><span className="ig-resto">sadora</span></span></p>
              <span className="ig-area">UX/UI · Produto · Experiências digitais</span>
            </div>
            <div className="ig-pessoa">
              <p className="ig-nome-linha">
                <svg className="ig-inicial ig-inicial-g" viewBox="33 23 154 154" aria-hidden="true"><path d={G_TRACO} fill="none" stroke="#F2F2EE" strokeWidth="26" /></svg>
                <span className="ig-mascara"><span className="ig-resto">uilherme</span></span>
              </p>
              <span className="ig-area">Direção de arte · Branding · Design gráfico</span>
            </div>
          </div>

          <div className="ig-assinatura">
            <p className="ig-nome">
              <span className="ig-linha"><span className="ig-linha-int">Policastro</span></span>
              <span className="ig-linha"><span className="ig-linha-int ig-leve">Studio</span></span>
            </p>
            <p className="ig-rodape">Marca, interface &amp; imagem · Gravataí, RS</p>
          </div>
        </div>
      </div>
      <figcaption className="ig-controles mono">
        <button type="button" onClick={alternar} aria-pressed={!tocando}>{tocando ? '[ Pausar ]' : '[ Reproduzir ]'}</button>
        <span className="suave">I + G · 15 s</span>
      </figcaption>
    </figure>
  )
}
