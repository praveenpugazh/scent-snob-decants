import { useState } from 'react';
import { C } from '../styles/theme.js';
import { PARTIALS } from '../data/products.js';
import { FLAGS } from '../config/flags.js';

function PartialCard({ partial }) {
  const [hov, setHov] = useState(false);

  const buildWAMsg = () => {
    const msg = `🧪 *Partial Bottle Enquiry*\n\n• ${partial.brand} — ${partial.name}\n• Approx. ${partial.mlLeft}ml remaining\n• Condition: ${partial.condition}\n• Price: ₹${partial.price}\n\nIs this still available? Please share payment details. Thank you!`;
    return `https://wa.me/918754519509?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      style={{
        background: hov ? 'rgba(176,144,96,0.06)' : C.bg3,
        border: `0.5px solid ${hov ? 'rgba(176,144,96,0.4)' : C.border}`,
        borderRadius: 6, padding: '1.25rem',
        transition: 'all .2s', cursor: 'pointer',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b09060', marginBottom: 3, fontFamily: 'var(--ff-sans)' }}>
            {partial.brand}
          </div>
          <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.1rem', fontWeight: 300, color: C.t1 }}>
            {partial.name}
          </div>
        </div>
        {/* ml remaining badge */}
        <div style={{
          background: 'rgba(176,144,96,0.12)', border: '0.5px solid rgba(176,144,96,0.3)',
          borderRadius: 4, padding: '4px 10px', textAlign: 'center', flexShrink: 0,
        }}>
          <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.1rem', color: '#b09060', lineHeight: 1 }}>
            ~{partial.mlLeft}ml
          </div>
          <div style={{ fontSize: 10, color: C.t3, marginTop: 1 }}>remaining</div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: C.t3, marginBottom: 8, lineHeight: 1.5 }}>{partial.notes}</div>
      <div style={{ fontSize: 11, color: 'rgba(76,175,125,0.8)', marginBottom: '1rem' }}>
        ✓ {partial.condition}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.4rem', fontWeight: 300, color: '#b09060' }}>
          ₹{partial.price}
        </div>
        <a
          href={buildWAMsg()}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#b09060', border: '0.5px solid rgba(176,144,96,0.4)',
            padding: '6px 14px', borderRadius: 3, textDecoration: 'none',
            fontFamily: 'var(--ff-sans)', transition: 'all .15s',
          }}
        >
          Enquire →
        </a>
      </div>
    </div>
  );
}

export default function PartialsSection() {
  if (!FLAGS.ENABLE_PARTIALS || PARTIALS.length === 0) return null;

  return (
    <section style={{ padding: '5rem 4vw', background: '#0c0a08', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(76,175,125,0.1)', border: '0.5px solid rgba(76,175,125,0.25)', borderRadius: 4, padding: '4px 12px', marginBottom: 12 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(76,175,125,0.9)', fontFamily: 'var(--ff-sans)' }}>
            Limited Stock
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 300, color: 'rgba(255,255,255,0.92)' }}>
          Partial <em style={{ fontStyle: 'italic', color: '#b09060' }}>Bottles</em>
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', marginTop: 8, maxWidth: 500 }}>
          Genuine bottles with remaining juice — sold as-is. Each is authenticated and priced based on how much is left. First come, first served.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {PARTIALS.map(p => <PartialCard key={p.id} partial={p} />)}
      </div>
    </section>
  );
}
