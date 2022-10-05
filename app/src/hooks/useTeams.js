import { useEffect, useState } from 'react';
import { query, collection, onSnapshot, where } from 'firebase/firestore';

import { firestore } from '../configs/firebase.config';

const useTeams = (userId) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    let unsubcribe;

    const q = query(
      collection(firestore, 'teams'),
      where('owner', '==', userId)
    );

    unsubcribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeams(docs);
    });

    return () => unsubcribe && unsubcribe();
  }, []);

  return { teams };
};

export default useTeams;
