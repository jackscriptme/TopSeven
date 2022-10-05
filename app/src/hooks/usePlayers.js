import { useEffect, useState, useMemo } from 'react';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';

import { firestore } from '../configs/firebase.config';

const usePlayers = (userId) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    let unsubcribe;

    const q = query(
      collection(firestore, 'players'),
      orderBy('stats.overall', 'desc')
    );

    unsubcribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPlayers(docs);
    });

    return () => unsubcribe && unsubcribe();
  }, []);

  const userPlayers = useMemo(
    () => players.filter((player) => player.owner === userId),
    [players, userId]
  );

  return { players, userPlayers };
};

export default usePlayers;
