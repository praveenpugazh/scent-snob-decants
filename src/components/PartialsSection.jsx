import { useState } from 'react';
import { PARTIALS, PRODUCT_IMAGES } from '../data/products.js';
import { FLAGS } from '../config/flags.js';

const WA_NUMBER = '918754519509';
const SHIPPING = 160;

function buildWALink(partial, isDecantOnly) {
  const item = isDecantOnly
    ? `${partial.brand} ${partial.name} — 10ml decant — ₹${partial.p5}`
    : `${partial.brand} ${partial.name} — Whole partial (${partial.mlLeft}ml) — ₹${partial.price}`;
  const msg = `Hi Scent Snob! I'd like to order:\n\n${item}\nShipping: ₹${SHIPPING}\nTotal: ₹${(isDecantOnly ? partial.p5 : partial.price) + SHIPPING}\n\nMy details:\nName: \nPhone: \nAddress: `;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function PartialCard({ partial }) {
  const [hov, setHov] = useState(false);
  const mlLeft = partial.mlLeft;
  const pct = Math.round((mlLeft / partial.fullMl) * 100);
  const isSoldOut = partial.soldOut === true;
  const imgKey = `${partial.brand}|${partial.name}`;
  const hasImg = !!PRODUCT_IMAGES[imgKey];
  const isDecantOnly = partial.price === 0 && partial.p5 > 0;
  const displayPrice = isDecantOnly ? partial.p5 : partial.price;
  const total = displayPrice + SHIPPING;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: isSoldOut
          ? 'rgba(255,255,255,0.01)'
          : hov ? 'rgba(176,144,96,0.07)' : 'rgba(255,255,255,0.02)',
        border: `0.5px solid ${hov && !isSoldOut ? 'rgba(176,144,96,0.4)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 8,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all .18s',
        transform: hov && !isSoldOut ? 'translateY(-2px)' : 'none',
        opacity: isSoldOut ? 0.45 : 1,
        position: 'relative',
      }}
    >
      {isSoldOut && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.3)',
        }}>
          <span style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--ff-sans)',
            border: '0.5px solid rgba(255,255,255,0.2)',
            padding: '4px 12px', borderRadius: 3,
          }}>Sold Out</span>
        </div>
      )}

      {/* Image */}
      {hasImg ? (
        <div style={{ height: 200, flexShrink: 0, overflow: 'hidden' }}>
          <img
            src={PRODUCT_IMAGES[imgKey]}
            alt={partial.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ) : (
        <div style={{ padding: '1.1rem 1.25rem 0' }}>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 8 }}>
            <div style={{
              height: '100%', borderRadius: 2,
              width: `${pct}%`,
              background: pct > 50 ? '#4caf7d' : pct > 25 ? '#b09060' : '#dc5050',
            }}/>
          </div>
        </div>
      )}

      <div style={{ padding: '0.9rem 1.1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: 5, flexGrow: 1 }}>
        {/* Badge */}
        <div style={{
          alignSelf: 'flex-start',
          background: isDecantOnly ? 'rgba(100,160,100,0.12)' : 'rgba(176,144,96,0.12)',
          border: `0.5px solid ${isDecantOnly ? 'rgba(100,160,100,0.35)' : 'rgba(176,144,96,0.35)'}`,
          color: isDecantOnly ? '#6caf8d' : '#b09060',
          fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '2px 7px', borderRadius: 3, fontFamily: 'var(--ff-sans)',
        }}>
          {isDecantOnly ? 'Decant only' : 'Partial · Whole bottle only'}
        </div>

        <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#b09060', fontFamily: 'var(--ff-sans)', marginTop: 2 }}>
          {partial.brand}
        </div>
        <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '0.95rem', fontWeight: 400, color: 'rgba(255,255,255,0.92)', lineHeight: 1.3 }}>
          {partial.name}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>
          {partial.notes}
        </div>

        {/* Fill level */}
        {!isDecantOnly && (
          <div style={{ marginTop: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.06em' }}>
                {mlLeft}ml of {partial.fullMl}ml remaining
              </span>
              <span style={{ fontSize: 10, color: pct > 50 ? '#4caf7d' : pct > 25 ? '#b09060' : '#dc5050', fontWeight: 500 }}>
                {pct}%
              </span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
              <div style={{
                height: '100%', borderRadius: 2,
                width: `${pct}%`,
                background: pct > 50 ? '#4caf7d' : pct > 25 ? '#b09060' : '#dc5050',
              }}/>
            </div>
          </div>
        )}

        {partial.condition && (
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>
            {partial.condition}
          </div>
        )}

        {/* Price + shipping breakdown */}
        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
              {isDecantOnly ? '10ml decant' : 'Partial bottle'}
            </span>
            <span style={{ fontSize: 15, color: isDecantOnly ? '#6caf8d' : '#b09060', fontWeight: 500 }}>
              ₹{displayPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Shipping</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>₹{SHIPPING}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Total</span>
            <span style={{ fontSize: 17, color: 'rgba(255,255,255,0.92)', fontWeight: 600 }}>
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>

          {/* WhatsApp Order Button */}
          {!isSoldOut && (
            <a
              href={buildWALink(partial, isDecantOnly)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '10px 0',
                background: 'rgba(37,211,102,0.12)',
                border: '0.5px solid rgba(37,211,102,0.35)',
                borderRadius: 6,
                color: '#25d366', fontSize: 13, fontWeight: 500,
                fontFamily: 'var(--ff-sans)', letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'background .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.12)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25d366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order on WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PartialsSection() {
  if (!FLAGS.ENABLE_PARTIALS || !PARTIALS || PARTIALS.length === 0) return null;

  const visible = PARTIALS.filter(p => p.visible === true);
  if (visible.length === 0) return null;

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
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8, maxWidth: 540, lineHeight: 1.7 }}>
          Authentic bottles from my personal collection — sold as-is. No decants on partials.
          Order directly on WhatsApp, ₹160 shipping on all partials.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 14,
      }}>
        {visible.map((p, i) => (
          <PartialCard key={p.id || i} partial={p} />
        ))}
      </div>
    </section>
  );
}
