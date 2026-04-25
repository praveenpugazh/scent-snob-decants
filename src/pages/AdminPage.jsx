import { useState, useEffect } from 'react';
import { C } from '../styles/theme.js';

const ADMIN_KEY = 'scentsnob_admin_2024';

// ── Seed historical orders ──
const SEED_ORDERS = [
  {
    "id": "SS-HIST-001",
    "date": "2025-04-01",
    "name": "Jeffrin John Stephen",
    "phone": "9740231237",
    "address": "Radha Govind Public School, Garh Rd, Somdutt Vihar Colony, Anuyogipuram, Meerut, Uttar Pradesh 250004",
    "items": "Valentino \u2014 Uomo Born In Roma Intense EDP (5ml) \u00d7 1, Valentino \u2014 Uomo Born In Roma Extradose Parfum (5ml) \u00d7 1, Amouage \u2014 Outlands Essence De Parfum (5ml) \u00d7 1, Ex Nihilo \u2014 Blue Talisman EDP (5ml) \u00d7 1",
    "amount": 5646,
    "status": "Delivered",
    "notes": "Free shipping. Historical order.",
    "createdAt": "2025-04-01T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-002",
    "date": "2025-04-05",
    "name": "Arun Pandiyan",
    "phone": "9360751344",
    "address": "No:13, Malligai Street, New Ramnadu road, Theppakulam, Madurai-625009",
    "items": "Valentino \u2014 Uomo Born In Roma Intense EDP (5ml) \u00d7 1, Valentino \u2014 Uomo Born In Roma Extradose Parfum (5ml) \u00d7 1, French Avenue \u2014 Aether Extrait (5ml) \u00d7 1, French Avenue \u2014 Altantis Extrait (5ml) \u00d7 1, Afnan \u2014 Supremacy CE (5ml) \u00d7 1, Parfums de Marly \u2014 Layton EDP (5ml) \u00d7 1, Lattafa \u2014 Asad Bourbon (5ml) \u00d7 1",
    "amount": 4143,
    "status": "Delivered",
    "notes": "Free shipping. Historical order.",
    "createdAt": "2025-04-05T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-003",
    "date": "2025-04-10",
    "name": "Unknown",
    "phone": "Unknown",
    "address": "Not provided",
    "items": "Lattafa \u2014 Art of Universe (10ml) \u00d7 1, French Avenue \u2014 Platine Blanc (10ml) \u00d7 1, French Avenue \u2014 Carnal Desire (10ml) \u00d7 1, French Avenue \u2014 Ghost Spectre (30ml) \u00d7 1, Rayhaan \u2014 Aquatica (10ml) \u00d7 1, Rayhaan \u2014 Valhalla (10ml) \u00d7 1, Rayhaan \u2014 Lion (10ml) \u00d7 1, Nusuk \u2014 Ateeq (10ml) \u00d7 1, Lattafa \u2014 Dynasty (10ml) \u00d7 1, Swiss Arabian \u2014 Enigma of Taif (10ml) \u00d7 1, Arabiyat Prestige \u2014 Marwa (30ml) \u00d7 1",
    "amount": 5369,
    "status": "Delivered",
    "notes": "No customer details in message. Historical order.",
    "createdAt": "2025-04-10T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-004",
    "date": "2025-04-15",
    "name": "Anna Daya Priyadharshini",
    "phone": "9790859962",
    "address": "2167, 14th floor, Tower 2B, Prestige Bella Vista Apartments, Mount Poonamallee Road, Iyyappanthangal, Chennai 600056",
    "items": "Argos \u2014 Triumph of Bacchus EDP (5ml) \u00d7 1, Swiss Arabian \u2014 Incensen 01 (5ml) \u00d7 1",
    "amount": 2328,
    "status": "Delivered",
    "notes": "\u20b9150 shipping charged. Historical order.",
    "createdAt": "2025-04-15T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-005",
    "date": "2025-04-18",
    "name": "Mihir Motta",
    "phone": "8585018251",
    "address": "32, Rowland Road, Rowland Palace Flat No.10, Kolkata - 700020, West Bengal",
    "items": "LV Imagination (5ml) \u00d7 1, Pantheon Roma Annone (5ml) \u00d7 1",
    "amount": 2400,
    "status": "Delivered",
    "notes": "LV Imagination \u20b91500 + Pantheon Roma Annone \u20b9900. Historical order.",
    "createdAt": "2025-04-18T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-006",
    "date": "2025-04-20",
    "name": "Rahul",
    "phone": "6379180571",
    "address": "80/42 West Ponnagaram 8th Street, Arapalayam, Opposite to Karur Vysya Bank, Madurai - 625016",
    "items": "Afnan \u2014 Supremacy CE (5ml) \u00d7 1, Rasasi \u2014 Hawas Ice (5ml) \u00d7 1",
    "amount": 658,
    "status": "Delivered",
    "notes": "Historical order.",
    "createdAt": "2025-04-20T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-007",
    "date": "2025-04-21",
    "name": "Manickkam",
    "phone": "9791595002",
    "address": "C2/2, First Floor, Kilari Illam, KRR Nagar, Theni - 625531",
    "items": "Rasasi \u2014 Hawas Ice (5ml) \u00d7 1, Afnan \u2014 Supremacy CE (5ml) \u00d7 1",
    "amount": 658,
    "status": "Delivered",
    "notes": "Historical order.",
    "createdAt": "2025-04-21T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-008",
    "date": "2025-04-22",
    "name": "Vivek Jaykrishnan",
    "phone": "9880535751",
    "address": "Villa 80, Peninsula Prakruthi, Ittangur Road, Near Someshwara Temple, Sarjapura, Bangalore - 562125, Karnataka",
    "items": "Dries Van Noten \u2014 Santal Greenery (5ml) \u00d7 1, Mizensir \u2014 Perfect Oud (5ml) \u00d7 1, Roja Parfums \u2014 Elysium Pour Homme Parfum (5ml) \u00d7 1, MDCI \u2014 Invasion Barbare (5ml) \u00d7 1, MDCI \u2014 Chypre Palatin (5ml) \u00d7 1, Ormonde Jayne \u2014 Nawab of Oudh Intensivo (5ml) \u00d7 1, Rayhaan \u2014 Terra (5ml) \u00d7 1, French Avenue \u2014 Teas Me (10ml) \u00d7 1, Swiss Arabian \u2014 Enigma of Taif (10ml) \u00d7 1, Swiss Arabian \u2014 Incensen 01 (5ml) \u00d7 1, Rayhaan \u2014 Obsidian (10ml) \u00d7 1",
    "amount": 12699,
    "status": "Delivered",
    "notes": "Free shipping. 11 items. Historical order.",
    "createdAt": "2025-04-22T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-009",
    "date": "2026-04-08",
    "name": "Sufiyan Khan",
    "phone": "9892545224",
    "address": "B-903, Runwal Elina, Mehra Compound, Near Vijay Print, Saki Naka, Mumbai - 400072",
    "items": "Afnan \u2014 Supremacy CE (10ml) \u00d7 1, Afnan \u2014 Supremacy NOI (10ml) \u00d7 1, Khadlaj \u2014 Island (10ml) \u00d7 1, Khadlaj \u2014 Shiyaka Snow (10ml) \u00d7 1, Arabiyat Prestige \u2014 Marwa (10ml) \u00d7 1, French Avenue \u2014 Aether Extrait (10ml) \u00d7 1, Rayhaan \u2014 Lion (10ml) \u00d7 1",
    "amount": 2550,
    "status": "Delivered",
    "notes": "Paid \u20b92,550 via GPay on 8 Apr 2026. All 10ml decants. Pinned address in chat.",
    "createdAt": "2026-04-08T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-010",
    "date": "2026-04-25",
    "name": "Raihan Abdurahman",
    "phone": "7902534765",
    "address": "Tajnas, Near Darussalam Masjid, SRM Road, Pachalam P.O 682012, Ernakulam, Kerala",
    "items": "Afnan \u2014 Supremacy CE (5ml) \u00d7 1, Afnan \u2014 9pm Elixir (5ml) \u00d7 1, Arabiyat Prestige \u2014 Marwa (5ml) \u00d7 1, French Avenue \u2014 Amber Empire (5ml) \u00d7 1, Rayhaan \u2014 Terra (5ml) \u00d7 1, Lattafa \u2014 Atlas (5ml) \u00d7 1, Lattafa \u2014 Dynasty (5ml) \u00d7 1, Swiss Arabian \u2014 Incensen 01 (5ml) \u00d7 1, Swiss Arabian \u2014 Enigma Of Taif (5ml) \u00d7 1",
    "amount": 2561,
    "status": "Pending",
    "notes": "9 items, all 5ml. Free shipping (\u20b92561 > \u20b92499 threshold at time of order).",
    "createdAt": "2026-04-25T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-011",
    "date": "2026-04-25",
    "name": "Ajay SK",
    "phone": "7397338492",
    "address": "Row House 15, Konark Nagar Phase 2, Clover Park, Viman Nagar, Pune, Maharashtra - 411014",
    "items": "Lattafa \u2014 Musamam Black Intense (10ml) \u00d7 1, Lattafa \u2014 Atlas (10ml) \u00d7 1, Lattafa \u2014 Art of Universe (10ml) \u00d7 1, Lattafa \u2014 Dynasty (10ml) \u00d7 1, French Avenue \u2014 Platine Blanc (10ml) \u00d7 1, French Avenue \u2014 Frostbite (10ml) \u00d7 1, Swiss Arabian \u2014 Incensen 01 (10ml) \u00d7 1",
    "amount": 3553,
    "status": "Pending",
    "notes": "7 items, all 10ml. Free shipping.",
    "createdAt": "2026-04-25T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-012",
    "date": "2026-04-25",
    "name": "Suryaprakash T",
    "phone": "9486272697",
    "address": "19/12, Dharmalingam Street-2, Linemedu, Salem - 636006",
    "items": "Afnan \u2014 Supremacy CE (5ml) \u00d7 1, Riiffs \u2014 Freeze (5ml) \u00d7 1, Ahmed Al Maghribi \u2014 Kaaf (5ml) \u00d7 1, Arabiyat Prestige \u2014 Marwa (5ml) \u00d7 1, Zimaya \u2014 Mazaaj Rhythmn (5ml) \u00d7 1",
    "amount": 1155,
    "status": "Pending",
    "notes": "5 items, all 5ml. \u20b9150 shipping (below \u20b92999 threshold).",
    "createdAt": "2026-04-25T01:00:00.000Z"
  },
  {
    "id": "SS-HIST-013",
    "date": "2026-04-25",
    "name": "Pranith Reddy",
    "phone": "9951338191",
    "address": "Flat 4803, Floor 8, Tower 4, Vasavi Srinilayam, RTC Colony, LB Nagar, Hyderabad, TG - 500074",
    "items": "Lattafa \u2014 Art of Universe (5ml) \u00d7 1, Riiffs \u2014 Freeze (5ml) \u00d7 1, French Avenue \u2014 Sun Kissed (5ml) \u00d7 1, French Avenue \u2014 Frostbite (5ml) \u00d7 1, French Avenue \u2014 Ghost Spectre (5ml) \u00d7 1, French Avenue \u2014 Atlantis Extrait (5ml) \u00d7 1, French Avenue \u2014 Aether Extrait (5ml) \u00d7 1, Rayhaan \u2014 Pacific Aura (5ml) \u00d7 1, Afnan \u2014 Supremacy CE (5ml) \u00d7 1, Armaf \u2014 Odyssey Spectre (5ml) \u00d7 1, Armaf \u2014 CDNIM Limited Edition (5ml) \u00d7 1, Swiss Arabian \u2014 Enigma of Taif (5ml) \u00d7 1, Khadlaj \u2014 Shiyaka Snow (5ml) \u00d7 1, Xerjoff \u2014 Naxos (5ml) \u00d7 1",
    "amount": 4656,
    "status": "Pending",
    "notes": "14 items, all 5ml. Free shipping.",
    "createdAt": "2026-04-25T02:00:00.000Z"
  },
  {
    "id": "SS-HIST-014",
    "date": "2026-04-25",
    "name": "Sharon Joe",
    "phone": "",
    "address": "Bangalore",
    "items": "Rasasi \u2014 Hawas Black (10ml) \u00d7 1, Zimaya \u2014 Mazaaj Rhythmn (10ml) \u00d7 1, Vilovat Done (50ml) \u00d7 1",
    "amount": 2149,
    "status": "Delivered",
    "notes": "Hawas Black \u20b9250 + Mazaaj \u20b9250 + Vilovat Done \u20b91499 + \u20b9150 shipping = \u20b92149. Done.",
    "createdAt": "2026-04-23T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-015",
    "date": "2026-04-23",
    "name": "Surendra Gowtham",
    "phone": "",
    "address": "",
    "items": "Creed \u2014 Silver Mountain Water (30ml) \u00d7 1, Valentino \u2014 Uomo Born In Roma Intense (30ml) \u00d7 1, Valentino \u2014 Uomo Born In Roma Intense Coral (10ml) \u00d7 1, Lattafa \u2014 Atlas (5ml) \u00d7 1",
    "amount": 7160,
    "status": "Delivered",
    "notes": "SMW 30ml \u20b92500 + Valentino BIR Intense 30ml \u20b92600 + Coral 10ml \u20b9600 + Atlas 5ml \u20b9350 + two more items. Done.",
    "createdAt": "2026-04-23T01:00:00.000Z"
  },
  {
    "id": "SS-HIST-016",
    "date": "2026-04-23",
    "name": "Sayed",
    "phone": "",
    "address": "",
    "items": "Bois Impérial (5ml) \u00d7 1",
    "amount": 700,
    "status": "Delivered",
    "notes": "Bois Imp 5ml \u20b9550 + \u20b9150 shipping = \u20b9700. Done.",
    "createdAt": "2026-04-23T02:00:00.000Z"
  },
  {
    "id": "SS-HIST-017",
    "date": "2026-04-24",
    "name": "Vishwa R",
    "phone": "",
    "address": "",
    "items": "Lattafa \u2014 Atlas (5ml) \u00d7 1, Zimaya \u2014 Mazaaj Rhythmn (10ml) \u00d7 1, Rasasi \u2014 Hawas Ice (10ml) \u00d7 1",
    "amount": 1205,
    "status": "Delivered",
    "notes": "Atlas \u20b9380 + Mazaaj 10ml \u20b9300 + Hawas Ice 10ml \u20b9525 = \u20b91205. Done.",
    "createdAt": "2026-04-24T00:00:00.000Z"
  },
  {
    "id": "SS-HIST-018",
    "date": "2026-04-24",
    "name": "H (Unknown)",
    "phone": "",
    "address": "",
    "items": "Viktor & Rolf \u2014 Spicebomb Metallic Musk (10ml) \u00d7 1, Afnan \u2014 Supremacy CE (10ml) \u00d7 1, Armaf \u2014 CDNIM (10ml) \u00d7 1, Swiss Arabian \u2014 Incensen 01 (10ml) \u00d7 1",
    "amount": 2500,
    "status": "Delivered",
    "notes": "4 items all 10ml = \u20b92500. Done. Customer name unclear in notebook \u2014 update when known.",
    "createdAt": "2026-04-24T01:00:00.000Z"
  }
];

