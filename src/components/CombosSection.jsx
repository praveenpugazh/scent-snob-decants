import { useState } from 'react';
import { C, S } from '../styles/theme.js';
import { COMBOS, comboPrice } from '../data/products.js';
import { WAIcon } from './ui.jsx';

function ComboCard({ combo }) {
  const [hov, setHov] = useState(false);
  const { original, discounted, saving } = comboPrice(combo);

  const buildWAMsg = () => {
    let msg = `🛍️ *Combo Order — ${combo.name}*\n\n`;
    combo.items.forEach(i => {
      msg += `• ${i.brand} — ${i.name} (${i.size}) = ₹${i.price}\n`;
    });
    msg += `\n━━━━━━━━━━━━━━━`;
    msg += `\nOriginal : ₹${original}`;
    msg += `\nDiscount : ${combo.discountPct}% off`;
    msg += `\n*Combo Price: ₹${discounted}*`;
    msg += `\nYou save : ₹${saving}`;
    msg += `\n━━━━━━━━━━━━━━━`;
    msg += `\n\nPlease confirm availability and share payment details. Thank you!`;
    return `https://wa.me/918754519509?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      style={{
        background: hov ? 'rgba(176,144,96,0.06)' : C.bg3,
        border: `0.5px solid ${hov ? 'rgba(176,144,96,0.4)' : C.border}`,
        borderRadius: 8,
        padding: '1.5rem',
        transition: 'all .2s',
        transform: hov ? 'translateY(-3px)' : 'none',
        boxShadow: hov ? '0 12px 32px rgba(0,0,0,0.3)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: combo.badgeColor,
        border: '0.5px solid rgba(176,144,96,0.2)',
        borderRadius: 4, padding: '4px 12px',
        fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--ff-sans)',
        marginBottom: '1rem', alignSelf: 'flex-start',
      }}>
        {combo.tag}
      </div>

      {/* Title */}
      <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.5rem', fontWeight: 300, color: C.t1, marginBottom: '0.5rem' }}>
        {combo.name}
      </div>
      <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.7, marginBottom: '1.25rem' }}>
        {combo.description}
      </div>

      {/* Items list */}
      <div style={{ borderTop: `0.5px solid ${C.border}`, paddingTop: '1rem', marginBottom: '1.25rem' }}>
        {combo.items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.4rem 0',
            borderBottom: i < combo.items.length - 1 ? `0.5px solid rgba(255,255,255,0.05)` : 'none',
          }}>
            <div>
              <span style={{ fontSize: 11, color: '#b09060', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--ff-sans)' }}>
                {item.brand}
              </span>
              <span style={{ fontSize: 14, color: C.t1, fontFamily: 'var(--ff-serif)', marginLeft: 8 }}>
                {item.name}
              </span>
              <span style={{ fontSize: 11, color: C.t3, marginLeft: 6 }}>({item.size})</span>
            </div>
            <span style={{ fontSize: 13, color: C.t2 }}>₹{item.price}</span>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.8rem', fontWeight: 300, color: '#b09060' }}>
          ₹{discounted}
        </div>
        <div style={{ fontSize: 13, color: C.t3, textDecoration: 'line-through' }}>₹{original}</div>
        <div style={{
          fontSize: 11, color: '#4caf7d', background: 'rgba(76,175,125,0.1)',
          border: '0.5px solid rgba(76,175,125,0.2)',
          padding: '2px 8px', borderRadius: 3, letterSpacing: '0.05em',
        }}>
          Save ₹{saving}
        </div>
      </div>

      {/* CTA */}
      <a
        href={buildWAMsg()}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: '#25D366', color: '#fff', textDecoration: 'none',
          padding: '12px 20px', borderRadius: 4,
          fontFamily: 'var(--ff-sans)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
          transition: 'opacity .15s',
        }}
      >
        <WAIcon size={16} />
        Order This Combo
      </a>
    </div>
  );
}

export default function CombosSection() {
  return (
    <section style={{ padding: '5rem 4vw', background: C.bg2, borderTop: `0.5px solid ${C.border}` }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b09060', marginBottom: 8, fontFamily: 'var(--ff-sans)' }}>
          Curated Sets
        </div>
        <h2 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 300, color: C.t1 }}>
          Combo <span style={{ fontStyle: 'normal', color: '#b09060' }}>Deals</span>
        </h2>
        <p style={{ fontSize: 14, color: C.t3, marginTop: 8, maxWidth: 500 }}>
          Handpicked sets with {COMBOS[0]?.discountPct}% off. Perfect for gifting or exploring a new scent family.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        {COMBOS.map(combo => <ComboCard key={combo.id} combo={combo} />)}
      </div>
    </section>
  );
}
