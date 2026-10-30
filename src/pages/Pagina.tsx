import { useEffect } from 'react'

export default function Pagina({ titulo }: { titulo: string }) {
  useEffect(() => {
    document.title = `${titulo} — POLICASTROSTUDIO`
    return () => {
      document.title = 'POLICASTROSTUDIO — Estúdio de design em Gravataí, RS'
    }
  }, [titulo])

  return (
    <section style={{ padding: '72px 0 120px' }}>
      <h1 className="titulo-hero" style={{ fontSize: 'clamp(40px, 7vw, 104px)' }}>{titulo}</h1>
      <p className="mono suave" style={{ marginTop: 24 }}>Página em construção.</p>
    </section>
  )
}
