import { useEffect, useState } from 'react'

// Types `text` character by character. Renders the full string
// immediately when the user prefers reduced motion.
export default function useTyped(text, { speed = 70, startDelay = 400 } = {}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length)
      return
    }

    let i = 0
    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { typed: text.slice(0, count), done: count >= text.length }
}
