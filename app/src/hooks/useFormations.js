import { useEffect, useState } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';

import { firestore } from '../configs/firebase.config';

const useFormations = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    let unsubcribe;

    const q = query(collection(firestore, 'formations'));

    unsubcribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFormations(docs);
    });

    return () => unsubcribe && unsubcribe();
  }, []);

  return { formations };
};

export default useFormations;
