import { S, C } from '../styles/theme.js';
import { FLAGS } from '../config/flags.js';

export default function Nav({ page, setPage, cartCount, openCart, scrolled }) {
  return (
    <nav style={{ ...S.nav, ...(scrolled ? S.navScrolled : {}) }}>
      {/* Shipping Banner — hidden on very small screens */}
      <div style={{
        background: '#141210', color: 'rgba(255,255,255,0.45)',
        textAlign: 'center', padding: '6px 1rem',
        fontSize: 11, letterSpacing: '0.08em',
        borderBottom: `0.5px solid ${C.border}`,
        overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
      }}>
        <span style={{ color: '#b09060' }}>Free shipping</span> above ₹2999
        &nbsp;·&nbsp; PAN India
        &nbsp;·&nbsp; <span style={{ color: '#b09060' }}>Free 2ml niche sample</span> on orders above ₹4999
      </div>

      {/* Nav Row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        height: 52,
      }}>
        {/* Brand — single line */}
        <div
          style={{
            fontFamily: 'var(--ff-serif)', fontSize: '1.05rem', fontWeight: 300,
            cursor: 'pointer', color: 'rgba(255,255,255,0.92)',
            letterSpacing: '0.06em', whiteSpace: 'nowrap', flexShrink: 0,
            display: 'flex', alignItems: 'baseline', gap: 6,
          }}
          onClick={() => setPage('home')}
        >
          <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.88rem', fontFamily: 'var(--ff-sans)', fontWeight: 400, color: 'rgba(255,255,255,0.92)' }}>Scent Snob</span>
          <span style={{ color: '#b09060', fontFamily: 'var(--ff-serif)', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.04em' }}>Decants</span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          {[['home','Home'],['brands','Brands'],['about','About']].map(([p,l]) => (
            <button
              key={p}
              style={{
                fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'pointer', background: 'none', border: 'none',
                fontFamily: 'var(--ff-sans)', padding: 0,
                color: page === p ? '#b09060' : C.t2,
                fontWeight: page === p ? 500 : 300,
              }}
              onClick={() => setPage(p)}
            >
              {l}
            </button>
          ))}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.t2 }}
            onClick={openCart}
          >
            <div style={{ background: '#b09060', color: '#fff', fontSize: 9, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {cartCount}
            </div>
            <span style={{ color: C.t2 }}>Cart</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
