import { S, C } from '../styles/theme.js';
import { WAIcon } from './ui.jsx';

export default function CartDrawer({ cart, onClose, onChange, buildWALink }) {
  const items = Object.entries(cart);
  const total = items.reduce((a, [, b]) => a + b.price * b.qty, 0);

  return (
    <>
      <div style={S.overlay} onClick={onClose} />
      <div style={S.drawer}>
        {/* Header */}
        <div style={S.drawerHdr}>
          <h2 style={S.drawerH2}>Your Cart</h2>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>

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
            <div style={S.totalRow}>
              <span style={S.totalLbl}>Total</span>
              <span style={S.totalAmt}>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <a style={S.waBtn} href={buildWALink()} target="_blank" rel="noopener noreferrer">
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
