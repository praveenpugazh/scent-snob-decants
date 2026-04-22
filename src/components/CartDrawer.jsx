import { useState } from 'react';
import { S, C } from '../styles/theme.js';
import { WAIcon } from './ui.jsx';

const FREE_SHIPPING_THRESHOLD = 2999;
const SHIPPING_CHARGE = 150;
const UPI_ID = '8754519509@okicici';
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

  const inputStyle = field => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `0.5px solid ${errors[field] ? '#e05a5a' : C.border}`,
    borderRadius: 3,
    padding: '8px 10px',
    fontFamily: 'var(--ff-sans)',
    fontSize: 13,
    color: C.t1,
    outline: 'none',
    transition: 'border-color .2s',
    marginTop: 3,
    boxSizing: 'border-box',
  });

  const labelStyle = {
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: C.t3,
    display: 'block',
  };

  const validate = () => {
    const e = {};
    if (!name.trim())    e.name    = true;
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) e.phone = true;
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

  const allFilled = name.trim() && phone.trim() && address.trim();

  return (
    <>
      <div style={S.overlay} onClick={onClose} />
      <div style={S.drawer}>

        {/* ── Header ── */}
        <div style={S.drawerHdr}>
          <div>
            <h2 style={{ ...S.drawerH2, fontSize: '1.1rem' }}>Your Cart</h2>
            {totalQty > 0 && (
              <div style={{ fontSize: 12, color: C.t3, marginTop: 1 }}>
                {totalQty} item{totalQty !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* ── Free shipping progress bar ── */}
        {items.length > 0 && shipping > 0 && (
          <div style={{ padding: '7px 1.25rem', background: 'rgba(176,144,96,0.05)', borderBottom: `0.5px solid ${C.border}` }}>
            <div style={{ fontSize: 12, color: C.t3, marginBottom: 4 }}>
              Add{' '}
              <span style={{ color: '#b09060', fontWeight: 500 }}>
                ₹{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')}
              </span>{' '}
              more for free shipping
            </div>
            <div style={{ height: 2, background: C.border, borderRadius: 2 }}>
              <div style={{
                height: '100%',
                width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                background: '#b09060', borderRadius: 2, transition: 'width .4s ease',
              }} />
            </div>
          </div>
        )}
        {shipping === 0 && items.length > 0 && (
          <div style={{ padding: '6px 1.25rem', background: 'rgba(176,144,96,0.05)', borderBottom: `0.5px solid ${C.border}`, fontSize: 12, color: '#b09060', textAlign: 'center', letterSpacing: '0.06em' }}>
            ✦ Free shipping unlocked!
          </div>
        )}

        {/* ── Scrollable body ── */}
        <div style={{ ...S.cartItems, overflowY: 'auto', flex: 1 }}>

          {/* Cart items */}
          {!items.length
            ? <div style={S.cartEmpty}>Your cart is empty</div>
            : items.map(([key, item]) => (
              <div key={key} style={{ ...S.cartItem, padding: '10px 0' }}>
                <div style={S.cartItemInfo}>
                  <div style={{ ...S.cartItemBrand, fontSize: 10 }}>{item.brand}</div>
                  <div style={{ ...S.cartItemName, fontSize: '0.9rem' }}>{item.name}</div>
                  <div style={{ ...S.cartItemSize, fontSize: 11 }}>{item.size}</div>
                </div>
                <div style={S.cartItemR}>
                  <div style={{ ...S.cartItemPrice, fontSize: 13 }}>
                    ₹{(item.price * item.qty).toLocaleString('en-IN')}
                  </div>
                  <div style={S.qtyRow}>
                    <button style={S.qtyBtn} onClick={() => onChange(key, -1)}>−</button>
                    <span style={S.qtyVal}>{item.qty}</span>
                    <button style={S.qtyBtn} onClick={() => onChange(key, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          }

          {/* ── Delivery details form ── */}
          {items.length > 0 && (
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: `0.5px solid ${C.border}` }}>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b09060', marginBottom: '0.75rem' }}>
                Delivery Details
              </div>

              <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>
                  Full Name{' '}
                  {errors.name && <span style={{ color: '#e05a5a', textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>required</span>}
                </label>
                <input
                  style={inputStyle('name')}
                  placeholder="Your full name"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: false })); }}
                />
              </div>

              <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>
                  Phone{' '}
                  {errors.phone && <span style={{ color: '#e05a5a', textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>valid 10-digit number</span>}
                </label>
                <input
                  style={inputStyle('phone')}
                  placeholder="10-digit mobile number"
                  value={phone}
                  type="tel"
                  maxLength={10}
                  onChange={e => { setPhone(e.target.value.replace(/\D/g, '')); setErrors(p => ({ ...p, phone: false })); }}
                />
              </div>

              <div style={{ marginBottom: 4 }}>
                <label style={labelStyle}>
                  Delivery Address{' '}
                  {errors.address && <span style={{ color: '#e05a5a', textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>required</span>}
                </label>
                <textarea
                  style={{ ...inputStyle('address'), height: 72, resize: 'none', lineHeight: 1.6 }}
                  placeholder="Flat / House no, Street, Area, City, Pincode"
                  value={address}
                  onChange={e => { setAddress(e.target.value); setErrors(p => ({ ...p, address: false })); }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Compact Footer ── */}
        {items.length > 0 && (
          <div style={{ ...S.drawerFoot, padding: '10px 1.25rem 12px' }}>

            {/* Subtotal + Shipping + Total — all on one compact block */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: `0.5px solid ${C.border}`,
              borderRadius: 4,
              padding: '8px 10px',
              marginBottom: 8,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: C.t3 }}>Subtotal ({totalQty} item{totalQty !== 1 ? 's' : ''})</span>
                <span style={{ fontSize: 12, color: C.t1 }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 6, marginBottom: 6, borderBottom: `0.5px solid ${C.border}` }}>
                <span style={{ fontSize: 11, color: C.t3 }}>Shipping</span>
                <span style={{ fontSize: 12, color: shipping === 0 ? '#b09060' : C.t1 }}>
                  {shipping === 0 ? 'Free' : `₹${shipping}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.t3 }}>Total</span>
                <span style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.2rem', fontWeight: 300, color: C.t1 }}>
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Hint if form not filled */}
            {!allFilled && (
              <div style={{ fontSize: 11, color: C.t3, textAlign: 'center', marginBottom: 6, letterSpacing: '0.04em' }}>
                Fill in delivery details above to confirm order
              </div>
            )}

            {/* WhatsApp CTA */}
            <a
              style={{
                ...S.waBtn,
                fontSize: 12,
                padding: '11px 16px',
                opacity: allFilled ? 1 : 0.45,
                pointerEvents: allFilled ? 'auto' : 'none',
              }}
              href={buildWALink(subtotal, shipping, grandTotal, totalQty, name, phone, address)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOrder}
            >
              <WAIcon size={16} />
              Confirm Order on WhatsApp
            </a>

            {/* UPI — compact inline */}
            <div style={{
              marginTop: 8,
              padding: '7px 10px',
              background: 'rgba(176,144,96,0.05)',
              border: `0.5px solid rgba(176,144,96,0.18)`,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.t3, marginBottom: 1 }}>
                  Pay via UPI after confirming
                </div>
                <div style={{ fontSize: 12, color: '#b09060', fontWeight: 500, letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {UPI_ID}
                </div>
              </div>
              <button
                style={{
                  fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: copied ? '#b09060' : C.t3,
                  background: 'none',
                  border: `0.5px solid ${copied ? 'rgba(176,144,96,0.4)' : C.border}`,
                  borderRadius: 2, padding: '4px 9px', cursor: 'pointer',
                  fontFamily: 'var(--ff-sans)', transition: 'all .2s', flexShrink: 0,
                }}
                onClick={copyUPI}
              >
                {copied ? '✓' : 'Copy'}
              </button>
            </div>

            <div style={{ fontSize: 10, color: C.t3, textAlign: 'center', marginTop: 6, lineHeight: 1.5 }}>
              Pay after WhatsApp confirmation · Send screenshot to confirm
            </div>
          </div>
        )}
      </div>
    </>
  );
}
