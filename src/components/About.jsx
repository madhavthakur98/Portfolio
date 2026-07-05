import { about } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import './About.css'

export default function About() {
  const proseRef = useReveal()
  const skillsRef = useReveal()

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeader label="about" title="A little context" />
        <div className="about-grid">
          <div ref={proseRef} className="about-prose reveal">
            {about.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
          <div ref={skillsRef} className="about-skills reveal" style={{ '--reveal-delay': '0.15s' }}>
            {about.skillGroups.map((group) => (
              <div key={group.label} className="about-skill-group">
                <p className="about-skill-label mono">{group.label}/</p>
                <ul className="about-chip-list">
                  {group.skills.map((skill) => (
                    <li key={skill} className="about-chip mono">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
