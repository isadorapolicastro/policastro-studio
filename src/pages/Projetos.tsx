import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { IndiceExpansivel } from '../components/IndiceProjetos'
import { projetos } from '../data/projetos'
import '../styles/projetos.css'

export default function Projetos() {
  const { slug } = useParams()
  const { state } = useLocation() as { state: { foco?: string } | null }
  const inicial = projetos.find((p) => p.slug === slug && p.disponivel)?.slug

  useEffect(() => {
    const p = projetos.find((x) => x.slug === inicial)
    document.title = p ? `${p.nome[0]} — Projetos — POLICASTROSTUDIO` : 'Projetos — POLICASTROSTUDIO'
  }, [inicial])

  return (
    <section className="pagina-projetos" aria-labelledby="titulo-projetos">
      <p className="mono suave">Índice · {String(projetos.length).padStart(2, '0')} projetos</p>
      <h1 id="titulo-projetos" className="titulo-hero titulo-pagina">
        Projetos<span className="acento">.</span>
      </h1>
      <p className="pagina-intro">Clique em um projeto para abrir o case completo.</p>
      <IndiceExpansivel inicial={inicial} foco={state?.foco} />
    </section>
  )
}
