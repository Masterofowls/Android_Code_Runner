import { Settings, X } from 'lucide-react'
import { useState } from 'react'
import type { AppSettings } from '../hooks/useAppSettings'

interface SettingsPanelProps {
  settings: AppSettings
  onUpdateSettings: (settings: Partial<AppSettings>) => void
}

export default function SettingsPanel({
  settings,
  onUpdateSettings,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        title="Settings"
      >
        <Settings size={18} />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Font Size */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Font Size: {settings.fontSize}px
            </label>
            <input
              type="range"
              min="10"
              max="20"
              value={settings.fontSize}
              onChange={(e) =>
                onUpdateSettings({ fontSize: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          {/* Theme */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) =>
                onUpdateSettings({
                  theme: e.target.value as 'dark' | 'light',
                })
              }
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          {/* Auto Format */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoFormat"
              checked={settings.autoFormat}
              onChange={(e) =>
                onUpdateSettings({ autoFormat: e.target.checked })
              }
              className="w-4 h-4 rounded"
            />
            <label htmlFor="autoFormat" className="ml-3 text-gray-300 text-sm">
              Auto Format on Save
            </label>
          </div>

          {/* Show Line Numbers */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lineNumbers"
              checked={settings.showLineNumbers}
              onChange={(e) =>
                onUpdateSettings({ showLineNumbers: e.target.checked })
              }
              className="w-4 h-4 rounded"
            />
            <label htmlFor="lineNumbers" className="ml-3 text-gray-300 text-sm">
              Show Line Numbers
            </label>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
