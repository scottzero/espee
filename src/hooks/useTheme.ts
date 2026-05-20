import { useState, useEffect } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('espee-theme') === 'dark'
  })

  function toggleDark() {
    const next = !dark
    setDark(next)
    const theme = next ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('espee-theme', theme)
  }

  useEffect(() => {
    const theme = dark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  return { dark, toggleDark }
}