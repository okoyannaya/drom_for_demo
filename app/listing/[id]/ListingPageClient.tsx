'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface QuestionsData {
  isOwner: string
  ownerName: string
  ptsRegistered: string
  ptsType: string
  hasLien: string
  sellReason: string
  ownershipYears: string
  serviceHistory: string
  hasSecondTires: string
  tireType: string
  hasAccident: string
  bargainPossible: string
  viewLocation: string
  viewTime: string
  technicalCondition: string
}

interface CarListingData {
  vin: string
  sts: string
  licensePlate: string
  make: string
  model: string
  steeringWheel: 'left' | 'right'
  year: string
  mileage: string
  noMileageRF: boolean
  owners: '1' | '2' | '3' | '4+' | null
  color: string | null
  documentsProblem: boolean
  documentsProblemText: string
  needsRepair: boolean
  needsRepairText: string
  description: string
  videoLink: string
  price: string
  currency: string
  exchangePossible: boolean
  exchangeMoreExpensive: boolean
  exchangeEqual: boolean
  exchangeCheaper: boolean
  exchangeNotCar: boolean
  exchangeDetails: string
  status: 'in_stock' | 'in_transit' | 'on_order'
  region: string
  city: string
  phone: string
  allowQuestions: boolean
  enableAssistant: boolean
  assistantDescription: string
  questions?: QuestionsData | null
}

const colorNames: Record<string, string> = {
  'black': 'Черный',
  'dark-gray': 'Темно-серый',
  'light-gray': 'Светло-серый',
  'white': 'Белый',
  'blue': 'Голубой',
  'green': 'Зеленый',
  'red': 'Красный',
  'orange': 'Оранжевый',
  'pink': 'Розовый',
  'yellow': 'Желтый',
  'gold': 'Золотой',
  'brown': 'Коричневый',
  'purple': 'Фиолетовый',
}

const ownerNames: Record<string, string> = {
  '1': 'Один',
  '2': 'Два',
  '3': 'Три',
  '4+': 'Четыре и более'
}

