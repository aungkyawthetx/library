import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function useFirestore() {
    
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

    return {addCollection, deleteDocument, updateDocument} 
}
