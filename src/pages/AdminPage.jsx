import { useState, useEffect, useCallback } from 'react';
import { C } from '../styles/theme.js';

const ADMIN_KEY   = 'scentsnob_admin_2024';
const POST_URL    = 'https://script.google.com/macros/s/AKfycbwo609JWeg6NHLi-C4Fcea-ME2-X1OmFdjA_Ju7HKCqDEszRsHwNFEkredAGv8dMfRe/exec';
const GET_URL     = 'https://script.google.com/macros/s/AKfycbyRoTcexwmKRkmyVYINqZ08S237oybFZt60ZpFElXxd6go7KlelJTB_QlD3r-eGwuhC/exec';

const genId  = () => `SS-${Date.now().toString(36).toUpperCase()}`;
const today  = () => new Date().toISOString().split('T')[0];
const fmt    = n  => `₹${Number(n).toLocaleString('en-IN')}`;

const STATUS_COLORS = {
  'Pending'  : { bg:'rgba(255,200,50,0.12)',  border:'rgba(255,200,50,0.4)',  text:'#ffc832' },
  'Paid'     : { bg:'rgba(100,180,255,0.12)', border:'rgba(100,180,255,0.4)', text:'#64b4ff' },
  'Packed'   : { bg:'rgba(176,144,96,0.12)',  border:'rgba(176,144,96,0.4)',  text:'#b09060' },
  'Shipped'  : { bg:'rgba(76,175,125,0.12)',  border:'rgba(76,175,125,0.4)',  text:'#4caf7d' },
  'Delivered': { bg:'rgba(76,175,125,0.2)',   border:'rgba(76,175,125,0.6)',  text:'#4caf7d' },
  'Cancelled': { bg:'rgba(220,80,80,0.12)',   border:'rgba(220,80,80,0.4)',   text:'#dc5050' },
};
const STATUSES = Object.keys(STATUS_COLORS);

const inp = (extra={}) => ({
  width:'100%', background:'rgba(255,255,255,0.04)',
  border:'0.5px solid rgba(255,255,255,0.12)', borderRadius:4,
  padding:'8px 10px', fontFamily:'var(--ff-sans)', fontSize:13,
  color:'rgba(255,255,255,0.9)', outline:'none', boxSizing:'border-box', ...extra,
});

const lbl = { fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:3 };

// ── Post to Sheet ─────────────────────────────────────────
const postToSheet = async (row) => {
  try {
    await fetch(POST_URL, {
      method:'POST', mode:'no-cors',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(row),
    });
  } catch(e) { console.warn('Sheet post failed:', e); }
};

// ── Fetch from Sheet ──────────────────────────────────────
const fetchFromSheet = async () => {
  try {
    const res  = await fetch(GET_URL);
    const data = await res.json();
    // Map sheet columns to order objects
    return data
      .filter(row => row['Order ID'])
      .map(row => ({
        id:        row['Order ID']  || '',
        date:      row['Date']      || '',
        name:      row['Name']      || '',
        phone:     row['Phone']     || '',
        items:     row['Items']     || '',
        amount:    Number(row['Total']) || 0,
        status:    row['Status']    || 'Pending',
        address:   row['Address']   || '',
        notes:     row['Notes']     || '',
        createdAt: row['Date']      || '',
      }));
  } catch(e) {
    console.warn('Sheet fetch failed:', e);
    return null;
  }
};

