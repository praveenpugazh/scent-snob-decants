import { useState, useEffect, useCallback } from 'react';
import { C } from '../styles/theme.js';

// ── Pricing Calculator Tab ────────────────────────────────
const MARGIN = 0.22; // 22% margin
const ATOMISER_5 = 15, ATOMISER_10 = 25, LABOUR = 10, PACKAGING = 25;

function calcPrices(ml, paid) {
  const cpm = paid / ml;
  const cost5  = cpm * 5  + ATOMISER_5  + LABOUR + PACKAGING;
  const cost10 = cpm * 10 + ATOMISER_10 + LABOUR + PACKAGING;
  const p5  = Math.round((cost5  / (1 - MARGIN)) / 10) * 10;
  const p10 = Math.round((cost10 / (1 - MARGIN)) / 10) * 10;
  const p20 = Math.round(p10 * 1.8 / 10) * 10;
  return { p5, p10, p20, cost5: Math.round(cost5), cost10: Math.round(cost10), cpm: Math.round(cpm * 10) / 10 };
}

function PricingTab() {
  const [form, setForm] = useState({ brand:'', name:'', notes:'', cat:'niche', ml:'', paid:'' });
  const [result, setResult] = useState(null);
  const [list, setList] = useState([]);
  const [copied, setCopied] = useState('');
  const set = (k,v) => setForm(f => ({...f, [k]:v}));

  const inp = { background:'rgba(255,255,255,0.04)', border:'0.5px solid rgba(255,255,255,0.12)', borderRadius:4, padding:'8px 10px', fontFamily:'var(--ff-sans)', fontSize:13, color:'rgba(255,255,255,0.9)', outline:'none', boxSizing:'border-box', width:'100%' };
  const lbl = { fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:3 };

  const calculate = () => {
    if (!form.name || !form.ml || !form.paid) return;
    setResult(calcPrices(parseFloat(form.ml), parseFloat(form.paid)));
  };

  const addToList = () => {
    if (!result) return;
    setList(l => [...l, { ...form, ...result, id: Date.now() }]);
    setForm(f => ({ ...f, brand:'', name:'', notes:'', ml:'', paid:'' }));
    setResult(null);
  };

  const copyEntry = (item) => {
    const line = `  ['${item.brand}','${item.name}','${item.notes || 'Notes TBD'}',${item.p5},${item.p10}],`;
    navigator.clipboard.writeText(line);
    setCopied(item.id); setTimeout(() => setCopied(''), 2000);
  };

  const copyAll = () => {
    const lines = list.map(it => `  ['${it.brand}','${it.name}','${it.notes || 'Notes TBD'}',${it.p5},${it.p10}],`).join('\n');
    navigator.clipboard.writeText(lines);
    setCopied('all'); setTimeout(() => setCopied(''), 2000);
  };

  const removeItem = (id) => setList(l => l.filter(i => i.id !== id));

  return (
    <div style={{ maxWidth:800, margin:'0 auto' }}>
      {/* Input form */}
      <div style={{ background:'rgba(255,255,255,0.02)', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'1.5rem', marginBottom:'1.5rem' }}>
        <div style={{ fontSize:13, letterSpacing:'0.1em', textTransform:'uppercase', color:'#b09060', marginBottom:'1rem' }}>Enter bottle details</div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
          <div><label style={lbl}>Brand</label><input style={inp} value={form.brand} onChange={e=>set('brand',e.target.value)} placeholder="e.g. Creed"/></div>
          <div><label style={lbl}>Category</label>
            <select style={inp} value={form.cat} onChange={e=>set('cat',e.target.value)}>
              <option value="niche">Niche</option>
              <option value="designer">Designer</option>
              <option value="dupe">Middle Eastern / Dupe</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom:10 }}>
          <label style={lbl}>Fragrance name *</label>
          <input style={inp} value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Aventus EDP"/>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
          <div><label style={lbl}>Bottle size (ml) *</label><input style={inp} type="number" value={form.ml} onChange={e=>set('ml',e.target.value)} placeholder="e.g. 30"/></div>
          <div><label style={lbl}>Price paid (₹) *</label><input style={inp} type="number" value={form.paid} onChange={e=>set('paid',e.target.value)} placeholder="e.g. 8500"/></div>
        </div>

        <div style={{ marginBottom:'1rem' }}>
          <label style={lbl}>Fragrance notes (optional)</label>
          <input style={inp} value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="e.g. Pineapple · Birch · Oakmoss · Musk"/>
        </div>

        <button
          onClick={calculate}
          disabled={!form.name || !form.ml || !form.paid}
          style={{ width:'100%', padding:'11px', background: form.name && form.ml && form.paid ? '#b09060' : 'rgba(255,255,255,0.05)', color: form.name && form.ml && form.paid ? '#fff' : 'rgba(255,255,255,0.3)', border:'none', borderRadius:4, fontFamily:'var(--ff-sans)', fontSize:13, letterSpacing:'0.1em', cursor: form.name && form.ml && form.paid ? 'pointer' : 'default' }}
        >
          Calculate prices at 22% margin
        </button>
      </div>

      {/* Results */}
      {result && (
        <div style={{ background:'rgba(176,144,96,0.06)', border:'0.5px solid rgba(176,144,96,0.2)', borderRadius:8, padding:'1.5rem', marginBottom:'1.5rem', animation:'fadeUp .3s ease' }}>
          <div style={{ fontSize:13, color:'#b09060', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'1rem' }}>
            {form.brand && `${form.brand} — `}{form.name} · ₹{result.cpm}/ml cost
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:'1rem' }}>
            {[
              { size:'5ml', price:result.p5, cost:result.cost5 },
              { size:'10ml', price:result.p10, cost:result.cost10 },
              { size:'20ml', price:result.p20, cost:Math.round(result.cost10*1.8), best:true },
            ].map(s => (
              <div key={s.size} style={{ background: s.best ? 'rgba(76,175,125,0.08)' : 'rgba(255,255,255,0.03)', border:`0.5px solid ${s.best ? 'rgba(76,175,125,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius:6, padding:'1rem', textAlign:'center' }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginBottom:4 }}>{s.size}{s.best ? ' ★ best value' : ''}</div>
                <div style={{ fontFamily:'var(--ff-serif)', fontSize:'1.6rem', fontWeight:300, color:s.best ? '#4caf7d' : '#b09060' }}>₹{s.price}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:4 }}>cost ₹{s.cost} · profit ₹{s.price - s.cost}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={addToList} style={{ flex:2, padding:'10px', background:'#b09060', border:'none', color:'#fff', borderRadius:4, cursor:'pointer', fontFamily:'var(--ff-sans)', fontSize:13 }}>
              Add to product list
            </button>
            <button onClick={() => setResult(null)} style={{ flex:1, padding:'10px', background:'transparent', border:'0.5px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.5)', borderRadius:4, cursor:'pointer', fontFamily:'var(--ff-sans)', fontSize:13 }}>
              Recalculate
            </button>
          </div>
        </div>
      )}

      {/* Product list */}
      {list.length > 0 && (
        <div style={{ background:'rgba(255,255,255,0.02)', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.7)', fontWeight:500 }}>{list.length} product{list.length !== 1 ? 's' : ''} ready to add</div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={copyAll} style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color: copied === 'all' ? '#4caf7d' : '#b09060', background:'rgba(176,144,96,0.1)', border:'0.5px solid rgba(176,144,96,0.3)', borderRadius:3, padding:'5px 12px', cursor:'pointer', fontFamily:'var(--ff-sans)' }}>
                {copied === 'all' ? '✓ Copied!' : 'Copy all'}
              </button>
              <button onClick={() => setList([])} style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', background:'transparent', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:3, padding:'5px 12px', cursor:'pointer', fontFamily:'var(--ff-sans)' }}>
                Clear
              </button>
            </div>
          </div>

          {list.map(item => (
            <div key={item.id} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr auto auto', gap:10, alignItems:'center', padding:'10px 0', borderBottom:'0.5px solid rgba(255,255,255,0.06)' }}>
              <div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,0.9)' }}>{item.brand && `${item.brand} — `}{item.name}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>{item.ml}ml · ₹{item.paid} paid · {item.cat}</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>5ml</div>
                <div style={{ fontSize:14, color:'#b09060' }}>₹{item.p5}</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>10ml</div>
                <div style={{ fontSize:14, color:'#b09060' }}>₹{item.p10}</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>20ml</div>
                <div style={{ fontSize:14, color:'#4caf7d' }}>₹{item.p20}</div>
              </div>
              <button onClick={() => copyEntry(item)} style={{ fontSize:11, color: copied === item.id ? '#4caf7d' : 'rgba(255,255,255,0.5)', background:'transparent', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:3, padding:'4px 10px', cursor:'pointer', fontFamily:'var(--ff-sans)', whiteSpace:'nowrap' }}>
                {copied === item.id ? '✓' : 'Copy'}
              </button>
              <button onClick={() => removeItem(item.id)} style={{ fontSize:13, color:'rgba(220,80,80,0.7)', background:'transparent', border:'none', cursor:'pointer', padding:'4px 6px' }}>✕</button>
            </div>
          ))}

          <div style={{ marginTop:'1rem', padding:'12px', background:'rgba(255,255,255,0.02)', border:'0.5px solid rgba(255,255,255,0.06)', borderRadius:4 }}>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginBottom:6, letterSpacing:'0.08em', textTransform:'uppercase' }}>Products.js code — copy and send to Claude to add to site</div>
            <div style={{ fontFamily:'monospace', fontSize:11, color:'rgba(255,255,255,0.6)', lineHeight:1.7, whiteSpace:'pre-wrap' }}>
              {list.map(it => `  ['${it.brand}','${it.name}','${it.notes || 'Notes TBD'}',${it.p5},${it.p10}],`).join('\n')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ADMIN_KEY   = 'scentsnob_admin_2024';
const POST_URL    = 'https://script.google.com/macros/s/AKfycbyRoTcexwmKRkmyVYINqZ08S237oybFZt60ZpFElXxd6go7KlelJTB_QlD3r-eGwuhC/exec';
const GET_URL     = 'https://script.google.com/macros/s/AKfycbyRoTcexwmKRkmyVYINqZ08S237oybFZt60ZpFElXxd6go7KlelJTB_QlD3r-eGwuhC/exec';

const SEED_ORDERS = [
  { id:'SS-HIST-001', date:'2026-04-01', name:'Jeffrin John Stephen', phone:'9740231237', items:'Valentino — Uomo Born In Roma Intense EDP (5ml) ×1, Valentino — Uomo Born In Roma Extradose Parfum (5ml) ×1, Amouage — Outlands Essence De Parfum (5ml) ×1, Ex Nihilo — Blue Talisman EDP (5ml) ×1', amount:5646, status:'Delivered', address:'Radha Govind Public School, Garh Rd, Somdutt Vihar Colony, Anuyogipuram, Meerut, UP 250004', notes:'Historical order', createdAt:'2026-04-01' },
  { id:'SS-HIST-002', date:'2026-04-05', name:'Arun Pandiyan', phone:'9360751344', items:'Valentino — Uomo BIR Intense (5ml) ×1, Valentino — Uomo BIR Extradose (5ml) ×1, French Avenue — Aether Extrait (5ml) ×1, French Avenue — Altantis Extrait (5ml) ×1, Afnan — Supremacy CE (5ml) ×1, Parfums de Marly — Layton (5ml) ×1, Lattafa — Asad Bourbon (5ml) ×1', amount:4143, status:'Delivered', address:'No:13, Malligai Street, New Ramnadu road, Theppakulam, Madurai-625009', notes:'Historical order', createdAt:'2026-04-05' },
  { id:'SS-HIST-003', date:'2026-04-10', name:'Unknown', phone:'', items:'Lattafa — Art of Universe (10ml) ×1, French Avenue — Platine Blanc (10ml) ×1, French Avenue — Carnal Desire (10ml) ×1, French Avenue — Ghost Spectre (30ml) ×1, Rayhaan — Aquatica (10ml) ×1, Rayhaan — Valhalla (10ml) ×1, Rayhaan — Lion (10ml) ×1, Nusuk — Ateeq (10ml) ×1, Lattafa — Dynasty (10ml) ×1, Swiss Arabian — Enigma of Taif (10ml) ×1, Arabiyat Prestige — Marwa (30ml) ×1', amount:5369, status:'Delivered', address:'Not provided', notes:'No customer details', createdAt:'2026-04-10' },
  { id:'SS-HIST-004', date:'2026-04-15', name:'Anna Daya Priyadharshini', phone:'9790859962', items:'Argos — Triumph of Bacchus EDP (5ml) ×1, Swiss Arabian — Incensen 01 (5ml) ×1', amount:2328, status:'Delivered', address:'2167, 14th floor, Tower 2B, Prestige Bella Vista Apartments, Iyyappanthangal, Chennai 600056', notes:'₹150 shipping charged', createdAt:'2026-04-15' },
  { id:'SS-HIST-005', date:'2026-04-18', name:'Mihir Motta', phone:'8585018251', items:'LV Imagination (5ml) ×1, Pantheon Roma Annone (5ml) ×1', amount:2400, status:'Delivered', address:'32, Rowland Road, Rowland Palace Flat No.10, Kolkata - 700020, West Bengal', notes:'LV Imagination ₹1500 + Pantheon Roma Annone ₹900', createdAt:'2026-04-18' },
  { id:'SS-HIST-006', date:'2026-04-20', name:'Rahul', phone:'6379180571', items:'Afnan — Supremacy CE (5ml) ×1, Rasasi — Hawas Ice (5ml) ×1', amount:658, status:'Delivered', address:'80/42 West Ponnagaram 8th Street, Arapalayam, Madurai - 625016', notes:'Historical order', createdAt:'2026-04-20' },
  { id:'SS-HIST-007', date:'2026-04-21', name:'Manickkam', phone:'9791595002', items:'Rasasi — Hawas Ice (5ml) ×1, Afnan — Supremacy CE (5ml) ×1', amount:658, status:'Delivered', address:'C2/2, First Floor, Kilari Illam, KRR Nagar, Theni - 625531', notes:'Historical order', createdAt:'2026-04-21' },
  { id:'SS-HIST-008', date:'2026-04-22', name:'Vivek Jaykrishnan', phone:'9880535751', items:'Dries Van Noten — Santal Greenery (5ml) ×1, Mizensir — Perfect Oud (5ml) ×1, Roja Parfums — Elysium Pour Homme Parfum (5ml) ×1, MDCI — Invasion Barbare (5ml) ×1, MDCI — Chypre Palatin (5ml) ×1, Ormonde Jayne — Nawab of Oudh Intensivo (5ml) ×1, Rayhaan — Terra (5ml) ×1, French Avenue — Teas Me (10ml) ×1, Swiss Arabian — Enigma of Taif (10ml) ×1, Swiss Arabian — Incensen 01 (5ml) ×1, Rayhaan — Obsidian (10ml) ×1', amount:12699, status:'Delivered', address:'Villa 80, Peninsula Prakruthi, Sarjapura, Bangalore - 562125, Karnataka', notes:'11 items, free shipping', createdAt:'2026-04-22' },
  { id:'SS-HIST-009', date:'2026-04-08', name:'Sufiyan Khan', phone:'9892545224', items:'Afnan — Supremacy CE (10ml) ×1, Afnan — Supremacy NOI (10ml) ×1, Khadlaj — Island (10ml) ×1, Khadlaj — Shiyaka Snow (10ml) ×1, Arabiyat Prestige — Marwa (10ml) ×1, French Avenue — Aether Extrait (10ml) ×1, Rayhaan — Lion (10ml) ×1', amount:2550, status:'Delivered', address:'B-903, Runwal Elina, Mehra Compound, Saki Naka, Mumbai - 400072', notes:'Paid via GPay 8 Apr 2026', createdAt:'2026-04-08' },
  { id:'SS-HIST-010', date:'2026-04-25', name:'Raihan Abdurahman', phone:'7902534765', items:'Afnan — Supremacy CE (5ml) ×1, Afnan — 9pm Elixir (5ml) ×1, Arabiyat Prestige — Marwa (5ml) ×1, French Avenue — Amber Empire (5ml) ×1, Rayhaan — Terra (5ml) ×1, Lattafa — Atlas (5ml) ×1, Lattafa — Dynasty (5ml) ×1, Swiss Arabian — Incensen 01 (5ml) ×1, Swiss Arabian — Enigma Of Taif (5ml) ×1', amount:2561, status:'Pending', address:'Tajnas, Near Darussalam Masjid, SRM Road, Pachalam, Ernakulam, Kerala 682012', notes:'9 items all 5ml', createdAt:'2026-04-25' },
  { id:'SS-HIST-011', date:'2026-04-25', name:'Ajay SK', phone:'7397338492', items:'Lattafa — Musamam Black Intense (10ml) ×1, Lattafa — Atlas (10ml) ×1, Lattafa — Art of Universe (10ml) ×1, Lattafa — Dynasty (10ml) ×1, French Avenue — Platine Blanc (10ml) ×1, French Avenue — Frostbite (10ml) ×1, Swiss Arabian — Incensen 01 (10ml) ×1', amount:3553, status:'Pending', address:'Row House 15, Konark Nagar Phase 2, Clover Park, Viman Nagar, Pune 411014', notes:'7 items all 10ml', createdAt:'2026-04-25' },
  { id:'SS-HIST-012', date:'2026-04-25', name:'Suryaprakash T', phone:'9486272697', items:'Afnan — Supremacy CE (5ml) ×1, Riiffs — Freeze (5ml) ×1, Ahmed Al Maghribi — Kaaf (5ml) ×1, Arabiyat Prestige — Marwa (5ml) ×1, Zimaya — Mazaaj Rhythmn (5ml) ×1', amount:1155, status:'Pending', address:'19/12, Dharmalingam Street-2, Linemedu, Salem - 636006', notes:'₹150 shipping', createdAt:'2026-04-25' },
  { id:'SS-HIST-013', date:'2026-04-25', name:'Pranith Reddy', phone:'9951338191', items:'Lattafa — Art of Universe (5ml) ×1, Riiffs — Freeze (5ml) ×1, French Avenue — Sun Kissed (5ml) ×1, French Avenue — Frostbite (5ml) ×1, French Avenue — Ghost Spectre (5ml) ×1, French Avenue — Atlantis Extrait (5ml) ×1, French Avenue — Aether Extrait (5ml) ×1, Rayhaan — Pacific Aura (5ml) ×1, Afnan — Supremacy CE (5ml) ×1, Armaf — Odyssey Spectre (5ml) ×1, Armaf — CDNIM Limited Edition (5ml) ×1, Swiss Arabian — Enigma of Taif (5ml) ×1, Khadlaj — Shiyaka Snow (5ml) ×1, Xerjoff — Naxos (5ml) ×1', amount:4656, status:'Pending', address:'Flat 4803, Floor 8, Tower 4, Vasavi Srinilayam, RTC Colony, LB Nagar, Hyderabad 500074', notes:'14 items all 5ml', createdAt:'2026-04-25' },
  { id:'SS-HIST-014', date:'2026-04-23', name:'Sharon Joe', phone:'', items:'Rasasi — Hawas Black (10ml) ×1, Zimaya — Mazaaj Rhythmn (10ml) ×1, Vilovat Done (50ml) ×1', amount:2149, status:'Delivered', address:'Bangalore', notes:'Done', createdAt:'2026-04-23' },
  { id:'SS-HIST-015', date:'2026-04-23', name:'Surendra Gowtham', phone:'', items:'Creed — Silver Mountain Water (30ml) ×1, Valentino — Uomo BIR Intense (30ml) ×1, Valentino — Uomo BIR Intense Coral (10ml) ×1, Lattafa — Atlas (5ml) ×1', amount:7160, status:'Delivered', address:'', notes:'Done', createdAt:'2026-04-23' },
  { id:'SS-HIST-016', date:'2026-04-23', name:'Sayed', phone:'', items:'Bois Impérial (5ml) ×1', amount:700, status:'Delivered', address:'', notes:'Done', createdAt:'2026-04-23' },
  { id:'SS-HIST-017', date:'2026-04-24', name:'Vishwa R', phone:'', items:'Lattafa — Atlas (5ml) ×1, Zimaya — Mazaaj Rhythmn (10ml) ×1, Rasasi — Hawas Ice (10ml) ×1', amount:1205, status:'Delivered', address:'', notes:'Done', createdAt:'2026-04-24' },
  { id:'SS-HIST-018', date:'2026-04-24', name:'H (Unknown)', phone:'', items:'Viktor & Rolf — Spicebomb Metallic Musk (10ml) ×1, Afnan — Supremacy CE (10ml) ×1, Armaf — CDNIM (10ml) ×1, Swiss Arabian — Incensen 01 (10ml) ×1', amount:2500, status:'Delivered', address:'', notes:'Customer name unknown — update when known', createdAt:'2026-04-24' },
];

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
const fetchFromSheet = () => {
  return new Promise((resolve) => {
    // Use JSONP to bypass CORS — append callback param to URL
    const cbName = 'ssCallback_' + Date.now();
    const script = document.createElement('script');

    window[cbName] = (data) => {
      delete window[cbName];
      document.body.removeChild(script);
      try {
        const orders = (Array.isArray(data) ? data : [])
          .filter(row => row['Order ID'])
          .map(row => ({
            id:        String(row['Order ID']  || ''),
            date:      String(row['Date']      || ''),
            name:      String(row['Name']      || ''),
            phone:     String(row['Phone']     || ''),
            items:     String(row['Items']     || ''),
            amount:    Number(row['Total'])    || 0,
            status:    String(row['Status']    || 'Pending'),
            address:   String(row['Address']   || ''),
            notes:     String(row['Notes']     || ''),
            createdAt: String(row['Date']      || ''),
          }));
        resolve(orders);
      } catch(e) {
        resolve(null);
      }
    };

    script.onerror = () => {
      delete window[cbName];
      try { document.body.removeChild(script); } catch(_) {}
      resolve(null);
    };

    // Timeout fallback
    setTimeout(() => {
      if (window[cbName]) {
        delete window[cbName];
        try { document.body.removeChild(script); } catch(_) {}
        resolve(null);
      }
    }, 8000);

    script.src = `${GET_URL}?callback=${cbName}`;
    document.body.appendChild(script);
  });
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
  const [activeTab,    setActiveTab]    = useState('orders'); // orders | pricing

  // Load orders from Sheet
  const loadOrders = useCallback(async () => {
    setLoading(true);
    setSheetError(false);

    // Load from localStorage first — seed if empty
    const local = localStorage.getItem('ss_orders');
    let cached = [];
    if (local) {
      try { cached = JSON.parse(local); } catch(_) {}
    }
    // Merge seed orders with any cached orders (seed fills gaps)
    const cachedIds = new Set(cached.map(o => o.id));
    const toAdd = SEED_ORDERS.filter(o => !cachedIds.has(o.id));
    if (toAdd.length > 0) {
      cached = [...cached, ...toAdd];
      localStorage.setItem('ss_orders', JSON.stringify(cached));
    }
    if (cached.length > 0) {
      setOrders(cached);
      setLastRefresh('local cache');
    }

    // Try Sheet in background for any newer orders
    const data = await fetchFromSheet();
    if (data && data.length > 0) {
      // Merge Sheet data with local (Sheet wins for same IDs)
      const sheetIds = new Set(data.map(o => o.id));
      const localOnly = cached.filter(o => !sheetIds.has(o.id));
      const merged = [...data, ...localOnly];
      setOrders(merged);
      localStorage.setItem('ss_orders', JSON.stringify(merged));
      setLastRefresh(new Date().toLocaleTimeString('en-IN') + ' (Sheet)');
    } else if (!data) {
      setSheetError(true);
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
          Admin <span style={{ color:'#b09060', fontStyle:'normal' }}>Access</span>
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
          Scent Snob <span style={{ color:'#b09060', fontStyle:'normal' }}>Admin</span>
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

      {/* Tab bar */}
      <div style={{ background:'#141210', borderBottom:'0.5px solid rgba(255,255,255,0.07)', display:'flex', padding:'0 1.5rem', gap:0 }}>
        {[['orders','Orders'],['pricing','Pricing Calculator']].map(([id,label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{
            padding:'10px 20px', background:'none', border:'none',
            borderBottom: activeTab === id ? '2px solid #b09060' : '2px solid transparent',
            color: activeTab === id ? '#b09060' : 'rgba(255,255,255,0.4)',
            fontFamily:'var(--ff-sans)', fontSize:12, letterSpacing:'0.1em',
            textTransform:'uppercase', cursor:'pointer', transition:'all .15s',
          }}>{label}</button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'pricing' ? (
        <div style={{ maxWidth:960, margin:'0 auto', padding:'1.5rem 1rem' }}>
          <PricingTab />
        </div>
      ) : (
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
      )}

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
