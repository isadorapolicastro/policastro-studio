import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function Inicio() {
  const raiz = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.linha-titulo > span', {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
      })
      gsap.from('.entra', { opacity: 0, y: 16, duration: 0.8, delay: 0.5, stagger: 0.1 })
    }, raiz)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={raiz} style={{ padding: '56px 0 96px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <p className="mono suave entra" style={{ margin: 0 }}>Estúdio criativo independente · Gravataí, RS · Brasil</p>
      <h1 className="titulo-hero">
        <span className="linha-titulo"><span>Marca,</span></span>
        <span className="linha-titulo"><span className="leve">interface</span></span>
        <span className="linha-titulo"><span>&amp; <span className="acento">imagem</span>.</span></span>
      </h1>
      <div className="entra" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
        <p style={{ margin: 0, maxWidth: 560, fontSize: 20, lineHeight: 1.45 }}>
          Isadora e Guilherme Policastro de Assis. Estratégia, identidade visual, design e experiências digitais — de Gravataí para o Brasil.
        </p>
        <Link to="/contato" className="botao">[ Iniciar projeto ]</Link>
      </div>
    </section>
  )
}
