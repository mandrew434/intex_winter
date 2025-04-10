// import { useEffect, useState } from 'react';
// import { CollaborativeRec } from '../types/CollaborativeRec';
// import { useNavigate } from 'react-router-dom';

// interface CollaborativeTestProps {
//   recs: Rec;
//   handleClick: (item: string) => void;
// }

// const CollaborativeTest: React.FC<CollaborativeTestProps> = ({
//   recs,
//   handleClick,
// }) => {
//   const [recs, setRecs] = useState<CollaborativeRec | null>(null);
//   const userId = 1;
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`https://localhost:5000/api/CollaborativeRecs/${userId}`)
//       .then((res) => res.json())
//       .then(setRecs)
//       .catch(console.error);
//   }, [userId]);

//   if (!recs) return <div>Loading…</div>;

//   const firstAction = recs.action?.[0] ?? '—';
//   const actionRecs = recs.action || [];

//   console.log('Action Recommendations:', actionRecs);

//   const handleClick = () => {
//     console.log(
//       `Navigating to MovieDetailsPage for showId: ${{ firstAction }}`
//     );
//     // Navigate to a URL including the movie's showId.
//     // You should have a corresponding route in your Router, e.g., "/movie-details/:showId"
//     navigate(`/moviedetails/${firstAction}`);
//   };

//   return (
//     // <div>
//     //   <h2>User {recs.userId} Recommendations</h2>
//     //   <p>
//     //     First Action Movie ID: <strong>{firstAction}</strong>
//     //   </p>
//     //   {/* … */}
//     //   <button onClick={handleClick}></button>
//     // </div>
//     <div>
//       <h2>User {recs.userId} Recommendations</h2>
//       <p>
//         First Action Movie ID: <strong>{firstAction}</strong>
//       </p>
//       {/* Create a button for each action item */}
//       {actionRecs.map((item, index) => (
//         <button key={index} onClick={() => handleClick(item)}>
//           {`Action ${index + 1}: ${item}`}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default CollaborativeTest;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollaborativeRec } from '../types/CollaborativeRec';

const CollaborativeTest: React.FC = () => {
  // Rename the state variable to avoid conflict with any prop name.
  const [collabRec, setCollabRec] = useState<CollaborativeRec | null>(null);
  const userId = 1;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://localhost:5000/api/CollaborativeRecs/${userId}`)
      .then((res) => res.json())
      .then(setCollabRec)
      .catch(console.error);
  }, [userId]);

  if (!collabRec) return <div>Loading…</div>;

  // Get the first action or default to '—'
  const firstAction = collabRec.action?.[0] ?? '—';
  // Ensure actionRecs is an array
  const actionRecs = collabRec.action || [];

  // Local click handler that accepts an action item
  const handleClick = (item: string) => {
    console.log(`Navigating to MovieDetailsPage for showId: ${item}`);
    navigate(`/moviedetails/${item}`);
  };

  return (
    <div>
      <h2>User {collabRec.userId} Recommendations</h2>
      <p>
        First Action Movie ID: <strong>{firstAction}</strong>
      </p>
      {/* Create a button for each action item */}
      {actionRecs.map((item, index) => (
        <button key={index} onClick={() => handleClick(item)}>
          {`Action ${index + 1}: ${item}`}
        </button>
      ))}
    </div>
  );
};

export default CollaborativeTest;
