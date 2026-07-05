import useReveal from '../hooks/useReveal.js'

export default function SectionHeader({ label, title }) {
  const ref = useReveal()

  return (
    <header ref={ref} className="reveal">
      <p className="section-label">{'// '}{label}</p>
      <h2 className="section-title">{title}</h2>
    </header>
  )
}
