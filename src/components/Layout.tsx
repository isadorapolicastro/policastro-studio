import { useEffect, useRef, useState } from 'react'

function horaGravatai() {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date())
}

function Relogio() {
  const [hora, setHora] = useState(horaGravatai)
  useEffect(() => {
    const id = window.setInterval(() => setHora(horaGravatai()), 15000)
    return () => window.clearInterval(id)
  }, [])
  return <span className="relogio">Gravataí {hora} · GMT−3</span>
}
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Simbolo from './Simbolo'

const links = [
  { to: '/projetos', rotulo: '[01] Projetos' },
  { to: '/servicos', rotulo: '[02] Serviços' },
  { to: '/estudio', rotulo: '[03] Estúdio' },
  { to: '/contato', rotulo: '[04] Contato' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const anterior = useRef(pathname)
  useEffect(() => {
    const dentroDeProjetos = anterior.current.startsWith('/projetos') && pathname.startsWith('/projetos')
    anterior.current = pathname
    if (!dentroDeProjetos) window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <div className="container">
        <header className="topo mono">
          <Link to="/" className="marca" aria-label="POLICASTROSTUDIO, página inicial">
            <Simbolo altura={30} />
            <span className="marca-nome">Policastro<span>Studio</span></span>
          </Link>
          <Relogio />
          <nav aria-label="Principal" className="menu">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to}>{l.rotulo}</NavLink>
            ))}
          </nav>
        </header>
        <main id="conteudo">
          <Outlet />
        </main>
        <footer className="rodape mono suave">
          <span className="rodape-marca"><Simbolo altura={20} /> POLICASTROSTUDIO — Estúdio de design em Gravataí, RS</span>
          <span>Instagram [a confirmar]</span>
        </footer>
      </div>
    </>
  )
}
