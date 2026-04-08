import { useRef } from 'react'
import { S, C } from '../styles/theme.js'
import { FEATURED } from '../data/products.js'
import { DECANT_IMG, AddBtn } from '../components/ui.jsx'
import { FLAGS } from '../config/flags.js'

export default function HomePage({ onOpen, setPage }) {
  const carRef = useRef(null)

  const scrollCar = (dir) => {
    if (!carRef.current) return
    const w = (carRef.current.firstChild?.offsetWidth || 280) + 16
    carRef.current.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  return (
    <div>
      {/* ── HERO ── */}
      <section style={S.hero}>
        <div style={S.heroBg} />
        <span style={S.heroTag}>Authentic Decants · Bangalore</span>
        <h1 style={S.heroH1}>
          Scent
          <br />
          Snob <em style={S.heroEm}>Decants</em>
        </h1>
        <p style={S.heroSub}>Niche · Designer · Middle Eastern Dupes · 5ml</p>
        <div style={S.heroBtns}>
          <button style={S.btnGold} onClick={() => setPage('brands')}>
            Explore Collection
          </button>
          <button style={S.btnOutline} onClick={() => setPage('about')}>
            Our Story
          </button>
        </div>
        <div style={S.heroLine} />
        <div style={S.heroScroll}>
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
          >
            <polyline points='6 9 12 15 18 9' />
          </svg>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── STAFF PICKS ── */}
      <section style={{ ...S.section, background: C.bg1 }}>
        <div style={S.sHdr}>
          <h2 style={S.sH2}>
            Snob <em style={S.sH2em}>Picks</em>
          </h2>
          <button style={S.sLink} onClick={() => setPage('brands')}>
            Browse all →
          </button>
        </div>

        <div ref={carRef} style={S.carousel}>
          {FEATURED.map((p) => (
            <div key={p.id} style={S.featCard} onClick={() => onOpen(p)}>
              <div style={S.featImg}>
                <img
                  src={DECANT_IMG}
                  alt={p.name}
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    padding: '8px 0'
                  }}
                  loading='lazy'
                />
                <div
                  style={{
                    ...S.featBadge,
                    background:
                      p.cat === 'niche'
                        ? 'rgba(255,255,255,0.10)'
                        : 'rgba(176,144,96,0.30)',
                    color: 'rgba(255,255,255,0.8)'
                  }}
                >
                  {p.cat === 'niche' ? 'Niche' : 'Bestseller'}
                </div>
              </div>
              <div style={S.featBody}>
                <div style={S.featBrand}>{p.brand}</div>
                <div style={S.featName}>{p.name}</div>
                <div style={S.featNotes}>{p.notes}</div>
                <div style={S.featInspired}>{p.inspired}</div>
                <div style={S.featFooter}>
                  <div>
                    {p.p5 && (
                      <div style={S.pr}>
                        ₹{p.p5}{' '}
                        <span style={{ color: C.t3, fontSize: 10 }}>/ 5ml</span>
                      </div>
                    )}
                    {!FLAGS.ENABLE_10ML && (
                      <div style={S.prMuted}>10ml glass · coming soon</div>
                    )}
                  </div>
                  <AddBtn
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpen(p)
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel arrows */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginTop: 16
          }}
        >
          {[
            [-1, '←'],
            [1, '→']
          ].map(([d, l]) => (
            <button
              key={d}
              onClick={() => scrollCar(d)}
              style={{
                width: 36,
                height: 36,
                border: `0.5px solid ${C.border}`,
                background: C.bg3,
                borderRadius: 2,
                cursor: 'pointer',
                color: C.t2,
                fontSize: 14,
                transition: 'all .15s'
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      {/* ── PROMISES ── */}
      <section
        style={{
          ...S.section,
          background: C.bg2,
          paddingTop: '2rem',
          paddingBottom: '2rem'
        }}
      >
        <div
          style={{
            ...S.promiseRow,
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))'
          }}
        >
          {[
            ['◈', 'Authentic', 'Genuine decants, no dilution'],
            ['◎', 'Sealed', 'Freshly decanted & sealed'],
            ['◇', 'Discreet', 'Secure padded shipping'],
            ['✦', 'Fast Ship', '3–7 days PAN India']
          ].map(([icon, title, sub]) => (
            <div key={title} style={S.promise}>
              <div style={S.promiseIcon}>{icon}</div>
              <div style={S.promiseTitle}>{title}</div>
              <div style={S.promiseSub}>{sub}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

