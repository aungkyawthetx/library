import { useParams } from 'react-router-dom';
import Profile from '../assets/dev.jpeg';
import { useCollection } from '../hooks/useCollection';
import useTheme from '../hooks/useTheme';

export default function NoteList() {
  let { id } = useParams();
  let { isDark } = useTheme();
  let { loading, error, data: notes} = useCollection('notes', ['bookUid', '==', id]);
  console.log(notes);

  return (
    <>
      {error && <p className='text-red-500'> {error} </p>}
      {loading && <p className='italic'>Loading..</p>}
      {notes && notes.map(n => (
        <div className='border border-gray-300 shadow-md p-3 rounded my-2'>
          <div className='flex justify-between'>
            <div className='flex gap-1'>
              <img src={Profile} alt="Profile Image" className={`cursor-pointer w-10 h-10 rounded-full ${isDark ? 'border-2 border-indigo-400' : ''}`}/>
              <h3 className={`font-bold mt-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}> Your Name </h3>
            </div>
            <p className={`text-sm italic ${isDark ? 'text-gray-100' : 'text-gray-600'}`}> 12.2.23 </p>
          </div>
          <div className='mt-2'>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-indigo-800'}`}> {n.note} </p>
          </div>
        </div>
      ))}
      {notes.length <= 0 && <p className='text-red-500 italic text-sm'>There's no note for this book.</p>}
    </>
  )
}
