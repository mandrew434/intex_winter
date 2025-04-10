import { useEffect, useState } from 'react';
import { CollaborativeRec } from '../types/CollaborativeRec';
import { useNavigate } from 'react-router-dom';

function CollaborativeTest() {
  const [recs, setRecs] = useState<CollaborativeRec | null>(null);
  const userId = 1;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://localhost:5000/api/CollaborativeRecs/${userId}`)
      .then((res) => res.json())
      .then(setRecs)
      .catch(console.error);
  }, [userId]);

  if (!recs) return <div>Loading…</div>;

  const firstAction = recs.action?.[0] ?? '—';
  const actionRecs = recs.action || [];

  console.log('Action Recommendations:', actionRecs);

  const handleClick = () => {
    console.log(
      `Navigating to MovieDetailsPage for showId: ${{ firstAction }}`
    );
    // Navigate to a URL including the movie's showId.
    // You should have a corresponding route in your Router, e.g., "/movie-details/:showId"
    navigate(`/moviedetails/${firstAction}`);
  };

  return (
    <div>
      <h2>User {recs.userId} Recommendations</h2>
      <p>
        First Action Movie ID: <strong>{firstAction}</strong>
      </p>
      {/* … */}
      <button onClick={handleClick}></button>
    </div>
  );
}

export default CollaborativeTest;
