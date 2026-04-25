import { useState } from 'react';
import { C, S } from '../styles/theme.js';
import { PARTIALS, PRODUCT_IMAGES } from '../data/products.js';
import { FLAGS } from '../config/flags.js';

function PartialCard({ partial, onOpen }) {
  const [hov, setHov] = useState(false);
  const mlLeft = partial.mlLeft;
  const pct = Math.round((mlLeft / partial.fullMl) * 100);

  return (
    <div
      onClick={() => onOpen && onOpen(partial)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(176,144,96,0.07)' : 'rgba(255,255,255,0.02)',
        border: `0.5px solid ${hov ? 'rgba(176,144,96,0.4)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 8,
        padding: '1.1rem 1.25rem',
        cursor: 'pointer',
        transition: 'all .18s',
        transform: hov ? 'translateY(-2px)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        position: 'relative',
      }}
    >
      {/* Bottle image if available */}
      {PRODUCT_IMAGES[`${partial.brand}|${partial.name}`] && (
        <div style={{ height: 160, margin: '-1.1rem -1.25rem 0.75rem', borderRadius: '8px 8px 0 0', overflow: 'hidden' }}>
          <img
            src={PRODUCT_IMAGES[`${partial.brand}|${partial.name}`]}
            alt={partial.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Partial badge */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        background: 'rgba(176,144,96,0.15)',
        border: '0.5px solid rgba(176,144,96,0.4)',
        color: '#b09060', fontSize: 9,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        padding: '2px 8px', borderRadius: 3,
        fontFamily: 'var(--ff-sans)',
      }}>
        Partial
      </div>

      <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#b09060', fontFamily: 'var(--ff-sans)' }}>
        {partial.brand}
      </div>
      <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1rem', fontWeight: 400, color: 'rgba(255,255,255,0.92)', paddingRight: 48, lineHeight: 1.25 }}>
        {partial.name}
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
        {partial.notes}
      </div>

      {/* Fill level bar */}
      <div style={{ marginTop: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
            {mlLeft}ml of {partial.fullMl}ml remaining
          </span>
          <span style={{ fontSize: 10, color: pct > 50 ? '#4caf7d' : pct > 25 ? '#b09060' : '#dc5050', fontWeight: 500 }}>
            {pct}%
          </span>
        </div>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
          <div style={{
            height: '100%', borderRadius: 2, transition: 'width .4s ease',
            width: `${pct}%`,
            background: pct > 50 ? '#4caf7d' : pct > 25 ? '#b09060' : '#dc5050',
          }}/>
        </div>
      </div>

      {/* Condition */}
      {partial.condition && (
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontStyle: 'normal' }}>
          {partial.condition}
        </div>
      )}

      {/* Pricing */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginTop: 4, flexWrap: 'wrap' }}>
        {partial.p5 > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', fontWeight: 500 }}>₹{partial.p5}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>5ml</div>
          </div>
        )}
        {FLAGS.ENABLE_10ML && partial.p10 > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', fontWeight: 500 }}>₹{partial.p10}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>10ml</div>
          </div>
        )}
        {partial.price && (
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Full partial</div>
            <div style={{ fontSize: 16, color: '#b09060', fontWeight: 500 }}>₹{partial.price.toLocaleString('en-IN')}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PartialsSection({ onOpen }) {
  if (!FLAGS.ENABLE_PARTIALS || !PARTIALS || PARTIALS.length === 0) return null;

  return (
    <section style={{ padding: '4rem 4vw', background: '#0e0c0a', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#b09060' }}/>
          <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#b09060', fontFamily: 'var(--ff-sans)' }}>
            Authenticated Partials
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 400, color: 'rgba(255,255,255,0.92)', margin: 0 }}>
          Partial Bottles
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8, maxWidth: 520, lineHeight: 1.7 }}>
          Authentic partial bottles from my personal collection — priced on full bottle cost/ml. Buy a decant or the remaining partial.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 14,
      }}>
        {PARTIALS.map((p, i) => (
          <PartialCard key={p.id || i} partial={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
