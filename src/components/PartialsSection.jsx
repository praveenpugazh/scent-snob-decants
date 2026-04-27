import { useState } from 'react';
import { PARTIALS, PRODUCT_IMAGES } from '../data/products.js';
import { FLAGS } from '../config/flags.js';

const SHIPPING = 160;

function PartialCard({ partial, onAdd }) {
  const [hov, setHov] = useState(false);
  const [added, setAdded] = useState(false);
  const mlLeft = partial.mlLeft;
  const pct = Math.round((mlLeft / partial.fullMl) * 100);
  const isSoldOut = partial.soldOut === true;
  const imgKey = `${partial.brand}|${partial.name}`;
  const hasImg = !!PRODUCT_IMAGES[imgKey];

  const handleAdd = () => {
    if (isSoldOut || partial.price === 0) return;
    onAdd(
      { id: partial.id, brand: partial.brand, name: partial.name.replace(' (Partial)', '') },
      { size: `${mlLeft}ml partial`, price: partial.price }
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: isSoldOut ? 'rgba(255,255,255,0.01)' : hov ? 'rgba(176,144,96,0.07)' : 'rgba(255,255,255,0.02)',
        border: `0.5px solid ${hov && !isSoldOut ? 'rgba(176,144,96,0.4)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 8, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'all .18s',
        transform: hov && !isSoldOut ? 'translateY(-2px)' : 'none',
        opacity: isSoldOut ? 0.45 : 1,
        position: 'relative',
      }}
    >
      {/* Sold out overlay */}
      {isSoldOut && (
        <div style={{ position:'absolute', inset:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.3)' }}>
          <span style={{ fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', fontFamily:'var(--ff-sans)', border:'0.5px solid rgba(255,255,255,0.2)', padding:'4px 12px', borderRadius:3 }}>Sold Out</span>
        </div>
      )}

      {/* Image */}
      {hasImg ? (
        <div style={{ height: 200, flexShrink: 0, overflow: 'hidden' }}>
          <img src={PRODUCT_IMAGES[imgKey]} alt={partial.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        </div>
      ) : (
        <div style={{ padding: '1rem 1.1rem 0' }}>
          <div style={{ height:3, background:'rgba(255,255,255,0.08)', borderRadius:2 }}>
            <div style={{ height:'100%', borderRadius:2, width:`${pct}%`, background: pct>50?'#4caf7d':pct>25?'#b09060':'#dc5050' }}/>
          </div>
        </div>
      )}

      <div style={{ padding:'0.9rem 1.1rem 1.1rem', display:'flex', flexDirection:'column', gap:5, flexGrow:1 }}>
        {/* Badge */}
        <div style={{ alignSelf:'flex-start', background:'rgba(176,144,96,0.12)', border:'0.5px solid rgba(176,144,96,0.35)', color:'#b09060', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', padding:'2px 7px', borderRadius:3, fontFamily:'var(--ff-sans)' }}>
          Partial · {mlLeft}ml remaining
        </div>

        <div style={{ fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', color:'#b09060', fontFamily:'var(--ff-sans)', marginTop:2 }}>{partial.brand}</div>
        <div style={{ fontFamily:'var(--ff-serif)', fontSize:'0.95rem', fontWeight:400, color:'rgba(255,255,255,0.92)', lineHeight:1.3 }}>{partial.name.replace(' (Partial)','')}</div>
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.28)' }}>{partial.notes}</div>

        {/* Fill bar */}
        <div style={{ marginTop:6 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
            <span style={{ fontSize:10, color:'rgba(255,255,255,0.32)' }}>{mlLeft}ml of {partial.fullMl}ml</span>
            <span style={{ fontSize:10, color: pct>50?'#4caf7d':pct>25?'#b09060':'#dc5050', fontWeight:500 }}>{pct}%</span>
          </div>
          <div style={{ height:3, background:'rgba(255,255,255,0.08)', borderRadius:2 }}>
            <div style={{ height:'100%', borderRadius:2, width:`${pct}%`, background: pct>50?'#4caf7d':pct>25?'#b09060':'#dc5050' }}/>
          </div>
        </div>

        {partial.condition && (
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.28)', marginTop:1 }}>{partial.condition}</div>
        )}

        {/* Price + Add to Cart */}
        <div style={{ marginTop:'auto', paddingTop:12 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:3 }}>
            <span style={{ fontSize:22, color:'#b09060', fontWeight:500 }}>₹{partial.price.toLocaleString('en-IN')}</span>
            <span style={{ fontSize:10, color:'rgba(255,255,255,0.25)' }}>+ ₹{SHIPPING} shipping</span>
          </div>
          {!isSoldOut && partial.price > 0 && (
            <button
              onClick={handleAdd}
              style={{
                width:'100%', padding:'10px', marginTop:8,
                background: added ? 'rgba(76,175,125,0.2)' : 'rgba(176,144,96,0.12)',
                border: `0.5px solid ${added ? 'rgba(76,175,125,0.5)' : 'rgba(176,144,96,0.35)'}`,
                borderRadius:6, color: added ? '#4caf7d' : '#b09060',
                fontSize:12, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase',
                fontFamily:'var(--ff-sans)', cursor:'pointer', transition:'all .2s',
              }}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PartialsSection({ onAdd }) {
  if (!FLAGS.ENABLE_PARTIALS || !PARTIALS || PARTIALS.length === 0) return null;
  const visible = PARTIALS.filter(p => p.visible === true);
  if (visible.length === 0) return null;

  return (
    <section style={{ padding:'4rem 4vw', background:'#0e0c0a', borderTop:'0.5px solid rgba(255,255,255,0.05)' }}>
      <div style={{ marginBottom:'2rem' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:10 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#b09060' }}/>
          <span style={{ fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'#b09060', fontFamily:'var(--ff-sans)' }}>Authenticated Partials</span>
        </div>
        <h2 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(1.8rem, 3vw, 2.2rem)', fontWeight:400, color:'rgba(255,255,255,0.92)', margin:0 }}>Partial Bottles</h2>
        <p style={{ fontSize:13, color:'rgba(255,255,255,0.35)', marginTop:8, maxWidth:540, lineHeight:1.7 }}>
          Authentic bottles from my personal collection — sold as-is. Add to cart and checkout just like a regular order. ₹{SHIPPING} shipping on all partials.
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:14 }}>
        {visible.map((p, i) => <PartialCard key={p.id || i} partial={p} onAdd={onAdd} />)}
      </div>
    </section>
  );
}
