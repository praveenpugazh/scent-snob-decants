import { S, C } from '../styles/theme.js';
import { FLAGS } from '../config/flags.js';

export default function Nav({ page, setPage, cartCount, openCart, scrolled }) {
  return (
    <nav style={{ ...S.nav, ...(scrolled ? S.navScrolled : {}) }}>
      {/* Shipping Banner */}
      <div style={{ background:'#141210', color:'rgba(255,255,255,0.45)', textAlign:'center', padding:'7px 1rem', fontSize:10, letterSpacing:'0.12em', borderBottom:`0.5px solid ${C.border}` }}>
        <span style={{ color:'#b09060' }}>Free shipping</span> on orders above ₹2499
        &nbsp;·&nbsp; PAN India delivery
        {!FLAGS.ENABLE_10ML && !FLAGS.ENABLE_20ML && <>&nbsp;·&nbsp; <span style={{ color:'#b09060' }}>10ml &amp; 20ml coming soon</span></>}
        {FLAGS.ENABLE_10ML && !FLAGS.ENABLE_20ML && <>&nbsp;·&nbsp; <span style={{ color:'#b09060' }}>20ml coming soon</span></>}
      </div>

      {/* Nav Row */}
      <div style={S.navInner}>
        <div style={S.navBrand} onClick={() => setPage('home')}>
          Scent Snob <em style={{ fontStyle:'italic', color:'#b09060' }}>Decants</em>
        </div>
        <div style={S.navLinks}>
          {[['home','Home'],['brands','Brands'],['about','About']].map(([p,l]) => (
            <button key={p} style={{ ...S.navBtn, color: page===p ? '#b09060' : C.t2, fontWeight: page===p ? 500 : 300 }} onClick={() => setPage(p)}>
              {l}
            </button>
          ))}
          <div style={S.cartBtn} onClick={openCart}>
            <div style={S.cartBubble}>{cartCount}</div>
            <span style={{ color: C.t2 }}>Cart</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
