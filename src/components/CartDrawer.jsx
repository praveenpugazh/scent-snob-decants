import { S, C } from '../styles/theme.js';
import { WAIcon } from './ui.jsx';

const FREE_SHIPPING_THRESHOLD = 2999;
const SHIPPING_CHARGE = 150;

export default function CartDrawer({ cart, onClose, onChange, buildWALink }) {
  const items      = Object.entries(cart);
  const subtotal   = items.reduce((a, [, b]) => a + b.price * b.qty, 0);
  const totalQty   = items.reduce((a, [, b]) => a + b.qty, 0);
  const shipping   = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const grandTotal = subtotal + shipping;

  return (
    <>
      <div style={S.overlay} onClick={onClose} />
      <div style={S.drawer}>

        {/* Header */}
        <div style={S.drawerHdr}>
          <div>
            <h2 style={S.drawerH2}>Your Cart</h2>
            {totalQty > 0 && (
              <div style={{ fontSize: 11, color: C.t3, marginTop: 2 }}>
                {totalQty} item{totalQty !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Free shipping progress bar */}
        {items.length > 0 && shipping > 0 && (
          <div style={{
            padding: '10px 1.5rem',
            background: 'rgba(176,144,96,0.06)',
            borderBottom: `0.5px solid ${C.border}`,
          }}>
            <div style={{ fontSize: 10, color: C.t3, marginBottom: 6 }}>
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
                background: '#b09060',
                borderRadius: 2,
                transition: 'width .4s ease',
              }} />
            </div>
          </div>
        )}

        {shipping === 0 && items.length > 0 && (
          <div style={{
            padding: '8px 1.5rem',
            background: 'rgba(176,144,96,0.06)',
            borderBottom: `0.5px solid ${C.border}`,
            fontSize: 10, color: '#b09060',
            textAlign: 'center', letterSpacing: '0.06em',
          }}>
            ✦ Free shipping unlocked!
          </div>
        )}

        {/* Items */}
        <div style={S.cartItems}>
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
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={S.drawerFoot}>

            {/* Subtotal */}
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: C.t3 }}>
                Subtotal ({totalQty} item{totalQty !== 1 ? 's' : ''})
              </span>
              <span style={{ fontSize: 13, color: C.t1 }}>
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Shipping row */}
            <div style={{
              display:'flex', justifyContent:'space-between',
              marginBottom: 12, paddingBottom: 12,
              borderBottom: `0.5px solid ${C.border}`,
            }}>
              <span style={{ fontSize: 11, color: C.t3 }}>Shipping</span>
              <span style={{ fontSize: 13, color: shipping === 0 ? '#b09060' : C.t1 }}>
                {shipping === 0 ? 'Free' : `₹${shipping}`}
              </span>
            </div>

            {/* Grand total */}
            <div style={S.totalRow}>
              <span style={S.totalLbl}>Total</span>
              <span style={S.totalAmt}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <a
              style={S.waBtn}
              href={buildWALink(subtotal, shipping, grandTotal, totalQty)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WAIcon size={18} />
              Order via WhatsApp
            </a>
            <div style={S.cartNote}>
              We confirm availability & share payment details on WhatsApp
            </div>
          </div>
        )}
      </div>
    </>
  );
}
