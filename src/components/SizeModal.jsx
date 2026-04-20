import { useState, useEffect } from 'react';
import { S } from '../styles/theme.js';
import { FLAGS } from '../config/flags.js';

export default function SizeModal({ product, onClose, onAdd }) {
  const [sel, setSel] = useState(null);

  useEffect(() => {
    if (!product) return;
    if (product.p5) setSel({ size:'5ml', price:product.p5 });
    else if (product.p10 && FLAGS.ENABLE_10ML) setSel({ size:'10ml', price:product.p10 });
  }, [product]);

  if (!product) return null;

  return (
    <div style={S.modalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modalPanel}>
        <div style={S.modalBrand}>{product.brand}</div>
        <div style={S.modalName}>{product.name}</div>
        <div style={S.modalNotes}>{product.notes}</div>

        <div style={S.sizeGrid}>
          {/* 5ml */}
          {product.p5 ? (
            <div style={{ ...S.sizeOpt, ...(sel?.size==='5ml' ? S.sizeOptSel : {}) }} onClick={() => setSel({ size:'5ml', price:product.p5 })}>
              <span style={S.sizeSz}>5ml</span>
              <span style={S.sizeSp}>₹{product.p5}</span>
            </div>
          ) : (
            <div style={{ ...S.sizeOpt, opacity:0.4, cursor:'not-allowed' }}>
              <span style={S.sizeSz}>5ml</span>
              <span style={{ ...S.sizeSp, fontSize:9, color:'#b09060', fontStyle:'italic' }}>N/A</span>
            </div>
          )}

          {/* 10ml — feature flagged */}
          {FLAGS.ENABLE_10ML ? (
            product.p10 ? (
              <div style={{ ...S.sizeOpt, ...(sel?.size==='10ml' ? S.sizeOptSel : {}) }} onClick={() => setSel({ size:'10ml', price:product.p10 })}>
                <span style={S.sizeSz}>10ml</span>
                <span style={S.sizeSp}>₹{product.p10}</span>
              </div>
            ) : (
              <div style={{ ...S.sizeOpt, opacity:0.35, cursor:'not-allowed' }}>
                <span style={S.sizeSz}>10ml</span>
                <span style={{ ...S.sizeSp, fontSize:9, color:'#b09060', fontStyle:'italic' }}>N/A</span>
              </div>
            )
          ) : (
            <div style={{ ...S.sizeOpt, opacity:0.35, cursor:'not-allowed', background:'rgba(176,144,96,0.03)' }}>
              <span style={S.sizeSz}>10ml</span>
              <span style={{ ...S.sizeSp, fontSize:9, color:'#b09060', fontStyle:'italic' }}>Glass · Coming soon</span>
            </div>
          )}
        </div>

        <div style={S.modalBtns}>
          <button style={S.btnCancel} onClick={onClose}>Cancel</button>
          <button style={{ ...S.btnAdd, opacity: sel ? 1 : 0.5 }} onClick={() => sel && onAdd(product, sel)} disabled={!sel}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
