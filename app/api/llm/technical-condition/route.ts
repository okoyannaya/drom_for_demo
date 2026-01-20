import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { make, model, year, mileage } = body
    
    // Локальная заглушка для подсказки о техническом состоянии
    // Данные не получаем с внешнего API, только отправляем
    
    const hint = generateHint(make, model, year, mileage)
    
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      success: true,
      hint: hint
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching LLM hint:', error)
    return NextResponse.json({
      success: false,
      hint: 'Рекомендуется проверить: двигатель, трансмиссию, подвеску, тормозную систему, кузов на наличие коррозии и повреждений.'
    }, { status: 500 })
  }
}

function generateHint(make: string, model: string, year: string, mileage: string): string {
  return [
    `Рекомендуется проверить: двигатель, трансмиссию, подвеску, тормозную систему, кузов на наличие коррозии и повреждений.`,
    `Для ${make} ${model} ${year} года выпуска с пробегом ${mileage ? `${mileage} км` : 'не указан'} рекомендуется обратить внимание на:`,
    `- Состояние двигателя и масла`,
    `- Работу трансмиссии (коробки передач)`,
    `- Состояние подвески и амортизаторов`,
    `- Тормозную систему (колодки, диски, жидкость)`,
    `- Состояние кузова (коррозия, вмятины, царапины)`,
    `- Электронику и освещение`,
    `- Состояние шин и дисков`,
    `- Работу кондиционера и отопителя`,
    `- Состояние салона (обивка, коврики, панель приборов)`
  ].join('\n')
}
