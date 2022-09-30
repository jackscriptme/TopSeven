import { useEffect, useMemo, useState } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';

import { firestore } from '../configs/firebase.config';

const usePlayers = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    let unsubcribe;

    const q = query(collection(firestore, 'players'));
    unsubcribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPlayers(docs);
    });

    return () => unsubcribe && unsubcribe();
  }, []);

  return { players };
};

export default usePlayers;
