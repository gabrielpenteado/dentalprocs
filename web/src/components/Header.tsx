import logoImage from '../assets/logo.svg';

import { NewProcedureForm } from "./NewProcedureForm";
import { PieChart } from "./PieChart";

import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'phosphor-react';
import { ToastContainer } from "react-toastify";
import { ChartDonut } from "@phosphor-icons/react";


export function Header() {

  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={logoImage} width="300px" alt="dentalprocs" />

      <Dialog.Root>
        <Dialog.Trigger
          type='button'
          className='border border-teal-400 font-semibold rounded-lg px-6 py-4
           flex whitespace-nowrap items-center gap-3 hover:border-teal-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-background'
        >
          <Plus size={20} className='text-teal-400' />
          New Procedure
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full
           max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-zinc-900">
              <X size={24} aria-label="Close" />
            </Dialog.Close>

            <Dialog.Title className="text-3x leading-tight font-extrabold">
              Create Procedure
            </Dialog.Title>

            <NewProcedureForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root>
        <Dialog.Trigger
          type='button'
          className='border border-teal-400 font-semibold rounded-lg px-6 py-4
           flex whitespace-nowrap items-center gap-3 hover:border-teal-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-background'
        >
          <ChartDonut size={20} className='text-teal-400' />
          Procedures Chart
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full
           max-w-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-zinc-900">
              <X size={24} aria-label="Close" />
            </Dialog.Close>

            <Dialog.Title className="text-3x leading-tight font-extrabold pb-10">
              Most performed procedures.
            </Dialog.Title>

            <PieChart />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </div>
  )
}