// ── Helpers ──────────────────────────────────────────────
const load = () => {
  const stored = localStorage.getItem('ss_orders');
  if (!stored) {
    localStorage.setItem('ss_orders', JSON.stringify(SEED_ORDERS));
    return SEED_ORDERS;
  }
  // Merge: add any seed orders not already in stored (by ID)
  const existing = JSON.parse(stored);
  const existingIds = new Set(existing.map(o => o.id));
  const toAdd = SEED_ORDERS.filter(o => !existingIds.has(o.id));
  if (toAdd.length > 0) {
    const merged = [...existing, ...toAdd];
    localStorage.setItem('ss_orders', JSON.stringify(merged));
    return merged;
  }
  return existing;
};
const save = (orders) => localStorage.setItem('ss_orders', JSON.stringify(orders));
const genId = () => `ORD-${Date.now().toString(36).toUpperCase()}`;
const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const today = () => new Date().toISOString().split('T')[0];

const STATUS_COLORS = {
  'Pending'  : { bg: 'rgba(255,200,50,0.12)',  border: 'rgba(255,200,50,0.4)',  text: '#ffc832' },
  'Paid'     : { bg: 'rgba(100,180,255,0.12)', border: 'rgba(100,180,255,0.4)', text: '#64b4ff' },
  'Packed'   : { bg: 'rgba(176,144,96,0.12)',  border: 'rgba(176,144,96,0.4)',  text: '#b09060' },
  'Shipped'  : { bg: 'rgba(76,175,125,0.12)',  border: 'rgba(76,175,125,0.4)',  text: '#4caf7d' },
  'Delivered': { bg: 'rgba(76,175,125,0.2)',   border: 'rgba(76,175,125,0.6)',  text: '#4caf7d' },
  'Cancelled': { bg: 'rgba(220,80,80,0.12)',   border: 'rgba(220,80,80,0.4)',   text: '#dc5050' },
};

