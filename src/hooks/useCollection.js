import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";

export function useCollection(colName, _q) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, colName);
    const constraints = [];

    if (_q) constraints.push(where(..._q));
    constraints.push(orderBy("date", "desc"));

    const q = query(ref, ...constraints);

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(results);
        setError("");
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [colName,_q]);

  return { data, loading, error };
}
