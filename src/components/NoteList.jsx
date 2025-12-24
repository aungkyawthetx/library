import { useParams } from 'react-router-dom';
import Profile from '../assets/profile.png';
import { useCollection } from '../hooks/useCollection';

export default function NoteList() {

  let { id } = useParams();
  console.log(id);
  let { data: notes, loding, error } = useCollection('notes');
  console.log(notes);

  return (
    <div className='border border-gray-300 shadow-md p-3 rounded my-2'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-1'>
          <img src={Profile} alt="Profile Image" className='cursor-pointer w-10 h-10 rounded-full'/>
          <h3 className='font-bold text-gray-800 mt-1'>Aung Kyaw Thet</h3>
        </div>
        <p className='text-sm text-gray-600 italic'>19.12.2025</p>
      </div>
      <div className='mt-2'>
        <p className='text-indigo-800 italic'> Test note </p>
      </div>
    </div>
  )
}
