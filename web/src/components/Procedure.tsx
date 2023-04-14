
interface IProcs {
  completed: number;
}

export function Procedure({ completed }: IProcs) {
  return (
    <div className="bg-teal-400 w-10 h-10 text-white rounded m-2 text-center flex items-center justify-center">{completed}</div>
  )
}