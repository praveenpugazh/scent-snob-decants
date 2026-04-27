import { useState } from 'react';
import { S, C } from '../styles/theme.js';
import { WAIcon } from './ui.jsx';

const FREE_SHIPPING_THRESHOLD = 2999;
const SHIPPING_CHARGE = 150;
const UPI_ID = 'praveenpugazh14@okicici';
const UPI_NAME = 'Praveen P';

export default function CartDrawer({ cart, onClose, onChange, buildWALink }) {
  const items      = Object.entries(cart);
  const subtotal   = items.reduce((a, [, b]) => a + b.price * b.qty, 0);
  const totalQty   = items.reduce((a, [, b]) => a + b.qty, 0);
  const shipping   = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const grandTotal = subtotal + shipping;

  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');
  const [address, setAddress] = useState('');
  const [copied,  setCopied]  = useState(false);
  const [errors,  setErrors]  = useState({});
  const [step,    setStep]    = useState(1); // 1=cart, 2=checkout

  const allFilled = name.trim() && phone.replace(/\D/g,'').length >= 10 && address.trim();

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = true;
    if (phone.replace(/\D/g,'').length < 10) e.phone = true;
    if (!address.trim()) e.address = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = e => { if (!validate()) e.preventDefault(); };

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const inp = field => ({
    width: '100%', boxSizing: 'border-box', display: 'block',
    background: 'rgba(255,255,255,0.07)',
    border: `1px solid ${errors[field] ? '#e05a5a' : 'rgba(255,255,255,0.18)'}`,
    borderRadius: 6, padding: '11px 13px',
    fontFamily: 'var(--ff-sans)', fontSize: 14,
    color: '#fff', outline: 'none',
    transition: 'border-color .2s',
  });

  const lbl = {
    fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 5,
  };

  const stepCircle = (n, active) => ({
    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 700, color: '#fff',
    background: active === 'done' ? '#4caf7d' : active === 'active' ? '#b09060' : 'rgba(255,255,255,0.15)',
  });

  return (
    <>
      <div style={S.overlay} onClick={onClose} />
      <div style={{
        ...S.drawer,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* ── Header ── */}
        <div style={{ ...S.drawerHdr, flexShrink: 0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                style={{ background:'none', border:'none', color: C.t3, cursor:'pointer', fontSize:18, padding:'0 4px 0 0', lineHeight:1 }}
              >←</button>
            )}
            <div>
              <h2 style={{ ...S.drawerH2, fontSize: '1.1rem', margin:0 }}>
                {step === 1 ? 'Your Cart' : 'Checkout'}
              </h2>
              {totalQty > 0 && (
                <div style={{ fontSize: 12, color: C.t3, marginTop: 1 }}>
                  {totalQty} item{totalQty !== 1 ? 's' : ''} · ₹{grandTotal.toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </div>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* ── Free shipping bar ── */}
        {items.length > 0 && (
          <div style={{ flexShrink: 0, padding: '7px 1.25rem', background: 'rgba(176,144,96,0.04)', borderBottom: `0.5px solid ${C.border}` }}>
            {shipping > 0 ? (
              <>
                <div style={{ fontSize: 12, color: C.t3, marginBottom: 4 }}>
                  Add <span style={{ color: '#b09060', fontWeight: 500 }}>₹{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')}</span> more for free shipping
                </div>
                <div style={{ height: 2, background: C.border, borderRadius: 2 }}>
                  <div style={{ height:'100%', width:`${Math.min((subtotal/FREE_SHIPPING_THRESHOLD)*100,100)}%`, background:'#b09060', borderRadius:2, transition:'width .4s' }} />
                </div>
              </>
            ) : (
              <div style={{ fontSize: 12, color: '#b09060', textAlign:'center', letterSpacing:'0.06em' }}>✦ Free shipping unlocked!</div>
            )}
          </div>
        )}

        {/* ══ STEP 1: CART ITEMS ══ */}
        {step === 1 && (
          <>
            {/* Scrollable items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem' }}>
              {!items.length
                ? <div style={{ ...S.cartEmpty }}>Your cart is empty</div>
                : items.map(([key, item]) => (
                  <div key={key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding: '14px 0', borderBottom:`0.5px solid ${C.border}` }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize: 10, letterSpacing:'0.1em', textTransform:'uppercase', color:'#b09060', marginBottom:2 }}>{item.brand}</div>
                      <div style={{ fontSize: 14, color:'rgba(255,255,255,0.9)', fontFamily:'var(--ff-serif)', marginBottom:3, lineHeight:1.3 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: C.t3 }}>{item.size}</div>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8, flexShrink:0, marginLeft:12 }}>
                      <div style={{ fontSize: 15, color:'rgba(255,255,255,0.9)', fontWeight:500 }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                      <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.04)', border:`0.5px solid ${C.border}`, borderRadius:4, padding:'2px 4px' }}>
                        <button style={{ background:'none', border:'none', color:C.t2, cursor:'pointer', fontSize:16, width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center' }} onClick={() => onChange(key, -1)}>−</button>
                        <span style={{ fontSize:13, color:'rgba(255,255,255,0.8)', minWidth:16, textAlign:'center' }}>{item.qty}</span>
                        <button style={{ background:'none', border:'none', color:C.t2, cursor:'pointer', fontSize:16, width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center' }} onClick={() => onChange(key, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Order summary + proceed button */}
            {items.length > 0 && (
              <div style={{ flexShrink:0, padding:'14px 1.25rem 20px', borderTop:`0.5px solid ${C.border}` }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{ fontSize:12, color:C.t3 }}>Subtotal</span>
                  <span style={{ fontSize:13, color:C.t1 }}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, paddingBottom:12, borderBottom:`0.5px solid ${C.border}` }}>
                  <span style={{ fontSize:12, color:C.t3 }}>Shipping</span>
                  <span style={{ fontSize:13, color: shipping===0 ? '#b09060' : C.t1 }}>{shipping===0?'Free':`₹${shipping}`}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                  <span style={{ fontSize:13, letterSpacing:'0.08em', textTransform:'uppercase', color:C.t2 }}>Total</span>
                  <span style={{ fontFamily:'var(--ff-serif)', fontSize:'1.4rem', fontWeight:300, color:'rgba(255,255,255,0.95)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  style={{ width:'100%', padding:'13px', background:'#b09060', border:'none', borderRadius:6, color:'#fff', fontSize:13, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'var(--ff-sans)', cursor:'pointer' }}
                >
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </>
        )}

        {/* ══ STEP 2: CHECKOUT ══ */}
        {step === 2 && (
          <div style={{ flex:1, overflowY:'auto', padding:'1rem 1.25rem 2rem' }}>

            {/* Order summary (compact) */}
            <div style={{ background:'rgba(255,255,255,0.02)', border:`0.5px solid ${C.border}`, borderRadius:6, padding:'10px 12px', marginBottom:20 }}>
              {items.map(([key,item]) => (
                <div key={key} style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:C.t3, marginBottom:3 }}>
                  <span>{item.name} ({item.size}) ×{item.qty}</span>
                  <span style={{ color:C.t1 }}>₹{(item.price*item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, paddingTop:8, borderTop:`0.5px solid ${C.border}` }}>
                <span style={{ fontSize:13, fontWeight:500, color:C.t2, letterSpacing:'0.06em', textTransform:'uppercase' }}>Total</span>
                <span style={{ fontSize:16, fontFamily:'var(--ff-serif)', color:'rgba(255,255,255,0.95)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* STEP 1 — Delivery */}
            <div style={{ marginBottom:20 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <div style={stepCircle(1, allFilled ? 'done' : 'active')}>{allFilled ? '✓' : '1'}</div>
                <span style={{ fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color: allFilled ? '#4caf7d' : '#b09060', fontWeight:500 }}>
                  {allFilled ? 'Delivery Details ✓' : 'Your Delivery Details'}
                </span>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div>
                  <label style={lbl}>Full Name {errors.name && <span style={{color:'#e05a5a',textTransform:'none',letterSpacing:0}}>· required</span>}</label>
                  <input style={inp('name')} placeholder="Your full name" value={name} onChange={e=>{setName(e.target.value);setErrors(p=>({...p,name:false}));}} />
                </div>
                <div>
                  <label style={lbl}>Phone {errors.phone && <span style={{color:'#e05a5a',textTransform:'none',letterSpacing:0}}>· 10 digits required</span>}</label>
                  <input style={inp('phone')} placeholder="10-digit mobile number" type="tel" maxLength={10} value={phone} onChange={e=>{setPhone(e.target.value.replace(/\D/g,''));setErrors(p=>({...p,phone:false}));}} />
                </div>
                <div>
                  <label style={lbl}>Delivery Address {errors.address && <span style={{color:'#e05a5a',textTransform:'none',letterSpacing:0}}>· required</span>}</label>
                  <textarea style={{...inp('address'), height:72, resize:'none', lineHeight:1.6}} placeholder="Flat / House no, Street, Area, City, Pincode" value={address} onChange={e=>{setAddress(e.target.value);setErrors(p=>({...p,address:false}));}} />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height:'0.5px', background:C.border, marginBottom:20 }} />

            {/* STEP 2 — Pay */}
            <div style={{ marginBottom:20, opacity: allFilled?1:0.35, transition:'opacity .25s', pointerEvents: allFilled?'auto':'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <div style={stepCircle(2,'active')}>2</div>
                <span style={{ fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'#b09060', fontWeight:500 }}>Pay to Reserve</span>
              </div>
              <div style={{ background:'rgba(176,144,96,0.06)', border:'0.5px solid rgba(176,144,96,0.25)', borderRadius:8, padding:'14px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                  <div>
                    <div style={{ fontSize:24, color:'rgba(255,255,255,0.95)', fontWeight:600 }}>₹{grandTotal.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize:11, color:'#b09060', marginTop:2 }}>{UPI_ID}</div>
                  </div>
                  <button onClick={copyUPI} style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color: copied?'#b09060':C.t3, background:'none', border:`0.5px solid ${copied?'rgba(176,144,96,0.5)':C.border}`, borderRadius:4, padding:'7px 13px', cursor:'pointer', fontFamily:'var(--ff-sans)', transition:'all .2s', flexShrink:0 }}>
                    {copied ? '✓ Copied' : 'Copy UPI'}
                  </button>
                </div>
                <a
                  href={`upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${grandTotal}&cu=INR`}
                  style={{ display:'block', textAlign:'center', padding:'11px', borderRadius:6, background:'rgba(176,144,96,0.18)', border:'0.5px solid rgba(176,144,96,0.4)', color:'#b09060', fontSize:12, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', textDecoration:'none', fontFamily:'var(--ff-sans)' }}
                >
                  Open GPay / PhonePe / Paytm
                </a>
                <div style={{ fontSize:10, color:C.t3, marginTop:8, textAlign:'center', letterSpacing:'0.04em' }}>
                  No payment = no reservation. Stock not held until paid.
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height:'0.5px', background:C.border, marginBottom:20 }} />

            {/* STEP 3 — WhatsApp */}
            <div style={{ opacity: allFilled?1:0.35, transition:'opacity .25s' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <div style={stepCircle(3, allFilled?'active':'inactive')}>3</div>
                <span style={{ fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(37,211,102,0.85)', fontWeight:500 }}>Confirm on WhatsApp</span>
              </div>
              <a
                style={{ ...S.waBtn, fontSize:13, padding:'13px 16px', pointerEvents: allFilled?'auto':'none', display:'flex', alignItems:'center', justifyContent:'center', gap:8, textDecoration:'none', borderRadius:6 }}
                href={buildWALink(subtotal, shipping, grandTotal, totalQty, name, phone, address)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOrder}
              >
                <WAIcon size={16} />
                Send Order + Payment Screenshot
              </a>
              <div style={{ fontSize:10, color:C.t3, textAlign:'center', marginTop:8, lineHeight:1.6 }}>
                Pay first via UPI · Then send payment screenshot on WhatsApp
              </div>
            </div>

          </div>
        )}

      </div>
    </>
  );
}
