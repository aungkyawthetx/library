import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';
import { serverTimestamp } from 'firebase/firestore';
import useTheme from '../hooks/useTheme';

export default function NoteForm({type = 'create', setEditNote, editNote}) {
  let { id } = useParams();
  let { isDark } = useTheme();
  const [note, setNote] = useState('');
  let { addCollection, updateDocument} = useFirestore();

  useEffect(() => {
    if(type === 'update') {
      setNote(editNote.note);
    }
  },[type])

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
      editNote.note = note;
      await updateDocument('notes', editNote.id, editNote);
      setEditNote(null);
    }
    setNote('');
  }

  return (
  <form action="" onSubmit={handleSubmit} id='noteForm'>
    <textarea onChange={e => setNote(e.target.value)} value={note} className={`${isDark ? 'bg-gray-300 focus:border-indigo-500' : 'bg-gray-100 focus:border-pink-500'} ${type === 'create' ? 'w-full' : 'w-full'} shadow-sm border-2 border-gray-300 rounded-lg p-2 focus:outline-none placeholder:italic`} placeholder='Enter your notes...' name="" id="" rows="2"></textarea>
    <div className="flex mt-1 gap-2">
      <button type='submit' className={`${isDark ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-pink-400 hover:bg-pink-500'} text-white font-semibold px-3 py-2 rounded-lg cursor-pointer`}> {type === 'create' ? 'Add' : 'Update'} Note </button> 
      {type === 'update' && <button type='button' onClick={() => setEditNote(null)} className={`${isDark ? 'border-indigo-500 text-white' : 'border-pink-400 text-pink-500'} border-2 font-semibold px-3 py-2 rounded-lg cursor-pointer`}> Cancel </button>} 
    </div>
  </form>
  )
}
