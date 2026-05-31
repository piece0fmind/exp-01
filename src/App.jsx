import { useState, useEffect, useRef } from 'react'
import './App.css'

// Animated background particles
function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const PARTICLE_COUNT = 60
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })

      // Draw faint connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}

// Animated typing cursor
function TypingText({ texts }) {
  const [display, setDisplay] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), 80)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), 45)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setTextIdx(i => (i + 1) % texts.length)
    }

    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, textIdx, texts])

  return (
    <span className="typing-text">
      {display}
      <span className="cursor" aria-hidden="true">|</span>
    </span>
  )
}

// Steam animation dots for "something's cooking"
function CookingDots() {
  return (
    <span className="cooking-dots" aria-hidden="true">
      <span className="cooking-dot" style={{ animationDelay: '0s' }}>●</span>
      <span className="cooking-dot" style={{ animationDelay: '0.3s' }}>●</span>
      <span className="cooking-dot" style={{ animationDelay: '0.6s' }}>●</span>
    </span>
  )
}

export default function App() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="app" id="main">
      <Particles />

      <nav className="nav" role="navigation" aria-label="Main navigation">
        <span className="logo" aria-label="Bibek Neupane logo">
          <span className="logo-dot">B</span>
          <span className="logo-name">ibek.</span>
        </span>
        <div className="nav-links">
          <a href="#about" id="nav-about">About</a>
          <a href="#stack" id="nav-stack">Stack</a>
          <a href="#contact" id="nav-contact">Contact</a>
        </div>
      </nav>

      <main className="hero" id="about">
        <div className="hero-inner">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Available for opportunities · 2026
          </p>

          <h1 className="hero-title">
            Hi, I'm{' '}
            <span className="name-highlight">Bibek</span>
            <br />
            <TypingText texts={['a Builder.', 'a Developer.', 'an Engineer.', 'a Creator.']} />
          </h1>

          <p className="hero-sub">
            Crafting elegant software solutions — one line at a time.
          </p>

          <div className="cooking-banner" id="cooking-banner" role="status" aria-live="polite">
            <span className="flame" aria-hidden="true">🔥</span>
            <span className="cooking-label">Something's cooking</span>
            <CookingDots />
          </div>

          <div className="cta-group">
            <a
              href="#contact"
              id="cta-connect"
              className="btn btn-primary"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span>Let's Connect</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#stack" id="cta-stack" className="btn btn-ghost">See my stack</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="card-float">
            <div className="card-float-inner">
              <div className="avatar-ring">
                <div className="avatar">BN</div>
              </div>
              <div className="card-info">
                <span className="card-name">Bibek Neupane</span>
                <span className="card-role">Software Engineer</span>
              </div>
              <span className="status-badge">
                <span className="status-dot" />
                Open to work
              </span>
            </div>
          </div>
        </div>
      </main>

      <section className="stack-section" id="stack" aria-labelledby="stack-heading">
        <p className="section-eyebrow">What I work with</p>
        <h2 id="stack-heading">My Stack</h2>
        <div className="stack-grid">
          {[
            { name: 'React', icon: '⚛️', color: '#61dafb' },
            { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
            { name: '.NET / C#', icon: '🟣', color: '#512bd4' },
            { name: 'Node.js', icon: '🟢', color: '#68a063' },
            { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
            { name: 'Docker', icon: '🐳', color: '#2496ed' },
            { name: 'Redis', icon: '🔴', color: '#dc382d' },
            { name: 'SignalR', icon: '📡', color: '#8b5cf6' },
          ].map(tech => (
            <div key={tech.name} className="stack-chip" id={`stack-${tech.name.replace(/[\s/.]/g, '-').toLowerCase()}`}>
              <span className="stack-icon">{tech.icon}</span>
              <span className="stack-name">{tech.name}</span>
              <span className="stack-glow" style={{ '--glow-color': tech.color }} />
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <div className="contact-inner">
          <p className="section-eyebrow">Get in touch</p>
          <h2 id="contact-heading">Let's build something<br /><em>remarkable</em> together.</h2>
          <a href="mailto:bibek@example.com" id="contact-email" className="email-link">
            bibek@example.com
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </section>

      <footer className="footer" role="contentinfo">
        <span>© 2026 Bibek Neupane — Built with 🤍 and lots of ☕</span>
      </footer>
    </div>
  )
}