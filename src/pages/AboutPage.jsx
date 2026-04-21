import { useState } from 'react';
import { S, C } from '../styles/theme.js';

const FAQS = [
  ['What is a decant?', 'A decant is a small amount transferred from an authentic full bottle into a clean atomiser — giving you the real scent at a fraction of the full-bottle price.'],
  ['Are the fragrances 100% authentic?', 'Absolutely. Every decant is taken from genuine, authenticated bottles. We never dilute, substitute, or adulterate any fragrance.'],
  ['How is the decant packaged?', 'Each decant is sealed, labelled, and wrapped in bubble wrap inside a padded envelope. Every order is inspected before dispatch.'],
  ['Do you ship PAN India?', 'Yes! Free shipping on orders above ₹2999. Delivery takes 3–7 business days. Currently shipping 5ml — 10ml glass atomisers coming soon.'],
  ['What payment methods are accepted?', 'UPI and GPay. Pay to 8754519509@okbizaxis (Praveen P). Payment details are included in your WhatsApp order confirmation.'],
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {/* Hero */}
      <div style={{ background:C.bg1, padding:'10rem 2rem 6rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(176,144,96,0.05), transparent)', pointerEvents:'none' }}/>
        <div style={{ position:'relative' }}>
          <span style={{ fontSize:10, letterSpacing:'0.3em', color:'#b09060', textTransform:'uppercase', display:'block', marginBottom:'1.25rem', animation:'fadeUp .6s ease both' }}>The Story</span>
          <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2.5rem,6vw,5rem)', fontWeight:300, color:'#fff', lineHeight:1.05, marginBottom:'1.5rem', animation:'fadeUp .7s ease .1s both' }}>
            Born from an<br/><em style={{ fontStyle:'italic', color:'#b09060' }}>Obsession</em>
          </h1>
          <p style={{ fontSize:13, color:C.t3, maxWidth:520, margin:'0 auto', lineHeight:1.9, animation:'fadeUp .7s ease .2s both' }}>
            Five years ago, a bottle of Bleu de Chanel EDP changed everything. Since then, there has been no going back.
          </p>
        </div>
      </div>

      <div style={S.aboutContent}>
        {/* Story */}
        <h2 style={S.aH2}>The <em style={S.aH2em}>Journey</em></h2>
        <p style={S.aP}>
          My name is Praveen Pugazhendhi, and my fragrance story started the way many do — with a first paycheck and a bottle of Bleu de Chanel EDP. It was my first real job, and that bottle felt like a rite of passage. I had no idea it would open a door I could never close.
        </p>
        <p style={S.aP}>
          Five years and hundreds of bottles later, the journey had taken me far from that first spray. Through the entire Chanel and Dior catalogue, then into Tom Ford, then the inevitable deep dive into niche — Creed, Amouage, Initio, Parfums de Marly. Each house revealed something new about what fragrance could be. And then came the Middle Eastern houses: Lattafa, Rasasi, Afnan, Swiss Arabian. The discovery that world-class scent didn't require a world-class price tag was revelatory.
        </p>
        <p style={S.aP}>
          Scent Snob Decants was born out of that frustration every fragrance lover knows — spending thousands on a full bottle only to discover it doesn't work on your skin. I wanted to make it possible for every Indian fragrance enthusiast to smell Amouage Interlude Man, Creed Aventus, or Initio Oud for Greatness before committing. Real juice, authentic bottles, no shortcuts.
        </p>

        <div style={S.divider}/>

        {/* How it works */}
        <h2 style={S.aH2}>How <em style={S.aH2em}>Decanting Works</em></h2>
        {[
          ['01','We Source',  'Genuine, authenticated full bottles sourced from authorised retailers and trusted fragrance networks across India and abroad.'],
          ['02','We Decant',  'Each bottle is carefully opened in a clean environment. Transferred into atomisers using sterile equipment — no dilution, ever.'],
          ['03','We Seal',    'Every decant is sealed, labelled with the exact fragrance name and house, and inspected before packaging.'],
          ['04','We Ship',    'Orders dispatched within 24 hours of payment. Packed in padded envelopes with bubble wrap. Tracked delivery across India.'],
        ].map(([num, title, text]) => (
          <div key={num} style={S.howStep}>
            <div style={S.howNum}>{num}</div>
            <div>
              <div style={S.howTitle}>{title}</div>
              <div style={S.howText}>{text}</div>
            </div>
          </div>
        ))}

        <div style={S.divider}/>

        {/* FAQ */}
        <h2 style={S.aH2}>Common <em style={S.aH2em}>Questions</em></h2>
        {FAQS.map(([q, a], i) => (
          <div key={i} style={S.faqItem}>
            <button style={S.faqQ} onClick={() => setOpenFaq(openFaq===i ? null : i)}>
              <span>{q}</span>
              <span style={{ ...S.faqToggle, transform: openFaq===i ? 'rotate(45deg)' : 'none', transition:'transform .2s' }}>
                {openFaq===i ? '×' : '+'}
              </span>
            </button>
            {openFaq===i && <div style={S.faqA}>{a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
