import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';

const availableWeekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export function NewProcedureForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Which is your new procedure?
      </label>

      <input
        type="text"
        id="text"
        placeholder="Type your new procedure here."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Which is the recurrence?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map(weekDay => {
          return (
            <Checkbox.Root
              key={weekDay}
              className='flex items-center gap-3 group'
            >
              <div className='h-8 w-8 rounded-lg flex items-center justify-center
               bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-teal-500
                group-data-[state=checked]:border-teal-500'>
                <Checkbox.CheckboxIndicator>
                  <Check size={20} className='text-white' />
                </Checkbox.CheckboxIndicator>
              </div>

              <span className=' text-white leading-tight'>
                {weekDay}
              </span>

            </Checkbox.Root>
          )
        })}
      </div>

      <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center
       gap-3 font-semibold bg-teal-600 hover:bg-teal-500">
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  )
}