import { profile } from '../data/profile.js'
import useTyped from '../hooks/useTyped.js'
import useScramble from '../hooks/useScramble.js'
import useMagnetic from '../hooks/useMagnetic.js'
import Pipeline from './Pipeline.jsx'
import VectorField from './VectorField.jsx'
import './Hero.css'

export default function Hero() {
  const { typed, done } = useTyped('whoami')
  const name = useScramble(profile.name, { startDelay: 1000, duration: 1100 })
  const [headStart, headAccent, headEnd] = profile.headline
  const resumeRef = useMagnetic()
  const linkedinRef = useMagnetic()
  const githubRef = useMagnetic()

  return (
    <section className="hero" id="top">
      <VectorField />
      <div className="hero-inner container">
        <p className="hero-prompt mono">
          <span className="hero-prompt-symbol">$&nbsp;</span>
          {typed}
          <span className={`hero-cursor${done ? ' hero-cursor--blink' : ''}`} aria-hidden="true" />
        </p>

        <h1 className="hero-name hero-rise" style={{ '--d': '0.9s' }} aria-label={profile.name}>
          <span aria-hidden="true">{name}</span>
        </h1>

        <p className="hero-headline hero-rise" style={{ '--d': '1.05s' }}>
          {headStart} <em className="hero-accent">{headAccent}</em> {headEnd}
        </p>

        <p className="hero-intro hero-rise" style={{ '--d': '1.2s' }}>
          {profile.intro}
        </p>

        <p className="hero-status mono hero-rise" style={{ '--d': '1.35s' }}>
          <span className="hero-status-dot" aria-hidden="true" />
          {profile.status} · {profile.location.toLowerCase()}
        </p>

        <div className="hero-cta-row hero-rise" style={{ '--d': '1.5s' }}>
          <a ref={resumeRef} href={profile.resume} download className="btn btn--primary mono">
            download résumé ↓
          </a>
          <a
            ref={linkedinRef}
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost mono"
          >
            linkedin ↗
          </a>
          <a
            ref={githubRef}
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost mono"
          >
            github ↗
          </a>
        </div>

        <div className="hero-rise" style={{ '--d': '1.7s' }}>
          <Pipeline />
        </div>
      </div>
    </section>
  )
}
