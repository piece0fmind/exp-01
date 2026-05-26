import { useState } from 'react'
import './App.css'

const projects = [
  { id: 1, title: 'Type Study', category: 'Type', year: '2026', status: 'live' },
  { id: 2, title: 'Particle Field', category: 'Motion', year: '2025', status: 'live' },
  { id: 3, title: 'Grid System', category: 'Web', year: '2026', status: 'progress' },
  { id: 4, title: 'Signal / Noise', category: 'Motion', year: '2025', status: 'live' },
]

const FILTERS = ['All', 'Type', 'Motion', 'Web']

export default function App() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="app">
      <nav className="nav">
        <span className="logo">Studio°</span>
        <div className="nav-links">
          <a href="#">Work</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <p className="eyebrow">Creative Lab — 2026</p>
          <h1>Ideas<br />in <em>motion</em></h1>
          <p className="desc">An experimental space for typography, interaction, and visual systems.</p>
        </div>
        <DotGrid />
      </header>

      <section className="work">
        <div className="filters">
          {FILTERS.map(f => (
            <button key={f} className={active === f ? 'tag active' : 'tag'} onClick={() => setActive(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid">
          {filtered.map(p => (
            <div key={p.id} className="card">
              <div className="card-thumb" />
              <div className="card-meta">
                <span className="card-title">{p.title}</span>
                <span className="card-year">{p.year}</span>
              </div>
              <span className={`status ${p.status}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function DotGrid() {
  const sizes = ['sm', 'md', 'lg']
  const dots = Array.from({ length: 36 }, (_, i) => sizes[i % 3])
  return (
    <div className="dot-grid">
      {dots.map((s, i) => <span key={i} className={`dot ${s}`} />)}
    </div>
  )
}