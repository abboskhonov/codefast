import { create } from 'zustand'

type TypingResult = {
  wpm: number
  accuracy: number
  time: number
}

type State = {
  result: TypingResult | null
  setResult: (result: TypingResult) => void
  resetResult: () => void
}

export const useTypingResult = create<State>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
  resetResult: () => set({ result: null }),
}))

export function calculateTypingResult(expected: string, typed: string, time: number) {
  const correctChars = expected.split('').filter((char, i) => typed[i] === char).length
  const accuracy = (correctChars / expected.length) * 100
  const wpm = (typed.trim().split(/\s+/).length / time) * 60

  return {
    wpm: Math.round(wpm),
    accuracy: Math.round(accuracy),
    time: Math.round(time),
  }
}
