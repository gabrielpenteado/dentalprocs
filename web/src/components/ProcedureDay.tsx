import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';

interface ProcedureDayProps {
  completed: number;
  amount: number;
}

export function ProcedureDay(props: ProcedureDayProps) {
  const completedPercentage = Math.round((props.completed / props.amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <i
          className={clsx('fas fa-tooth text-zinc-800 text-center text-toothIcon', {
            'text-teal-800': completedPercentage > 0 && completedPercentage < 20,
            'text-teal-700': completedPercentage >= 20 && completedPercentage < 40,
            'text-teal-600': completedPercentage >= 40 && completedPercentage < 60,
            'text-teal-500': completedPercentage >= 60 && completedPercentage < 80,
            'text-teal-400': completedPercentage >= 80,
          })}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className='font-semibold text-zinc-400'>friday</span>
          <span className='font-extrabold mt-1 leading-tight text-3xl'>04/28</span>

          <ProgressBar progress={completedPercentage} />

          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}