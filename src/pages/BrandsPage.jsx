import { useState } from 'react';
import { S, C } from '../styles/theme.js';
import { allProducts } from '../data/products.js';
import { ProductCard } from '../components/ui.jsx';

function BrandCard({ brand, count, cat, onClick }) {
  const [hov, setHov] = useState(false);
  const catLabel = cat==='niche' ? 'Niche' : cat==='designer' ? 'Designer' : 'Middle Eastern';
  return (
    <div
      style={{ background: hov ? 'rgba(176,144,96,0.08)' : C.bg3, border:`0.5px solid ${hov ? 'rgba(176,144,96,0.4)' : C.border}`, borderRadius:4, padding:'1.4rem 1.25rem', cursor:'pointer', transition:'all .2s', display:'flex', flexDirection:'column', gap:10, transform: hov ? 'translateY(-2px)' : 'none', boxShadow: hov ? '0 8px 24px rgba(0,0,0,0.3)' : 'none' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      <div style={{ fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', color:'#b09060' }}>{catLabel}</div>
      <div style={{ fontFamily:'var(--ff-serif)', fontSize:'1.2rem', fontWeight:300, color:C.t1, lineHeight:1.2 }}>{brand}</div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto' }}>
        <div style={{ fontSize:10, color:C.t3 }}>{count} fragrance{count!==1?'s':''}</div>
        <div style={{ fontSize:14, color: hov ? '#b09060' : C.t3, transition:'color .15s' }}>→</div>
      </div>
    </div>
  );
}

function BrandProductsPage({ brand, onOpen, onBack }) {
  const products = allProducts.filter(p => p.brand === brand);
  const cat = products[0]?.cat;
  const catLabel = cat==='niche' ? 'Niche' : cat==='designer' ? 'Designer' : 'Middle Eastern Dupe';
  return (
    <div style={{ minHeight:'100vh', paddingTop:'6rem' }}>
      <div style={{ background:C.bg2, borderBottom:`0.5px solid ${C.border}`, padding:'2.5rem 2rem 2rem' }}>
        <button style={{ background:'none', border:'none', color:C.t3, cursor:'pointer', fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:'var(--ff-sans)', display:'flex', alignItems:'center', gap:6, marginBottom:'1.25rem', padding:0 }} onClick={onBack}>
          <span style={{ fontSize:16 }}>←</span> All Brands
        </button>
        <div style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#b09060', marginBottom:8 }}>{catLabel}</div>
        <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:300, color:C.t1, marginBottom:8 }}>{brand}</h1>
        <div style={{ fontSize:12, color:C.t3 }}>{products.length} fragrance{products.length!==1?'s':''} available</div>
      </div>
      <div style={{ padding:'2rem' }}>
        <div style={S.grid}>
          {products.map(p => <ProductCard key={p.id} product={p} onOpen={onOpen}/>)}
        </div>
      </div>
    </div>
  );
}

export default function BrandsPage({ onOpen }) {
  const [query,         setQuery]         = useState('');
  const [tab,           setTab]           = useState('all');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [focused,       setFocused]       = useState(false);

  if (selectedBrand) {
    return <BrandProductsPage brand={selectedBrand} onOpen={onOpen} onBack={() => setSelectedBrand(null)}/>;
  }

  const isSearching = query.trim().length > 0;

  const brandData = {};
  allProducts.forEach(p => {
    if (!brandData[p.brand]) brandData[p.brand] = { count:0, cat:p.cat };
    brandData[p.brand].count++;
  });

  const filteredBrands = Object.entries(brandData)
    .filter(([b, d]) => {
      const tabOk = tab==='all' || d.cat===tab;
      const qOk   = !isSearching || b.toLowerCase().includes(query.toLowerCase());
      return tabOk && qOk;
    })
    .sort(([a],[b]) => a.localeCompare(b));

  const searchedProducts = isSearching
    ? allProducts.filter(p => (p.brand+' '+p.name+' '+(p.notes||'')).toLowerCase().includes(query.toLowerCase().trim()))
    : [];

  return (
    <div style={{ minHeight:'100vh', paddingTop:'6rem' }}>
      <div style={{ padding:'1.5rem 2rem 0' }}>
        <div style={{ ...S.searchWrap, ...(focused ? { borderColor:'rgba(176,144,96,0.5)', boxShadow:'0 0 0 3px rgba(176,144,96,0.07)' } : {}) }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          <input style={S.searchInput} placeholder="Search brand or fragrance..." value={query}
            onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}/>
          {query && <button style={{ background:'none', border:'none', color:C.t3, cursor:'pointer', fontSize:16 }} onClick={() => setQuery('')}>✕</button>}
        </div>
      </div>

      {/* Fragrance search results */}
      {isSearching && searchedProducts.length > 0 && (
        <div style={{ padding:'0 2rem 1.5rem' }}>
          <div style={S.countLbl}>{searchedProducts.length} fragrance{searchedProducts.length!==1?'s':''} for "{query}"</div>
          <div style={S.grid}>{searchedProducts.map(p => <ProductCard key={p.id} product={p} onOpen={onOpen}/>)}</div>
        </div>
      )}

      {/* Brand directory */}
      {(!isSearching || filteredBrands.length > 0) && (
        <div style={{ padding:'1rem 2rem 2rem' }}>
          {!isSearching && (
            <div style={{ display:'flex', gap:0, borderBottom:`0.5px solid ${C.border}`, marginBottom:'1.5rem' }}>
              {[['all','All'],['niche','Niche'],['designer','Designer'],['dupe','Dupes']].map(([v,l]) => (
                <button key={v} style={{ ...S.tab, ...(tab===v ? S.tabActive : {}) }} onClick={() => setTab(v)}>{l}</button>
              ))}
            </div>
          )}
          {isSearching && filteredBrands.length > 0 && (
            <div style={{ ...S.countLbl, marginTop:'0.5rem' }}>{filteredBrands.length} brand{filteredBrands.length!==1?'s':''} matching "{query}"</div>
          )}
          {!isSearching && <div style={S.countLbl}>{filteredBrands.length} brand{filteredBrands.length!==1?'s':''}</div>}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:12 }}>
            {filteredBrands.map(([b,d]) => (
              <BrandCard key={b} brand={b} count={d.count} cat={d.cat} onClick={() => setSelectedBrand(b)}/>
            ))}
          </div>
        </div>
      )}

      {isSearching && filteredBrands.length===0 && searchedProducts.length===0 && (
        <div style={{ padding:'4rem', textAlign:'center', color:C.t3, fontSize:13, fontFamily:'var(--ff-serif)', fontStyle:'italic' }}>
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}
