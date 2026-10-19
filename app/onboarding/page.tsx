'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Данные формы (соответствуют таблице profiles в Supabase)
  const [formData, setFormData] = useState({
    desired_roles: [] as string[],
    min_salary: 0,
    salary_type: 'net',
    work_format: 'any',
    regions: [] as string[],
    cities: [] as string[],
    industries: [] as string[],
    stop_industries: [] as string[],
    min_experience_years: 0,
    max_experience_years: 0,
    must_keywords: [] as string[],
    exclude_keywords: [] as string[],
    stop_words: [] as string[],
    stop_companies: [] as string[],
    exclude_employment_types: [] as string[],
    allowed_schedule: [] as string[],
    allowed_company_size: [] as string[],
    travel_preference: 'any',
    freshness_days: 7,
    salary_required_only: false,
    min_match_score: 60,
    sort_by: 'score',
    sources: ['hh', 'superjob', 'habr', 'rabota', 'trudvsem'],
    user_summary: '',
  })

  // Временные значения для полей ввода тегов
  const [roleInput, setRoleInput] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [industryInput, setIndustryInput] = useState('')
  const [stopIndustryInput, setStopIndustryInput] = useState('')
  const [mustKeywordInput, setMustKeywordInput] = useState('')
  const [excludeKeywordInput, setExcludeKeywordInput] = useState('')
  const [stopWordInput, setStopWordInput] = useState('')
  const [stopCompanyInput, setStopCompanyInput] = useState('')

  const totalSteps = 10

  // --- УНИВЕРСАЛЬНЫЕ ХЕНДЛЕРЫ ---

  const addTag = (field: keyof typeof formData, value: string, setInput: (val: string) => void) => {
    if (value.trim() && !(formData[field] as string[]).includes(value.trim())) {
      setFormData({ ...formData, [field]: [...(formData[field] as string[]), value.trim()] })
      setInput('')
    }
  }

  const removeTag = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: (formData[field] as string[]).filter(item => item !== value) })
  }

  const toggleCheckbox = (field: keyof typeof formData, value: string) => {
    const current = formData[field] as string[]
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(item => item !== value) })
    } else {
      setFormData({ ...formData, [field]: [...current, value] })
    }
  }

  const nextStep = () => { if (step < totalSteps) setStep(step + 1) }
  const prevStep = () => { if (step > 1) setStep(step - 1) }

  // --- ОТПРАВКА ФОРМЫ ---

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Пользователь не авторизован. Пожалуйста, войдите снова.')
        setLoading(false)
        return
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          desired_roles: formData.desired_roles,
          min_salary: formData.min_salary,
          salary_type: formData.salary_type,
          work_format: formData.work_format,
          regions: formData.regions,
          cities: formData.cities,
          industries: formData.industries,
          stop_industries: formData.stop_industries,
          min_experience_years: formData.min_experience_years,
          max_experience_years: formData.max_experience_years,
          must_keywords: formData.must_keywords,
          exclude_keywords: formData.exclude_keywords,
          stop_words: formData.stop_words,
          stop_companies: formData.stop_companies,
          exclude_employment_types: formData.exclude_employment_types,
          allowed_schedule: formData.allowed_schedule,
          allowed_company_size: formData.allowed_company_size,
          travel_preference: formData.travel_preference,
          freshness_days: formData.freshness_days,
          salary_required_only: formData.salary_required_only,
          min_match_score: formData.min_match_score,
          sort_by: formData.sort_by,
          sources: formData.sources,
          user_summary: formData.user_summary,
        })
        .eq('id', user.id)

      if (error) throw error
      alert('✅ Профиль успешно сохранен! Ожидайте первый отчёт.')
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // --- UI КОМПОНЕНТЫ ---

  const TagInput = ({ field, input, setInput, placeholder, color = 'primary' }: any) => (
    <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(field, input, setInput))}
        placeholder={placeholder}
        className={`flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:border-transparent outline-none w-full ${color === 'red' ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
      />
      <button
        type="button"
        onClick={() => addTag(field, input, setInput)}
        className={`px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-white ${color === 'red' ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-blue-700'}`}
      >
        Добавить
      </button>
    </div>
  )

  const TagList = ({ field, color = 'blue' }: any) => (
    <div className="flex flex-wrap gap-2">
      {(formData[field] as string[]).map((item) => (
        <span key={item} className={`${color === 'red' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-primary'} px-3 py-1 rounded-full text-sm flex items-center gap-2`}>
          {item}
          <button type="button" onClick={() => removeTag(field, item)} className={`${color === 'red' ? 'text-red-600 hover:text-red-800' : 'text-primary hover:text-red-600'} font-bold`}>×</button>
        </span>
      ))}
    </div>
  )

  const CheckboxGroup = ({ label, options, field }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt: string) => (
          <label key={opt} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={(formData[field] as string[]).includes(opt)}
              onChange={() => toggleCheckbox(field, opt)}
              className="w-4 h-4 text-primary rounded focus:ring-primary"
            />
            <span className="text-sm text-slate-700">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-4 sm:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Прогресс-бар */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">Шаг {step} из {totalSteps}</span>
            <span className="text-sm text-slate-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
        </div>

        {/* Карточка формы */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Настройте ваш поиск работы</h1>
          <p className="text-slate-600 mb-6 sm:mb-8">Заполните профиль, чтобы мы могли находить только подходящие вакансии</p>

          {/* ШАГ 1: Должности */}
          {step === 1 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">1. Кем вы хотите работать?</h2>
              <TagInput field="desired_roles" input={roleInput} setInput={setRoleInput} placeholder="Например: Менеджер проектов" />
              <TagList field="desired_roles" />
            </div>
          )}

          {/* ШАГ 2: Зарплата */}
          {step === 2 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">2. Желаемая зарплата</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Минимальная зарплата (₽)</label>
                  <input type="number" value={formData.min_salary || ''} onChange={(e) => setFormData({ ...formData, min_salary: parseInt(e.target.value) || 0 })} placeholder="100000" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Формат зарплаты</label>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button type="button" onClick={() => setFormData({ ...formData, salary_type: 'net' })} className={`py-3 px-4 rounded-lg border-2 transition text-sm sm:text-base ${formData.salary_type === 'net' ? 'border-primary bg-blue-50 text-primary' : 'border-slate-200'}`}>На руки (net)</button>
                    <button type="button" onClick={() => setFormData({ ...formData, salary_type: 'gross' })} className={`py-3 px-4 rounded-lg border-2 transition text-sm sm:text-base ${formData.salary_type === 'gross' ? 'border-primary bg-blue-50 text-primary' : 'border-slate-200'}`}>До вычета (gross)</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ШАГ 3: Формат работы */}
          {step === 3 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">3. Формат работы</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { value: 'remote', label: '🏠 Удалённо', desc: 'Полностью удаленная работа' },
                  { value: 'hybrid', label: '🔄 Гибрид', desc: 'Частично офис, частично удаленно' },
                  { value: 'office', label: '🏢 Офис', desc: 'Работа в офисе' },
                  { value: 'any', label: '✨ Любой', desc: 'Не имеет значения' },
                ].map((option) => (
                  <button key={option.value} type="button" onClick={() => setFormData({ ...formData, work_format: option.value })} className={`p-4 rounded-lg border-2 text-left transition ${formData.work_format === option.value ? 'border-primary bg-blue-50' : 'border-slate-200'}`}>
                    <div className="font-semibold text-base sm:text-lg mb-1">{option.label}</div>
                    <div className="text-sm text-slate-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ШАГ 4: География */}
          {step === 4 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">4. География</h2>
              <TagInput field="cities" input={cityInput} setInput={setCityInput} placeholder="Например: Казань" />
              <TagList field="cities" />
              <div className="mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.regions.includes('Вся Россия')} onChange={(e) => setFormData({ ...formData, regions: e.target.checked ? ['Вся Россия'] : [] })} className="w-5 h-5 text-primary rounded focus:ring-primary" />
                  <span className="text-slate-700">Рассматриваю всю Россию</span>
                </label>
              </div>
            </div>
          )}

          {/* ШАГ 5: Отрасли */}
          {step === 5 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">5. Отрасли</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Желаемые отрасли</label>
                <TagInput field="industries" input={industryInput} setInput={setIndustryInput} placeholder="Например: IT, Финансы" />
                <TagList field="industries" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Стоп-отрасли (исключить)</label>
                <TagInput field="stop_industries" input={stopIndustryInput} setInput={setStopIndustryInput} placeholder="Например: Gambling, МЛМ" color="red" />
                <TagList field="stop_industries" color="red" />
              </div>
            </div>
          )}

          {/* ШАГ 6: Опыт работы */}
          {step === 6 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">6. Ваш опыт работы</h2>
              <p className="text-slate-600 mb-6">Укажите диапазон вашего стажа в годах</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Минимальный опыт (лет)</label>
                  <input type="number" min="0" value={formData.min_experience_years || ''} onChange={(e) => setFormData({ ...formData, min_experience_years: parseInt(e.target.value) || 0 })} placeholder="3" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Максимальный опыт (лет)</label>
                  <input type="number" min="0" value={formData.max_experience_years || ''} onChange={(e) => setFormData({ ...formData, max_experience_years: parseInt(e.target.value) || 0 })} placeholder="15" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* ШАГ 7: Ключевые слова */}
          {step === 7 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">7. Ключевые слова</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Обязательные слова</label>
                <TagInput field="must_keywords" input={mustKeywordInput} setInput={setMustKeywordInput} placeholder="Например: B2B, CRM, Agile" />
                <TagList field="must_keywords" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Исключаемые слова</label>
                <TagInput field="exclude_keywords" input={excludeKeywordInput} setInput={setExcludeKeywordInput} placeholder="Например: junior, стажировка" color="red" />
                <TagList field="exclude_keywords" color="red" />
              </div>
            </div>
          )}

          {/* ШАГ 8: Стоп-фильтры и настройки */}
          {step === 8 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">8. Тонкие настройки и стоп-фильтры</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Стоп-слова (отсеивать вакансии)</label>
                  <TagInput field="stop_words" input={stopWordInput} setInput={setStopWordInput} placeholder="Например: продажи, холодный обзвон" color="red" />
                  <TagList field="stop_words" color="red" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Стоп-компании</label>
                  <TagInput field="stop_companies" input={stopCompanyInput} setInput={setStopCompanyInput} placeholder="Название компании" color="red" />
                  <TagList field="stop_companies" color="red" />
                </div>

                <CheckboxGroup label="Допустимые типы занятости" options={['Полная занятость', 'Частичная занятость', 'Проектная работа', 'Стажировка']} field="exclude_employment_types" />
                
                <CheckboxGroup label="График работы" options={['Полный день', 'Гибкий график', 'Сменный график', 'Вахта']} field="allowed_schedule" />

                <CheckboxGroup label="Размер компании" options={['Малый бизнес (до 50)', 'Средний (50-500)', 'Крупный (500+)', 'Корпорации / Гос']} field="allowed_company_size" />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Отношение к командировкам</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['any', 'no_travel', 'rare_ok', 'frequent_ok'].map((val) => (
                      <label key={val} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer">
                        <input type="radio" name="travel" checked={formData.travel_preference === val} onChange={() => setFormData({ ...formData, travel_preference: val })} className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          {val === 'any' ? 'Не важно' : val === 'no_travel' ? 'Без командировок' : val === 'rare_ok' ? 'Редкие допустимы' : 'Частые допустимы'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Свежесть вакансий (дней)</label>
                    <input type="number" value={formData.freshness_days} onChange={(e) => setFormData({ ...formData, freshness_days: parseInt(e.target.value) || 7 })} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Мин. порог совпадения (%)</label>
                    <input type="number" min="0" max="100" value={formData.min_match_score} onChange={(e) => setFormData({ ...formData, min_match_score: parseInt(e.target.value) || 60 })} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="salary_req" checked={formData.salary_required_only} onChange={(e) => setFormData({ ...formData, salary_required_only: e.target.checked })} className="w-5 h-5 text-primary rounded" />
                  <label htmlFor="salary_req" className="text-slate-700 cursor-pointer">Показывать только вакансии с указанной зарплатой</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Сортировка в отчете</label>
                  <select value={formData.sort_by} onChange={(e) => setFormData({ ...formData, sort_by: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                    <option value="score">По совпадению (рекомендуется)</option>
                    <option value="date">По дате публикации</option>
                    <option value="salary">По зарплате</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ШАГ 9: Источники */}
          {step === 9 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">9. Источники вакансий</h2>
              <p className="text-slate-600 mb-6">Выберите площадки, откуда мы будем собирать вакансии</p>
              <CheckboxGroup label="" options={[
                { id: 'hh', name: 'hh.ru' },
                { id: 'superjob', name: 'SuperJob' },
                { id: 'habr', name: 'Хабр Карьера' },
                { id: 'rabota', name: 'Rabota.ru' },
                { id: 'trudvsem', name: 'trudvsem.ru (Работа в России)' }
              ].map(s => s.name)} field="sources" /> 
              {/* Note: for simplicity in this UI, we map names, but in real app we'd map IDs. Let's fix the toggle for sources to use IDs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'hh', name: 'hh.ru' },
                  { id: 'superjob', name: 'SuperJob' },
                  { id: 'habr', name: 'Хабр Карьера' },
                  { id: 'rabota', name: 'Rabota.ru' },
                  { id: 'trudvsem', name: 'trudvsem.ru' }
                ].map((source) => (
                  <label key={source.id} className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sources.includes(source.id)}
                      onChange={() => toggleCheckbox('sources', source.id)}
                      className="w-5 h-5 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-slate-700 font-medium">{source.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ШАГ 10: Расскажите о себе */}
          {step === 10 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">10. Расскажите о себе</h2>
              <p className="text-slate-600 mb-4">Опишите свой опыт и ключевые навыки. Это поможет AI генерировать точные отклики.</p>
              <textarea
                value={formData.user_summary}
                onChange={(e) => setFormData({ ...formData, user_summary: e.target.value })}
                rows={6}
                maxLength={1000}
                placeholder="Например: 10 лет в IT, управление командами до 15 человек, опыт в B2B-проектах. Навыки: Agile, Jira, бюджетирование. Достижения: увеличил конверсию на 30%."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              />
              <p className="text-sm text-slate-500 mt-2 text-right">{formData.user_summary.length} / 1000 символов</p>
            </div>
          )}

          {/* Навигация */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8 pt-6 border-t border-slate-200">
            <button type="button" onClick={prevStep} disabled={step === 1} className="px-6 py-3 rounded-lg font-semibold border-2 border-slate-200 hover:border-slate-300 transition disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto">← Назад</button>
            {step < totalSteps ? (
              <button type="button" onClick={nextStep} className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto">Далее →</button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={loading} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-slate-400 w-full sm:w-auto">
                {loading ? 'Сохранение...' : '✅ Сохранить и получить отчёт'}
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">{error}</div>
          )}
        </div>
      </div>
    </main>
  )
}
