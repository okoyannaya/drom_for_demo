'use client'

import { useState } from 'react'
import styles from './loginPage.module.css'
type Props = {
    onSuccess: VoidFunction
}
export const AUTH_TOKEN_KEY = "token"


export const LoginPage = ({ onSuccess }: Props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')


const handleLogin = async () => {
  if (!login || !password) return;

  try {
    const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ login, password }),
})

    if (!response.ok) throw new Error('Auth failed');

    const data = await response.json();

    if (!data?.token) throw new Error('No token in response');

    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    onSuccess();
  } catch (e) {
    console.error(e);
    setError('Неверный логин или пароль');
  }
};

  return (
    <div className={styles.loginPage}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход</h1>

        <label className={styles.label} >Логин</label>
        <input className={styles.input} onChange={e=>setLogin(e.target.value)} type="text" />

        <label className={styles.label}>Пароль</label>
        <input className={styles.input} onChange={e=>setPassword(e.target.value)}type="password" />

        {error && <div className={styles.error}>{error}</div>}

        <button
          className={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Входим…' : 'Войти'}
        </button>
      </div>
    </div>
  )
}