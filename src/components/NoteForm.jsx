import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';
import { serverTimestamp } from 'firebase/firestore';

export default function NoteForm({type = 'create', setEditNote, editNote}) {
  let { id } = useParams();
  const [note, setNote] = useState('');
  let { addCollection, updateDocument} = useFirestore();

  useEffect(() => {
    if(type === 'update') {
      setNote(editNote.note);
    }
  },[type, editNote])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(type === 'create') {
      let data = {
        note,
        bookUid: id,
        date: serverTimestamp()
      }
      await addCollection('notes', data);
    } else {
      const updatedNote = { ...editNote, note };
      await updateDocument('notes', editNote.id, updatedNote, false);
      setEditNote(null);
    }
    setNote('');
  }

  return (
  <form action="" onSubmit={handleSubmit} id='noteForm'>
    <textarea onChange={e => setNote(e.target.value)} value={note} className="w-full shadow-sm border-2 border-gray-300 dark:border-indigo-400 rounded-lg p-2 focus:outline-none bg-gray-100 dark:bg-gray-700 placeholder:italic" placeholder='Enter your notes...' name="" id="" rows="2"></textarea>
    <div className="flex mt-1 gap-2">
      <button type='submit' className="bg-pink-400 hover:bg-pink-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold px-3 py-2 rounded-lg cursor-pointer"> {type === 'create' ? 'Add' : 'Update'} Note </button> 
      {type === 'update' && <button type='button' onClick={() => setEditNote(null)} className="border-2 border-pink-400 dark:border-indigo-500 text-pink-500 dark:text-white font-semibold px-3 py-2 rounded-lg cursor-pointer"> Cancel </button>} 
    </div>
  </form>
  )
}
