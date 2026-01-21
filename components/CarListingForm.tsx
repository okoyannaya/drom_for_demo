'use client'

import { useEffect, useState } from 'react'
import styles from './CarListingForm.module.css'
import { AUTH_TOKEN_KEY } from './loginPage'
import { AGENT_UUID, colorNames, colors, makes, models, moscowMetroStations, years } from '@/app/assets/constants'
import { Agent } from '@/app/assets/types'

export default function CarListingForm() {
  const [token, setToken] = useState<string | null>(null)
  const [agent, setAgent] = useState<Agent | null>(null)
  // Базовые поля автомобиля
  const [vin, setVin] = useState('VF3MJAHXVHS101043')
  const [sts, setSts] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [make, setMake] = useState('BMW')
  const [model, setModel] = useState('X5')
  const [steeringWheel, setSteeringWheel] = useState<'left' | 'right'>('left')
  const [year, setYear] = useState('')
  const [mileage, setMileage] = useState('')
  const [noMileageRF, setNoMileageRF] = useState(false)
  const [owners, setOwners] = useState<'1' | '2' | '3' | '4+' | null>(null)
  const [color, setColor] = useState<string | null>(null)

  // Особые отметки
  const [documentsProblem, setDocumentsProblem] = useState(false)
  const [documentsProblemText, setDocumentsProblemText] = useState('')
  const [needsRepair, setNeedsRepair] = useState(false)
  const [needsRepairText, setNeedsRepairText] = useState('')
  const [description, setDescription] = useState('')

  // Описание и дополнительные поля
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('rubles')
  const [exchangePossible, setExchangePossible] = useState(false)
  const [exchangeMoreExpensive, setExchangeMoreExpensive] = useState(false)
  const [exchangeEqual, setExchangeEqual] = useState(false)
  const [exchangeCheaper, setExchangeCheaper] = useState(false)
  const [exchangeNotCar, setExchangeNotCar] = useState(false)
  const [exchangeDetails, setExchangeDetails] = useState('')
  const [status, setStatus] = useState<'in_stock' | 'in_transit' | 'on_order'>('in_stock')
  const [region, setRegion] = useState('Московская область')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [allowQuestions, setAllowQuestions] = useState(false)
  const [technicalCondition, setTechnicalCondition] = useState('')

  // Ответы на вопросы
  const [isOwner, setIsOwner] = useState<string>('')
  const [ownerName, setOwnerName] = useState('')
  const [ptsRegistered, setPtsRegistered] = useState<string>('')
  const [ptsType, setPtsType] = useState<string>('')
  const [hasLien, setHasLien] = useState<string>('')
  const [sellReason, setSellReason] = useState('')
  const [ownershipYears, setOwnershipYears] = useState('')
  const [serviceHistory, setServiceHistory] = useState('')
  const [hasSecondTires, setHasSecondTires] = useState<string>('')
  const [tireType, setTireType] = useState('')
  const [hasAccident, setHasAccident] = useState<string>('')
  const [bargainPossible, setBargainPossible] = useState<string>('')
  const [viewLocation, setViewLocation] = useState('')
  const [viewTime, setViewTime] = useState('')


  const buildPrompt = () => {
    const lines: string[] = []
    // Базовая информация
    lines.push(`Автомобиль: ${make} ${model}`)
    lines.push(`VIN: ${vin}`)
    if (sts) lines.push(`СТС: ${sts}`)
    if (licensePlate) lines.push(`Госномер: ${licensePlate}`)
    lines.push(`Руль: ${steeringWheel === 'left' ? 'левый' : 'правый'}`)
    lines.push(`Год выпуска: ${year}`)
    lines.push(
      noMileageRF
        ? `Пробег: без пробега по РФ`
        : `Пробег: ${mileage} км`
    )
    if (owners) lines.push(`Количество владельцев: ${owners}`)
    if (color) lines.push(`Цвет: ${colorNames[color] ?? color}`)
    // Особые отметки
    if (documentsProblem) {
      lines.push(`Проблемы с документами: ${documentsProblemText || 'есть'}`)
    }
    if (needsRepair) {
      lines.push(`Требуется ремонт: ${needsRepairText || 'Да'}`)
    }
    // Описание
    if (description) {
      lines.push(`Описание: ${description}`)
    }
    // Цена
    lines.push(`Цена: ${price} ${currency}`)
    if (exchangePossible) {
      const exchangeOptions = [
        exchangeMoreExpensive && 'на более дорогую',
        exchangeEqual && 'на равноценную',
        exchangeCheaper && 'на более дешевую',
        exchangeNotCar && 'не на авто',
      ].filter(Boolean)

      lines.push(
        `Обмен возможен: ${exchangeOptions.join(', ') || 'Да'}`
      )

      if (exchangeDetails) {
        lines.push(`Условия обмена: ${exchangeDetails}`)
      }
    }
    // Локация и статус
    lines.push(`Статус: ${status}`)
    lines.push(`Регион: ${region}`)
    if (city) lines.push(`Город: ${city}`)

    // Контакты
    lines.push(`Телефон: ${phone}`)
    lines.push(
      `Разрешены вопросы от покупателей: ${allowQuestions ? 'Да' : 'Нет'}`
    )
    // Вопросы покупателям
    if (allowQuestions) {
      lines.push(` Ответы продавца:`)
      if (isOwner) lines.push(`Владелец: ${isOwner}`)
      if (ownerName) lines.push(`Фактический владелец: ${ownerName}`)
      if (ptsRegistered) lines.push(`Вписан в ПТС: ${ptsRegistered}`)
      if (ptsType) lines.push(`ПТС: ${ptsType}`)
      if (hasLien) lines.push(`Обременения: ${hasLien}`)
      if (sellReason) lines.push(`Причина продажи: ${sellReason}`)
      if (ownershipYears) lines.push(`Срок владения: ${ownershipYears}`)
      if (serviceHistory) lines.push(`Обслуживание: ${serviceHistory}`)
      if (hasSecondTires)
        lines.push(`Вторая резина: ${hasSecondTires}`)
      if (tireType) lines.push(`Тип резины: ${tireType}`)
      if (hasAccident) lines.push(`ДТП: ${hasAccident}`)
      if (bargainPossible) lines.push(`Торг: ${bargainPossible}`)
      if (viewLocation) lines.push(`Место осмотра: ${viewLocation}`)
      if (viewTime) lines.push(`Время осмотра: ${viewTime}`)
      if (technicalCondition)
        lines.push(`Техническое состояние: ${technicalCondition}`)
    }

    return lines.join(', ')
  }


  const handlePut = async () => {
    const formData = {
      vin,
      sts,
      licensePlate,
      make,
      model,
      steeringWheel,
      year,
      mileage,
      noMileageRF,
      owners,
      color,
      documentsProblem,
      documentsProblemText,
      needsRepair,
      needsRepairText,
      description,
      price,
      currency,
      exchangePossible,
      exchangeMoreExpensive,
      exchangeEqual,
      exchangeCheaper,
      exchangeNotCar,
      exchangeDetails,
      status,
      region,
      city,
      phone,
      allowQuestions,
      // Ответы на вопросы
      questions: allowQuestions ? {
        isOwner,
        ownerName,
        ptsRegistered,
        ptsType,
        hasLien,
        sellReason,
        ownershipYears,
        serviceHistory,
        hasSecondTires,
        tireType,
        hasAccident,
        bargainPossible,
        viewLocation,
        viewTime,
        technicalCondition
      } : null
    }
    localStorage.setItem('carListingData', JSON.stringify(formData))
    const prompt = buildPrompt()

    try {
      const response = await fetch(
        `/api/agent/${AGENT_UUID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...agent,
            prompt,
          }),
        }
      )
      localStorage.setItem('carListingPrompt', JSON.stringify(prompt))

      if (response.ok) {
        const result = await response.json()
        console.log('Listing submitted:', result)
        // Перенаправляем на страницу просмотра объявления
        if (typeof window !== 'undefined') {
          window.location.href = '/listing/627037398/'
        }
      }
      if (!response.ok) {
        throw new Error(`PUT failed: ${response.status}`)
      }

      const data = await response.json()
      console.log('PUT response', data)
    } catch (e) {
      console.error(e)
    }
  }

  const loadAgent = async () => {
    try {
      const res = await fetch(`/api/agent/${AGENT_UUID}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error('agent load failed')

      const data = await res.json()
      setAgent(data)
    } catch (e) {
      console.error('agent load error', e)
    }
  }

  const formatPhone = (value: string) => {
    // Удаляем все нецифровые символы
    let cleaned = value.replace(/\D/g, '')
    // Если номер начинается с 8, заменяем на 7
    if (cleaned.length > 0 && cleaned[0] === '8') {
      cleaned = '7' + cleaned.slice(1)
    }
    // Если номер не начинается с 7, добавляем 7 в начало (если есть цифры)
    if (cleaned.length > 0 && cleaned[0] !== '7') {
      cleaned = '7' + cleaned
    }
    // Ограничиваем до 11 цифр (7 + 10 цифр номера)
    cleaned = cleaned.slice(0, 11)
    if (cleaned.length === 0) return ''
    if (cleaned.length === 1) return `+7`
    if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)}`
    if (cleaned.length <= 7) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`
    if (cleaned.length <= 9) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`
  }

  const validatePhone = (phoneValue: string): boolean => {
    const cleaned = phoneValue.replace(/\D/g, '')
    // Нормализуем: если начинается с 8, заменяем на 7
    const normalized = cleaned[0] === '8' ? '7' + cleaned.slice(1) : cleaned

    // Российский номер должен содержать 11 цифр
    if (normalized.length !== 11) {
      setPhoneError('Номер телефона должен содержать 11 цифр')
      return false
    }
    // Проверка, что номер начинается с 7
    if (normalized[0] !== '7') {
      setPhoneError('Номер должен начинаться с +7')
      return false
    }
    // Проверка формата: первая цифра после 7 должна быть 9 (для мобильных)
    if (normalized[1] !== '9') {
      setPhoneError('Некорректный формат номера телефона')
      return false
    }
    setPhoneError('')
    return true
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
    if (formatted.length > 0) {
      validatePhone(formatted)
    } else {
      setPhoneError('')
    }
  }

  const handlePhoneBlur = () => {
    if (phone) {
      validatePhone(phone)
    }
  }

  // Обертки для обработчиков кнопок
  const handleSteeringWheelClick = (value: 'left' | 'right') => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setSteeringWheel(value)
    }
  }

  const handleOwnersClick = (owner: '1' | '2' | '3' | '4+') => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setOwners(owner)
    }
  }

  const handleColorClick = (colorId: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setColor(colorId)
    }
  }

  const handleStatusClick = (status: 'in_stock' | 'in_transit' | 'on_order') => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setStatus(status)
    }
  }

  // Функция для получения подсказки от LLM для технического состояния
  const fetchTechnicalConditionHint = async () => {
    try {
      // Заглушка для LLM API
      const response = await fetch('/api/llm/technical-condition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          make,
          model,
          year,
          mileage
        })
      })

      if (response.ok) {
        const data = await response.json()
        setTechnicalCondition(data.hint || '')
      }
    } catch (error) {
      console.error('Error fetching LLM hint:', error)
      // Заглушка: простая подсказка на основе модели
      const hint = `Рекомендуется проверить: двигатель, трансмиссию, подвеску, тормозную систему, кузов на наличие коррозии и повреждений.`
      setTechnicalCondition(hint)
    }
  }

  useEffect(() => {
    if (!token) return
    loadAgent()
  }, [token])

  console.log(agent);

  useEffect(() => {
    setToken(localStorage.getItem(AUTH_TOKEN_KEY))
  }, [])

  if (!token) {
    return null
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>дром</div>
          <div className={styles.location}>Нижегородская область</div>
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItemActive}>Автомобили</a>
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
        Дром &gt; Продажа автомобилей в Княгинино &gt; Дать объявление о продаже автомобиля бесплатно, без регистрации
      </div>

      <div className={styles.categoryBar}>
        <div className={styles.categoryItemActive}>
          <span className={styles.categoryIcon}>🚗</span>
          Легковые авто
        </div>
        <div className={styles.categoryItem}>
          <span className={styles.categoryIcon}>🚛</span>
          Спецтехника
        </div>
        <div className={styles.categoryItem}>
          <span className={styles.categoryIcon}>🏍️</span>
          Мототехника
        </div>
        <div className={styles.categoryItem}>
          <span className={styles.categoryIcon}>⛵</span>
          Водная техника
        </div>
        <div className={styles.categoryItem}>
          <span className={styles.categoryIcon}>⚙️</span>
          Запчасти, шины
        </div>
      </div>

      <div className={styles.mainContent}>
        <h1 className={styles.title}>Подать объявление о продаже автомобиля в Княгинино</h1>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            return false
          }}
          noValidate
        >
          {/* Базовые поля */}
          <div className={styles.formRow}>
            <label className={styles.label}>
              VIN или номер кузова <span className={styles.required}>•</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                className={styles.input}
              />
              {vin && (
                <button
                  type="button"
                  onClick={() => setVin('')}
                  className={styles.clearButton}
                >
                  ×
                </button>
              )}
              <button type="button" className={styles.infoButton}>i</button>
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>Номер СТС</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={sts}
                onChange={(e) => setSts(e.target.value)}
                className={styles.input}
              />
              <button type="button" className={styles.infoButton}>i</button>
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>Госномер</label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Марка <span className={styles.required}>•</span>
            </label>
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value)
                setModel(models[e.target.value]?.[0] || '')
              }}
              className={styles.select}
            >
              {makes.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Модель <span className={styles.required}>•</span>
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={styles.select}
            >
              {models[make]?.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Руль <span className={styles.required}>•</span>
            </label>
            <div className={styles.toggleGroup}>
              <button
                type="button"
                onClick={handleSteeringWheelClick('left')}
                className={`${styles.toggleButton} ${steeringWheel === 'left' ? styles.toggleButtonActive : ''}`}
              >
                Левый
              </button>
              <button
                type="button"
                onClick={handleSteeringWheelClick('right')}
                className={`${styles.toggleButton} ${steeringWheel === 'right' ? styles.toggleButtonActive : ''}`}
              >
                Правый
              </button>
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Год выпуска <span className={styles.required}>•</span>
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={styles.select}
            >
              <option value="">Выберите год</option>
              {years.map(y => (
                <option key={y} value={y.toString()}>{y}</option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Пробег <span className={styles.required}>•</span>
            </label>
            <div>
              <input
                type="text"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="KM"
                className={styles.input}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={noMileageRF}
                  onChange={(e) => setNoMileageRF(e.target.checked)}
                />
                Без пробега по РФ
              </label>
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Количество владельцев <span className={styles.required}>•</span>
            </label>
            <div className={styles.buttonGroup}>
              {(['1', '2', '3', '4+'] as const).map(owner => (
                <button
                  key={owner}
                  type="button"
                  onClick={handleOwnersClick(owner)}
                  className={`${styles.optionButton} ${owners === owner ? styles.optionButtonActive : ''}`}
                >
                  {owner === '1' ? 'Один' : owner === '2' ? 'Два' : owner === '3' ? 'Три' : 'Четыре и более'}
                  {owners === owner && <span className={styles.checkmark}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Цвет
            </label>
            <div className={styles.colorGroup}>
              {colors.map(col => (
                <button
                  key={col.id}
                  type="button"
                  onClick={handleColorClick(col.id)}
                  className={`${styles.colorButton} ${color === col.id ? styles.colorButtonActive : ''}`}
                  style={{ backgroundColor: col.value }}
                  title={col.name}
                >
                  {color === col.id && <span className={styles.checkmark}>✓</span>}
                </button>
              ))}
              {color && (
                <span className={styles.colorName}>{colorNames[color]}</span>
              )}
            </div>
          </div>

          {/* Особые отметки */}
          <div className={styles.specialNotes}>
            <div className={styles.formRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={documentsProblem}
                  onChange={(e) => setDocumentsProblem(e.target.checked)}
                />
                Документы с проблемами или отсутствуют
              </label>
              {documentsProblem && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    value={documentsProblemText}
                    onChange={(e) => setDocumentsProblemText(e.target.value)}
                    placeholder="Опишите, какие именно проблемы..."
                    className={styles.input}
                  />
                  <div className={styles.warningBox}>
                    ⚠️ Внимание! Авто по запчастям нужно размещать в разделе Автомобили на запчасти
                  </div>
                </div>
              )}
            </div>

            <div className={styles.formRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={needsRepair}
                  onChange={(e) => setNeedsRepair(e.target.checked)}
                />
                Требуется ремонт или не на ходу
              </label>
              {needsRepair && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    value={needsRepairText}
                    onChange={(e) => setNeedsRepairText(e.target.value)}
                    placeholder="Опишите, какие именно проблемы..."
                    className={styles.input}
                  />
                  <div className={styles.warningBox}>
                    ⚠️ Внимание! Допускается только авто с возможностью дальнейшего восстановления. Авто по запчастям нужно размещать в разделе Автомобили на запчасти
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>Описание</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows={6}
            />
          </div>

          {/* Дополнительные поля */}

          <div className={styles.formRow}>
            <label className={styles.label}>
              Цена <span className={styles.required}>•</span>
            </label>
            <div className={styles.priceGroup}>
              <span className={styles.pricePrefix}>₽</span>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={styles.priceInput}
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={styles.select}
              >
                <option value="rubles">Рубли</option>
                <option value="usd">Доллары</option>
                <option value="eur">Евро</option>
              </select>
            </div>
          </div>

          {/* Обмен */}
          <div className={styles.exchangeSection}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={exchangePossible}
                onChange={(e) => setExchangePossible(e.target.checked)}
              />
              Обмен возможен
            </label>
            {exchangePossible && (
              <div style={{ marginTop: '10px' }}>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={exchangeMoreExpensive}
                      onChange={(e) => setExchangeMoreExpensive(e.target.checked)}
                    />
                    На более дорогую
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={exchangeEqual}
                      onChange={(e) => setExchangeEqual(e.target.checked)}
                    />
                    На равноценную
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={exchangeCheaper}
                      onChange={(e) => setExchangeCheaper(e.target.checked)}
                    />
                    На более дешевую
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={exchangeNotCar}
                      onChange={(e) => setExchangeNotCar(e.target.checked)}
                    />
                    Не на авто
                  </label>
                </div>
                <input
                  type="text"
                  value={exchangeDetails}
                  onChange={(e) => setExchangeDetails(e.target.value)}
                  placeholder="Подробнее..."
                  className={styles.input}
                  style={{ marginTop: '10px' }}
                />
              </div>
            )}
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Статус <span className={styles.required}>•</span>
            </label>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleStatusClick('in_stock')}
                className={`${styles.optionButton} ${status === 'in_stock' ? styles.optionButtonActive : ''}`}
              >
                В наличии
              </button>
              <button
                type="button"
                onClick={handleStatusClick('in_transit')}
                className={`${styles.optionButton} ${status === 'in_transit' ? styles.optionButtonActive : ''}`}
              >
                В пути
              </button>
              <button
                type="button"
                onClick={handleStatusClick('on_order')}
                className={`${styles.optionButton} ${status === 'on_order' ? styles.optionButtonActive : ''}`}
              >
                Под заказ
              </button>
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Город продажи <span className={styles.required}>•</span>
            </label>
            <div className={styles.locationGroup}>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={styles.select}
              >
                <option value="Московская область">Московская область</option>
              </select>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={styles.select}
              >
                <option value="">Выберите город</option>
                <option value="Москва">Москва</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Телефон 1 <span className={styles.required}>•</span>
            </label>
            <div>
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                placeholder="+7 (909) 122 43 80"
                className={`${styles.input} ${phoneError ? styles.inputError : ''}`}
                maxLength={18}
              />
              {phoneError && (
                <div className={styles.errorMessage}>{phoneError}</div>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={allowQuestions}
                onChange={(e) => {
                  setAllowQuestions(e.target.checked)
                  // Если включаем вопросы и включен ассистент, загружаем подсказку
                  if (e.target.checked && !technicalCondition) {
                    fetchTechnicalConditionHint()
                  }
                }}
              />
              Разрешить покупателям задавать мне вопросы
            </label>
          </div>

          {allowQuestions && (
            <div className={styles.questionsSection}>
              <h3 className={styles.sectionTitle}>Вопросы для покупателей</h3>

              <div className={styles.formRow}>
                <label className={styles.label}>
                  Вы владелец автомобиля?
                </label>
                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    onClick={() => setIsOwner('Да')}
                    className={`${styles.optionButton} ${isOwner === 'Да' ? styles.optionButtonActive : ''}`}
                  >
                    Да
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOwner('Нет')}
                    className={`${styles.optionButton} ${isOwner === 'Нет' ? styles.optionButtonActive : ''}`}
                  >
                    Нет
                  </button>
                </div>
                {isOwner === 'Нет' && (
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="Если ответ Нет, то кто владелец?"
                      className={styles.input}
                    />
                  </div>
                )}
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Вы вписаны в ПТС?</label>
                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    onClick={() => setPtsRegistered('Да')}
                    className={`${styles.optionButton} ${ptsRegistered === 'Да' ? styles.optionButtonActive : ''}`}
                  >
                    Да
                  </button>
                  <button
                    type="button"
                    onClick={() => setPtsRegistered('Нет')}
                    className={`${styles.optionButton} ${ptsRegistered === 'Нет' ? styles.optionButtonActive : ''}`}
                  >
                    Нет
                  </button>
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Оригинал или дубликат ПТС?</label>
                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    onClick={() => setPtsType('original')}
                    className={`${styles.optionButton} ${ptsType === 'original' ? styles.optionButtonActive : ''}`}
                  >
                    Оригинал
                  </button>
                  <button
                    type="button"
                    onClick={() => setPtsType('duplicate')}
                    className={`${styles.optionButton} ${ptsType === 'duplicate' ? styles.optionButtonActive : ''}`}
                  >
                    Дубликат
                  </button>
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Автомобиль в залоге, кредите или под ограничениями?</label>
                <textarea
                  value={hasLien}
                  onChange={(e) => setHasLien(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                  placeholder="Поле для ответа, может быть пустым"
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>По какой причине продаете автомобиль?</label>
                <textarea
                  value={sellReason}
                  onChange={(e) => setSellReason(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                  placeholder="Поле для ответа, может быть пустым"
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Сколько лет владеете автомобилем?</label>
                <input
                  type="text"
                  value={ownershipYears}
                  onChange={(e) => setOwnershipYears(e.target.value)}
                  className={styles.input}
                  placeholder="Поле для ответа, может быть пустым"
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Где и как обслуживался автомобиль?</label>
                <div className={styles.hintBox}>
                  <span className={styles.hintIcon}>💡</span>
                  <span className={styles.hintText}>Есть ли сервисная книжка, отметки о ТО, где и как обслуживался автомобиль.</span>
                </div>
                <textarea
                  value={serviceHistory}
                  onChange={(e) => setServiceHistory(e.target.value)}
                  className={styles.textarea}
                  rows={4}
                  placeholder="Ответ может быть пустым"
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Есть ли второй комплект резины?</label>
                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    onClick={() => setHasSecondTires('Да')}
                    className={`${styles.optionButton} ${hasSecondTires === 'Да' ? styles.optionButtonActive : ''}`}
                  >
                    Да
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasSecondTires('Нет')}
                    className={`${styles.optionButton} ${hasSecondTires === 'Нет' ? styles.optionButtonActive : ''}`}
                  >
                    Нет
                  </button>
                </div>
                {hasSecondTires === 'Да' && (
                  <div style={{ marginTop: '10px' }}>
                    <div className={styles.hintBox}>
                      <span className={styles.hintIcon}>💡</span>
                      <span className={styles.hintText}>Если ответ Да, то какая резина (летняя/зимняя)?</span>
                    </div>
                    <input
                      type="text"
                      value={tireType}
                      onChange={(e) => setTireType(e.target.value)}
                      className={styles.input}
                      placeholder="Ответ может быть пустым"
                    />
                  </div>
                )}
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Попадал ли автомобиль в ДТП?</label>
                <textarea
                  value={hasAccident}
                  onChange={(e) => setHasAccident(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                  placeholder="Поле для ответа, может быть пустым"
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Возможен ли торг?</label>

                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    onClick={() => setBargainPossible('Да')}
                    className={`${styles.optionButton} ${bargainPossible === 'Да' ? styles.optionButtonActive : ''}`}
                  >
                    Да
                  </button>
                  <button
                    type="button"
                    onClick={() => setBargainPossible('Нет')}
                    className={`${styles.optionButton} ${bargainPossible === 'Нет' ? styles.optionButtonActive : ''}`}
                  >
                    Нет
                  </button>
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Где можно посмотреть автомобиль?</label>
                <select
                  value={viewLocation}
                  onChange={(e) => setViewLocation(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Выберите станцию метро</option>
                  {moscowMetroStations.map(station => (
                    <option key={station} value={station}>{station}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Когда можно посмотреть автомобиль?</label>
                <textarea
                  value={viewTime}
                  onChange={(e) => setViewTime(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                  placeholder="Поле для ответа, может быть пустым"
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Техническое состояние</label>
                {!technicalCondition && (
                  <div className={styles.hintBox}>
                    <span className={styles.hintIcon}>⏳</span>
                    <span className={styles.hintText}>Загрузка подсказки от LLM...</span>
                  </div>
                )}
                {technicalCondition && (
                  <div className={styles.hintBox}>
                    <span className={styles.hintIcon}>🤖</span>
                    <span className={styles.hintText}>Подсказка от LLM загружена. Вы можете дополнить информацию ниже.</span>
                  </div>
                )}
                <textarea
                  value={technicalCondition}
                  onChange={(e) => setTechnicalCondition(e.target.value)}
                  className={styles.textarea}
                  rows={6}
                  placeholder="Опишите техническое состояние автомобиля"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitFormButton}
            onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation()

              // Валидация телефона
              if (!phone) {
                alert('Пожалуйста, укажите телефон')
                return
              }

              if (!validatePhone(phone)) {
                alert('Пожалуйста, укажите корректный номер телефона')
                return
              }

              handlePut()

            }}
          >
            Добавить бесплатно и загрузить фото
          </button>

          <div className={styles.terms}>
            Размещая объявление, вы соглашаетесь с{' '}
            <a href="#" className={styles.link}>Правилами портала Дром</a> и{' '}
            <a href="#" className={styles.link}>требованиями к размещению объявлений</a>
          </div>
        </form>
      </div>
    </div>
  )
}



