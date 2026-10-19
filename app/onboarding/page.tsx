'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Данные формы
  const [formData, setFormData] = useState({
    desired_roles: [] as string[],
    min_salary: 0,
    salary_type: 'net',
    work_format: 'any',
    regions: [] as string[],
    cities: [] as string[],
  })

  // Временные значения для текущих шагов
  const [roleInput, setRoleInput] = useState('')
  const [cityInput, setCityInput] = useState('')

  const totalSteps = 10

  // Обработчики для шага 1: Должности
  const addRole = () => {
    if (roleInput.trim() && !formData.desired_roles.includes(roleInput.trim())) {
      setFormData({
        ...formData,
        desired_roles: [...formData.desired_roles, roleInput.trim()]
      })
      setRoleInput('')
    }
  }

  const removeRole = (role: string) => {
    setFormData({
      ...formData,
      desired_roles: formData.desired_roles.filter(r => r !== role)
    })
  }

  // Обработчики для шага 4: Города
  const addCity = () => {
    if (cityInput.trim() && !formData.cities.includes(cityInput.trim())) {
      setFormData({
        ...formData,
        cities: [...formData.cities, cityInput.trim()]
      })
      setCityInput('')
    }
  }

  const removeCity = (city: string) => {
    setFormData({
      ...formData,
      cities: formData.cities.filter(c => c !== city)
    })
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

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
        })
        .eq('id', user.id)

      if (error) throw error

      alert('Данные сохранены! В следующих шагах добавим остальные поля.')
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Карточка формы */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Настройте ваш поиск работы
          </h1>
          <p className="text-slate-600 mb-6 sm:mb-8">
            Заполните профиль, чтобы мы могли находить только подходящие вакансии
          </p>

          {/* ШАГ 1: Желаемая должность */}
          {step === 1 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">1. Кем вы хотите работать?</h2>
              <p className="text-slate-600 mb-4 sm:mb-6">
                Укажите желаемые должности (можно несколько)
              </p>

              {/* ИСПРАВЛЕНО: адаптивная верстка для мобильных */}
              <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRole())}
                  placeholder="Например: Менеджер проектов"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full"
                />
                <button
                  type="button"
                  onClick={addRole}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
                >
                  Добавить
                </button>
              </div>

              {formData.desired_roles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.desired_roles.map((role) => (
                    <span
                      key={role}
                      className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => removeRole(role)}
                        className="text-primary hover:text-red-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ШАГ 2: Зарплата */}
          {step === 2 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">2. Желаемая зарплата</h2>
              <p className="text-slate-600 mb-4 sm:mb-6">
                Укажите минимальную зарплату и формат
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Минимальная зарплата (₽)
                  </label>
                  <input
                    type="number"
                    value={formData.min_salary || ''}
                    onChange={(e) => setFormData({ ...formData, min_salary: parseInt(e.target.value) || 0 })}
                    placeholder="100000"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Формат зарплаты
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, salary_type: 'net' })}
                      className={`py-3 px-4 rounded-lg border-2 transition text-sm sm:text-base ${
                        formData.salary_type === 'net'
                          ? 'border-primary bg-blue-50 text-primary'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      На руки (net)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, salary_type: 'gross' })}
                      className={`py-3 px-4 rounded-lg border-2 transition text-sm sm:text-base ${
                        formData.salary_type === 'gross'
                          ? 'border-primary bg-blue-50 text-primary'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      До вычета (gross)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ШАГ 3: Формат работы */}
          {step === 3 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">3. Формат работы</h2>
              <p className="text-slate-600 mb-4 sm:mb-6">
                Выберите предпочтительный формат
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { value: 'remote', label: '🏠 Удалённо', desc: 'Полностью удаленная работа' },
                  { value: 'hybrid', label: '🔄 Гибрид', desc: 'Частично офис, частично удаленно' },
                  { value: 'office', label: '🏢 Офис', desc: 'Работа в офисе' },
                  { value: 'any', label: '✨ Любой', desc: 'Не имеет значения' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, work_format: option.value })}
                    className={`p-4 rounded-lg border-2 text-left transition ${
                      formData.work_format === option.value
                        ? 'border-primary bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
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
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">4. География</h2>
              <p className="text-slate-600 mb-4 sm:mb-6">
                Укажите предпочтительные города (можно несколько)
              </p>

              {/* ИСПРАВЛЕНО: адаптивная верстка для мобильных */}
              <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
                <input
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCity())}
                  placeholder="Например: Казань"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full"
                />
                <button
                  type="button"
                  onClick={addCity}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
                >
                  Добавить
                </button>
              </div>

              {formData.cities.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.cities.map((city) => (
                    <span
                      key={city}
                      className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {city}
                      <button
                        type="button"
                        onClick={() => removeCity(city)}
                        className="text-primary hover:text-red-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.regions.includes('Вся Россия')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, regions: ['Вся Россия'] })
                      } else {
                        setFormData({ ...formData, regions: [] })
                      }
                    }}
                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                  />
                  <span className="text-slate-700">Рассматриваю всю Россию</span>
                </label>
              </div>
            </div>
          )}

          {/* Заглушки для шагов 5-10 */}
          {step > 4 && step <= 10 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">Шаг {step} в разработке</h2>
              <p className="text-slate-600">
                Этот шаг будет добавлен в следующей части
              </p>
            </div>
          )}

          {/* Навигация */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-3 rounded-lg font-semibold border-2 border-slate-200 hover:border-slate-300 transition disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              ← Назад
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
              >
                Далее →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-slate-400 w-full sm:w-auto"
              >
                {loading ? 'Сохранение...' : '✅ Сохранить и получить отчёт'}
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
