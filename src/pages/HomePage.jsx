import { useRef, useEffect, useState } from 'react';
import { C } from '../styles/theme.js';
import { FEATURED } from '../data/products.js';
import { DECANT_IMG, AddBtn } from '../components/ui.jsx';
import CombosSection from '../components/CombosSection.jsx';
import MoodFilter from '../components/MoodFilter.jsx';
import PartialsSection from '../components/PartialsSection.jsx';
import { FLAGS } from '../config/flags.js';

const HERO_IMG = "data:image/jpeg;base64,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";

// ── FLOATING STAT CARD ──
function StatCard({ style, children }) {
  return (
    <div style={{
      background: 'rgba(20,18,16,0.82)',
      backdropFilter: 'blur(12px)',
      border: '0.5px solid rgba(176,144,96,0.25)',
      borderRadius: 10,
      padding: '14px 18px',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── FEATURED SCENT PILL ──
function ScentPill({ name, notes, price, delay, onOpen, product }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onOpen(product)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: hov ? 'rgba(176,144,96,0.12)' : 'rgba(20,18,16,0.75)',
        backdropFilter: 'blur(10px)',
        border: `0.5px solid ${hov ? 'rgba(176,144,96,0.5)' : 'rgba(176,144,96,0.2)'}`,
        borderRadius: 50, padding: '8px 16px 8px 10px',
        cursor: 'pointer', transition: 'all .2s',
        animation: `fadeUp .6s ease ${delay}s both`,
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(176,144,96,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <img src={DECANT_IMG} alt="" style={{ height: 30, width: 'auto', objectFit: 'contain' }}/>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--ff-sans)', letterSpacing: '0.02em' }}>{name}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>{notes}</div>
      </div>
      <div style={{ marginLeft: 8, fontSize: 14, color: '#b09060', fontWeight: 500, flexShrink: 0 }}>₹{price}</div>
    </div>
  );
}

export default function HomePage({ onOpen, setPage }) {
  const carRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const onMove = e => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollCar = dir => {
    if (!carRef.current) return;
    const w = (carRef.current.firstChild?.offsetWidth || 280) + 16;
    carRef.current.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  // Subtle parallax on hero bottle
  const px = (mousePos.x - 0.5) * 12;
  const py = (mousePos.y - 0.5) * 8;

  const picks = [
    FEATURED[0], FEATURED[1], FEATURED[2], FEATURED[4],
  ];

  return (
    <div style={{ background: '#0c0a08' }}>

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 94, // nav height
      }}>

        {/* Atmospheric background layers */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 65% 45%, rgba(140,90,40,0.18) 0%, rgba(100,60,20,0.08) 40%, transparent 70%)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 50% at 20% 80%, rgba(176,144,96,0.06) 0%, transparent 60%)' }}/>
        {/* Grain texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")', opacity: 0.5, pointerEvents: 'none' }}/>
        {/* Horizontal rule lines */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '30%', height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(176,144,96,0.08), transparent)' }}/>
        <div style={{ position: 'absolute', left: 0, right: 0, top: '70%', height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(176,144,96,0.06), transparent)' }}/>

        {/* Left content */}
        <div style={{
          position: 'relative', zIndex: 2,
          padding: '0 4vw',
          flex: '0 0 50%',
          maxWidth: 600,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity .8s ease, transform .8s ease',
        }}>
          {/* Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem', padding: '5px 14px 5px 5px', background: 'rgba(176,144,96,0.08)', border: '0.5px solid rgba(176,144,96,0.2)', borderRadius: 50 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#b09060' }}/>
            <span style={{ fontSize: 15, letterSpacing: '0.2em', color: '#b09060', textTransform: 'uppercase', fontFamily: 'var(--ff-sans)' }}>
              Authentic Decants · India
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--ff-serif)',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 300,
            color: '#fff',
            lineHeight: 1.0,
            marginBottom: '1.25rem',
            letterSpacing: '-0.01em',
          }}>
            Wear the<br/>
            <em style={{ fontStyle: 'italic', color: '#b09060' }}>World's Finest</em><br/>
            Fragrances
          </h1>

          {/* Sub */}
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 400, fontFamily: 'var(--ff-sans)', fontWeight: 300 }}>
            200+ authentic decants — Niche, Designer & Middle Eastern. Try before you commit. Ships PAN India.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, marginBottom: '3rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPage('brands')}
              style={{ background: '#b09060', color: '#fff', border: 'none', padding: '14px 28px', fontFamily: 'var(--ff-sans)', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, transition: 'all .2s', fontWeight: 400 }}
            >
              Shop Collection
            </button>
            <button
              onClick={() => setPage('about')}
              style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '0.5px solid rgba(255,255,255,0.15)', padding: '14px 24px', fontFamily: 'var(--ff-sans)', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, transition: 'all .2s' }}
            >
              Our Story
            </button>
          </div>

          {/* Quick picks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 4, fontFamily: 'var(--ff-sans)' }}>
              Popular right now
            </div>
            {picks.map((p, i) => (
              <ScentPill key={p.id} name={p.name} notes={p.notes} price={p.p5} delay={0.3 + i * 0.1} onOpen={onOpen} product={p}/>
            ))}
          </div>
        </div>

        {/* Right — hero bottle + floating cards */}
        <div style={{
          position: 'absolute',
          right: 0, top: 0, bottom: 0,
          width: '52%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1,
        }}>
          {/* Glow behind bottle */}
          <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(176,144,96,0.15) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(40px)' }}/>

          {/* Hero bottle image with parallax */}
          <img
            src={HERO_IMG}
            alt="Scent Snob Decant Bottle"
            style={{
              height: 'clamp(300px, 52vh, 520px)',
              width: 'auto',
              objectFit: 'contain',
              position: 'relative', zIndex: 2,
              transform: `translate(${px}px, ${py}px)`,
              transition: 'transform .15s ease-out',
              filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.8))',
              animation: 'heroFloat 6s ease-in-out infinite',
            }}
          />

          {/* Floating card — top left */}
          <StatCard style={{
            position: 'absolute', top: '18%', left: '4%',
            animation: 'fadeUp .7s ease .5s both',
            minWidth: 160,
          }}>
            <div style={{ fontSize: 14, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6, fontFamily: 'var(--ff-sans)' }}>Today's Pick</div>
            <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1rem', color: '#fff', marginBottom: 2 }}>Hawas Ice</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)' }}>Bergamot · Aquatic · Amber</div>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, color: '#b09060', fontWeight: 500 }}>₹379 / 5ml</span>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(176,144,96,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={() => onOpen(FEATURED[1])}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#b09060" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
            </div>
          </StatCard>

          {/* Floating card — trust signal */}
          <StatCard style={{
            position: 'absolute', bottom: '22%', right: '2%',
            animation: 'fadeUp .7s ease .7s both',
            minWidth: 180,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              {/* Avatar stack */}
              <div style={{ display: 'flex' }}>
                {['#c8a060','#a08050','#e0b880'].map((col, i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: col, border: '2px solid #141210', marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--ff-sans)' }}>Happy customers</span>
            </div>
            <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.6rem', fontWeight: 300, color: '#fff', lineHeight: 1 }}>500+</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Orders shipped PAN India</div>
          </StatCard>

          {/* Floating badge — free shipping */}
          <StatCard style={{
            position: 'absolute', top: '12%', right: '8%',
            animation: 'fadeUp .7s ease .9s both',
            padding: '10px 14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(176,144,96,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 14 }}>✦</span>
              </div>
              <div>
                <div style={{ fontSize: 14, color: '#b09060', fontWeight: 500, fontFamily: 'var(--ff-sans)' }}>Free Shipping</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>Orders above ₹2999</div>
              </div>
            </div>
          </StatCard>

        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.2)', animation: 'fadeIn 1.5s ease 1.5s both', zIndex: 3 }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(176,144,96,0.4), transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }}/>
          <span style={{ fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--ff-sans)' }}>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════════ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflow: 'hidden' }}>
        {['Niche', 'Designer', 'Middle Eastern', 'Authentic', '5ml Decants', 'PAN India', 'Niche', 'Designer', 'Middle Eastern', 'Authentic', '5ml Decants', 'PAN India'].map((t, i) => (
          <span key={i} style={{ fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase', color: i % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(176,144,96,0.3)', padding: '14px 20px', borderRight: '0.5px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap', fontFamily: 'var(--ff-sans)', flexShrink: 0 }}>{t}</span>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          STAFF PICKS
      ══════════════════════════════════════════ */}
      <section style={{ padding: '5rem 4vw', background: '#0c0a08' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b09060', marginBottom: 8, fontFamily: 'var(--ff-sans)' }}>Curated Collection</div>
            <h2 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#fff' }}>
              Staff <em style={{ fontStyle: 'italic', color: '#b09060' }}>Picks</em>
            </h2>
          </div>
          <button style={{ fontSize: 15, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b09060', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--ff-sans)' }} onClick={() => setPage('brands')}>
            Browse all →
          </button>
        </div>

        <div ref={carRef} style={{ overflowX: 'auto', display: 'flex', gap: 16, paddingBottom: 8, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {FEATURED.map((p, idx) => (
            <div key={p.id}
              style={{ flexShrink: 0, width: 'clamp(220px,68vw,280px)', background: '#141210', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', scrollSnapAlign: 'start', cursor: 'pointer', transition: 'all .25s', animation: `fadeUp .5s ease ${idx * 0.07}s both` }}
              onClick={() => onOpen(p)}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(176,144,96,0.35)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
            >
              {/* Card image */}
              <div style={{ height: 200, background: 'linear-gradient(135deg, #1a1612 0%, #252019 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 70%, rgba(176,144,96,0.12), transparent 60%)' }}/>
                <img src={DECANT_IMG} alt={p.name} style={{ height: '85%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))', position: 'relative', zIndex: 1 }} loading="lazy"/>
                <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 2, background: p.cat==='niche' ? 'rgba(255,255,255,0.1)' : 'rgba(176,144,96,0.3)', color: 'rgba(255,255,255,0.8)' }}>
                  {p.cat==='niche' ? 'Niche' : 'Bestseller'}
                </div>
              </div>
              {/* Card body */}
              <div style={{ padding: '1rem 1rem 1.1rem' }}>
                <div style={{ fontSize: 14, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b09060', marginBottom: 4 }}>{p.brand}</div>
                <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.05rem', fontWeight: 300, color: 'rgba(255,255,255,0.92)', marginBottom: 4, lineHeight: 1.2 }}>{p.name}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{p.notes}</div>
                <div style={{ fontSize: 15, color: '#b09060', fontStyle: 'italic', marginBottom: 12 }}>{p.inspired}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    {p.p5 && <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)' }}>₹{p.p5} <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.3)' }}>/ 5ml</span></div>}
                    {!FLAGS.ENABLE_10ML && <div style={{ fontSize: 14, color: '#b09060', fontStyle: 'italic' }}>10ml glass · soon</div>}
                  </div>
                  <AddBtn onClick={e => { e.stopPropagation(); onOpen(p); }}/>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          {[[-1,'←'],[1,'→']].map(([d,l]) => (
            <button key={d} onClick={() => scrollCar(d)} style={{ width: 38, height: 38, border: '0.5px solid rgba(255,255,255,0.1)', background: '#1e1a16', borderRadius: 3, cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: 15, transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(176,144,96,0.4)'; e.currentTarget.style.color='#b09060'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='rgba(255,255,255,0.4)'; }}
            >{l}</button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MOOD FILTER
      ══════════════════════════════════════════ */}
      <section style={{ padding: '3rem 4vw 2rem', background: '#0c0a08', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b09060', marginBottom: 8, fontFamily: 'var(--ff-sans)' }}>
            Shop by Mood
          </div>
          <h2 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 300, color: 'rgba(255,255,255,0.92)' }}>
            What are you <em style={{ fontStyle: 'italic', color: '#b09060' }}>dressing for?</em>
          </h2>
        </div>
        <MoodFilter onOpen={onOpen} />
      </section>

      {/* ══════════════════════════════════════════
          COMBOS
      ══════════════════════════════════════════ */}
      <CombosSection />

      {/* ══════════════════════════════════════════
          PARTIALS
      ══════════════════════════════════════════ */}
      <PartialsSection />

      {/* ══════════════════════════════════════════
          PROMISE BAR
      ══════════════════════════════════════════ */}
      <section style={{ padding: '2.5rem 4vw', background: '#0f0d0b', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 8, overflow: 'hidden' }}>
          {[
            ['◈', 'Authentic', '100% genuine bottles'],
            ['◎', 'No Dilution', 'Pure, unadulterated juice'],
            ['◇', 'Sealed', 'Freshly decanted & sealed'],
            ['✦', '3–7 Days', 'Fast PAN India shipping'],
          ].map(([icon, title, sub]) => (
            <div key={title} style={{ padding: '1.5rem', background: '#0f0d0b', textAlign: 'center' }}>
              <div style={{ fontSize: 20, color: '#b09060', marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 4, fontFamily: 'var(--ff-sans)' }}>{title}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
