import { experience } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import './Experience.css'

function ExperienceItem({ item, index }) {
  const ref = useReveal()

  return (
    <article
      ref={ref}
      className="exp-item reveal"
      style={{ '--reveal-delay': `${index * 0.1}s` }}
    >
      <p className="exp-period mono">{item.period}</p>
      <div className="exp-body">
        <h3 className="exp-role">
          {item.role} <span className="exp-company">· {item.company}</span>
        </h3>
        <p className="exp-location mono">{item.location}</p>
        <ul className="exp-bullets">
          {item.bullets.map((bullet) => (
            <li key={bullet.slice(0, 24)}>{bullet}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeader label="experience" title="Where I've worked" />
        <div className="exp-list">
          {experience.map((item, index) => (
            <ExperienceItem key={item.company} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
