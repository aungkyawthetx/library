import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

export default function useFirestore() {
    
    let getCollection = (colName) => {
        let [error, setError] = useState('');
        let [data, setData] = useState([]);
        let [loading, setLoading] = useState(true);

        useEffect(function () {
            let ref = collection(db, colName);
            let q = query(ref, orderBy('date', 'desc'));
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
        }, []);

        return {error, loading, data}
    }

    let getDocument = (colName, id) => {
        let [error, setError] = useState('');
        let [data, setData] = useState(null);
        let [loading, setLoading] = useState(true);

        useEffect(() => {
            let ref = doc(db, colName, id);
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
        }, [id]);
        
        return { error, loading, data }
    }
    
    let addCollection = async (colName, data) => {
        let ref = collection(db, colName);
        return addDoc(ref, data);
    }

    let deleteDocument = async (colName, id) => {
        let ref = doc(db, colName, id);
        await deleteDoc(ref);
    }

    let updateDocument = async (colName, id, data) => {
        let ref = doc(db, colName, id);
        return updateDoc(ref, data);
    }


    return {getCollection, addCollection, deleteDocument, updateDocument, getDocument} 
}
