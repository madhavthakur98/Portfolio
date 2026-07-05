// ─────────────────────────────────────────────────────────────
// All site content lives in this one file.
// Edit projects, links, and copy here — no need to touch components.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Madhav Thakur',
  handle: '~/madhav-thakur',
  location: 'Delhi, India',
  status: 'open to AI-integrated product work',
  headline: ['Full-stack engineer building', 'AI-integrated', 'web applications.'],
  intro:
    'Software engineer at Unifyed — Node.js APIs and React frontends for a higher-ed SaaS platform. After hours: RAG pipelines, embeddings, and vector search.',
  email: 'madhavthakur1995@gmail.com',
  resume: '/Madhav_Thakur_Resume.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/madhav-thakur-82785311b',
    github: '#', // TODO: replace with your GitHub profile URL
  },
}

export const about = {
  paragraphs: [
    "I'm a software engineer at Unifyed, where I build and ship full-stack features for a SaaS platform used by higher-education institutions around the world — REST APIs in Node.js and Express, React on the front, MongoDB underneath.",
    "Outside the day job, I'm drawn to the AI layer of the web: RAG pipelines, LLM integration, vector search, embedding-based systems. Not the flashy demos — the plumbing that makes them reliable enough to ship.",
    'I care about products people actually find useful, APIs that still make sense six months later, and code reviews that leave the codebase better than they found it.',
  ],
  skillGroups: [
    { label: 'frontend', skills: ['React', 'Component architecture', 'Vite', 'Responsive UI'] },
    { label: 'backend', skills: ['Node.js', 'Express', 'REST API design', 'Auth & middleware'] },
    { label: 'data', skills: ['MongoDB', 'PostgreSQL', 'NoSQL modeling', 'pgvector'] },
    { label: 'ai layer', skills: ['RAG pipelines', 'LLM integration', 'Vector search', 'Embeddings'] },
  ],
}

export const experience = [
  {
    role: 'Software Engineer',
    company: 'Unifyed',
    location: 'Gurugram',
    period: 'Aug 2025 — Present',
    bullets: [
      'Build and maintain full-stack features for a SaaS platform used by higher-education institutions globally.',
      'Design RESTful APIs in Node.js/Express consumed by React frontends, with MongoDB as the primary datastore.',
      'Work cross-functionally with product and design to ship improvements to the core platform.',
      'Contribute to code quality through reviews and shared engineering standards.',
    ],
  },
  {
    role: 'Intern — SCADA & Substation Automation',
    company: 'BSES Delhi',
    location: 'Delhi',
    period: 'Aug — Oct 2019',
    bullets: [
      'Assisted in SCADA implementation for power distribution and substation automation systems.',
      'Gained hands-on exposure to industrial control systems and real-time monitoring infrastructure.',
    ],
  },
]

// Placeholder projects — swap these for real ones when ready.
export const projects = [
  {
    name: 'DocuMind',
    description:
      'Ask questions across your documents, get answers with citations. Uploads PDFs, chunks and embeds them into pgvector, retrieves the right passages, and lets an LLM answer with sources pinned.',
    tech: ['React', 'Node.js', 'Express', 'pgvector', 'LLM API'],
    github: '#',
    demo: '#',
  },
  {
    name: 'CampusPulse',
    description:
      'Real-time engagement analytics for higher-ed. Streams student activity events into live dashboards so campus teams can spot disengagement before it becomes a dropout statistic.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    github: '#',
    demo: '#',
  },
  {
    name: 'VectorCart',
    description:
      'Semantic search for product catalogs. Blends embedding similarity with keyword ranking, so "warm jacket for a Himalayan trek" finds the right parka — not just keyword matches.',
    tech: ['Node.js', 'PostgreSQL', 'pgvector', 'React'],
    github: '#',
    demo: '#',
  },
  {
    name: 'CommitLens',
    description:
      'An AI code-review companion. Point it at a diff and it summarizes the change, flags risky edits, and drafts review comments — built for engineers who review a lot of PRs.',
    tech: ['Node.js CLI', 'LLM API', 'React', 'Express'],
    github: '#',
    demo: '#',
  },
]

export const education = [
  {
    degree: 'B.Tech, Electronics & Communication Engineering',
    school: 'Dr Akhilesh Das Gupta Institute of Technology & Management',
    location: 'Delhi',
  },
  {
    degree: 'Diploma',
    school: 'Guru Tegh Bahadur Institute of Technology',
    location: 'Delhi',
  },
]

// tokens floating in the hero's vector-space constellation
export const fieldTokens = [
  'react',
  'node.js',
  'express',
  'mongodb',
  'postgres',
  'pgvector',
  'embeddings',
  'vector search',
  'rag',
  'llm',
  'rest api',
  'socket.io',
]

export const pipeline = {
  nodes: ['docs', 'chunk', 'embed', 'vector db', 'llm', 'answer'],
  caption: 'fig. 01 — retrieval-augmented generation, the loop I keep coming back to',
}