export default function ListingPageClient() {
  const params = useParams()
  const id = params.id
  const [formData, setFormData] = useState<CarListingData | null>(null)
  const [showPhone, setShowPhone] = useState(false)

  useEffect(() => {
    // Загружаем все данные формы из localStorage при загрузке страницы
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('carListingData')
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData) as CarListingData
          setFormData(parsed)
        } catch (e) {
          console.error('Error parsing car listing data:', e)
        }
      }
    }
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>дром</div>
          <div className={styles.location}>Нижегородская область</div>
        </div>
        <nav className={styles.nav}>
          <a href="/" className={styles.navItemActive}>Автомобили</a>
          <a href="#" className={styles.navItem}>Грузовики и спецтехника</a>
          <a href="#" className={styles.navItem}>Мотоциклы</a>
          <a href="#" className={styles.navItem}>Запчасти</a>
          <a href="#" className={styles.navItem}>Отзывы</a>
          <a href="#" className={styles.navItem}>Каталог</a>
          <a href="#" className={styles.navItem}>Шины</a>
          <a href="#" className={styles.navItem}>Еще</a>
        </nav>
        <button className={styles.submitButton}>Подать</button>
      </header>

      <div className={styles.breadcrumbs}>
        Дром &gt; Продажа автомобилей в {formData?.city || 'Княгинино'} &gt; {formData?.make || 'Kia'} &gt; {formData?.model || 'Sportage'} &gt; Объявление {id}
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.leftColumn}>
            <h1 className={styles.title}>
              Продается {formData?.make || 'Kia'} {formData?.model || 'Sportage'}, {formData?.year || '2013'} год в {formData?.city || 'Княгинино'}
            </h1>
            
            <div className={styles.priceSection}>
              <div className={styles.price}>
                {formData?.price ? `${Number(formData.price).toLocaleString('ru-RU')} ${formData.currency === 'rubles' ? '₽' : formData.currency === 'usd' ? '$' : '€'}` : '1 230 000 ₽'}
              </div>
              {formData?.price && (
                <div className={styles.priceInfo}>
                  В кредит от {Math.round(Number(formData.price) / 60).toLocaleString('ru-RU')} ₽/мес
                </div>
              )}
            </div>

            <div className={styles.imagePlaceholder}>
              <div className={styles.imagePlaceholderContent}>
                Фото автомобиля
              </div>
            </div>

            <div className={styles.specsTable}>
              <table>
                <tbody>
                  <tr>
                    <td className={styles.specLabel}>Марка, модель</td>
                    <td className={styles.specValue}>{formData?.make || 'Kia'} {formData?.model || 'Sportage'}</td>
                  </tr>
                  {formData?.year && (
                    <tr>
                      <td className={styles.specLabel}>Год выпуска</td>
                      <td className={styles.specValue}>{formData.year}</td>
                    </tr>
                  )}
                  {formData?.mileage && !formData.noMileageRF && (
                    <tr>
                      <td className={styles.specLabel}>Пробег</td>
                      <td className={styles.specValue}>{Number(formData.mileage).toLocaleString('ru-RU')} км</td>
                    </tr>
                  )}
                  {formData?.noMileageRF && (
                    <tr>
                      <td className={styles.specLabel}>Пробег</td>
                      <td className={styles.specValue}>Без пробега по РФ</td>
                    </tr>
                  )}
                  {formData?.color && (
                    <tr>
                      <td className={styles.specLabel}>Цвет</td>
                      <td className={styles.specValue}>{colorNames[formData.color] || formData.color}</td>
                    </tr>
                  )}
                  <tr>
                    <td className={styles.specLabel}>Руль</td>
                    <td className={styles.specValue}>{formData?.steeringWheel === 'left' ? 'Левый' : 'Правый'}</td>
                  </tr>
                  {formData?.owners && (
                    <tr>
                      <td className={styles.specLabel}>Владельцев</td>
                      <td className={styles.specValue}>{ownerNames[formData.owners] || formData.owners} в ПТС</td>
                    </tr>
                  )}
                  {formData?.vin && (
                    <tr>
                      <td className={styles.specLabel}>VIN</td>
                      <td className={styles.specValue}>
                        {formData.vin.length > 10 
                          ? `${formData.vin.substring(0, 3)}${'*'.repeat(Math.max(0, formData.vin.length - 6))}${formData.vin.substring(formData.vin.length - 3)}`
                          : formData.vin}
                      </td>
                    </tr>
                  )}
                  {formData?.sts && (
                    <tr>
                      <td className={styles.specLabel}>Номер СТС</td>
                      <td className={styles.specValue}>{formData.sts}</td>
                    </tr>
                  )}
                  {formData?.licensePlate && (
                    <tr>
                      <td className={styles.specLabel}>Госномер</td>
                      <td className={styles.specValue}>{formData.licensePlate}</td>
                    </tr>
                  )}
                  {formData?.status && (
                    <tr>
                      <td className={styles.specLabel}>Статус</td>
                      <td className={styles.specValue}>
                        {formData.status === 'in_stock' ? 'В наличии' : 
                         formData.status === 'in_transit' ? 'В пути' : 
                         'Под заказ'}
                      </td>
                    </tr>
                  )}
                  {(formData?.documentsProblem || formData?.needsRepair) && (
                    <tr>
                      <td className={styles.specLabel}>Особые отметки</td>
                      <td className={styles.specValue}>
                        {formData.documentsProblem && 'Документы с проблемами. '}
                        {formData.needsRepair && 'Требуется ремонт. '}
                      </td>
                    </tr>
                  )}
                  {formData?.exchangePossible && (
                    <tr>
                      <td className={styles.specLabel}>Обмен</td>
                      <td className={styles.specValue}>
                        {[
                          formData.exchangeMoreExpensive && 'На более дорогую',
                          formData.exchangeEqual && 'На равноценную',
                          formData.exchangeCheaper && 'На более дешевую',
                          formData.exchangeNotCar && 'Не на авто'
                        ].filter(Boolean).join(', ')}
                        {formData.exchangeDetails && ` - ${formData.exchangeDetails}`}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {formData?.description && (
              <div className={styles.description}>
                <h2 className={styles.sectionTitle}>Описание</h2>
                <p>{formData.description}</p>
              </div>
            )}

            {formData?.videoLink && (
              <div className={styles.description}>
                <h2 className={styles.sectionTitle}>Видео</h2>
                <a href={formData.videoLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {formData.videoLink}
                </a>
              </div>
            )}

            <div className={styles.similarListings}>
              <h2 className={styles.sectionTitle}>Похожие объявления</h2>
              <div className={styles.similarGrid}>
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className={styles.similarCard}>
                    <div className={styles.similarImage}>Фото</div>
                    <div className={styles.similarInfo}>
                      <div className={styles.similarTitle}>Kia Sportage, 2013</div>
                      <div className={styles.similarPrice}>1 230 000 ₽</div>
                      <div className={styles.similarLocation}>Княгинино</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.sellerCard}>
              <h3 className={styles.sellerTitle}>Продавец</h3>
              <div className={styles.sellerInfo}>
                <div className={styles.sellerName}>Частное лицо</div>
                <div className={styles.sellerLocation}>
                  <span>📍</span> {formData?.city || 'Княгинино'}, {formData?.region || 'Нижегородская область'}
                </div>
                {showPhone && formData?.phone ? (
                  <div className={styles.sellerPhone}>
                    <span>📞</span> +7 {formData.phone}
                  </div>
                ) : null}
                <div className={styles.sellerStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>4</span>
                    <span className={styles.statLabel}>лет на сайте</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>16</span>
                    <span className={styles.statLabel}>объявлений</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>1</span>
                    <span className={styles.statLabel}>отзыв</span>
                  </div>
                </div>
              </div>
              <button 
                className={styles.contactButton}
                onClick={() => {
                  if (formData?.phone) {
                    setShowPhone(true)
                  } else {
                    alert('Телефон не указан')
                  }
                }}
                disabled={showPhone || !formData?.phone}
              >
                {showPhone && formData?.phone ? `+7 ${formData.phone}` : 'Показать телефон'}
              </button>
            </div>

            <div className={styles.actions}>
              <button className={styles.actionButton}>
                📍 На карте
              </button>
              <button className={styles.actionButton}>
                ⚠️ Пожаловаться
              </button>
            </div>

            <div className={styles.additionalInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📅</span>
                <span>Опубликовано 26.10.2025</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>👁️</span>
                <span>Просмотров: 402</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>💬</span>
                <span>Сообщений: 2</span>
              </div>
            </div>

            <div className={styles.categories}>
              <h3 className={styles.categoriesTitle}>Категории</h3>
              <div className={styles.categoryLinks}>
                <a href="#" className={styles.categoryLink}>Kia Sportage</a>
                <a href="#" className={styles.categoryLink}>2013 год</a>
                <a href="#" className={styles.categoryLink}>SUV / кроссовер</a>
                <a href="#" className={styles.categoryLink}>2.0 л</a>
                <a href="#" className={styles.categoryLink}>Автоматическая</a>
                <a href="#" className={styles.categoryLink}>4WD</a>
                <a href="#" className={styles.categoryLink}>Белый</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


