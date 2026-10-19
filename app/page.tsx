export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Хватит тратить часы на поиск вакансий
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
          Карьерный радар находит <span className="text-primary font-semibold">только подходящие вакансии</span> и объясняет, почему они вам подходят. Ежедневный отчёт на почту.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="/onboarding"
            className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            🎯 Получить первый отчёт бесплатно
          </a>
          <a
            href="#how-it-works"
            className="bg-white text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-slate-200 hover:border-primary hover:text-primary transition"
          >
            Как это работает?
          </a>
        </div>
        <p className="text-sm text-slate-500">
          ✓ 3 дня бесплатно &nbsp;|&nbsp; ✓ Без карты &nbsp;|&nbsp; ✓ Отписка в один клик
        </p>
      </section>

      {/* Problem Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Знакомая ситуация?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">😤</div>
              <h3 className="text-xl font-semibold mb-2">Часы на поиск</h3>
              <p className="text-slate-300">
                Листаете hh.ru, SuperJob, Хабр — но подходящих вакансий почти нет
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤔</div>
              <h3 className="text-xl font-semibold mb-2">Непонятно, подходит ли</h3>
              <p className="text-slate-300">
                Зарплата "до вычета", удалёнка оказывается гибридом, требования не совпадают
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">😩</div>
              <h3 className="text-xl font-semibold mb-2">Отклики в пустоту</h3>
              <p className="text-slate-300">
                Тратите время на сопроводительные письма, но никто не отвечает
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Карьерный радар решает это за вас
        </h2>
        <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
          Настраиваете профиль один раз — каждое утро получаете персональный отчёт
        </p>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">Укажите параметры</h3>
            <p className="text-slate-600 text-sm">
              Должность, зарплата, удалёнка, ключевые навыки, стоп-слова
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">AI ищет вакансии</h3>
            <p className="text-slate-600 text-sm">
              Агрегируем с 5 площадок: hh.ru, SuperJob, Хабр, Rabota, trudvsem
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">Получаете отчёт</h3>
            <p className="text-slate-600 text-sm">
              Каждое утро — подборка с объяснением, почему вакансия подходит
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="text-lg font-semibold mb-2">AI пишет отклик</h3>
            <p className="text-slate-600 text-sm">
              Готовое сопроводительное письмо под каждую вакансию
            </p>
          </div>
        </div>
      </section>

      {/* Example Report */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Пример вашего ежедневного отчёта
          </h2>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                🎯 Карьерный радар
              </h3>
              <span className="text-sm text-slate-500">Сегодня, 08:00</span>
            </div>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-slate-700">
                <strong>Доброе утро, Радик!</strong><br />
                За ночь найдено <strong>18 новых вакансий</strong>. Отсеяно по вашим фильтрам: 12. Показываем топ-6.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      Менеджер проектов B2B
                    </h4>
                    <p className="text-slate-600 text-sm">ООО «Технологии роста» • Казань</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Совпадение: 92%
                  </span>
                </div>
                <p className="text-slate-700 mb-2">
                  💰 150 000 – 200 000 ₽ на руки &nbsp;|&nbsp;  Удалённо
                </p>
                <div className="bg-slate-50 p-3 rounded mb-3">
                  <p className="text-sm text-slate-600 mb-1 font-semibold">💡 Почему подходит:</p>
                  <ul className="text-sm text-slate-600 list-disc list-inside">
                    <li>B2B-клиенты и полный цикл управления проектом</li>
                    <li>Работа с подрядчиками и бюджетом — совпадает с вашим опытом</li>
                    <li>Упоминание автоматизации и CRM близко к вашему профилю</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <a href="#" className="text-primary text-sm hover:underline">🔗 Открыть вакансию</a>
                  <span className="text-slate-400 text-sm">•</span>
                  <span className="text-slate-500 text-sm">Источник: hh.ru</span>
                </div>
              </div>

              <div className="border-l-4 border-slate-300 pl-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      Руководитель проектов B2G
                    </h4>
                    <p className="text-slate-600 text-sm">ГК «Цифровой регион» • Россия</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Совпадение: 87%
                  </span>
                </div>
                <p className="text-slate-700 mb-2">
                  💰 от 180 000 ₽ &nbsp;|&nbsp;  Удалённо / Гибрид
                </p>
                <div className="flex gap-2">
                  <a href="#" className="text-primary text-sm hover:underline">🔗 Открыть вакансию</a>
                  <span className="text-slate-400 text-sm">•</span>
                  <span className="text-slate-500 text-sm">Источник: trudvsem.ru</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Простые и честные тарифы
        </h2>
        <p className="text-xl text-slate-600 text-center mb-12">
          Начните бесплатно, платите только если видите ценность
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free */}
          <div className="border-2 border-slate-200 rounded-xl p-8 hover:border-primary transition">
            <h3 className="text-2xl font-bold mb-2">Beta Free</h3>
            <p className="text-slate-600 mb-6">После trial-периода</p>
            <div className="text-4xl font-bold mb-6">0 ₽</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">1 поисковый запрос</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">До 3 вакансий в отчёте</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">Базовый трекер откликов</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">До 5 избранных вакансий</span>
              </li>
            </ul>
            <a href="/onboarding" className="block text-center bg-slate-100 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-200 transition">
              Начать бесплатно
            </a>
          </div>

          {/* Trial */}
          <div className="border-2 border-primary rounded-xl p-8 relative bg-blue-50">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
              3 дня бесплатно
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro Trial</h3>
            <p className="text-slate-600 mb-6">Полный доступ на 3 дня</p>
            <div className="text-4xl font-bold mb-6">0 ₽</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">3 поисковых запроса</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">До 10 вакансий в отчёте</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700 font-semibold">AI-объяснения релевантности</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700 font-semibold">5 AI-писем для отклика в день</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">Полный трекер откликов</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">История отчётов (3 дня)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">До 10 избранных вакансий</span>
              </li>
            </ul>
            <a href="/onboarding" className="block text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Попробовать бесплатно
            </a>
          </div>

          {/* Pro */}
          <div className="border-2 border-slate-200 rounded-xl p-8 hover:border-primary transition">
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-slate-600 mb-6">Для активного поиска</p>
            <div className="text-4xl font-bold mb-2">390 ₽</div>
            <p className="text-slate-500 text-sm mb-6">в месяц</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">3 поисковых запроса</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">До 10 вакансий в отчёте</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700 font-semibold">AI-объяснения релевантности</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700 font-semibold">5 AI-писем для отклика в день</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">Полный трекер откликов</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">История отчётов (30 дней)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">До 30 избранных вакансий</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-slate-700">Приоритетная поддержка</span>
              </li>
            </ul>
            <a href="/onboarding" className="block text-center bg-slate-100 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-200 transition">
              Начать с Pro Trial
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Почему нам можно доверять
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold mb-2">Ваши данные в безопасности</h3>
              <p className="text-slate-600 text-sm">
                Не храним ФИО и телефоны. AI получает только анонимизированные данные
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">5 источников вакансий</h3>
              <p className="text-slate-600 text-sm">
                hh.ru, SuperJob, Хабр Карьера, Rabota.ru, trudvsem.ru — всё в одном отчёте
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Только релевантные вакансии</h3>
              <p className="text-slate-600 text-sm">
                Стоп-слова, фильтры по зарплате, формату, опыту — вы контролируете выдачу
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Готовы перестать искать вручную?
        </h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Получите первый персональный отчёт уже завтра утром. 3 дня полного доступа бесплатно.
        </p>
        <a
          href="/onboarding"
          className="inline-block bg-primary text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          🚀 Начать бесплатно
        </a>
        <p className="text-sm text-slate-500 mt-4">
          Без карты • Настройка за 2 минуты • Отписка в один клик
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2026 Карьерный радар. Все права защищены.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="/privacy" className="hover:text-white transition">Политика конфиденциальности</a>
            <a href="/terms" className="hover:text-white transition">Условия использования</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
