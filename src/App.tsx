import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Pagina from './pages/Pagina'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="projetos" element={<Pagina titulo="Projetos" />} />
        <Route path="projetos/:slug" element={<Pagina titulo="Projeto" />} />
        <Route path="servicos" element={<Pagina titulo="Serviços" />} />
        <Route path="estudio" element={<Pagina titulo="Estúdio" />} />
        <Route path="contato" element={<Pagina titulo="Contato" />} />
        <Route path="*" element={<Pagina titulo="Página não encontrada" />} />
      </Route>
    </Routes>
  )
}
