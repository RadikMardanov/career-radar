export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">🎯 Карьерный радар</h1>
      <p className="text-xl mb-8">
        Ежедневный отчёт по вакансиям, которые подходят именно вам
      </p>
      <a
        href="/onboarding"
        className="bg-primary text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        Настроить поиск бесплатно
      </a>
    </main>
  )
}
