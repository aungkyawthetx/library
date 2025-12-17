import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export function useCollection(colName) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ref = collection(db, colName)
        const q = query(ref, orderBy("date", "desc"))
        onSnapshot(q, docs => {
            if (docs.empty) {
                setError('Filed to fetch books.');
                setLoading(false);
            }
            else {
                let collectionDatas = [];
                docs.forEach(doc => {
                    let document = { id: doc.id, ...doc.data() };
                    collectionDatas.push(document);
                });
                setData(collectionDatas);
                setLoading(false);
                setError('');
            }
        });
  }, [colName])

  return { data, loading, error }
}
