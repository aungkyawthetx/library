import { useParams } from 'react-router-dom';
import Profile from '../assets/profile.png';
import { useCollection } from '../hooks/useCollection';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function NoteList() {
  let {id} = useParams();
  let { user } = useContext(AuthContext);
  let { loading, error, data: notes} = useCollection('notes', ['bookUid', '==', id]);
  console.log(notes);

  return (
    <>
      {error && <p className='text-red-500'> {error} </p>}
      {loading && <p className='italic'>Loading..</p>}
      {notes && notes.map(n => (
        <div className='border border-gray-300 shadow-md p-3 rounded my-2'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-1'>
              <img src={Profile} alt="Profile Image" className='cursor-pointer w-10 h-10 rounded-full'/>
              <h3 className='font-bold text-gray-800 mt-1'> Test User </h3>
            </div>
            <p className='text-sm text-gray-600 italic'> 12.2.23 </p>
          </div>
          <div className='mt-2'>
            <p className='text-indigo-800 italic'> {n.note} </p>
          </div>
        </div>
      ))}
    </>
  )
}