const STATUSES = Object.keys(STATUS_COLORS);

const inp = (extra = {}) => ({
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '0.5px solid rgba(255,255,255,0.12)',
  borderRadius: 4,
  padding: '8px 10px',
  fontFamily: 'var(--ff-sans)',
  fontSize: 13,
  color: 'rgba(255,255,255,0.9)',
  outline: 'none',
  boxSizing: 'border-box',
  ...extra,
});

// ── StatusPill ────────────────────────────────────────────
function StatusPill({ status, onChange }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS['Pending'];
  return (
    <select
      value={status}
      onChange={e => onChange(e.target.value)}
      style={{
        background: c.bg, border: `0.5px solid ${c.border}`,
        color: c.text, borderRadius: 20, padding: '3px 10px',
        fontSize: 11, fontFamily: 'var(--ff-sans)', cursor: 'pointer',
        letterSpacing: '0.06em', outline: 'none',
      }}
    >
      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}

// ── Add Order Modal ───────────────────────────────────────
function AddOrderModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    date: today(), name: '', phone: '', address: '',
    items: '', amount: '', status: 'Pending', notes: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name || !form.amount) return;
    onSave({ ...form, id: genId(), createdAt: new Date().toISOString() });
    onClose();
  };

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:300 }}/>
      <div style={{
        position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        background:'#1a1714', border:'0.5px solid rgba(176,144,96,0.3)',
        borderRadius:8, padding:'1.5rem', width:'min(520px,95vw)',
        zIndex:310, maxHeight:'90vh', overflowY:'auto',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:'1.2rem', color:'rgba(255,255,255,0.92)' }}>
            Log New Order
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', fontSize:18, cursor:'pointer' }}>✕</button>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
          <div>
            <label style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:3 }}>Date</label>
            <input type="date" style={inp()} value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:3 }}>Status</label>
            <select style={inp()} value={form.status} onChange={e => set('status', e.target.value)}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
          <div>
            <label style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:3 }}>Customer Name *</label>
            <input style={inp()} placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:3 }}>Phone</label>
            <input style={inp()} placeholder="10-digit number" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom:10 }}>
          <label style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:3 }}>Address</label>
          <textarea style={inp({ height:60, resize:'none' })} placeholder="Delivery address" value={form.address} onChange={e => set('address', e.target.value)} />
        </div>

        <div style={{ marginBottom:10 }}>
          <label style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:3 }}>Items Ordered</label>
          <textarea style={inp({ height:70, resize:'none' })} placeholder="e.g. Hawas Ice 5ml × 2, Aventus 10ml × 1" value={form.items} onChange={e => set('items', e.target.value)} />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
          <div>
            <label style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:3 }}>Order Amount (₹) *</label>
            <input style={inp()} type="number" placeholder="Total amount" value={form.amount} onChange={e => set('amount', e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:3 }}>Notes</label>
            <input style={inp()} placeholder="Any notes" value={form.notes} onChange={e => set('notes', e.target.value)} />
          </div>
        </div>

        <div style={{ display:'flex', gap:10, marginTop:'1rem' }}>
          <button onClick={onClose} style={{ flex:1, padding:'10px', background:'transparent', border:'0.5px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.5)', borderRadius:4, cursor:'pointer', fontFamily:'var(--ff-sans)', fontSize:13 }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ flex:2, padding:'10px', background:'#b09060', border:'none', color:'#fff', borderRadius:4, cursor:'pointer', fontFamily:'var(--ff-sans)', fontSize:13, letterSpacing:'0.08em' }}>
            Save Order
          </button>
        </div>
      </div>
    </>
  );
}

