export const C = {
  t1: 'rgba(255,255,255,0.92)',
  t2: 'rgba(255,255,255,0.55)',
  t3: 'rgba(255,255,255,0.3)',
  gold: '#b09060', goldL: '#d4b483',
  bg1: '#0c0a08', bg2: '#141210', bg3: '#1e1a16', bg4: '#252019',
  border: 'rgba(255,255,255,0.08)',
  borderHov: 'rgba(176,144,96,0.4)',
};

export const S = {
  page: { background: '#0c0a08', minHeight: '100vh' },

  // Nav
  nav: { position:'fixed', top:0, left:0, right:0, zIndex:100, display:'flex', flexDirection:'column', transition:'all .3s' },
  navScrolled: { background:'rgba(12,10,8,0.95)', backdropFilter:'blur(12px)' },
  navInner: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 2rem', height:60 },
  navBrand: { fontFamily:'var(--ff-serif)', fontSize:'1.2rem', fontWeight:300, cursor:'pointer', color:'rgba(255,255,255,0.92)', letterSpacing:'0.02em' },
  navLinks: { display:'flex', alignItems:'center', gap:'2rem' },
  navBtn: { fontSize:14, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', background:'none', border:'none', fontFamily:'var(--ff-sans)', padding:0, transition:'color .15s' },
  cartBtn: { display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:14, letterSpacing:'0.1em', textTransform:'uppercase' },
  cartBubble: { background:'#b09060', color:'#fff', fontSize:11, width:18, height:18, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' },

  // Hero
  hero: { height:'calc(100vh - 94px)', background:'#0c0a08', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', position:'relative', overflow:'hidden', padding:'2rem' },
  heroBg: { position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(176,144,96,0.06), transparent 65%)', pointerEvents:'none' },
  heroLine: { position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(176,144,96,0.3),transparent)' },
  heroTag: { fontSize:13, letterSpacing:'0.3em', color:'#b09060', textTransform:'uppercase', marginBottom:'1.5rem', display:'block', animation:'fadeUp .6s ease both' },
  heroH1: { fontFamily:'var(--ff-serif)', fontSize:'clamp(3.5rem, 9vw, 7rem)', fontWeight:300, color:'#fff', lineHeight:0.95, marginBottom:'1.75rem', animation:'fadeUp .7s ease .1s both' },
  heroEm: { fontStyle:'italic', color:'#b09060' },
  heroSub: { fontSize:15, letterSpacing:'0.1em', color:'rgba(255,255,255,0.3)', marginBottom:'2.5rem', fontWeight:300, textTransform:'uppercase', animation:'fadeUp .7s ease .2s both' },
  heroBtns: { display:'flex', gap:12, animation:'fadeUp .7s ease .3s both', flexWrap:'wrap', justifyContent:'center' },
  heroScroll: { position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, color:'rgba(255,255,255,0.3)', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', animation:'fadeIn 1.2s ease 1s both' },

  // Buttons
  btnGold: { background:'#b09060', color:'#fff', border:'none', padding:'14px 32px', fontFamily:'var(--ff-sans)', fontSize:14, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', borderRadius:2, transition:'background .15s' },
  btnOutline: { background:'transparent', color:'rgba(255,255,255,0.55)', border:'0.5px solid rgba(255,255,255,0.08)', padding:'14px 32px', fontFamily:'var(--ff-sans)', fontSize:14, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', borderRadius:2, transition:'all .15s' },

  // Section
  section: { padding:'5rem 2rem' },
  sHdr: { display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:'2.5rem' },
  sH2: { fontFamily:'var(--ff-serif)', fontSize:'clamp(1.8rem, 3vw, 2.2rem)', fontWeight:300, color:'rgba(255,255,255,0.92)' },
  sH2em: { fontStyle:'italic', color:'#b09060' },
  sLink: { fontSize:13, letterSpacing:'0.15em', textTransform:'uppercase', color:'#b09060', cursor:'pointer', background:'none', border:'none', fontFamily:'var(--ff-sans)' },

  // Cards
  featCard: { flexShrink:0, width:'clamp(220px,72vw,290px)', background:'#1e1a16', border:'0.5px solid rgba(255,255,255,0.08)', borderRadius:4, overflow:'hidden', scrollSnapAlign:'start', cursor:'pointer', transition:'all .2s' },
  featImg: { height:180, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', background:'#252019' },
  featBadge: { position:'absolute', top:10, left:10, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', padding:'3px 9px', borderRadius:2 },
  featBody: { padding:'1rem' },
  featBrand: { fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', color:'#b09060', marginBottom:3 },
  featName: { fontFamily:'var(--ff-serif)', fontSize:'1.05rem', fontWeight:300, lineHeight:1.2, marginBottom:4, color:'rgba(255,255,255,0.92)' },
  featNotes: { fontSize:13, color:'rgba(255,255,255,0.3)', marginBottom:4 },
  featInspired: { fontSize:13, color:'#b09060', fontStyle:'italic', marginBottom:12 },
  featFooter: { display:'flex', alignItems:'center', justifyContent:'space-between' },

  card: { background:'#1e1a16', border:'0.5px solid rgba(255,255,255,0.08)', borderRadius:4, cursor:'pointer', transition:'all .2s', overflow:'hidden', animation:'fadeUp .3s ease both' },
  cardImg: { height:150, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', background:'#252019' },
  cardBody: { padding:'1rem' },
  cardBrand: { fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', color:'#b09060', marginBottom:3 },
  cardName: { fontFamily:'var(--ff-serif)', fontSize:'0.95rem', fontWeight:300, lineHeight:1.2, marginBottom:4, color:'rgba(255,255,255,0.92)', minHeight:'2.3rem' },
  cardNotes: { fontSize:12, color:'rgba(255,255,255,0.3)', marginBottom:10, lineHeight:1.4 },
  cardFooter: { display:'flex', alignItems:'center', justifyContent:'space-between' },
  pr: { fontSize:14, color:'rgba(255,255,255,0.92)' },
  prMuted: { fontSize:12, color:'#b09060', fontStyle:'italic' },
  addBtn: { width:28, height:28, border:'0.5px solid rgba(255,255,255,0.08)', background:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:2, transition:'all .15s', flexShrink:0 },

  carousel: { overflowX:'auto', display:'flex', gap:16, paddingBottom:8, scrollSnapType:'x mandatory', WebkitOverflowScrolling:'touch', scrollbarWidth:'none' },

  // Search & filter
  searchWrap: { display:'flex', alignItems:'center', background:'#1e1a16', border:'0.5px solid rgba(255,255,255,0.08)', borderRadius:2, padding:'0 1rem', height:48, gap:10, marginBottom:'1.5rem', transition:'border-color .2s, box-shadow .2s' },
  searchInput: { flex:1, border:'none', outline:'none', fontFamily:'var(--ff-sans)', fontSize:15, color:'rgba(255,255,255,0.92)', background:'transparent' },
  tabs: { display:'flex', borderBottom:'0.5px solid rgba(255,255,255,0.08)', marginBottom:'1.25rem' },
  tab: { flex:1, padding:'0.85rem', textAlign:'center', fontSize:13, letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer', color:'rgba(255,255,255,0.3)', background:'none', border:'none', borderBottom:'2px solid transparent', fontFamily:'var(--ff-sans)', transition:'all .15s' },
  tabActive: { color:'rgba(255,255,255,0.92)', borderBottom:'2px solid #b09060' },
  countLbl: { fontSize:13, color:'rgba(255,255,255,0.3)', marginBottom:'1rem' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:16 },

  // Drawer & Modal
  overlay: { position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:150, animation:'fadeIn .2s ease' },
  drawer: { position:'fixed', right:0, top:0, bottom:0, width:'100%', maxWidth:400, background:'#141210', borderLeft:'0.5px solid rgba(255,255,255,0.08)', zIndex:160, display:'flex', flexDirection:'column', animation:'slideUp .25s ease' },
  drawerHdr: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.25rem 1.5rem', borderBottom:'0.5px solid rgba(255,255,255,0.08)' },
  drawerH2: { fontFamily:'var(--ff-serif)', fontSize:'1.3rem', fontWeight:300, color:'rgba(255,255,255,0.92)' },
  closeBtn: { background:'none', border:'none', cursor:'pointer', fontSize:'1.1rem', color:'rgba(255,255,255,0.3)', padding:4 },
  cartItems: { flex:1, overflowY:'auto', padding:'1rem 1.5rem' },
  cartEmpty: { padding:'3rem 0', textAlign:'center', color:'rgba(255,255,255,0.3)', fontSize:15, fontFamily:'var(--ff-serif)', fontStyle:'italic' },
  cartItem: { display:'flex', alignItems:'flex-start', gap:12, padding:'0.9rem 0', borderBottom:'0.5px solid rgba(255,255,255,0.08)' },
  cartItemInfo: { flex:1 },
  cartItemBrand: { fontSize:12, letterSpacing:'0.12em', textTransform:'uppercase', color:'#b09060', marginBottom:2 },
  cartItemName: { fontFamily:'var(--ff-serif)', fontSize:'0.95rem', fontWeight:300, color:'rgba(255,255,255,0.92)', marginBottom:3 },
  cartItemSize: { fontSize:13, color:'rgba(255,255,255,0.3)' },
  cartItemR: { display:'flex', flexDirection:'column', alignItems:'flex-end', gap:7, flexShrink:0 },
  cartItemPrice: { fontSize:15, color:'rgba(255,255,255,0.92)' },
  qtyRow: { display:'flex', alignItems:'center', gap:5 },
  qtyBtn: { width:22, height:22, border:'0.5px solid rgba(255,255,255,0.08)', background:'transparent', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:2, color:'rgba(255,255,255,0.55)', transition:'all .15s' },
  qtyVal: { fontSize:14, minWidth:16, textAlign:'center', color:'rgba(255,255,255,0.92)' },
  drawerFoot: { padding:'1.25rem 1.5rem', borderTop:'0.5px solid rgba(255,255,255,0.08)' },
  totalRow: { display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'1rem' },
  totalLbl: { fontSize:13, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)' },
  totalAmt: { fontFamily:'var(--ff-serif)', fontSize:'1.4rem', fontWeight:300, color:'rgba(255,255,255,0.92)' },
  waBtn: { display:'flex', alignItems:'center', justifyContent:'center', gap:10, width:'100%', background:'#25D366', color:'#fff', border:'none', padding:14, fontFamily:'var(--ff-sans)', fontSize:14, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', borderRadius:2, textDecoration:'none' },
  cartNote: { fontSize:12, color:'rgba(255,255,255,0.3)', textAlign:'center', marginTop:10, lineHeight:1.5 },

  // Modal
  modalOverlay: { position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:200, display:'flex', alignItems:'flex-end', justifyContent:'center', animation:'fadeIn .2s ease' },
  modalPanel: { background:'#141210', width:'100%', maxWidth:460, padding:'2rem', borderRadius:'4px 4px 0 0', borderTop:'0.5px solid rgba(255,255,255,0.08)', animation:'slideUp .25s ease' },
  modalBrand: { fontSize:13, letterSpacing:'0.15em', textTransform:'uppercase', color:'#b09060', marginBottom:4 },
  modalName: { fontFamily:'var(--ff-serif)', fontSize:'1.6rem', fontWeight:300, color:'rgba(255,255,255,0.92)', marginBottom:4, lineHeight:1.2 },
  modalNotes: { fontSize:14, color:'rgba(255,255,255,0.3)', marginBottom:'1.25rem', fontStyle:'italic' },
  sizeGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:'1.25rem' },
  sizeOpt: { border:'0.5px solid rgba(255,255,255,0.08)', padding:'0.85rem', cursor:'pointer', textAlign:'center', borderRadius:2, transition:'all .18s' },
  sizeOptSel: { borderColor:'#b09060', background:'rgba(176,144,96,0.08)' },
  sizeSz: { fontFamily:'var(--ff-serif)', fontSize:'1.15rem', fontWeight:300, display:'block', marginBottom:3, color:'rgba(255,255,255,0.92)' },
  sizeSp: { fontSize:15, color:'rgba(255,255,255,0.3)' },
  modalBtns: { display:'flex', gap:8 },
  btnAdd: { flex:1, background:'#b09060', color:'#fff', border:'none', padding:13, fontFamily:'var(--ff-sans)', fontSize:14, letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer', borderRadius:2 },
  btnCancel: { padding:'13px 18px', border:'0.5px solid rgba(255,255,255,0.08)', background:'transparent', cursor:'pointer', fontFamily:'var(--ff-sans)', fontSize:13, color:'rgba(255,255,255,0.3)', borderRadius:2 },

  // Promises
  promiseRow: { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:12, margin:'3rem 0' },
  promise: { background:'#1e1a16', border:'0.5px solid rgba(255,255,255,0.08)', padding:'1.25rem 1rem', textAlign:'center', borderRadius:4 },
  promiseIcon: { fontSize:18, color:'#b09060', marginBottom:8 },
  promiseTitle: { fontSize:13, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:4, color:'rgba(255,255,255,0.92)' },
  promiseSub: { fontSize:13, color:'rgba(255,255,255,0.3)', lineHeight:1.5 },

  // About
  aboutContent: { maxWidth:680, margin:'0 auto', padding:'5rem 2rem' },
  aH2: { fontFamily:'var(--ff-serif)', fontSize:'1.8rem', fontWeight:300, color:'rgba(255,255,255,0.92)', marginBottom:'1.25rem' },
  aH2em: { fontStyle:'italic', color:'#b09060' },
  aP: { fontSize:15, color:'rgba(255,255,255,0.55)', lineHeight:1.95, marginBottom:'1.5rem' },
  divider: { width:40, height:'0.5px', background:'#b09060', margin:'3rem 0', opacity:0.5 },
  howStep: { display:'flex', gap:'1.5rem', marginBottom:'2rem', alignItems:'flex-start' },
  howNum: { fontFamily:'var(--ff-serif)', fontSize:'2.5rem', fontWeight:300, color:'rgba(176,144,96,0.4)', flexShrink:0, lineHeight:1 },
  howTitle: { fontSize:15, fontWeight:500, color:'rgba(255,255,255,0.92)', marginBottom:5, fontFamily:'var(--ff-sans)' },
  howText: { fontSize:15, color:'rgba(255,255,255,0.55)', lineHeight:1.8 },
  faqItem: { borderBottom:'0.5px solid rgba(255,255,255,0.08)', padding:'0.9rem 0' },
  faqQ: { fontSize:15, cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem', color:'rgba(255,255,255,0.92)', background:'none', border:'none', width:'100%', textAlign:'left', fontFamily:'var(--ff-sans)' },
  faqToggle: { color:'#b09060', fontSize:18, flexShrink:0, width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center' },
  faqA: { fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.8, paddingTop:10 },

  // Footer
  footer: { background:'#0c0a08', color:'rgba(255,255,255,0.3)', textAlign:'center', padding:'3rem 2rem', fontSize:13, letterSpacing:'0.07em', borderTop:'2px solid #b09060' },
  footerBrand: { color:'rgba(255,255,255,0.92)', fontFamily:'var(--ff-serif)', fontSize:'1.4rem', fontWeight:300, display:'block', marginBottom:14 },
  footerLinks: { display:'flex', justifyContent:'center', gap:'2rem', marginBottom:14, fontSize:14, flexWrap:'wrap' },

  // Floats
  waFloat: { position:'fixed', bottom:24, right:24, zIndex:50, background:'#25D366', color:'#fff', border:'none', borderRadius:'50%', width:52, height:52, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', animation:'waPulse 2.5s ease infinite' },
  btt: { position:'fixed', bottom:88, right:24, width:38, height:38, background:'#1e1a16', border:'0.5px solid rgba(255,255,255,0.08)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', zIndex:30, transition:'all .2s' },
  toast: { position:'fixed', bottom:90, left:'50%', transform:'translateX(-50%)', background:'#1e1a16', color:'rgba(255,255,255,0.92)', fontFamily:'var(--ff-sans)', fontSize:14, letterSpacing:'0.05em', padding:'10px 20px', borderRadius:2, zIndex:999, borderLeft:'2px solid #b09060', whiteSpace:'nowrap', animation:'fadeUp .3s ease', border:'0.5px solid rgba(255,255,255,0.08)' },
};
