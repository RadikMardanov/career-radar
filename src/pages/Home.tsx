import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Логотип / Заголовок */}
      <div className="text-center max-w-2xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          🎯 Карьерный радар
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-700 leading-relaxed">
          Персональный AI-ассистент по поиску работы. 
          Ежедневные отчёты с вакансиями, которые подходят именно вам.
        </p>
        
        {/* Ключевые преимущества */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
          <li className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200 shadow-sm">
            <span className="block text-2xl mb-2">🔍</span>
            <strong>Умный поиск:</strong> Анализируем hh.ru, SuperJob, Хабр Карьера и другие площадки.
          </li>
          <li className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200 shadow-sm">
            <span className="block text-2xl mb-2">💡</span>
            <strong>AI-рекомендации:</strong> Объясняем, почему вакансия подходит вам, и помогаем составить отклик.
          </li>
          <li className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200 shadow-sm">
            <span className="block text-2xl mb-2">📬</span>
            <strong>Email-дайджест:</strong> Получайте лучшие предложения каждое утро в удобном формате.
          </li>
        </ul>

        {/* Призыв к действию */}
        <div className="mt-10 space-x-4">
          <Link
            to="/login"
            className="inline-block bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition transform hover:-translate-y-0.5"
          >
            Начать бесплатно
          </Link>
          
          <a
            href="#features"
            className="inline-block text-slate-600 hover:text-primary font-medium py-3 px-4 transition"
          >
            Узнать больше ↓
          </a>
        </div>
      </div>
      
      {/* Футер */}
      <footer className="absolute bottom-6 text-slate-500 text-sm">
        © 2026 Career Radar MVP • Сделано с ❤️ для соискателей РФ
      </footer>
    </main>
  )
}
