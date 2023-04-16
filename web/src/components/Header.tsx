import { Plus } from 'phosphor-react';
import logoImage from '../assets/logo.svg';

export function Header() {
  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={logoImage} width="300px" alt="dentalprocs" />

      <button
        type='button'
        className='border border-teal-400 font-semibold rounded-lg px-6 py-4 flex whitespace-nowrap items-center gap-3 hover:border-teal-200'
      >
        <Plus size={20} className='text-teal-400' />
        New Procedure
      </button>
    </div>
  )
}