// ── StatusPill ────────────────────────────────────────────
function StatusPill({ status, onChange }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS['Pending'];
  return (
    <select value={status} onChange={e => { e.stopPropagation(); onChange(e.target.value); }}
      style={{ background:c.bg, border:`0.5px solid ${c.border}`, color:c.text,
        borderRadius:20, padding:'3px 10px', fontSize:11,
        fontFamily:'var(--ff-sans)', cursor:'pointer', outline:'none' }}>
      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}

// ── Order Modal (Add / Edit) ──────────────────────────────
function OrderModal({ initial, onSave, onClose }) {
  const isEdit = !!initial?.id;
  const [form, setForm] = useState(initial || {
    date:today(), name:'', phone:'', address:'',
    items:'', amount:'', status:'Pending', notes:'',
  });

  const set = (k,v) => setForm(f => ({...f, [k]:v}));

  const handleSave = () => {
    if (!form.name || !form.amount) return;
    onSave({ ...form, id: isEdit ? form.id : genId(), createdAt: form.createdAt || new Date().toISOString() });
    onClose();
  };

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:300 }}/>
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        background:'#1a1714', border:'0.5px solid rgba(176,144,96,0.3)',
        borderRadius:8, padding:'1.5rem', width:'min(520px,95vw)',
        zIndex:310, maxHeight:'90vh', overflowY:'auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:'1.2rem', color:'rgba(255,255,255,0.92)' }}>
            {isEdit ? 'Edit Order' : 'Log New Order'}
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', fontSize:18, cursor:'pointer' }}>✕</button>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
          <div>
            <label style={lbl}>Date</label>
            <input type="date" style={inp()} value={form.date} onChange={e => set('date', e.target.value)}/>
          </div>
          <div>
            <label style={lbl}>Status</label>
            <select style={inp()} value={form.status} onChange={e => set('status', e.target.value)}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
          <div>
            <label style={lbl}>Customer Name *</label>
            <input style={inp()} placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)}/>
          </div>
          <div>
            <label style={lbl}>Phone</label>
            <input style={inp()} placeholder="10-digit number" value={form.phone} onChange={e => set('phone', e.target.value)}/>
          </div>
        </div>

        <div style={{ marginBottom:10 }}>
          <label style={lbl}>Address</label>
          <textarea style={inp({height:60, resize:'none'})} placeholder="Delivery address" value={form.address} onChange={e => set('address', e.target.value)}/>
        </div>

        <div style={{ marginBottom:10 }}>
          <label style={lbl}>Items Ordered</label>
          <textarea style={inp({height:80, resize:'none'})} placeholder="e.g. Hawas Ice 5ml × 2, Aventus 10ml × 1" value={form.items} onChange={e => set('items', e.target.value)}/>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
          <div>
            <label style={lbl}>Order Amount (₹) *</label>
            <input style={inp()} type="number" placeholder="Total amount" value={form.amount} onChange={e => set('amount', e.target.value)}/>
          </div>
          <div>
            <label style={lbl}>Notes</label>
            <input style={inp()} placeholder="Any notes" value={form.notes} onChange={e => set('notes', e.target.value)}/>
          </div>
        </div>

        <div style={{ display:'flex', gap:10, marginTop:'1rem' }}>
          <button onClick={onClose} style={{ flex:1, padding:'10px', background:'transparent', border:'0.5px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.5)', borderRadius:4, cursor:'pointer', fontFamily:'var(--ff-sans)', fontSize:13 }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ flex:2, padding:'10px', background:'#b09060', border:'none', color:'#fff', borderRadius:4, cursor:'pointer', fontFamily:'var(--ff-sans)', fontSize:13, letterSpacing:'0.08em' }}>
            {isEdit ? 'Save Changes' : 'Save Order'}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Order Row ─────────────────────────────────────────────
function OrderRow({ order, onStatusChange, onDelete, onEdit }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ background:'rgba(255,255,255,0.02)', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:6, marginBottom:8, overflow:'hidden' }}>
      <div style={{ display:'grid', gridTemplateColumns:'90px 1fr 80px 120px 90px', gap:12, padding:'10px 14px', alignItems:'center', cursor:'pointer' }}
        onClick={() => setExpanded(e => !e)}>
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>{order.date}</div>
        <div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,0.9)' }}>{order.name || '—'}</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>{order.phone || 'No phone'}</div>
        </div>
        <div style={{ fontSize:14, color:'#b09060', fontWeight:500 }}>{fmt(order.amount)}</div>
        <div onClick={e => e.stopPropagation()}>
          <StatusPill status={order.status} onChange={v => onStatusChange(order.id, v)}/>
        </div>
        <div style={{ fontSize:10, color:'rgba(255,255,255,0.2)', textAlign:'right' }}>{order.id}</div>
      </div>

      {expanded && (
        <div style={{ borderTop:'0.5px solid rgba(255,255,255,0.06)', padding:'10px 14px', background:'rgba(0,0,0,0.2)' }}>
          {order.items && (
            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:3 }}>Items</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)', lineHeight:1.7 }}>{order.items}</div>
            </div>
          )}
          {order.address && (
            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:3 }}>Address</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)', lineHeight:1.6 }}>{order.address}</div>
            </div>
          )}
          {order.notes && (
            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:3 }}>Notes</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)' }}>{order.notes}</div>
            </div>
          )}
          <div style={{ display:'flex', gap:8, marginTop:10 }}>
            <button onClick={() => onEdit(order)}
              style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'#b09060', background:'rgba(176,144,96,0.1)', border:'0.5px solid rgba(176,144,96,0.3)', borderRadius:3, padding:'6px 14px', cursor:'pointer', fontFamily:'var(--ff-sans)' }}>
              Edit
            </button>
            <button onClick={() => { if(window.confirm('Delete this order?')) onDelete(order.id); }}
              style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(220,80,80,0.8)', background:'rgba(220,80,80,0.08)', border:'0.5px solid rgba(220,80,80,0.25)', borderRadius:3, padding:'6px 14px', cursor:'pointer', fontFamily:'var(--ff-sans)' }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────
