import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export function useDocument(colName, id) {
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const ref = doc(db, colName, id)
    onSnapshot(ref, doc => {
        if (doc.exists()) {
            let document = { id: doc.id, ...doc.data() };
            setData(document);
            setLoading(false);
            setError('');
        }
        else {
            setError('No document found.');
            setLoading(false);
        }
    })
  }, [colName, id])

  return { data, loading, error }
}
