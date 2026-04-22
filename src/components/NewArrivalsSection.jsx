import { useState } from 'react';
import { C, S } from '../styles/theme.js';
import { NEW_ARRIVALS } from '../data/products.js';
import { calc20ml } from '../data/products.js';
import { FLAGS } from '../config/flags.js';

// Convert raw array to product objects
function toProduct(arr, index) {
  const [brand, name, notes, p5, p10] = arr;
  return {
    id: `new-${index}`,
    brand, name, notes,
    p5: p5 || 0,
    p10: p10 || 0,
    cat: 'dupe',
  };
}

function NewArrivalCard({ product, onOpen }) {
  const [hov, setHov] = useState(false);
  const p20 = calc20ml(product.p10);

  return (
    <div
      onClick={() => onOpen(product)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(176,144,96,0.07)' : 'rgba(255,255,255,0.02)',
        border: `0.5px solid ${hov ? 'rgba(176,144,96,0.45)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 8,
        padding: '1rem 1.1rem',
        cursor: 'pointer',
        transition: 'all .18s',
        transform: hov ? 'translateY(-2px)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* NEW badge */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        background: '#b09060', color: '#fff',
        fontSize: 9, letterSpacing: '0.12em',
        padding: '2px 7px', borderRadius: 3,
        fontFamily: 'var(--ff-sans)', textTransform: 'uppercase',
      }}>
        New
      </div>

      <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b09060', fontFamily: 'var(--ff-sans)' }}>
        {product.brand}
      </div>
      <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.05rem', fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.2, paddingRight: 32 }}>
        {product.name}
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>
        {product.notes}
      </div>

      {/* Pricing row */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'baseline', marginTop: 4 }}>
        {product.p5 > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.92)', fontWeight: 500 }}>₹{product.p5}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>5ml</div>
          </div>
        )}
        {FLAGS.ENABLE_10ML && product.p10 > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.92)', fontWeight: 500 }}>₹{product.p10}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>10ml</div>
          </div>
        )}
        {FLAGS.ENABLE_20ML && p20 > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#b09060', fontWeight: 500 }}>₹{p20}</div>
            <div style={{ fontSize: 9, color: '#b09060', letterSpacing: '0.08em', opacity: 0.7 }}>20ml</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NewArrivalsSection({ onOpen }) {
  if (!NEW_ARRIVALS || NEW_ARRIVALS.length === 0) return null;

  const products = NEW_ARRIVALS.map(toProduct);

  return (
    <section style={{ padding: '4rem 4vw', background: '#0c0a08', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#b09060', animation: 'pulse 2s ease-in-out infinite' }}/>
            <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b09060', fontFamily: 'var(--ff-sans)' }}>
              Just In
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 300, color: 'rgba(255,255,255,0.92)', margin: 0 }}>
            New <em style={{ fontStyle: 'italic', color: '#b09060' }}>Arrivals</em>
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>
            {products.length} freshly stocked decant{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 12,
      }}>
        {products.map(p => (
          <NewArrivalCard key={p.id} product={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
