import { Check } from "phosphor-react";

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

      <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center
       gap-3 font-semibold bg-green-600 hover:bg-green-500">
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  )
}