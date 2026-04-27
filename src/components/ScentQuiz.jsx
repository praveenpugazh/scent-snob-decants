import { useState, useCallback } from 'react';
import { C } from '../styles/theme.js';
import { WAIcon } from './ui.jsx';

const QUESTIONS = [
  {
    id: 'occasion',
    question: 'When do you wear fragrance most?',
    options: [
      { label: 'Daily office / college', value: 'office' },
      { label: 'Dates & evenings out', value: 'date' },
      { label: 'Weekends & casual', value: 'weekend' },
      { label: 'Special occasions & parties', value: 'party' },
    ],
  },
  {
    id: 'season',
    question: 'What season / weather do you prefer?',
    options: [
      { label: '☀️ Hot & sunny', value: 'summer' },
      { label: '🌧️ Cool & rainy', value: 'winter' },
      { label: 'Both equally', value: 'both' },
    ],
  },
  {
    id: 'family',
    question: 'What kind of scent do you usually reach for?',
    options: [
      { label: 'Fresh, clean & citrusy', value: 'fresh' },
      { label: 'Warm, sweet & gourmand', value: 'sweet' },
      { label: 'Woody, smoky & intense', value: 'woody' },
      { label: 'Floral & romantic', value: 'floral' },
      { label: 'Oud & Oriental', value: 'oud' },
    ],
  },
  {
    id: 'experience',
    question: 'How deep is your fragrance rabbit hole?',
    options: [
      { label: 'Just starting out', value: 'beginner' },
      { label: 'Know a few I love', value: 'intermediate' },
      { label: 'Full-blown enthusiast', value: 'enthusiast' },
    ],
  },
  {
    id: 'budget',
    question: 'Budget per 5ml decant?',
    options: [
      { label: 'Under ₹250', value: 'low' },
      { label: '₹250 – ₹500', value: 'mid' },
      { label: '₹500 – ₹1500', value: 'high' },
      { label: 'No limit — show me the best', value: 'any' },
    ],
  },
];