export default function AdminPage() {
  const [auth,         setAuth]         = useState(sessionStorage.getItem('ss_auth') === ADMIN_KEY);
  const [pwInput,      setPwInput]      = useState('');
  const [pwError,      setPwError]      = useState(false);
  const [orders,       setOrders]       = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [sheetError,   setSheetError]   = useState(false);
  const [showAdd,      setShowAdd]      = useState(false);
  const [editOrder,    setEditOrder]    = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [search,       setSearch]       = useState('');
  const [lastRefresh,  setLastRefresh]  = useState(null);

  // Load orders from Sheet
  const loadOrders = useCallback(async () => {
    setLoading(true);
    setSheetError(false);
    const data = await fetchFromSheet();
    if (data) {
      setOrders(data);
      setLastRefresh(new Date().toLocaleTimeString('en-IN'));
    } else {
      setSheetError(true);
      // Fallback to localStorage
      const local = localStorage.getItem('ss_orders');
      if (local) setOrders(JSON.parse(local));
    }
    setLoading(false);
  }, []);

  useEffect(() => { if (auth) loadOrders(); }, [auth]);

  // Save locally as backup too
  useEffect(() => {
    if (orders.length > 0) localStorage.setItem('ss_orders', JSON.stringify(orders));
  }, [orders]);

  const handleLogin = () => {
    if (pwInput === 'scentsnobboss') {
      sessionStorage.setItem('ss_auth', ADMIN_KEY);
      setAuth(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 1500);
    }
  };

  const addOrder = async (o) => {
    setOrders(prev => [o, ...prev]);
    await postToSheet({ orderId:o.id, date:o.date, name:o.name, phone:o.phone,
      items:o.items, subtotal:o.amount, shipping:0, total:o.amount,
      address:o.address, status:o.status, notes:o.notes });
  };

  const updateOrder = (updated) => {
    setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
  };

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? {...o, status} : o));
  };

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const exportCSV = () => {
    const header = 'ID,Date,Name,Phone,Items,Amount,Status,Address,Notes';
    const rows = orders.map(o =>
      [o.id, o.date, `"${o.name}"`, o.phone, `"${o.items||''}"`, o.amount, o.status, `"${o.address||''}"`, `"${o.notes||''}"`].join(',')
    );
    const blob = new Blob([[header,...rows].join('\n')], { type:'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `scent-snob-orders-${today()}.csv`;
    a.click();
  };

  // ── Login ───────────────────────────────────────────────
  if (!auth) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0c0a08' }}>
      <div style={{ background:'#141210', border:'0.5px solid rgba(176,144,96,0.2)', borderRadius:8, padding:'2rem', width:'min(360px,90vw)', textAlign:'center' }}>
        <div style={{ fontFamily:'var(--ff-serif)', fontSize:'1.5rem', color:'rgba(255,255,255,0.9)', marginBottom:6 }}>
          Admin <em style={{ color:'#b09060', fontStyle:'italic' }}>Access</em>
        </div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,0.3)', marginBottom:'1.5rem' }}>Scent Snob Decants</div>
        <input type="password" placeholder="Enter password" value={pwInput}
          onChange={e => setPwInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{ ...inp({textAlign:'center', marginBottom:12, letterSpacing:'0.15em'}),
            border:`0.5px solid ${pwError ? 'rgba(220,80,80,0.6)' : 'rgba(255,255,255,0.12)'}` }}
          autoFocus/>
        {pwError && <div style={{ fontSize:12, color:'#dc5050', marginBottom:8 }}>Wrong password</div>}
        <button onClick={handleLogin}
          style={{ width:'100%', background:'#b09060', border:'none', color:'#fff', padding:'11px', borderRadius:4, fontFamily:'var(--ff-sans)', fontSize:13, cursor:'pointer', letterSpacing:'0.1em' }}>
          Enter
        </button>
      </div>
    </div>
  );

  // ── Stats ───────────────────────────────────────────────
  const totalRevenue   = orders.filter(o => o.status !== 'Cancelled').reduce((a,o) => a + Number(o.amount), 0);
  const thisMonth      = new Date().toISOString().slice(0,7);
  const monthOrders    = orders.filter(o => (o.date||'').startsWith(thisMonth));
  const monthRevenue   = monthOrders.filter(o => o.status !== 'Cancelled').reduce((a,o) => a + Number(o.amount), 0);
  const pendingCount   = orders.filter(o => o.status === 'Pending' || o.status === 'Paid').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  const filtered = orders.filter(o => {
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q || (o.name||'').toLowerCase().includes(q) || (o.phone||'').includes(q) || (o.items||'').toLowerCase().includes(q) || (o.id||'').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ minHeight:'100vh', background:'#0c0a08', fontFamily:'var(--ff-sans)' }}>

      {/* Header */}
      <div style={{ background:'#141210', borderBottom:'0.5px solid rgba(255,255,255,0.07)', padding:'0 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', height:56, flexWrap:'wrap', gap:8 }}>
        <div style={{ fontFamily:'var(--ff-serif)', fontSize:'1.1rem', color:'rgba(255,255,255,0.9)' }}>
          Scent Snob <em style={{ color:'#b09060', fontStyle:'italic' }}>Admin</em>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
          {lastRefresh && <span style={{ fontSize:10, color:'rgba(255,255,255,0.25)' }}>Updated {lastRefresh}</span>}
          <button onClick={loadOrders} disabled={loading}
            style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.04)', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:3, padding:'6px 12px', cursor:'pointer' }}>
            {loading ? 'Loading…' : '↻ Refresh'}
          </button>
          <button onClick={exportCSV}
            style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.04)', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:3, padding:'6px 12px', cursor:'pointer' }}>
            Export CSV
          </button>
          <button onClick={() => setShowAdd(true)}
            style={{ fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'#fff', background:'#b09060', border:'none', borderRadius:3, padding:'6px 14px', cursor:'pointer' }}>
            + New Order
          </button>
          <button onClick={() => { sessionStorage.removeItem('ss_auth'); setAuth(false); }}
            style={{ fontSize:11, color:'rgba(255,255,255,0.3)', background:'none', border:'none', cursor:'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth:960, margin:'0 auto', padding:'1.5rem 1rem' }}>

        {/* Sheet error banner */}
        {sheetError && (
          <div style={{ background:'rgba(220,80,80,0.1)', border:'0.5px solid rgba(220,80,80,0.3)', borderRadius:4, padding:'10px 14px', marginBottom:'1rem', fontSize:12, color:'rgba(220,80,80,0.9)' }}>
            ⚠ Could not reach Google Sheet — showing locally cached orders. Check your internet or Sheet URL.
          </div>
        )}

        {/* Stat cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))', gap:12, marginBottom:'1.5rem' }}>
          {[
            { label:'Total Orders',   value:orders.length,   sub:'all time' },
            { label:'Total Revenue',  value:fmt(totalRevenue), sub:'excl. cancelled' },
            { label:'This Month',     value:fmt(monthRevenue), sub:`${monthOrders.length} orders` },
            { label:'Pending Action', value:pendingCount,     sub:'pending / paid' },
            { label:'Delivered',      value:deliveredCount,   sub:'completed' },
          ].map(card => (
            <div key={card.label} style={{ background:'rgba(255,255,255,0.02)', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:6, padding:'1rem' }}>
              <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:6 }}>{card.label}</div>
              <div style={{ fontFamily:'var(--ff-serif)', fontSize:'1.6rem', fontWeight:300, color:'rgba(255,255,255,0.92)', lineHeight:1 }}>{card.value}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.25)', marginTop:4 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div style={{ display:'flex', gap:10, marginBottom:'1rem', flexWrap:'wrap' }}>
          <input style={{ ...inp({flex:1, minWidth:180}) }} placeholder="Search by name, phone, items…"
            value={search} onChange={e => setSearch(e.target.value)}/>
          <select style={{ ...inp({width:'auto', minWidth:130}) }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="All">All statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Column headers */}
        <div style={{ display:'grid', gridTemplateColumns:'90px 1fr 80px 120px 90px', gap:12, padding:'6px 14px', marginBottom:4 }}>
          {['Date','Customer','Amount','Status','Order ID'].map(h => (
            <div key={h} style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)' }}>{h}</div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign:'center', padding:'3rem', color:'rgba(255,255,255,0.3)', fontSize:13 }}>
            Loading orders from Google Sheet…
          </div>
        )}

        {/* Orders list */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'3rem', color:'rgba(255,255,255,0.25)', fontSize:14, fontStyle:'italic', fontFamily:'var(--ff-serif)' }}>
            {orders.length === 0 ? 'No orders yet — add your first one!' : 'No orders match your filter'}
          </div>
        )}

        {!loading && filtered.map(order => (
          <OrderRow key={order.id} order={order}
            onStatusChange={updateStatus}
            onDelete={deleteOrder}
            onEdit={o => setEditOrder({...o})}
          />
        ))}

        <div style={{ fontSize:11, color:'rgba(255,255,255,0.2)', textAlign:'center', marginTop:'1.5rem' }}>
          {filtered.length} of {orders.length} orders · Source: Google Sheet
        </div>
      </div>

      {/* Modals */}
      {showAdd && <OrderModal onSave={addOrder} onClose={() => setShowAdd(false)}/>}
      {editOrder && (
        <OrderModal
          initial={editOrder}
          onSave={updated => { updateOrder(updated); setEditOrder(null); }}
          onClose={() => setEditOrder(null)}
        />
      )}
    </div>
  );
}
