// store/useTypingSettings.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Mode = 'time' | 'words'

type TypingSettingsState = {
  mode: Mode
  value: number
  setMode: (mode: Mode) => void
  setValue: (value: number) => void
}

export const useTypingSettings = create<TypingSettingsState>()(
  persist(
    (set) => ({
      mode: 'words',
      value: 25,
      setMode: (mode) => set({ mode }),
      setValue: (value) => set({ value }),
    }),
    {
      name: 'typing-settings', // key in localStorage
    }
  )
)
