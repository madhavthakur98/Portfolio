import { useEffect, useRef } from 'react'
import { fieldTokens } from '../data/profile.js'

// The hero's ambient centerpiece: his skills as a point cloud in
// "vector space" — a slowly rotating 3D constellation with
// nearest-neighbor edges, synapse pulses, and cursor parallax.
export default function VectorField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let narrow = false
    let points = []
    let edges = []
    let signals = []
    let raf = 0
    let inView = true
    let last = performance.now()
    let t = 0

    const mouse = { x: -1e4, y: -1e4, rx: 0, ry: 0 }

    function build() {
      narrow = width < 760
      const count = narrow ? 44 : 78
      const R = Math.min(width, height) * 0.42
      cx = narrow ? width * 0.5 : width * 0.64
      cy = height * 0.46

      points = []
      for (let i = 0; i < count; i += 1) {
        // golden-spiral sphere with radial jitter → organic cloud
        const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const r = R * (0.5 + 0.5 * Math.random())
        points.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta) * 0.8,
          z: r * Math.cos(phi),
          label: null,
          px: 0,
          py: 0,
          depth: 0,
        })
      }

      if (!narrow) {
        const step = Math.max(1, Math.floor(count / fieldTokens.length))
        fieldTokens.forEach((token, i) => {
          points[(i * step + 2) % count].label = token
        })
      }

      // two nearest neighbors per point, deduped
      const pairs = new Set()
      points.forEach((p, i) => {
        const dists = points
          .map((q, j) => ({
            j,
            d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2,
          }))
          .filter((e) => e.j !== i)
          .sort((a, b) => a.d - b.d)
        for (let k = 0; k < 2; k += 1) {
          const j = dists[k].j
          pairs.add(i < j ? `${i}-${j}` : `${j}-${i}`)
        }
      })
      edges = [...pairs].map((key) => key.split('-').map(Number))

      signals = Array.from({ length: narrow ? 2 : 4 }, (_, i) => ({
        edge: Math.floor(Math.random() * edges.length),
        t0: t + i * 0.7,
        dur: 1.4,
      }))
    }

    function project(dt) {
      // ease cursor influence, then rotate + perspective-project
      const targetRx = mouse.x > -1e3 ? ((mouse.x - cx) / width) * 0.6 : 0
      const targetRy = mouse.y > -1e3 ? ((mouse.y - cy) / height) * 0.4 : 0
      mouse.rx += (targetRx - mouse.rx) * Math.min(1, dt * 2.5)
      mouse.ry += (targetRy - mouse.ry) * Math.min(1, dt * 2.5)

      const rotY = t * 0.07 + mouse.rx
      const rotX = Math.sin(t * 0.05) * 0.12 + mouse.ry
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const fov = Math.min(width, height) * 1.1
      const zOffset = Math.min(width, height) * 0.9

      points.forEach((p) => {
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.x * sinY + p.z * cosY
        const y1 = p.y * cosX - z1 * sinX
        const z2 = p.y * sinX + z1 * cosX
        const s = fov / (fov + z2 + zOffset)
        p.px = cx + x1 * s * 1.4
        p.py = cy + y1 * s * 1.4
        p.depth = Math.max(0, Math.min(1, 1.15 - (z2 + zOffset) / (zOffset * 1.6)))
      })
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      const master = narrow ? 0.55 : 1

      // edges
      edges.forEach(([a, b]) => {
        const p = points[a]
        const q = points[b]
        const depth = (p.depth + q.depth) / 2
        const mx = (p.px + q.px) / 2
        const my = (p.py + q.py) / 2
        const near = Math.hypot(mouse.x - mx, mouse.y - my) < 150
        const alpha = (0.05 + depth * 0.13 + (near ? 0.22 : 0)) * master
        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p.px, p.py)
        ctx.lineTo(q.px, q.py)
        ctx.stroke()
      })

      // synapse pulses traveling along edges
      signals.forEach((sig) => {
        const p = (t - sig.t0) / sig.dur
        if (p < 0) return
        if (p >= 1) {
          sig.edge = Math.floor(Math.random() * edges.length)
          sig.t0 = t + Math.random() * 0.8
          return
        }
        const [a, b] = edges[sig.edge]
        const x = points[a].px + (points[b].px - points[a].px) * p
        const y = points[a].py + (points[b].py - points[a].py) * p
        const glow = Math.sin(Math.PI * p) * master
        ctx.fillStyle = `rgba(34, 211, 238, ${0.14 * glow})`
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(160, 236, 250, ${0.9 * glow})`
        ctx.beginPath()
        ctx.arc(x, y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      })

      // points + labels
      ctx.font = '11px "JetBrains Mono", ui-monospace, monospace'
      points.forEach((p) => {
        const near = Math.hypot(mouse.x - p.px, mouse.y - p.py) < 110
        const alpha = (0.2 + p.depth * 0.55 + (near ? 0.25 : 0)) * master
        ctx.fillStyle = near
          ? `rgba(190, 242, 252, ${alpha})`
          : `rgba(140, 222, 240, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.px, p.py, 0.9 + p.depth * 1.7, 0, Math.PI * 2)
        ctx.fill()

        if (p.label) {
          const labelAlpha = (0.16 + p.depth * 0.42 + (near ? 0.3 : 0)) * master
          ctx.fillStyle = near
            ? `rgba(125, 238, 252, ${labelAlpha})`
            : `rgba(139, 151, 165, ${labelAlpha})`
          ctx.fillText(p.label, p.px + 8, p.py + 3.5)
        }
      })
    }

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (inView && !document.hidden) {
        t += dt
        project(dt)
        draw()
      }
      raf = requestAnimationFrame(frame)
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
      if (reduced) {
        project(0)
        draw()
      }
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function onMouseLeave() {
      mouse.x = -1e4
      mouse.y = -1e4
    }

    resize()
    window.addEventListener('resize', resize)

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
    })
    observer.observe(canvas)

    if (!reduced) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      document.documentElement.addEventListener('mouseleave', onMouseLeave)
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="vector-field" aria-hidden="true" />
}
