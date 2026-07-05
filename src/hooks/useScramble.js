import { useEffect, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#$%&@:;0123456789'

const scrambleAll = (text) =>
  text.replace(/\S/g, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])

// Resolves `text` out of a field of random glyphs, left to right.
// Renders the plain text immediately under reduced motion.
export default function useScramble(text, { startDelay = 0, duration = 1000 } = {}) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      return
    }

    setDisplay(scrambleAll(text))
    let raf
    let start
    const timer = setTimeout(() => {
      const step = (now) => {
        if (!start) start = now
        const progress = Math.min(1, (now - start) / duration)
        const solved = Math.ceil(progress * text.length)
        let out = text.slice(0, solved)
        for (let i = solved; i < text.length; i += 1) {
          out += text[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
        setDisplay(out)
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, startDelay)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [text, startDelay, duration])

  return display
}
