/* import { useState, useEffect } from 'react';

export function UserIdTest(userEmail: string) {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!userEmail) return;

    const fetchUserId = async () => {
      try {
        console.log
        const res = await fetch(
          `https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/api/Movie/user-id?userEmail=${encodeURIComponent(userEmail)}`
        );
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        // our endpoint returns a bare number
        const id = (await res.json()) as number;
        setUserId(id);
        console.log('UserId:', id);
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    fetchUserId();
  }, [userEmail]);

  return userId;
}

export default UserIdTest;
 */

export async function UserIdTest(email: string): Promise<number> {
  try {
    const resp = await fetch(
      `https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/api/Movie/user-id?userEmail=${encodeURIComponent(email)}`
    );
    if (!resp.ok) throw new Error('Bad response');
    const { userId } = await resp.json();
    return userId;
  } catch {
    // return a fallback instead of throwing
    return 1;
  }
}

export default UserIdTest;
