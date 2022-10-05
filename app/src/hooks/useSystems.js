import { useEffect, useState } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';

import { firestore } from '../configs/firebase.config';

const useSystems = () => {
  const [systems, setSystems] = useState({});

  useEffect(() => {
    let unsubcribe;

    const q = query(collection(firestore, 'systems'));

    unsubcribe = onSnapshot(q, (snapshot) => {
      const result = {};
      snapshot.docs.map((doc) => (result[doc.id] = doc.data()));
      setSystems(result);
    });

    return () => unsubcribe && unsubcribe();
  }, []);

  return { systems };
};

export default useSystems;
