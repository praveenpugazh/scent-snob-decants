import { useState } from 'react';
import { S, C } from '../styles/theme.js';
import { WAIcon } from './ui.jsx';

const FREE_SHIPPING_THRESHOLD = 2999;
const SHIPPING_CHARGE = 150;
const UPI_ID = '8754519509@okbizaxis';
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
    padding: '9px 12px',
    fontFamily: 'var(--ff-sans)',
    fontSize: 14,
    color: C.t1,
    outline: 'none',
    transition: 'border-color .2s',
    marginTop: 4,
    boxSizing: 'border-box',
  });

  const labelStyle = {
    fontSize: 15,
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

  const handleOrder = e => {
    if (!validate()) {
      e.preventDefault();
    }
  };

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
            <h2 style={S.drawerH2}>Your Cart</h2>
            {totalQty > 0 && (
              <div style={{ fontSize: 14, color: C.t3, marginTop: 2 }}>
                {totalQty} item{totalQty !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* ── Free shipping progress ── */}
        {items.length > 0 && shipping > 0 && (
          <div style={{ padding: '10px 1.5rem', background: 'rgba(176,144,96,0.05)', borderBottom: `0.5px solid ${C.border}` }}>
            <div style={{ fontSize: 15, color: C.t3, marginBottom: 6 }}>
              Add{' '}
              <span style={{ color: '#b09060', fontWeight: 500 }}>
                ₹{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')}
              </span>{' '}
              more for free shipping
            </div>
            <div style={{ height: 3, background: C.border, borderRadius: 2 }}>
              <div style={{
                height: '100%',
                width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                background: '#b09060', borderRadius: 2, transition: 'width .4s ease',
              }} />
            </div>
          </div>
        )}
        {shipping === 0 && items.length > 0 && (
          <div style={{ padding: '8px 1.5rem', background: 'rgba(176,144,96,0.05)', borderBottom: `0.5px solid ${C.border}`, fontSize: 15, color: '#b09060', textAlign: 'center', letterSpacing: '0.06em' }}>
            ✦ Free shipping unlocked!
          </div>
        )}

        {/* ── Scrollable body ── */}
        <div style={{ ...S.cartItems, overflowY: 'auto' }}>

          {/* Cart items */}
          {!items.length
            ? <div style={S.cartEmpty}>Your cart is empty</div>
            : items.map(([key, item]) => (
              <div key={key} style={S.cartItem}>
                <div style={S.cartItemInfo}>
                  <div style={S.cartItemBrand}>{item.brand}</div>
                  <div style={S.cartItemName}>{item.name}</div>
                  <div style={S.cartItemSize}>{item.size}</div>
                </div>
                <div style={S.cartItemR}>
                  <div style={S.cartItemPrice}>
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
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: `0.5px solid ${C.border}` }}>
              <div style={{ fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b09060', marginBottom: '1rem' }}>
                Delivery Details
              </div>

              {/* Name */}
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>
                  Full Name{' '}
                  {errors.name && <span style={{ color: '#e05a5a', textTransform: 'none', letterSpacing: 0, fontSize: 15 }}>required</span>}
                </label>
                <input
                  style={inputStyle('name')}
                  placeholder="Your full name"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: false })); }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>
                  Phone{' '}
                  {errors.phone && <span style={{ color: '#e05a5a', textTransform: 'none', letterSpacing: 0, fontSize: 15 }}>valid 10-digit number required</span>}
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

              {/* Address */}
              <div style={{ marginBottom: 4 }}>
                <label style={labelStyle}>
                  Delivery Address{' '}
                  {errors.address && <span style={{ color: '#e05a5a', textTransform: 'none', letterSpacing: 0, fontSize: 15 }}>required</span>}
                </label>
                <textarea
                  style={{ ...inputStyle('address'), height: 84, resize: 'none', lineHeight: 1.6 }}
                  placeholder="Flat / House no, Street, Area, City, Pincode"
                  value={address}
                  onChange={e => { setAddress(e.target.value); setErrors(p => ({ ...p, address: false })); }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div style={S.drawerFoot}>

            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: C.t3 }}>
                Subtotal ({totalQty} item{totalQty !== 1 ? 's' : ''})
              </span>
              <span style={{ fontSize: 15, color: C.t1 }}>
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Shipping */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: `0.5px solid ${C.border}` }}>
              <span style={{ fontSize: 14, color: C.t3 }}>Shipping</span>
              <span style={{ fontSize: 15, color: shipping === 0 ? '#b09060' : C.t1 }}>
                {shipping === 0 ? 'Free' : `₹${shipping}`}
              </span>
            </div>

            {/* Grand total */}
            <div style={S.totalRow}>
              <span style={S.totalLbl}>Total</span>
              <span style={S.totalAmt}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* WhatsApp CTA */}
            {!allFilled && (
              <div style={{ fontSize: 15, color: C.t3, textAlign: 'center', marginBottom: 8, letterSpacing: '0.05em' }}>
                Fill in delivery details above to confirm order
              </div>
            )}
            <a
              style={{
                ...S.waBtn,
                opacity: allFilled ? 1 : 0.45,
                pointerEvents: allFilled ? 'auto' : 'none',
              }}
              href={buildWALink(subtotal, shipping, grandTotal, totalQty, name, phone, address)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOrder}
            >
              <WAIcon size={18} />
              Confirm Order on WhatsApp
            </a>

            {/* UPI payment info */}
            <div style={{
              marginTop: 12,
              padding: '10px 12px',
              background: 'rgba(176,144,96,0.06)',
              border: `0.5px solid rgba(176,144,96,0.2)`,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}>
              <div>
                <div style={{ fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.t3, marginBottom: 3 }}>
                  Pay via UPI after confirming
                </div>
                <div style={{ fontSize: 14, color: '#b09060', fontWeight: 500, letterSpacing: '0.02em' }}>
                  {UPI_ID}
                </div>
                <div style={{ fontSize: 15, color: C.t3, marginTop: 1 }}>{UPI_NAME}</div>
              </div>
              <button
                style={{
                  fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: copied ? '#b09060' : C.t3,
                  background: 'none',
                  border: `0.5px solid ${copied ? 'rgba(176,144,96,0.4)' : C.border}`,
                  borderRadius: 2, padding: '5px 10px', cursor: 'pointer',
                  fontFamily: 'var(--ff-sans)', transition: 'all .2s', flexShrink: 0,
                }}
                onClick={copyUPI}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            <div style={{ fontSize: 15, color: C.t3, textAlign: 'center', marginTop: 8, lineHeight: 1.6 }}>
              Pay after WhatsApp confirmation · Send screenshot to confirm
            </div>
          </div>
        )}
      </div>
    </>
  );
}
