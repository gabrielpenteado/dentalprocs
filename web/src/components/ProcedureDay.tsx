import { useState } from 'react';

import * as Popover from '@radix-ui/react-popover';

import { Tooth } from "@phosphor-icons/react";

import { ProceduresList } from './ProceduresList';
import { ProgressBar } from './ProgressBar';

import clsx from 'clsx';
import dayjs from 'dayjs';

interface ProcedureDayProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}

export function ProcedureDay({ defaultCompleted = 0, amount = 0, date }: ProcedureDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('MM/DD');
  const dayOfWeek = dayjs(date).format('dddd');

  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger className='transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-background'>

        <Tooth
          alt="tooth icon"
          size="2.5rem"
          weight="fill"
          color={clsx('', {
            '#fafafa': isCurrentDay && completedPercentage == 0,
            '#27272A': !isCurrentDay && completedPercentage == 0,
            '#03302d': completedPercentage > 0 && completedPercentage < 20,
            '#065f5b': completedPercentage >= 20 && completedPercentage < 40,
            '#088f88': completedPercentage >= 40 && completedPercentage < 60,
            '#0bbeb6': completedPercentage >= 60 && completedPercentage < 80,
            '#0eeee3': completedPercentage >= 80
          })}
        />


      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='font-extrabold mt-1 leading-tight text-3xl'>{dayAndMonth}</span>

          <ProgressBar progress={completedPercentage} />

          <ProceduresList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}