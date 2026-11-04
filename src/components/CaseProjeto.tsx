import { lazy, Suspense } from 'react'
import type { ItemGaleria, Projeto, Secao } from '../data/projetos'

const KashiMotion = lazy(() => import('./KashiMotion'))
const OlynMotion = lazy(() => import('./OlynMotion'))

function Item({ item }: { item: ItemGaleria }) {
  if (item.tipo === 'imagem') {
    return (
      <figure className="fig" style={{ flex: item.flex }}>
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          style={{ height: item.altura, objectPosition: item.posicao ?? '50% 50%' }}
        />
        <figcaption className="mono suave">{item.legenda}</figcaption>
      </figure>
    )
  }
  if (item.tipo === 'paleta') {
    return (
      <figure className="fig" style={{ flex: item.flex }}>
        <div className="paleta" role="img" aria-label={`Paleta: ${item.legenda}`}>
          {item.cores.map((c) => (
            <span key={c.hex} style={{ background: c.hex }} title={`${c.nome} ${c.hex}`} />
          ))}
        </div>
        <figcaption className="mono suave">{item.legenda}</figcaption>
      </figure>
    )
  }
  return (
    <figure className="fig" style={{ flex: item.flex }}>
      <svg className="padrao" aria-hidden="true">
        <defs>
          <pattern id="rio-kashi" width="120" height="44" patternUnits="userSpaceOnUse">
            <path d="M0 22 C20 10 40 34 60 22 S100 10 120 22" fill="none" stroke="#B45F37" strokeWidth="2.5" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rio-kashi)" />
      </svg>
      <figcaption className="mono suave">{item.legenda}</figcaption>
    </figure>
  )
}

function Bloco({ secao }: { secao: Secao }) {
  switch (secao.tipo) {
    case 'texto':
      return (
        <section className="case-secao case-secao--estreita">
          <p className="rotulo-secao">// {secao.rotulo}</p>
          <h3 className="case-titulo">
            {secao.titulo} {secao.destaque && <span className="acento">{secao.destaque}</span>}
          </h3>
          <p className="case-texto">{secao.texto}</p>
        </section>
      )
    case 'citacao':
      return (
        <section className="case-secao">
          <p className="rotulo-secao">// {secao.rotulo}</p>
          <blockquote className="case-citacao">
            {secao.texto} <span className="acento">{secao.destaque}</span>
          </blockquote>
          <ul className="etiquetas mono">
            {secao.atributos.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </section>
      )
    case 'etapas':
      return (
        <section className="case-secao">
          <p className="rotulo-secao">// {secao.rotulo}</p>
          <h3 className="case-titulo">{secao.titulo}</h3>
          <ol className="etapas">
            {secao.etapas.map((e, i) => (
              <li key={e.titulo} className={i === secao.etapas.length - 1 ? 'ultima' : undefined}>
                <span className="codigo">E—0{i + 1}</span>
                <span>
                  <strong>{e.titulo}</strong>
                  <span className="etapa-texto">{e.texto}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      )
    case 'galeria':
      return (
        <section className="case-secao">
          <p className="rotulo-secao">// {secao.rotulo}</p>
          <h3 className="case-titulo">
            {secao.titulo} <span className="acento">{secao.destaque}</span>
          </h3>
          {secao.grupos.map((g) => (
            <div key={g.titulo} className="grupo">
              <p className="grupo-titulo mono">{g.titulo}</p>
              {g.linhas.map((linha, i) => (
                <div key={i} className="linha-galeria">
                  {linha.map((item, j) => <Item key={j} item={item} />)}
                </div>
              ))}
            </div>
          ))}
        </section>
      )
    case 'apresentacao':
      return (
        <section className="case-secao">
          <p className="rotulo-secao">// {secao.rotulo}</p>
          <h3 className="case-titulo">
            {secao.titulo} <span className="acento">{secao.destaque}</span>
          </h3>
          <p className="case-texto" style={{ maxWidth: 820 }}>{secao.texto}</p>
          <Suspense fallback={<div style={{ aspectRatio: '16 / 9', background: '#0B0B0C' }} />}>
            {secao.animacao === 'olyn' ? <OlynMotion /> : <KashiMotion />}
          </Suspense>
        </section>
      )
    case 'entregas':
      return (
        <section className="case-secao">
          <p className="rotulo-secao">// {secao.rotulo}</p>
          <h3 className="case-titulo">{secao.titulo}</h3>
          <ul className="etiquetas mono">
            {secao.itens.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </section>
      )
  }
}

export default function CaseProjeto({ projeto }: { projeto: Projeto }) {
  const { capa } = projeto
  return (
    <div className="case">
      {projeto.meta && <p className="mono suave case-meta">{projeto.meta}</p>}
      {projeto.resumo && <p className="case-resumo">{projeto.resumo}</p>}
      {projeto.ficha && (
        <dl className="ficha mono">
          {projeto.ficha.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {capa && (
        <div className="case-capa">
          <img className="capa-manual" src={capa.imagem} alt={capa.alt} width={1176} height={1200} />
          <img className="capa-foto" src={capa.foto.src} alt={capa.foto.alt} loading="lazy" decoding="async" />
        </div>
      )}
      {projeto.secoes?.map((s, i) => <Bloco key={i} secao={s} />)}
    </div>
  )
}
