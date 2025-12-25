import { useParams } from 'react-router-dom';
import Profile from '../assets/dev.jpeg';
import { useCollection } from '../hooks/useCollection';
import useTheme from '../hooks/useTheme';
import Trash from '../assets/trash.svg';
import Pancel from '../assets/edit.svg';
import moment from 'moment';
import useFirestore from '../hooks/useFirestore';
import { useState } from 'react';
import NoteForm from './NoteForm';

export default function NoteList() {
  let { id } = useParams();
  let { isDark } = useTheme();
  let { loading, error, data: notes } = useCollection('notes', ['bookUid', '==', id]);
  let { deleteDocument } = useFirestore();
  let [edit, setEdit] = useState(null);

  const deleteNote = async (e, id) => {
    e.preventDefault();
    await deleteDocument('notes', id);
  }

  return (
    <>
      {error && <p className='text-red-500'> {error} </p>}
      {loading && <p className='italic'>Loading..</p>}
      {notes && notes.map(n => (
        <div className='border border-gray-300 shadow-md p-3 rounded my-2' key={n.id}>
          <div className='flex justify-between'>
            <div className='flex gap-1'>
              <img src={Profile} alt="Profile Image" className={`cursor-pointer w-10 h-10 rounded-full ${isDark ? 'border-2 border-indigo-400' : ''}`}/>
              <h3 className={`font-bold mt-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}> Your Name </h3>
            </div>
            <p className={`text-sm italic ${isDark ? 'text-gray-100' : 'text-gray-600'}`}> {moment(n?.date?.seconds * 1000).fromNow()} </p>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <div className='w-full'>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-indigo-800'}`}> {n.note} </p>
              {/* <NoteForm/> */}
            </div>
            <div className='flex items-center gap-2'>
              <img src={Pancel} alt="Trash Icon" className='cursor-pointer'onClick={() => setEdit(n)}/>
              <img src={Trash} alt="Trash Icon" className='cursor-pointer'onClick={(e) => deleteNote(e, n.id)}/>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
