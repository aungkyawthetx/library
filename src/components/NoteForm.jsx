import { useState } from 'react'
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';
import { serverTimestamp } from 'firebase/firestore';
import useTheme from '../hooks/useTheme';

export default function NoteForm() {
  let { id } = useParams();
  let { isDark } = useTheme();
  const [note, setNote] = useState('');
  let { addCollection} = useFirestore();

  const addNote = async (e) => {
    e.preventDefault();
    let data = {
      note,
      bookUid: id,
      date: serverTimestamp()
    }
    await addCollection('notes', data);
    setNote('');
  }

  return (
  <form action="" onSubmit={addNote} id='noteForm'>
    <textarea onChange={e => setNote(e.target.value)} value={note} className={`${isDark ? 'bg-gray-300' : 'bg-gray-100'} shadow-sm w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500 placeholder:italic`} placeholder='Enter your notes...' name="" id="" rows="5"></textarea>
    <div className="flex justify-end mt-1">
      <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-2 rounded-lg cursor-pointer'> Add Note </button> 
    </div>
  </form>
  )
}
