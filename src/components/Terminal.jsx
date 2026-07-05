import { useEffect, useRef, useState } from 'react'
import { profile, about, experience, projects, education } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import './Terminal.css'

const COMMANDS = [
  { name: 'about', desc: 'who i am' },
  { name: 'skills', desc: 'what i work with' },
  { name: 'projects', desc: "things i'm building" },
  { name: 'experience', desc: "where i've worked" },
  { name: 'education', desc: 'where i studied' },
  { name: 'resume', desc: 'download the pdf' },
  { name: 'contact', desc: 'get in touch' },
  { name: 'clear', desc: 'wipe the screen' },
]

const COMMAND_NAMES = COMMANDS.map((c) => c.name)

export default function Terminal() {
  const sectionRef = useReveal()
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const runRef = useRef(null)
  const nextId = useRef(0)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [lines, setLines] = useState([])

  const makeLine = (kind, node) => ({ id: (nextId.current += 1), kind, node })

  function Chip({ cmd }) {
    return (
      <button type="button" className="term-chip" onClick={() => runRef.current?.(cmd)}>
        {cmd}
      </button>
    )
  }

  const chipRow = (names) => (
    <span className="term-chip-row">
      {names.map((name) => (
        <Chip key={name} cmd={name} />
      ))}
    </span>
  )

  // boot / welcome
  useEffect(() => {
    setLines([
      makeLine('out', `last login: ${new Date().toDateString()} — from your browser`),
      makeLine('hello', 'hello, world 👋'),
      makeLine('out', "welcome to madhav's portfolio shell."),
      makeLine('out', (
        <>
          type <Chip cmd="help" /> or click a command:{' '}
          {chipRow(['about', 'projects', 'skills', 'resume', 'contact'])}
        </>
      )),
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function resolve(cmd) {
    const exact = {
      'sudo hire madhav': [
        '[sudo] password for visitor: ********',
        'permission granted ✓ hiring process initialized.',
        <>
          next step: <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </>,
      ],
      'hire madhav': ['excellent taste. escalating…', 'try: sudo hire madhav'],
      hello: ['hello, world 👋 — nice to meet you.'],
      hi: ['hello, world 👋 — nice to meet you.'],
      'hello world': ['that\'s my line.'],
      exit: ['there is no escape. (the contact section is right below, though ⌄)'],
      theme: ['this portfolio is dark-mode only. some commitments matter.'],
      'theme light': ['absolutely not.'],
      'light mode': ['absolutely not.'],
      ls: ['about.md   skills.json   projects/   resume.pdf   contact.sh'],
      'cat resume.pdf': 'RESUME',
      pwd: ['/home/madhav/portfolio'],
    }
    if (exact[cmd]) return exact[cmd]

    const token = cmd.split(' ')[0]
    switch (token) {
      case 'help':
        return [
          'available commands:',
          ...COMMANDS.map((c) => (
            <span className="term-help-row" key={c.name}>
              <Chip cmd={c.name} />
              <span>{c.desc}</span>
            </span>
          )),
          '(psst — also try: whoami, ls, sudo hire madhav)',
        ]
      case 'about':
        return [about.paragraphs[0], `status: ${profile.status} · ${profile.location.toLowerCase()}`]
      case 'skills':
        return about.skillGroups.map((g) => (
          <span className="term-help-row" key={g.label}>
            <span className="term-accent">{g.label}/</span>
            <span>{g.skills.join(' · ')}</span>
          </span>
        ))
      case 'projects':
        return [
          ...projects.map((p) => (
            <span key={p.name}>
              <span className="term-accent">❯ {p.name}</span> — {p.description.split('.')[0].toLowerCase()}.
            </span>
          )),
          '(scroll up for the full cards)',
        ]
      case 'experience':
        return experience.map((e) => (
          <span className="term-help-row term-help-row--wide" key={e.company}>
            <span className="term-dim">{e.period}</span>
            <span>
              {e.role} · <span className="term-accent">{e.company}</span> ({e.location})
            </span>
          </span>
        ))
      case 'education':
        return education.map((e) => (
          <span key={e.school}>
            {e.degree} — <span className="term-dim">{e.school}</span>
          </span>
        ))
      case 'resume':
      case 'cv':
        return 'RESUME'
      case 'contact':
      case 'email':
        return [
          <>
            email:    <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </>,
          <>
            linkedin: <a href={profile.links.linkedin} target="_blank" rel="noreferrer">madhav-thakur</a>
          </>,
        ]
      case 'whoami':
        return [
          "you? a visitor with great timing.",
          'me? madhav thakur — full-stack engineer building ai-integrated web apps.',
        ]
      case 'clear':
        return 'CLEAR'
      case 'sudo':
        return ['visitor is not in the sudoers file. this incident will be reported.']
      default: {
        const guess = COMMAND_NAMES.find((n) => n.startsWith(token))
        return [
          <span className="term-err" key="err">
            command not found: {token}
            {guess ? (
              <>
                {' '}— did you mean <Chip cmd={guess} />?
              </>
            ) : (
              <>
                {' '}— try <Chip cmd="help" />
              </>
            )}
          </span>,
        ]
      }
    }
  }

  function run(raw) {
    const cmdText = raw.trim()
    if (!cmdText) return
    const normalized = cmdText.replace(/^\/+/, '').toLowerCase().replace(/\s+/g, ' ').trim()
    const result = resolve(normalized)

    setHistory((prev) => [...prev, cmdText])
    setHistoryIndex(-1)
    setInput('')

    if (result === 'CLEAR') {
      setLines([])
      return
    }

    let outputs = result
    if (result === 'RESUME') {
      const link = document.createElement('a')
      link.href = profile.resume
      link.download = ''
      document.body.appendChild(link)
      link.click()
      link.remove()
      outputs = ['⬇ downloading Madhav_Thakur_Resume.pdf …', 'check your downloads folder.']
    }

    setLines((prev) =>
      [...prev, makeLine('cmd', cmdText), ...outputs.map((node) => makeLine('out', node))].slice(-200)
    )
  }

  runRef.current = run

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  function onKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const next = historyIndex + 1
      if (next >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(next)
        setInput(history[next])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const token = input.replace(/^\/+/, '').toLowerCase()
      if (!token) return
      const match = COMMAND_NAMES.find((n) => n.startsWith(token))
      if (match) setInput(match)
    }
  }

  return (
    <section className="section" id="terminal">
      <div className="container">
        <SectionHeader label="terminal" title="Prefer the command line?" />
        <div
          ref={sectionRef}
          className="term reveal"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="term-chrome">
            <span className="term-dot term-dot--r" aria-hidden="true" />
            <span className="term-dot term-dot--y" aria-hidden="true" />
            <span className="term-dot term-dot--g" aria-hidden="true" />
            <span className="term-title mono">visitor@madhav: ~/portfolio</span>
          </div>
          <div ref={bodyRef} className="term-body mono" role="log" aria-live="polite">
            {lines.map((line) => (
              <div key={line.id} className={`term-line term-line--${line.kind}`}>
                {line.kind === 'cmd' && (
                  <span className="term-prompt">
                    <span className="term-host">visitor@madhav</span>:~<span className="term-accent">$</span>{' '}
                  </span>
                )}
                {line.node}
              </div>
            ))}
            <form
              className="term-input-row"
              onSubmit={(e) => {
                e.preventDefault()
                run(input)
              }}
            >
              <label className="term-prompt" htmlFor="term-input">
                <span className="term-host">visitor@madhav</span>:~<span className="term-accent">$</span>
              </label>
              <input
                id="term-input"
                ref={inputRef}
                className="term-input mono"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="terminal input — type help for commands"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
