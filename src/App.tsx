import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

export default function App() {
  return (
    <Router>
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
