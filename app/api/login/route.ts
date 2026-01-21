import { API_URL } from '@/app/assets/constants'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { login, password } = await req.json()
  const btoaLoginAndPass = Buffer.from(`${login}:${password}`).toString('base64')

  const response = await fetch(`${API_URL}/rbac/auth?exp=3600`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoaLoginAndPass,
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
    },
  })

  const data = await response.json()

  return NextResponse.json(data)
}