// ── Order Row ─────────────────────────────────────────────
function OrderRow({ order, onStatusChange, onDelete, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  const c = STATUS_COLORS[order.status] || STATUS_COLORS['Pending'];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '0.5px solid rgba(255,255,255,0.07)',
      borderRadius: 6, marginBottom: 8, overflow:'hidden',
    }}>
      {/* Main row */}
      <div
        style={{ display:'grid', gridTemplateColumns:'90px 1fr 80px 100px 90px', gap:12, padding:'10px 14px', alignItems:'center', cursor:'pointer' }}
        onClick={() => setExpanded(e => !e)}
      >
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontFamily:'var(--ff-sans)' }}>{order.date}</div>
        <div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,0.9)', marginBottom:1 }}>{order.name}</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>{order.phone}</div>
        </div>
        <div style={{ fontSize:14, color:'#b09060', fontWeight:500 }}>{fmt(order.amount)}</div>
        <StatusPill status={order.status} onChange={v => { onStatusChange(order.id, v); }} />
        <div style={{ fontSize:10, color:'rgba(255,255,255,0.25)', textAlign:'right' }}>{order.id}</div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ borderTop:'0.5px solid rgba(255,255,255,0.06)', padding:'10px 14px', background:'rgba(0,0,0,0.2)' }}>
          {order.items && (
            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:3 }}>Items</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)', lineHeight:1.6 }}>{order.items}</div>
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
          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            <button onClick={() => onEdit(order)} style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'#b09060', background:'rgba(176,144,96,0.1)', border:'0.5px solid rgba(176,144,96,0.3)', borderRadius:3, padding:'5px 12px', cursor:'pointer', fontFamily:'var(--ff-sans)' }}>
              Edit
            </button>
            <button onClick={() => { if(window.confirm('Delete this order?')) onDelete(order.id); }} style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(220,80,80,0.8)', background:'rgba(220,80,80,0.08)', border:'0.5px solid rgba(220,80,80,0.25)', borderRadius:3, padding:'5px 12px', cursor:'pointer', fontFamily:'var(--ff-sans)' }}>
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
  const [auth, setAuth]         = useState(sessionStorage.getItem('ss_auth') === ADMIN_KEY);
  const [pwInput, setPwInput]   = useState('');
  const [pwError, setPwError]   = useState(false);
  const [orders, setOrders]     = useState([]);
  const [showAdd, setShowAdd]   = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch]     = useState('');
  const [tab, setTab]           = useState('orders'); // orders | stats

  useEffect(() => { if (auth) setOrders(load()); }, [auth]);

  const persist = (updated) => { setOrders(updated); save(updated); };

  const handleLogin = () => {
    if (pwInput === 'scentsnobboss') {
      sessionStorage.setItem('ss_auth', ADMIN_KEY);
      setAuth(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 1500);
    }
  };

  const addOrder    = (o)       => persist([o, ...orders]);
  const deleteOrder = (id)      => persist(orders.filter(o => o.id !== id));
  const updateStatus = (id, s)  => persist(orders.map(o => o.id === id ? { ...o, status: s } : o));
  const updateOrder = (updated) => persist(orders.map(o => o.id === updated.id ? updated : o));

  const exportCSV = () => {
    const header = 'ID,Date,Name,Phone,Items,Amount,Status,Address,Notes';
    const rows = orders.map(o =>
      [o.id, o.date, `"${o.name}"`, o.phone, `"${o.items||''}"`, o.amount, o.status, `"${o.address||''}"`, `"${o.notes||''}"`].join(',')
    );
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `scent-snob-orders-${today()}.csv`; a.click();
  };

  // ── Login Screen ──────────────────────────────────────
  if (!auth) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0c0a08' }}>
      <div style={{ background:'#141210', border:'0.5px solid rgba(176,144,96,0.2)', borderRadius:8, padding:'2rem', width:'min(360px,90vw)', textAlign:'center' }}>
        <div style={{ fontFamily:'var(--ff-serif)', fontSize:'1.5rem', color:'rgba(255,255,255,0.9)', marginBottom:6 }}>
          Admin <em style={{ color:'#b09060', fontStyle:'italic' }}>Access</em>
        </div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,0.3)', marginBottom:'1.5rem' }}>Scent Snob Decants</div>
        <input
          type="password"
          placeholder="Enter password"
          value={pwInput}
          onChange={e => setPwInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{
            ...inp({ textAlign:'center', marginBottom:12, letterSpacing:'0.15em' }),
            border: `0.5px solid ${pwError ? 'rgba(220,80,80,0.6)' : 'rgba(255,255,255,0.12)'}`,
            transition: 'border-color .2s',
          }}
          autoFocus
        />
        {pwError && <div style={{ fontSize:12, color:'#dc5050', marginBottom:8 }}>Wrong password</div>}
        <button
          onClick={handleLogin}
          style={{ width:'100%', background:'#b09060', border:'none', color:'#fff', padding:'11px', borderRadius:4, fontFamily:'var(--ff-sans)', fontSize:13, letterSpacing:'0.1em', cursor:'pointer' }}
        >
          Enter
        </button>
      </div>
    </div>
  );

  // ── Stats ─────────────────────────────────────────────
  const totalRevenue   = orders.filter(o => o.status !== 'Cancelled').reduce((a, o) => a + Number(o.amount), 0);
  const thisMonth      = new Date().toISOString().slice(0,7);
  const monthOrders    = orders.filter(o => o.date?.startsWith(thisMonth));
  const monthRevenue   = monthOrders.filter(o => o.status !== 'Cancelled').reduce((a, o) => a + Number(o.amount), 0);
  const pendingCount   = orders.filter(o => o.status === 'Pending' || o.status === 'Paid').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  // Filtered orders
  const filtered = orders.filter(o => {
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q || o.name?.toLowerCase().includes(q) || o.phone?.includes(q) || o.items?.toLowerCase().includes(q) || o.id?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ minHeight:'100vh', background:'#0c0a08', fontFamily:'var(--ff-sans)' }}>

      {/* Header */}
      <div style={{ background:'#141210', borderBottom:'0.5px solid rgba(255,255,255,0.07)', padding:'0 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', height:56 }}>
        <div style={{ fontFamily:'var(--ff-serif)', fontSize:'1.1rem', color:'rgba(255,255,255,0.9)' }}>
          Scent Snob <em style={{ color:'#b09060', fontStyle:'italic' }}>Admin</em>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <button
            onClick={exportCSV}
            style={{ fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.04)', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:3, padding:'6px 12px', cursor:'pointer' }}
          >
            Export CSV
          </button>
          <button
            onClick={() => setShowAdd(true)}
            style={{ fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'#fff', background:'#b09060', border:'none', borderRadius:3, padding:'6px 14px', cursor:'pointer' }}
          >
            + New Order
          </button>
          <button
            onClick={() => { sessionStorage.removeItem('ss_auth'); setAuth(false); }}
            style={{ fontSize:11, color:'rgba(255,255,255,0.3)', background:'none', border:'none', cursor:'pointer', padding:'6px' }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth:960, margin:'0 auto', padding:'1.5rem 1rem' }}>

        {/* Stat cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:12, marginBottom:'1.5rem' }}>
          {[
            { label:'Total Orders',   value: orders.length,        sub: 'all time' },
            { label:'Total Revenue',  value: fmt(totalRevenue),    sub: 'excl. cancelled' },
            { label:'This Month',     value: fmt(monthRevenue),    sub: `${monthOrders.length} orders` },
            { label:'Pending Action', value: pendingCount,         sub: 'pending / paid' },
            { label:'Delivered',      value: deliveredCount,       sub: 'completed' },
          ].map(card => (
            <div key={card.label} style={{ background:'rgba(255,255,255,0.02)', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:6, padding:'1rem' }}>
              <div style={{ fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:6 }}>{card.label}</div>
              <div style={{ fontFamily:'var(--ff-serif)', fontSize:'1.6rem', fontWeight:300, color:'rgba(255,255,255,0.92)', lineHeight:1 }}>{card.value}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.25)', marginTop:4 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div style={{ display:'flex', gap:10, marginBottom:'1rem', flexWrap:'wrap' }}>
          <input
            style={{ ...inp({ flex:1, minWidth:180 }) }}
            placeholder="Search by name, phone, items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            style={{ ...inp({ width:'auto', minWidth:130 }) }}
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="All">All statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Column headers */}
        <div style={{ display:'grid', gridTemplateColumns:'90px 1fr 80px 100px 90px', gap:12, padding:'6px 14px', marginBottom:4 }}>
          {['Date','Customer','Amount','Status','Order ID'].map(h => (
            <div key={h} style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)' }}>{h}</div>
          ))}
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'3rem', color:'rgba(255,255,255,0.25)', fontSize:14, fontStyle:'italic', fontFamily:'var(--ff-serif)' }}>
            {orders.length === 0 ? 'No orders yet — add your first one!' : 'No orders match your filter'}
          </div>
        ) : (
          filtered.map(order => (
            <OrderRow
              key={order.id}
              order={order}
              onStatusChange={updateStatus}
              onDelete={deleteOrder}
              onEdit={o => setEditOrder(o)}
            />
          ))
        )}

        <div style={{ fontSize:11, color:'rgba(255,255,255,0.2)', textAlign:'center', marginTop:'1.5rem' }}>
          {filtered.length} of {orders.length} orders · Orders stored locally in this browser
        </div>
      </div>

      {/* Modals */}
      {showAdd  && <AddOrderModal onSave={addOrder} onClose={() => setShowAdd(false)} />}
      {editOrder && (
        <AddOrderModal
          onSave={o => { updateOrder({ ...editOrder, ...o, id: editOrder.id }); setEditOrder(null); }}
          onClose={() => setEditOrder(null)}
        />
      )}
    </div>
  );
}
