import { useState } from 'react';
import { C } from '../styles/theme.js';
import { MOODS, MOOD_MAP } from '../data/moods.js';
import { allProducts } from '../data/products.js';
import { ProductCard } from './ui.jsx';

export default function MoodFilter({ onOpen }) {
  const [activeMood, setActiveMood] = useState(null);

  const moodProducts = activeMood
    ? allProducts.filter(p => {
        const key = `${p.brand} — ${p.name}`;
        return MOOD_MAP[key]?.includes(activeMood);
      })
    : [];

  const activeMoodData = MOODS.find(m => m.id === activeMood);

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Mood chips */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.85rem', fontFamily: 'var(--ff-sans)' }}>
          Filter by mood
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {MOODS.map(mood => {
            const isActive = activeMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setActiveMood(isActive ? null : mood.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '8px 16px',
                  background: isActive ? 'rgba(176,144,96,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `0.5px solid ${isActive ? 'rgba(176,144,96,0.6)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 50,
                  cursor: 'pointer',
                  transition: 'all .18s',
                  fontFamily: 'var(--ff-sans)',
                }}
              >
                <span style={{ fontSize: 14 }}>{mood.emoji}</span>
                <span style={{
                  fontSize: 12, letterSpacing: '0.06em',
                  color: isActive ? '#b09060' : 'rgba(255,255,255,0.6)',
                  fontWeight: isActive ? 500 : 300,
                }}>
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {activeMood && (
        <div style={{ animation: 'fadeUp .3s ease both' }}>
          {/* Mood header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '1rem',
            padding: '12px 16px',
            background: 'rgba(176,144,96,0.06)',
            border: '0.5px solid rgba(176,144,96,0.15)',
            borderRadius: 6,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{activeMoodData?.emoji}</span>
              <div>
                <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.92)' }}>
                  {activeMoodData?.label}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  {activeMoodData?.desc}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#b09060' }}>
              {moodProducts.length} fragrance{moodProducts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {moodProducts.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13, fontStyle: 'italic', fontFamily: 'var(--ff-serif)' }}>
              No fragrances tagged for this mood yet.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {moodProducts.map(p => (
                <ProductCard key={p.id} product={p} onOpen={onOpen} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
