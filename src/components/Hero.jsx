import { profile } from '../data/profile.js'
import useTyped from '../hooks/useTyped.js'
import Pipeline from './Pipeline.jsx'
import './Hero.css'

export default function Hero() {
  const { typed, done } = useTyped('whoami')
  const [headStart, headAccent, headEnd] = profile.headline

  return (
    <section className="hero" id="top">
      <div className="hero-inner container">
        <p className="hero-prompt mono">
          <span className="hero-prompt-symbol">$&nbsp;</span>
          {typed}
          <span className={`hero-cursor${done ? ' hero-cursor--blink' : ''}`} aria-hidden="true" />
        </p>

        <h1 className="hero-name hero-rise" style={{ '--d': '0.9s' }}>
          {profile.name}
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
          <a href={profile.resume} download className="btn btn--primary mono">
            download résumé ↓
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost mono"
          >
            linkedin ↗
          </a>
          <a
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
