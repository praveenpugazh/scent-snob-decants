import { useState, useEffect, useCallback } from 'react';
import './styles/global.css';

import Nav        from './components/Nav.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SizeModal  from './components/SizeModal.jsx';
import { Toast, WAIcon } from './components/ui.jsx';
import ScentQuiz from './components/ScentQuiz.jsx';
import { S, C }   from './styles/theme.js';

import HomePage   from './pages/HomePage.jsx';
import BrandsPage from './pages/BrandsPage.jsx';
import AboutPage  from './pages/AboutPage.jsx';

const WA_NUMBER = '918754519509';

export default function App() {
  const [page,     setPage]     = useState('home');
  const [cart,     setCart]     = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [modal,    setModal]    = useState(null);
  const [toast,    setToast]    = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showBtt,  setShowBtt]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBtt(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const showToast = useCallback(msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }, []);

  const addToCart = useCallback((product, size) => {
    const key = `${product.id}-${size.size}`;
    setCart(prev => ({
      ...prev,
      [key]: prev[key]
        ? { ...prev[key], qty: prev[key].qty + 1 }
        : { name: product.name, brand: product.brand, size: size.size, price: size.price, qty: 1 },
    }));
    showToast(`${product.name} (${size.size}) added`);
    setModal(null);
  }, [showToast]);

  const changeQty = useCallback((key, delta) => {
    setCart(prev => {
      const next = { ...prev };
      next[key] = { ...next[key], qty: next[key].qty + delta };
      if (next[key].qty <= 0) delete next[key];
      return next;
    });
  }, []);

  const cartCount = Object.values(cart).reduce((a, b) => a + b.qty, 0);

  // buildWALink now receives customer details from CartDrawer
  const buildWALink = useCallback((subtotal, shipping, grandTotal, totalQty, name, phone, address) => {
    const items = Object.values(cart);
    let msg = '🛒 *New Order — Scent Snob Decants*\n\n';

    // Order items
    items.forEach(i => {
      msg += `• ${i.brand} — ${i.name} (${i.size}) × ${i.qty} = ₹${(i.price * i.qty).toLocaleString('en-IN')}\n`;
    });

    // Order summary
    msg += `\n━━━━━━━━━━━━━━━`;
    msg += `\nTotal items : ${totalQty}`;
    msg += `\nSubtotal   : ₹${subtotal.toLocaleString('en-IN')}`;
    msg += `\nShipping   : ${shipping === 0 ? 'Free 🎉' : `₹${shipping}`}`;
    msg += `\n*Grand Total: ₹${grandTotal.toLocaleString('en-IN')}*`;
    msg += `\n━━━━━━━━━━━━━━━`;

    // Customer details
    msg += `\n\n*Delivery Details*`;
    msg += `\nName    : ${name}`;
    msg += `\nPhone   : ${phone}`;
    msg += `\nAddress : ${address}`;

    // Payment instructions
    msg += `\n\n*Payment*`;
    msg += `\nPay ₹${grandTotal.toLocaleString('en-IN')} to GPay/UPI: *8754519509@okbizaxis* (Praveen P)`;
    msg += `\nSend payment screenshot to confirm your order 📸`;

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [cart]);

  return (
    <div style={S.page}>
      <Nav
        page={page} setPage={setPage}
        cartCount={cartCount} openCart={() => setCartOpen(true)}
        scrolled={scrolled}
      />

      {page === 'home'   && <HomePage   onOpen={setModal} setPage={setPage} />}
      {page === 'brands' && <BrandsPage onOpen={setModal} />}
      {page === 'about'  && <AboutPage />}

      <footer style={S.footer}>
        <span style={S.footerBrand}>
          Scent Snob <em style={{ fontStyle: 'italic', color: '#b09060' }}>Decants</em>
        </span>
        <div style={S.footerLinks}>
          <a href={`https://wa.me/${WA_NUMBER}`} style={{ color: '#b09060' }}>
            WhatsApp: +91 87545 19509
          </a>
          <a href="https://www.instagram.com/the_scent_snob_" target="_blank" rel="noopener noreferrer" style={{ color: '#b09060' }}>
            @the_scent_snob_
          </a>
        </div>
        <div>© 2026 Scent Snob Decants · All rights reserved</div>
      </footer>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onChange={changeQty}
          buildWALink={buildWALink}
        />
      )}
      {modal && (
        <SizeModal
          product={modal}
          onClose={() => setModal(null)}
          onAdd={addToCart}
        />
      )}

      <button
        style={S.waFloat}
        onClick={() => window.open(`https://wa.me/${WA_NUMBER}`, '_blank')}
        aria-label="Chat on WhatsApp"
      >
        <WAIcon size={26} />
      </button>

      {showBtt && (
        <button style={S.btt} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.t2} strokeWidth="2.5">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      <Toast msg={toast} />
    </div>
  );
}
