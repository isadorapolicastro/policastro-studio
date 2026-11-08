import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/home.css'
import '../styles/projetos.css'
import { IndiceHome } from '../components/IndiceProjetos'

gsap.registerPlugin(ScrollTrigger)

const AnimacaoIG = lazy(() => import('../components/AnimacaoIG'))

const pessoas = [
  {
    nome: ['Isadora', 'Policastro de Assis'],
    areas: 'UX/UI / Design de produto / Experiências digitais',
    foto: 'equipe/isadora.webp',
    alt: 'Retrato de Isadora Policastro de Assis sobre fundo azul-petróleo',
    posicao: '50% 28%',
  },
  {
    nome: ['Guilherme', 'Policastro de Assis'],
    areas: 'Direção de arte / Branding / Design gráfico',
    foto: 'equipe/guilherme.webp',
    alt: 'Retrato de Guilherme Policastro de Assis sobre fundo azul-petróleo',
    posicao: '50% 18%',
  },
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
  const { pathname } = useLocation()

  // O menu leva a seções desta página: Serviços, Estúdio (Quem faz) e Contato.
  useEffect(() => {
    const alvo = ({ '/servicos': 'servicos-titulo', '/estudio': 'quem-faz', '/contato': 'fale' } as Record<string, string>)[pathname]
    if (!alvo) return
    const id = window.setTimeout(() => {
      document.getElementById(alvo)?.closest('section')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    }, 60)
    return () => window.clearTimeout(id)
  }, [pathname])

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
        <div className="entra">
          <Suspense fallback={<div style={{ aspectRatio: '16 / 9', background: '#0B0B0C' }} />}>
            <AnimacaoIG />
          </Suspense>
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
              <img className="pessoa-foto" src={`${import.meta.env.BASE_URL}${p.foto}`} alt={p.alt} width={900} height={1200} loading="lazy" decoding="async" style={{ objectPosition: p.posicao }} />
              <h3>{p.nome[0]}<br />{p.nome[1]}</h3>
              <p className="mono suave">{p.areas}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="secao" aria-labelledby="indice-projetos">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <h2 id="indice-projetos" className="rotulo-secao">// Índice de projetos</h2>
          <Link to="/projetos" className="mono" style={{ padding: '12px 0' }}>Ver todos →</Link>
        </div>
        <IndiceHome />
      </section>

      <section className="secao servicos" aria-labelledby="servicos-titulo">
        <h2 id="servicos-titulo" className="rotulo-secao">// Serviços</h2>
        <div className="servicos-grade">
          {servicos.map((s, i) => (
            <Link key={s} to="/contato" className="servico revela" style={{ textDecoration: 'none' }}>
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
          <a href="mailto:isapolicastro.designer@gmail.com" className="cheio">Enviar e-mail →</a>
        </div>
      </section>
    </div>
  )
}
