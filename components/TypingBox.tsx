'use client'

import { useEffect, useRef, useState } from 'react'
import { useTypingSettings } from '@/store/useTypingSettings'
import wordList from '@/lib/word-database.json'
import { useTypingResult, calculateTypingResult } from '@/store/useTypingResult'
import Results from '@/components/Results'

export default function TypingBox() {
  const { value, mode } = useTypingSettings()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [words, setWords] = useState('')
  const [typed, setTyped] = useState('')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [startTime, setStartTime] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)

  const { setResult, result, resetResult } = useTypingResult()

  const generateWords = () => {
    const count = mode === 'words' ? value : 50
    const shuffled = [...wordList].sort(() => Math.random() - 0.5)
    setWords(shuffled.slice(0, count).join(' '))
    setTyped('')
    setStartTime(null)
    setFinished(false)
    resetResult()
  }

  useEffect(() => generateWords(), [mode, value])

  useEffect(() => {
    if (finished && startTime) {
      const duration = (Date.now() - startTime) / 1000
      const result = calculateTypingResult(words, typed, duration)
      setResult(result)
    }
  }, [finished])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const charElements = container.querySelectorAll('[data-char-index]')
    const currentCharElement = charElements[typed.length] as HTMLElement

    if (currentCharElement) {
      const containerRect = container.getBoundingClientRect()
      const charRect = currentCharElement.getBoundingClientRect()
      const styles = getComputedStyle(container)
      const paddingLeft = parseFloat(styles.paddingLeft)
      const paddingTop = parseFloat(styles.paddingTop)

      setCursorPos({
        x: charRect.left - containerRect.left - paddingLeft,
        y: charRect.top - containerRect.top - paddingTop,
      })
    } else {
      setCursorPos({ x: 0, y: 0 })
    }
  }, [typed])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!startTime) setStartTime(Date.now())
    e.preventDefault()

    setTyped((prev) => {
      let updated = prev
      if (e.key === 'Backspace') updated = prev.slice(0, -1)
      else if (e.key === 'Tab') updated = prev + '  '
      else if (e.key === ' ') updated = prev + ' '
      else if (e.key.length === 1) updated = prev + e.key

      if (updated.length === words.length) {
        setFinished(true)
      }

      return updated
    })
  }

  const renderWords = () =>
    words.split('').map((char, i) => {
      const userChar = typed[i]
      const isTyped = i < typed.length
      const correct = userChar === char

      let className = 'text-zinc-600'
      if (isTyped) className = correct ? 'text-white' : 'text-red-500'

      return (
        <span
          key={i}
          data-char-index={i}
          className={`relative text-2xl font-medium ${className}`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      )
    })

  if (result) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <Results {...result} onRestart={generateWords} />
      </div>
    )
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="relative w-full max-h-[320px] overflow-auto rounded-lg bg-[#1a1a1a] border border-neutral-700 p-6 font-mono leading-relaxed text-white shadow-md"
        onClick={() => inputRef.current?.focus()}
      >
        <pre className="relative whitespace-pre-wrap break-words font-mono">
          {renderWords()}
          <div
            className="absolute w-[2px] h-[1.8em] bg-white transition-all duration-75 animate-pulse z-10"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          />
        </pre>
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full opacity-0 outline-none"
          autoFocus
        />
      </div>
    </div>
  )
}
