import { profile } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import './Footer.css'

export default function Footer() {
  const ref = useReveal()

  return (
    <footer className="section" id="contact">
      <div className="container">
        <SectionHeader label="contact" title="Let's build something intelligent." />
        <div ref={ref} className="footer-body reveal">
          <p className="footer-blurb">
            I'm open to roles in AI-integrated products, developer tooling, or full-stack
            engineering at scale. If that's what you're working on — or you just want to talk
            RAG pipelines — my inbox is open.
          </p>
          <div className="footer-cta-row">
            <a href={`mailto:${profile.email}`} className="btn btn--primary mono">
              say hello ✉
            </a>
            <a href={profile.resume} download className="btn btn--ghost mono">
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
        </div>

        <div className="footer-bar mono">
          <span>© {new Date().getFullYear()} madhav thakur</span>
          <span className="footer-built">designed &amp; built with react + vite</span>
          <a href="#top" className="footer-top">
            cd ~
          </a>
        </div>
      </div>
    </footer>
  )
}
