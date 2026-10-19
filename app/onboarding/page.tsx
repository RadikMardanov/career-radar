'use client'

import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type FormData = {
  desired_roles: string[]
  min_salary: number
  salary_type: string
  work_format: string
  regions: string[]
  cities: string[]
  industries: string[]
  stop_industries: string[]
  min_experience_years: number
  max_experience_years: number
  must_keywords: string[]
  exclude_keywords: string[]
  stop_words: string[]
  stop_companies: string[]
  exclude_employment_types: string[]
  allowed_schedule: string[]
  allowed_company_size: string[]
  travel_preference: string
  freshness_days: number
  salary_required_only: boolean
  min_match_score: number
  sort_by: string
  sources: string[]
  user_summary: string
}

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<FormData>({
    desired_roles: [],
    min_salary: 0,
    salary_type: 'net',
    work_format: 'any',
    regions: [],
    cities: [],
    industries: [],
    stop_industries: [],
    min_experience_years: 0,
    max_experience_years: 0,
    must_keywords: [],
    exclude_keywords: [],
    stop_words: [],
    stop_companies: [],
    exclude_employment_types: [],
    allowed_schedule: [],
    allowed_company_size: [],
    travel_preference: 'any',
    freshness_days: 7,
    salary_required_only: false,
    min_match_score: 60,
    sort_by: 'score',
    sources: ['hh', 'superjob', 'habr', 'rabota', 'trudvsem'],
    user_summary: '',
  })

  const [roleInput, setRoleInput] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [industryInput, setIndustryInput] = useState('')
  const [stopIndustryInput, setStopIndustryInput] = useState('')
  const [mustKeywordInput, setMustKeywordInput] = useState('')
  const [excludeKeywordInput, setExcludeKeywordInput] = useState('')
  const [stopWordInput, setStopWordInput] = useState('')
  const [stopCompanyInput, setStopCompanyInput] = useState('')

  const totalSteps = 10

  const addTag = (field: keyof FormData, value: string, setInput: (val: string) => void) => {
    if (value.trim() && !(formData[field] as string[]).includes(value.trim())) {
      setFormData({ ...formData, [field]: [...(formData[field] as string[]), value.trim()] })
      setInput('')
    }
  }

  const removeTag = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: (formData[field] as string[]).filter(item => item !== value) })
  }

  const toggleCheckbox = (field: keyof FormData, value: string) => {
    const current = formData[field] as string[]
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(item => item !== value) })
    } else {
      setFormData({ ...formData, [field]: [...current, value] })
    }
  }

  const nextStep = () => { if (step < totalSteps) setStep(step + 1) }
  const prevStep = () => { if (step > 1) setStep(step - 1) }

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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // Вспомогательные функции для рендера тегов
  const renderTags = (field: keyof FormData, color: 'blue' | 'red' = 'blue') => (
    <div className="flex flex-wrap gap-2">
      {(formData[field] as string[]).map((item) => (
        <span key={item} className={`${color === 'red' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-primary'} px-3 py-1 rounded-full text-sm flex items-center gap-2`}>
          {item}
          <button type="button" onClick={() => removeTag(field, item)} className={`${color === 'red' ? 'text-red-600 hover:text-red-800' : 'text-primary hover:text-red-600'} font-bold`}>×</button>
        </span>
      ))}
    </div>
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-4 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">Шаг {step} из {totalSteps}</span>
            <span className="text-sm text-slate-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Настройте ваш поиск работы</h1>
          <p className="text-slate-600 mb-6 sm:mb-8">Заполните профиль, чтобы мы могли находить только подходящие вакансии</p>

          {/* ШАГ 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">1. Кем вы хотите работать?</h2>
              <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRoleInput(e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTag('desired_roles', roleInput, setRoleInput))}
                  placeholder="Например: Менеджер проектов"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full"
                />
                <button
                  type="button"
                  onClick={() => addTag('desired_roles', roleInput, setRoleInput)}
                  className="px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-white bg-primary hover:bg-blue-700"
                >
                  Добавить
                </button>
              </div>
              {renderTags('desired_roles', 'blue')}
            </div>
          )}

          {/* ШАГ 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">2. Желаемая зарплата</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Минимальная зарплата (₽)</label>
                  <input type="number" value={formData.min_salary || ''} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, min_salary: parseInt(e.target.value) || 0 })} placeholder="100000" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
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

          {/* ШАГ 3 */}
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

          {/* ШАГ 4 */}
          {step === 4 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">4. География</h2>
              <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
                <input
                  type="text"
                  value={cityInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCityInput(e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTag('cities', cityInput, setCityInput))}
                  placeholder="Например: Казань"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full"
                />
                <button
                  type="button"
                  onClick={() => addTag('cities', cityInput, setCityInput)}
                  className="px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-white bg-primary hover:bg-blue-700"
                >
                  Добавить
                </button>
              </div>
              {renderTags('cities', 'blue')}
              <div className="mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.regions.includes('Вся Россия')} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, regions: e.target.checked ? ['Вся Россия'] : [] })} className="w-5 h-5 text-primary rounded focus:ring-primary" />
                  <span className="text-slate-700">Рассматриваю всю Россию</span>
                </label>
              </div>
            </div>
          )}

          {/* ШАГ 5 */}
          {step === 5 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">5. Отрасли</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Желаемые отрасли</label>
                <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
                  <input
                    type="text"
                    value={industryInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setIndustryInput(e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTag('industries', industryInput, setIndustryInput))}
                    placeholder="Например: IT, Финансы"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full"
                  />
                  <button type="button" onClick={() => addTag('industries', industryInput, setIndustryInput)} className="px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-white bg-primary hover:bg-blue-700">Добавить</button>
                </div>
                {renderTags('industries', 'blue')}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Стоп-отрасли (исключить)</label>
                <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
                  <input
                    type="text"
                    value={stopIndustryInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStopIndustryInput(e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTag('stop_industries', stopIndustryInput, setStopIndustryInput))}
                    placeholder="Например: Gambling, МЛМ"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-full"
                  />
                  <button type="button" onClick={() => addTag('stop_industries', stopIndustryInput, setStopIndustryInput)} className="px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-white bg-red-500 hover:bg-red-600">Добавить</button>
                </div>
                {renderTags('stop_industries', 'red')}
              </div>
            </div>
          )}

          {/* ШАГ 6 */}
          {step === 6 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">6. Ваш опыт работы</h2>
              <p className="text-slate-600 mb-6">Укажите диапазон вашего стажа в годах</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Минимальный опыт (лет)</label>
                  <input type="number" min="0" value={formData.min_experience_years || ''} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, min_experience_years: parseInt(e.target.value) || 0 })} placeholder="3" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Максимальный опыт (лет)</label>
                  <input type="number" min="0" value={formData.max_experience_years || ''} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, max_experience_years: parseInt(e.target.value) || 0 })} placeholder="15" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* ШАГ 7 */}
          {step === 7 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">7. Ключевые слова</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Обязательные слова</label>
                <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
                  <input
                    type="text"
                    value={mustKeywordInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMustKeywordInput(e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTag('must_keywords', mustKeywordInput, setMustKeywordInput))}
                    placeholder="Например: B2B, CRM, Agile"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full"
                  />
                  <button type="button" onClick={() => addTag('must_keywords', mustKeywordInput, setMustKeywordInput)} className="px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-white bg-primary hover:bg-blue-700">Добавить</button>
                </div>
                {renderTags('must_keywords', 'blue')}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Исключаемые слова</label>
                <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
                  <input
                    type="text"
                    value={excludeKeywordInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setExcludeKeywordInput(e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTag('exclude_keywords', excludeKeywordInput, setExcludeKeywordInput))}
                    placeholder="Например: junior, стажировка"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-full"
                  />
                  <button type="button" onClick={() => addTag('exclude_keywords', excludeKeywordInput, setExcludeKeywordInput)} className="px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-white bg-red-500 hover:bg-red-600">Добавить</button>
                </div>
                {renderTags('exclude_keywords', 'red')}
              </div>
            </div>
          )}

          {/* ШАГ 8 */}
          {step === 8 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">8. Тонкие настройки и стоп-фильтры</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Стоп-слова (отсеивать вакансии)</label>
                  <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
                    <input
                      type="text"
                      value={stopWordInput}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setStopWordInput(e.target.value)}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTag('stop_words', stopWordInput, setStopWordInput))}
                      placeholder="Например: продажи, холодный обзвон"
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-full"
                    />
                    <button type="button" onClick={() => addTag('stop_words', stopWordInput, setStopWordInput)} className="px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-white bg-red-500 hover:bg-red-600">Добавить</button>
                  </div>
                  {renderTags('stop_words', 'red')}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Стоп-компании</label>
                  <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
                    <input
                      type="text"
                      value={stopCompanyInput}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setStopCompanyInput(e.target.value)}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTag('stop_companies', stopCompanyInput, setStopCompanyInput))}
                      placeholder="Название компании"
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-full"
                    />
                    <button type="button" onClick={() => addTag('stop_companies', stopCompanyInput, setStopCompanyInput)} className="px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-white bg-red-500 hover:bg-red-600">Добавить</button>
                  </div>
                  {renderTags('stop_companies', 'red')}
                </div>

                {/* Типы занятости */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Допустимые типы занятости</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Полная занятость', 'Частичная занятость', 'Проектная работа', 'Стажировка'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input type="checkbox" checked={formData.exclude_employment_types.includes(opt)} onChange={() => toggleCheckbox('exclude_employment_types', opt)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                        <span className="text-sm text-slate-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* График работы */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">График работы</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Полный день', 'Гибкий график', 'Сменный график', 'Вахта'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input type="checkbox" checked={formData.allowed_schedule.includes(opt)} onChange={() => toggleCheckbox('allowed_schedule', opt)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                        <span className="text-sm text-slate-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Размер компании */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Размер компании</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Малый бизнес (до 50)', 'Средний (50-500)', 'Крупный (500+)', 'Корпорации / Гос'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input type="checkbox" checked={formData.allowed_company_size.includes(opt)} onChange={() => toggleCheckbox('allowed_company_size', opt)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                        <span className="text-sm text-slate-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Командировки */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Отношение к командировкам</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { val: 'any', label: 'Не важно' },
                      { val: 'no_travel', label: 'Без командировок' },
                      { val: 'rare_ok', label: 'Редкие допустимы' },
                      { val: 'frequent_ok', label: 'Частые допустимы' }
                    ].map((item) => (
                      <label key={item.val} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer">
                        <input type="radio" name="travel" checked={formData.travel_preference === item.val} onChange={() => setFormData({ ...formData, travel_preference: item.val })} className="w-4 h-4 text-primary" />
                        <span className="text-sm">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Свежесть и порог */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Свежесть вакансий (дней)</label>
                    <input type="number" value={formData.freshness_days} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, freshness_days: parseInt(e.target.value) || 7 })} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Мин. порог совпадения (%)</label>
                    <input type="number" min="0" max="100" value={formData.min_match_score} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, min_match_score: parseInt(e.target.value) || 60 })} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
                  </div>
                </div>

                {/* Только с зарплатой */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="salary_req" checked={formData.salary_required_only} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, salary_required_only: e.target.checked })} className="w-5 h-5 text-primary rounded" />
                  <label htmlFor="salary_req" className="text-slate-700 cursor-pointer">Показывать только вакансии с указанной зарплатой</label>
                </div>

                {/* Сортировка */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Сортировка в отчете</label>
                  <select value={formData.sort_by} onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, sort_by: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                    <option value="score">По совпадению (рекомендуется)</option>
                    <option value="date">По дате публикации</option>
                    <option value="salary">По зарплате</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ШАГ 9 */}
          {step === 9 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">9. Источники вакансий</h2>
              <p className="text-slate-600 mb-6">Выберите площадки, откуда мы будем собирать вакансии</p>
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

          {/* ШАГ 10 */}
          {step === 10 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">10. Расскажите о себе</h2>
              <p className="text-slate-600 mb-4">Опишите свой опыт и ключевые навыки. Это поможет AI генерировать точные отклики.</p>
              <textarea
                value={formData.user_summary}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, user_summary: e.target.value })}
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
