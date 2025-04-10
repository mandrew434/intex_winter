import React, { useState } from 'react';
import { ContentRec } from '../types/ContentRec'; // adjust path as needed
import MovieCard from './MovieCard';

const ContentTest: React.FC = () => {
  const [showId, setShowId] = useState('');
  const [data, setData] = useState<ContentRec | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!showId) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(
        `https://localhost:5000/api/ContentRec/${encodeURIComponent(showId)}`
      );
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const json = (await res.json()) as ContentRec;
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Extract and sort all recN entries
  const recEntries = data
    ? (Object.entries(data) as [keyof ContentRec, string][])
        .filter(([key]) => key.startsWith('rec'))
        .sort(([a], [b]) => {
          const na = parseInt(a.replace('rec', ''), 10);
          const nb = parseInt(b.replace('rec', ''), 10);
          return na - nb;
        })
    : [];

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h3>Load Content Recommendations</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Enter showId (e.g. s1)"
          value={showId}
          onChange={(e) => setShowId(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={handleFetch} disabled={loading || !showId}>
          {loading ? 'Loading…' : 'Fetch'}
        </button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {data && (
        <div>
          <h4>Recommendations for "{data.showId}"</h4>
          <ul>
            {recEntries.map(([key, val]) => (
              <li key={key}>
                <strong>{key}:</strong> {val}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContentTest;
