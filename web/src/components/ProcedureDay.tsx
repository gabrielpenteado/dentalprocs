import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';

import { Tooth } from "@phosphor-icons/react";

import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';

interface ProcedureDayProps {
  date: Date;
  completed?: number;
  amount?: number;
}

export function ProcedureDay({ completed = 0, amount = 0, date }: ProcedureDayProps) {
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('MM/DD');
  const dayOfWeek = dayjs(date).format('dddd');

  return (
    <Popover.Root>
      <Popover.Trigger>

        <Tooth
          alt="tooth icon"
          size="2.5rem"
          weight="fill"
          color={clsx('', {
            '#27272A': completedPercentage == 0,
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

          <div className='mt-6 flex flex-col gap-3'>
            <Checkbox.Root
              className='flex items-center gap-3 group'
            >
              <div className='h-8 w-8 rounded-lg flex items-center justify-center
               bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-teal-500
                group-data-[state=checked]:border-teal-500'>
                <Checkbox.CheckboxIndicator>
                  <Check size={20} className='text-white' />
                </Checkbox.CheckboxIndicator>
              </div>

              <span className='font-semibold text-xl text-white leading-tight 
                group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                Test
              </span>

            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}