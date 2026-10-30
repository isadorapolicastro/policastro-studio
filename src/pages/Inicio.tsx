import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/home.css'

gsap.registerPlugin(ScrollTrigger)

const pessoas = [
  {
    nome: ['Isadora', 'Policastro de Assis'],
    areas: 'UX/UI / Design de produto / Experiências digitais',
    foto: '[Retrato · Isadora · flash direto]',
    variante: 'marcador marcador--violeta',
  },
  {
    nome: ['Guilherme', 'Policastro de Assis'],
    areas: 'Direção de arte / Branding / Design gráfico',
    foto: '[Retrato · Guilherme · flash direto]',
    variante: 'marcador',
  },
]

const projetos = [
  { nome: '[Projeto real 01]', meta: 'Branding · Website · [Ano]', estilo: 'nome nome--pesado' },
  { nome: '[Projeto real 02]', meta: 'Identidade visual · [Ano]', estilo: 'nome nome--leve' },
  { nome: '[Projeto real 03]', meta: 'Landing page · Campanha · [Ano]', estilo: 'nome nome--pesado' },
]

const servicos = [
  'Branding e identidade visual',
  'Design gráfico e comunicação',
  'Websites, landing pages e experiências digitais',
  'Fotografia e produção audiovisual',
  'Marketing digital, Google Ads e Meta Ads',
]

export default function Inicio() {
  const raiz = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.linha-titulo > span', { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.08 })
      gsap.from('.entra', { opacity: 0, y: 16, duration: 0.8, delay: 0.5, stagger: 0.1 })
      gsap.utils.toArray<HTMLElement>('.revela').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, raiz)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={raiz}>
      <section className="home-hero" aria-labelledby="titulo-inicio">
        <div className="marcador hero-canvas entra">
          <span>[ Canvas WebGL · campo de ruído que reage ao cursor · imagem estática no fallback ]</span>
          <span aria-hidden="true">Role ↓</span>
        </div>
        <h1 id="titulo-inicio" className="titulo-hero">
          <span className="linha-titulo"><span>Marca, <span className="leve">interface</span></span></span>
          <span className="linha-titulo"><span>&amp; <span className="acento">imagem</span>.</span></span>
        </h1>
        <div className="hero-rodape entra">
          <p>Estúdio criativo independente de Gravataí para o Brasil. Estratégia, identidade visual, design e experiências digitais.</p>
          <Link to="/contato" className="botao">[ Iniciar projeto ]</Link>
        </div>
      </section>

      <section className="secao dupla" aria-labelledby="quem-faz">
        <h2 id="quem-faz" className="rotulo-secao">// Quem faz</h2>
        <div className="dupla-grade">
          {pessoas.map((p) => (
            <article key={p.nome[0]} className="pessoa revela">
              <div className={p.variante}>{p.foto}</div>
              <h3>{p.nome[0]}<br />{p.nome[1]}</h3>
              <p className="mono suave">{p.areas}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="secao indice" aria-labelledby="indice-projetos">
        <h2 id="indice-projetos" className="rotulo-secao">// Índice de projetos</h2>
        {projetos.map((p) => (
          <Link key={p.nome} to="/projetos" className="indice-item revela">
            <span className={p.estilo}>{p.nome}</span>
            <span className="mono suave">{p.meta}</span>
          </Link>
        ))}
      </section>

      <section className="secao servicos" aria-labelledby="servicos-titulo">
        <h2 id="servicos-titulo" className="rotulo-secao">// Serviços</h2>
        <div className="servicos-grade">
          {servicos.map((s, i) => (
            <Link key={s} to="/servicos" className="servico revela" style={{ textDecoration: 'none' }}>
              <span className="codigo">S—0{i + 1}</span>
              <span className="nome">{s}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="manifesto" aria-label="Sobre o estúdio">
        <p className="revela">Dois especialistas, um sistema. Da marca ao pixel, <strong>sem perder o fio</strong>.</p>
      </section>

      <section className="secao contato" aria-labelledby="fale">
        <h2 id="fale" className="revela">Fale<span>.</span></h2>
        <div className="contato-botoes">
          <a href="#/contato" className="cheio">WhatsApp → [a confirmar]</a>
          <a href="#/contato" className="vazado">E-mail → [a confirmar]</a>
        </div>
      </section>
    </div>
  )
}
