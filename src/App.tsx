import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Pagina from './pages/Pagina'
import Projetos from './pages/Projetos'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="projetos" element={<Projetos />} />
        <Route path="projetos/:slug" element={<Projetos />} />
        <Route path="servicos" element={<Pagina titulo="Serviços" />} />
        <Route path="estudio" element={<Pagina titulo="Estúdio" />} />
        <Route path="contato" element={<Pagina titulo="Contato" />} />
        <Route path="*" element={<Pagina titulo="Página não encontrada" />} />
      </Route>
    </Routes>
  )
}
