import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { projetos, type Projeto } from '../data/projetos'
import CaseProjeto from './CaseProjeto'

const reduzMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Nome({ p }: { p: Projeto }) {
  return (
    <span className="indice-nome">
      {p.nome[0]} {p.nome[1] && <span className="leve">{p.nome[1]}</span>}
    </span>
  )
}

function Miniatura({ p }: { p: Projeto }) {
  if (!p.capa) return null
  return <img className="indice-mini" src={p.capa.foto.src} alt="" aria-hidden="true" loading="lazy" />
}

/** Home: linhas reduzidas que levam para a página Projetos. */
export function IndiceHome() {
  return (
    <div className="indice-lista">
      {projetos.map((p) =>
        p.disponivel ? (
          <Link key={p.slug} to="/projetos" state={{ foco: p.slug }} className="indice-linha revela">
            <span className="indice-num mono">P—{p.numero}</span>
            <Nome p={p} />
            <Miniatura p={p} />
            <span className="indice-meta mono suave">{p.linhaIndice}</span>
          </Link>
        ) : (
          <div key={p.slug} className="indice-linha indice-linha--off revela">
            <span className="indice-num mono">P—{p.numero}</span>
            <Nome p={p} />
            <span className="indice-meta mono suave">{p.linhaIndice} · em breve</span>
          </div>
        ),
      )}
    </div>
  )
}

/** Página Projetos: linhas reduzidas que se expandem ao clicar. */
export function IndiceExpansivel({ inicial, foco }: { inicial?: string; foco?: string }) {
  const [aberto, setAberto] = useState<string | undefined>(inicial)
  const paineis = useRef<Record<string, HTMLDivElement | null>>({})
  const linhas = useRef<Record<string, HTMLElement | null>>({})
  const anterior = useRef<string | undefined>(inicial)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const alvo = foco ?? inicial
    if (alvo) linhas.current[alvo]?.scrollIntoView({ block: 'start' })
  }, [foco, inicial])

  useLayoutEffect(() => {
    const antes = anterior.current
    anterior.current = aberto
    if (antes === aberto) return
    const abrir = aberto ? paineis.current[aberto] : null
    if (reduzMovimento()) return
    if (abrir) {
      gsap.fromTo(abrir, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'height' })
      gsap.from(abrir.querySelectorAll('.case > *'), { y: 24, opacity: 0, duration: 0.6, stagger: 0.05, delay: 0.15 })
    }
  }, [aberto])

  function alternar(p: Projeto) {
    const novo = aberto === p.slug ? undefined : p.slug
    setAberto(novo)
    navigate(novo ? `/projetos/${novo}` : '/projetos', { replace: true, state: null })
    if (novo) requestAnimationFrame(() => linhas.current[novo]?.scrollIntoView({ behavior: reduzMovimento() ? 'auto' : 'smooth', block: 'start' }))
  }

  return (
    <div className="indice-lista">
      {projetos.map((p) => {
        const estaAberto = aberto === p.slug
        if (!p.disponivel) {
          return (
            <div key={p.slug} className="indice-linha indice-linha--off">
              <span className="indice-num mono">P—{p.numero}</span>
              <Nome p={p} />
              <span className="indice-meta mono suave">{p.linhaIndice} · em breve</span>
            </div>
          )
        }
        return (
          <article key={p.slug} ref={(el) => { linhas.current[p.slug] = el }} className={`projeto${estaAberto ? ' projeto--aberto' : ''}${foco === p.slug && !estaAberto ? ' projeto--foco' : ''}`}>
            <h2 className="projeto-cabeca">
              <button
                type="button"
                className="indice-linha"
                aria-expanded={estaAberto}
                aria-controls={`painel-${p.slug}`}
                onClick={() => alternar(p)}
              >
                <span className="indice-num mono">P—{p.numero}</span>
                <Nome p={p} />
                {!estaAberto && <Miniatura p={p} />}
                <span className="indice-meta mono suave">
                  {p.linhaIndice}
                  <span className="indice-sinal" aria-hidden="true">{estaAberto ? '−' : '+'}</span>
                </span>
              </button>
            </h2>
            <div
              id={`painel-${p.slug}`}
              ref={(el) => { paineis.current[p.slug] = el }}
              className="projeto-painel"
              hidden={!estaAberto}
            >
              {estaAberto && (
                <>
                  <CaseProjeto projeto={p} />
                  <button type="button" className="botao-fechar mono" onClick={() => alternar(p)}>
                    [ Recolher projeto ]
                  </button>
                </>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}
