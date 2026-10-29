import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

export default function App() {
  return (
    // basename = значение base из vite.config.ts (подставляется Vite'ом при сборке).
    // Без него роутер ищет маршрут по полному пути /career-radar/ и не находит "/" → белый экран.
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Главная страница лендинга */}
        <Route path="/" element={<Home />} />

        {/* Заглушка для будущих страниц — раскомментируем позже */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  )
}
