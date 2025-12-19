import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function NoteForm() {
  let {id} = useParams();
  const [note, setNote] = useState('');
  const addNote = (e) => {
    e.preventDefault();
    let data = {
      note,
      bookUid: id,
    }
  }


  return (
  <form action="" onSubmit={addNote}>
    <textarea onChange={e => setNote(e.target.value)} value={note} className='shadow-sm bg-gray-100 w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500 placeholder:italic' placeholder='Enter your notes...' name="" id="" rows="5"></textarea>
    <div className="flex justify-end mt-1">
      <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-2 rounded-lg cursor-pointer'> Add Note </button> 
    </div>
  </form>
  )
}
