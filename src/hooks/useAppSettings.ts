import { useEffect, useState } from 'react'

export interface AppSettings {
  theme: 'dark' | 'light'
  fontSize: number
  autoFormat: boolean
  showLineNumbers: boolean
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  fontSize: 13,
  autoFormat: true,
  showLineNumbers: true,
}

const STORAGE_KEY = 'code-runner-settings'

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    // Sync theme with DOM
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [settings])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (err) {
        console.error('Failed to load settings:', err)
      }
    }
    setIsLoading(false)
  }, [])

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return { settings, updateSettings, isLoading }
}
