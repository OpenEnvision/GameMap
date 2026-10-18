import { useEffect, useState } from 'react';

/** Keep responsive media and keyboard order aligned with the mobile layout. */
export function useNarrowScreen() {
  const [narrow, setNarrow] = useState(() => matchMedia('(max-width:760px)').matches);
  useEffect(() => {
    const query = matchMedia('(max-width:760px)');
    const change = () => setNarrow(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  return narrow;
}
