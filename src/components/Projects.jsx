import { projects } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import './Projects.css'

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function ProjectCard({ project, index }) {
  const ref = useReveal()
  const hasGithub = project.github && project.github !== '#'
  const hasDemo = project.demo && project.demo !== '#'

  return (
    <article
      ref={ref}
      className="project-card reveal"
      style={{ '--reveal-delay': `${(index % 2) * 0.12}s` }}
    >
      <div className="project-top">
        <span className="project-glyph mono" aria-hidden="true">
          ❯
        </span>
        <span className="project-links">
          {hasGithub && (
            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} on GitHub`}>
              <GithubIcon />
            </a>
          )}
          {hasDemo && (
            <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}>
              <ExternalIcon />
            </a>
          )}
        </span>
      </div>
      <h3 className="project-name">{project.name}</h3>
      <p className="project-desc">{project.description}</p>
      <p className="project-tech mono">{project.tech.join(' · ')}</p>
    </article>
  )
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeader label="projects" title="Things I'm building" />
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
