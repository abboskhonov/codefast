'use client'

import { useTypingSettings } from '@/store/useTypingSettings'

const TIME_OPTIONS = [15, 30, 60]
const WORD_OPTIONS = [10, 25, 50]
const MODES = ['time', 'words'] as const

export default function TypingSettings() {
  const { mode, value, setMode, setValue } = useTypingSettings()

  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-6 text-sm">
      {/* Mode Selector */}
      <div className="flex items-center gap-2">
        <span className="text-gray-400">Mode:</span>
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m)
              setValue(m === 'time' ? 30 : 25) // default values
            }}
            className={`px-3 py-1 rounded border transition-colors ${
              mode === m
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Time / Word Options */}
      <div className="flex items-center gap-2">
        <span className="text-gray-400">
          {mode === 'time' ? 'Seconds:' : 'Words:'}
        </span>
        {(mode === 'time' ? TIME_OPTIONS : WORD_OPTIONS).map((opt) => (
          <button
            key={opt}
            onClick={() => setValue(opt)}
            className={`px-3 py-1 rounded border transition-colors ${
              value === opt
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
