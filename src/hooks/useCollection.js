import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";

export function useCollection(colName, _q) {
    let qRef = useRef(_q).current;
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const ref = collection(db, colName);
        let queries = [];
        if (qRef) {
            queries.push(where(...qRef))
        }
        queries.push(orderBy('date', 'desc'));
        const q = query(ref, ...queries);
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
  }, [colName, qRef])

  return { data, loading, error }
}
