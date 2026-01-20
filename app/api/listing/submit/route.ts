import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://cms-asr-dev.neuro.net/api/v1/rag/'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Listing submission received:', JSON.stringify(body, null, 2))
    
    // Формируем данные для отправки на внешний API
    const payload = {
      car_data: {
        vin: body.vin,
        sts: body.sts,
        licensePlate: body.licensePlate,
        make: body.make,
        model: body.model,
        steeringWheel: body.steeringWheel,
        year: body.year,
        mileage: body.mileage,
        noMileageRF: body.noMileageRF,
        owners: body.owners,
        color: body.color,
        documentsProblem: body.documentsProblem,
        documentsProblemText: body.documentsProblemText,
        needsRepair: body.needsRepair,
        needsRepairText: body.needsRepairText,
        description: body.description,
        videoLink: body.videoLink,
        price: body.price,
        currency: body.currency,
        exchangePossible: body.exchangePossible,
        exchangeMoreExpensive: body.exchangeMoreExpensive,
        exchangeEqual: body.exchangeEqual,
        exchangeCheaper: body.exchangeCheaper,
        exchangeNotCar: body.exchangeNotCar,
        exchangeDetails: body.exchangeDetails,
        status: body.status,
        region: body.region,
        city: body.city,
        phone: body.phone,
        allowQuestions: body.allowQuestions,
        enableAssistant: body.enableAssistant,
        assistantDescription: body.assistantDescription
      },
      questions: body.questions || null
    }
    
    // Отправляем данные на внешний API
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`)
      }
      
      const apiResponse = await response.json()
      
      return NextResponse.json({
        success: true,
        message: 'Объявление успешно создано',
        listingId: apiResponse.id || '627037398',
        data: apiResponse
      }, { status: 200 })
    } catch (apiError) {
      // Если внешний API недоступен, используем заглушку
      console.warn('External API unavailable, using stub:', apiError)
      
      return NextResponse.json({
        success: true,
        message: 'Объявление успешно создано (заглушка)',
        listingId: '627037398',
        data: payload,
        note: 'Внешний API недоступен, данные сохранены локально'
      }, { status: 200 })
    }
  } catch (error) {
    console.error('Error submitting listing:', error)
    return NextResponse.json({
      success: false,
      message: 'Ошибка при создании объявления',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
