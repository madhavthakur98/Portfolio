import { education } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import './Education.css'

function EducationItem({ item, index }) {
  const ref = useReveal()

  return (
    <article
      ref={ref}
      className="edu-item reveal"
      style={{ '--reveal-delay': `${index * 0.1}s` }}
    >
      <h3 className="edu-degree">{item.degree}</h3>
      <p className="edu-school">{item.school}</p>
      <p className="edu-location mono">{item.location}</p>
    </article>
  )
}

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeader label="education" title="Where I studied" />
        <div className="edu-grid">
          {education.map((item, index) => (
            <EducationItem key={item.school} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
