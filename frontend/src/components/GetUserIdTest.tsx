import React, { useState, useEffect } from 'react';
import { UserIdTest } from './UserIdTest';

const GetUserIdTest: React.FC = () => {
  const [email, setEmail]     = useState<string>('');
  const [userId, setUserId]   = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError]     = useState<string | null>(null);

  // whenever `email` changes, try to fetch the userId
  useEffect(() => {
    if (!email) {
      setUserId(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    UserIdTest(email)
      .then((id) => {
        setUserId(id);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load userId');
        setUserId(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email]);

  return (
    <div>
      <label htmlFor="emailInput">
        Email:{' '}
        <input
          type="email"
          id="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="foo@bar.com"
          style={{ marginRight: '8px' }}
        />
      </label>

      {loading && <p>Loading userId…</p>}
      {error   && <p style={{ color: 'red' }}>Error: {error}</p>}
      {userId !== null && !loading && !error && (
        <p>
          🎉 Your <code>userId</code> is: <strong>{userId}</strong>
        </p>
      )}
    </div>
  );
};

export default GetUserIdTest;
