import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile.js'
import './Nav.css'

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#experience', label: 'experience' },
  { href: '#projects', label: 'projects' },
  { href: '#terminal', label: 'terminal' },
  { href: '#contact', label: 'contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const progress = max > 0 ? window.scrollY / max : 0
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div ref={progressRef} className="nav-progress" aria-hidden="true" />
      <div className="nav-inner container">
        <a href="#top" className="nav-logo mono">
          {profile.handle}
        </a>
        <div className="nav-links mono">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>
        <a href={profile.resume} download className="nav-resume mono">
          résumé ↓
        </a>
      </div>
    </nav>
  )
}
