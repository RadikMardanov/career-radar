'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Типизация глобального объекта ym, который создаёт скрипт Метрики
declare global {
  interface Window {
    ym?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export default function YandexMetrika() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // ID счётчика берём из env (значение лежит в Netlify Environment Variables,
  // НЕ хардкодится здесь —遵循 правила обращения с секретами из ТЗ v1.4 п.9.3)
  const metricaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID
  
  // Трекинг SPA-переходов: каждый раз когда пользователь меняет страницу
  // внутри приложения (без полной перезагрузки), отправляем событие pageView в Метрику.
  useEffect(() => {
    if (!metricaId || typeof window === 'undefined') return
    
    const handleRouteChange = (url: string) => {
      if (typeof window.ym === 'function') {
        window.ym(metricaId, 'pageView', { path: url })
      }
    }
    
    // Собираем полный URL с query-параметрами (?vacancy_id=... и т.д.)
    const queryString = searchParams?.toString()
    const fullUrl = queryString ? `${pathname}?${queryString}` : pathname
    
    handleRouteChange(fullUrl)
  }, [pathname, searchParams, metricaId])

  // Если ID не задан — просто ничего не рендерим (защита от ошибок сборки)
  if (!metricaId) return null

  return (
    <>
      {/* Основной скрипт Метрики загружается один раз при первом рендере */}
      <Script id="yandex-metrika-init" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${metricaId}', 'ym');

          ym(${metricaId}, 'init', {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true,
            ecommerce:"dataLayer"
          });
        `}
      </Script>
      
      {/* Носкрипт-фолбэк для браузеров без JS */}
      <noscript>
        <div>
          <img 
            src={`https://mc.yandex.ru/watch/${metricaId}`} 
            style={{ position: 'absolute', left: '-9999px' }} 
            alt="" 
          />
        </div>
      </noscript>
    </>
  )
}
