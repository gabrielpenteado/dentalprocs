import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import dayjs from 'dayjs';
import clsx from 'clsx';

interface ProceduresListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface ProceduresInfo {
  possibleProcedures: {
    id: string;
    title: string;
    created_at: string;
  }[],
  completedProcedures: string[];
}

export function ProceduresList({ date, onCompletedChanged }: ProceduresListProps) {
  const [proceduresInfo, setProceduresInfo] = useState<ProceduresInfo>();

  useEffect(() => {
    api.get('day', {
      params: {
        date: date.toISOString(),
      }
    }).then(response => {
      // console.log(response.data)
      setProceduresInfo(response.data);
    })
  }, [])

  async function handleToggleProcedure(procedureId: string) {
    await api.patch(`/procedures/${procedureId}/toggle`);

    const isProcedureAlreadyCompleted = proceduresInfo!.completedProcedures.includes(procedureId);

    let completedProcedures: string[] = [];

    if (isProcedureAlreadyCompleted) {
      completedProcedures = proceduresInfo!.completedProcedures.filter(id => id !== procedureId);
    } else {
      completedProcedures = [...proceduresInfo!.completedProcedures, procedureId]
    }

    setProceduresInfo({
      possibleProcedures: proceduresInfo!.possibleProcedures,
      completedProcedures
    })

    onCompletedChanged(completedProcedures.length);
  }

  const isDateInPast = dayjs(date)
    .endOf('day')
    .isBefore(new Date());

  return (
    <div className='mt-6 flex flex-col gap-3'>

      {proceduresInfo?.possibleProcedures.map(procedure => {

        return (
          <Checkbox.Root
            key={procedure.id}
            onCheckedChange={() => {
              handleToggleProcedure(procedure.id)
            }}
            checked={proceduresInfo.completedProcedures.includes(procedure.id)}
            disabled={isDateInPast}
            className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
          >
            <div className='h-8 w-8 rounded-lg flex items-center justify-center
               bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-teal-500
                group-data-[state=checked]:border-teal-500 transition-colors group-focus:ring-2
                group-focus:ring-teal-400 group-focus:ring-offset-2 group-focus:ring-offset-background'>
              <Checkbox.CheckboxIndicator>
                <Check size={20} className='text-white' />
              </Checkbox.CheckboxIndicator>
            </div>

            {/* <span className='font-semibold text-xl text-white leading-tight 
                group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
              {procedure.title}
            </span> */}

            <span className={clsx("font-semibold text-xl text-white leading-tight",
              "group-data-[state = checked]:line-through group-data-[state=checked]:text-zinc-400", {
              "text-zinc-400": isDateInPast
            })}
            >
              {procedure.title}
            </span>
          </Checkbox.Root>
        )
      })}

    </div >
  )
}


