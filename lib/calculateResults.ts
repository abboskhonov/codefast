export type TypingResult = {
  wpm: number
  accuracy: number
  correct: number
  incorrect: number
  total: number
}

export function calculateTypingResults(expected: string, typed: string, duration: number): TypingResult {
  const total = expected.length
  let correct = 0

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === expected[i]) correct++
  }

  const incorrect = typed.length - correct
  const accuracy = total > 0 ? (correct / total) * 100 : 0
  const wpm = (correct / 5) / (duration / 60)

  return {
    wpm: Math.round(wpm),
    accuracy: Math.round(accuracy),
    correct,
    incorrect,
    total,
  }
}