// Rule-based recommendation engine
function getRecommendations(answers) {
  const { occasion, season, family, experience, budget } = answers;
  const recs = [];

  // FRESH picks
  if (family === 'fresh' || season === 'summer') {
    if (budget === 'low' || budget === 'mid')
      recs.push({ brand: 'Rasasi', name: 'Hawas Ice', reason: 'The ultimate fresh aquatic — office & outdoors beast', price: 379 });
    if (budget !== 'low')
      recs.push({ brand: 'Creed', name: 'Silver Mountain Water EDP', reason: 'Crisp, sparkling niche pick with incredible longevity', price: 1800 });
    recs.push({ brand: 'French Avenue', name: 'Frostbite', reason: 'Clean Sauvage dupe that punches above its weight', price: 349 });
  }

  // SWEET / GOURMAND
  if (family === 'sweet' || season === 'winter') {
    if (budget === 'low' || budget === 'mid')
      recs.push({ brand: 'Lattafa', name: 'Khamrah Qawha', reason: 'Coffee, cardamom and amber — addictive and long-lasting', price: 249 });
    if (budget !== 'low')
      recs.push({ brand: 'Tom Ford', name: 'Tobacco Vanille EDP', reason: 'The gold standard of tobacco-vanilla. Rich and unforgettable', price: 1600 });
    recs.push({ brand: 'French Avenue', name: 'Liquid Brun', reason: 'Althaïr dupe — warm vanilla spice, incredible performer', price: 330 });
  }

  // WOODY / SMOKY
  if (family === 'woody') {
    recs.push({ brand: 'Afnan', name: '9pm Night Out', reason: 'Dragon fruit opens into deep suede — magnetic sillage', price: 269 });
    if (budget === 'high' || budget === 'any')
      recs.push({ brand: 'Initio', name: 'Oud for Greatness EDP', reason: 'Statement niche — commanding presence in any room', price: 1600 });
    recs.push({ brand: 'French Avenue', name: 'Ghost Spectre', reason: 'Dark, smoky and woody — great value crowd-stopper', price: 279 });
  }

  // FLORAL
  if (family === 'floral') {
    recs.push({ brand: 'Arabiyat Prestige', name: 'Marwa', reason: 'Fresh florals with light musk — clean and effortless', price: 259 });
    if (budget !== 'low')
      recs.push({ brand: 'Frederic Malle', name: 'Portrait of a Lady EDP', reason: 'Iconic rose chypre — the benchmark for floral niche', price: 1800 });
  }

  // OUD & ORIENTAL
  if (family === 'oud') {
    recs.push({ brand: 'Swiss Arabian', name: 'Incensen 01', reason: 'Frankincense and oud — Amouage Interlude vibes at a fraction', price: 479 });
    recs.push({ brand: 'Nusuk', name: 'Ateeq', reason: 'Saffron, oud and musk — deep, rich and very wearable', price: 199 });
    if (budget === 'high' || budget === 'any')
      recs.push({ brand: 'Amouage', name: 'Interlude Man EDP', reason: 'The pinnacle of oud-frankincense. Complex and iconic', price: 1600 });
  }

  // Occasion overrides / boosters
  if (occasion === 'party') {
    recs.unshift({ brand: 'Creed', name: 'Aventus EDP', reason: 'The classic crowd-puller. Never misses on a night out', price: 2400 });
    if (!recs.find(r => r.name === '9pm Night Out'))
      recs.push({ brand: 'Afnan', name: '9pm Night Out', reason: 'Loud, sexy sillage — made for after dark', price: 269 });
  }

  if (occasion === 'office') {
    if (!recs.find(r => r.name === 'Hawas Ice'))
      recs.push({ brand: 'Rasasi', name: 'Hawas Ice', reason: 'Inoffensive, fresh and compliment-magnet in AC offices', price: 379 });
    recs.push({ brand: 'Dior', name: 'Sauvage EDP', reason: 'Safe, safe, safe. Everyone loves it and there\'s a reason', price: 1100 });
  }

  if (experience === 'beginner') {
    recs.push({ brand: 'Lattafa', name: 'Asad Elixir', reason: 'Perfect entry point — easy to wear, incredible value', price: 179 });
  }

  // Budget filter
  const budgetMax = { low: 250, mid: 500, high: 1500, any: 99999 };
  const max = budgetMax[budget] || 99999;
  const filtered = recs.filter(r => r.price <= max);

  // Deduplicate and return top 3
  const seen = new Set();
  const unique = filtered.filter(r => {
    const key = `${r.brand}—${r.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.slice(0, 3);
}

export default function ScentQuiz({ onOpen }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const handleAnswer = useCallback((questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setResults(getRecommendations(newAnswers));
    }
  }, [answers, step]);

  const reset = () => { setStep(0); setAnswers({}); setResults(null); };

  const progress = ((step) / QUESTIONS.length) * 100;
  const q = QUESTIONS[step];

  const buildWAMsg = (recs) => {
    let msg = '🧴 *Scent Quiz Results — Scent Snob Decants*\n\nHi! I took the scent quiz and got these recommendations:\n\n';
    recs.forEach((r, i) => {
      msg += `${i + 1}. ${r.brand} — ${r.name} (₹${r.price}/5ml)\n   "${r.reason}"\n\n`;
    });
    msg += 'Can you help me order these? Thank you!';
    return `https://wa.me/918754519509?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => { setOpen(true); reset(); }}
        style={{
          position: 'fixed', bottom: 90, right: 24, zIndex: 48,
          background: '#1e1a16',
          border: '0.5px solid rgba(176,144,96,0.5)',
          borderRadius: 50,
          padding: '10px 18px',
          display: 'flex', alignItems: 'center', gap: 8,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'all .2s',
          fontFamily: 'var(--ff-sans)',
        }}
      >
        <span style={{ fontSize: 16 }}>🧴</span>
        <span style={{ fontSize: 12, color: '#b09060', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
          Find my scent
        </span>
      </button>

      {/* Quiz panel overlay */}
      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, animation: 'fadeIn .2s ease' }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            maxWidth: 520, margin: '0 auto',
            background: '#141210',
            border: '0.5px solid rgba(176,144,96,0.2)',
            borderRadius: '12px 12px 0 0',
            zIndex: 210,
            animation: 'slideUp .25s ease',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            {/* Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '0.5px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.2rem', fontWeight: 300, color: 'rgba(255,255,255,0.92)' }}>
                  Scent <span style={{ fontStyle: 'normal', color: '#b09060' }}>Finder</span>
                </div>
                {!results && (
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                    {step + 1} of {QUESTIONS.length}
                  </div>
                )}
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 18, cursor: 'pointer', padding: 4 }}>✕</button>
            </div>

            {/* Progress bar */}
            {!results && (
              <div style={{ height: 2, background: 'rgba(255,255,255,0.06)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: '#b09060', transition: 'width .3s ease' }} />
              </div>
            )}

            <div style={{ padding: '1.5rem' }}>
              {!results ? (
                /* Question */
                <div>
                  <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.25rem', fontWeight: 300, color: 'rgba(255,255,255,0.92)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                    {q.question}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {q.options.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(q.id, opt.value)}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '0.5px solid rgba(255,255,255,0.1)',
                          borderRadius: 6,
                          padding: '13px 16px',
                          textAlign: 'left',
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: 14,
                          fontFamily: 'var(--ff-sans)',
                          cursor: 'pointer',
                          transition: 'all .15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(176,144,96,0.5)'; e.currentTarget.style.background = 'rgba(176,144,96,0.08)'; e.currentTarget.style.color = '#b09060'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button onClick={() => setStep(step - 1)} style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--ff-sans)', letterSpacing: '0.08em' }}>
                      ← Back
                    </button>
                  )}
                </div>
              ) : (
                /* Results */
                <div>
                  <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b09060', marginBottom: 6, fontFamily: 'var(--ff-sans)' }}>
                    Your perfect matches
                  </div>
                  <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.92)', marginBottom: '1.25rem' }}>
                    Based on your answers, here's what we'd recommend:
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '1.25rem' }}>
                    {results.map((r, i) => (
                      <div key={i} style={{ background: 'rgba(176,144,96,0.05)', border: '0.5px solid rgba(176,144,96,0.15)', borderRadius: 6, padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                          <div>
                            <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b09060', fontFamily: 'var(--ff-sans)' }}>{r.brand}</div>
                            <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.92)' }}>{r.name}</div>
                          </div>
                          <div style={{ fontSize: 13, color: '#b09060', flexShrink: 0 }}>₹{r.price}<span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>/5ml</span></div>
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', lineHeight: 1.5 }}>"{r.reason}"</div>
                      </div>
                    ))}
                  </div>

                  {results.length === 0 && (
                    <div style={{ padding: '1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 13, fontStyle: 'italic' }}>
                      No exact matches for your budget — try adjusting your answers.
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {results.length > 0 && (
                      <a
                        href={buildWAMsg(results)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#fff', textDecoration: 'none', padding: '13px 20px', borderRadius: 4, fontFamily: 'var(--ff-sans)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                      >
                        <WAIcon size={16} />
                        Order via WhatsApp
                      </a>
                    )}
                    <button
                      onClick={reset}
                      style={{ background: 'none', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', padding: '11px 20px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--ff-sans)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
