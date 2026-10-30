import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const links = [
  { to: '/projetos', rotulo: '[01] Projetos' },
  { to: '/servicos', rotulo: '[02] Serviços' },
  { to: '/estudio', rotulo: '[03] Estúdio' },
  { to: '/contato', rotulo: '[04] Contato' },
]

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <div className="container">
        <header className="topo mono">
          <Link to="/" className="marca" aria-label="POLICASTROSTUDIO, página inicial">
            Policastro<span>Studio</span>
          </Link>
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
          <span>POLICASTROSTUDIO — Estúdio de design em Gravataí, RS</span>
          <span>Versão em construção</span>
        </footer>
      </div>
    </>
  )
}
