import { useState } from 'react';
import { C, S } from '../styles/theme.js';

// ── BOTTLE SVG ──
export function BottleSVG() {
  return (
    <svg width="44" height="62" viewBox="0 0 44 62" fill="none">
      <rect x="15" y="0"  width="14" height="7"  rx="2" fill="rgba(176,144,96,0.15)" />
      <rect x="10" y="7"  width="24" height="4"  rx="1" fill="rgba(176,144,96,0.10)" />
      <rect x="4"  y="11" width="36" height="49" rx="4" fill="rgba(176,144,96,0.08)" />
      <rect x="9"  y="17" width="26" height="28" rx="2" fill="rgba(176,144,96,0.12)" />
      <rect x="4"  y="52" width="36" height="8"        fill="rgba(176,144,96,0.06)" />
    </svg>
  );
}

// ── CATEGORY BADGE ──
export function CatBadge({ cat }) {
  const bg = cat === 'niche'
    ? 'rgba(255,255,255,0.10)'
    : cat === 'designer'
    ? 'rgba(176,144,96,0.20)'
    : 'rgba(176,144,96,0.30)';
  const label = cat === 'niche' ? 'Niche' : cat === 'designer' ? 'Designer' : 'Dupe';
  return (
    <div style={{ ...S.featBadge, background: bg, color: 'rgba(255,255,255,0.8)' }}>
      {label}
    </div>
  );
}

// ── ADD BUTTON ──
export function AddBtn({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      style={{
        ...S.addBtn,
        background:   hov ? '#b09060' : 'transparent',
        borderColor:  hov ? '#b09060' : C.border,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke={hov ? '#fff' : C.t2} strokeWidth="2">
        <line x1="12" y1="5"  x2="12" y2="19" />
        <line x1="5"  y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
}

// ── PRODUCT CARD ──
export function ProductCard({ product, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...S.card,
        ...(hov ? {
          borderColor: 'rgba(176,144,96,0.4)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        } : {}),
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onOpen(product)}
    >
      <div style={S.cardImg}>
        <BottleSVG />
        <CatBadge cat={product.cat} />
      </div>
      <div style={S.cardBody}>
        <div style={S.cardBrand}>{product.brand}</div>
        <div style={S.cardName}>{product.name}</div>
        <div style={S.cardNotes}>{product.notes}</div>
        <div style={S.cardFooter}>
          <div>
            {product.p5
              ? <div style={S.pr}>₹{product.p5} <span style={{ color: C.t3, fontSize: 10 }}>/ 5ml</span></div>
              : null
            }
            <div style={S.prMuted}>10ml glass · coming soon</div>
          </div>
          <AddBtn onClick={e => { e.stopPropagation(); onOpen(product); }} />
        </div>
      </div>
    </div>
  );
}

// ── TOAST ──
export function Toast({ msg }) {
  if (!msg) return null;
  return <div style={S.toast}>{msg}</div>;
}

// ── WHATSAPP ICON ──
export function WAIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
