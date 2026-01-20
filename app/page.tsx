'use client'

import CarListingForm from '@/components/CarListingForm'
import { AUTH_TOKEN_KEY, LoginPage } from '@/components/loginPage'
import { useEffect, useState } from 'react'

  
export default function Home() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_TOKEN_KEY)
    setIsAuth(!!auth?.length)
  }, [])

  if (isAuth === null) {
    return null 
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {isAuth ? (
        <CarListingForm />
      ) : (
        <LoginPage onSuccess={() => setIsAuth(true)} />
      )}
    </main>
  )
}











