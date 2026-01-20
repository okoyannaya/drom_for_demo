import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()

  const auth = req.headers.get('authorization')
  if (!auth) {
    return NextResponse.json({ error: 'No auth' }, { status: 401 })
  }

  const response = await fetch(
    `https://cms-asr-dev.neuro.net/api/v1/rag/agent/${params.id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: auth, // Bearer 그대로 пробрасываем
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    }
  )

  const text = await response.text()

  return new NextResponse(text, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('content-type') || 'application/json',
    },
  })
}