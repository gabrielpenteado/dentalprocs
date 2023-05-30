import { useEffect, useState } from "react";
import { api } from "../lib/axios";

import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { ProcedureDay } from "./ProcedureDay";

import { Tooth } from "@phosphor-icons/react";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimunSummaryDatesSize = 52 * 7 // 2418 weeks or 24 * 7 = 24 weeks
const amountOfDaysToFill = minimunSummaryDatesSize - summaryDates.length;
// console.log(amountOfDaysToFill);

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data);
    })
  }, []) // this empty array make the function inside the useEffect execute only one time(the first time that the component render)

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-rows-7 grid-flow-row gap-2 pt-3 pb-4">
        {weekDays.map((weekDay, index) => {
          return (
            <div
              key={`${weekDay}-${index}`}
              className="text-zinc-300 text-xl h-10 w-10 font-bold flex items-center justify-center">
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3 overflow-x-scroll scrollbar-thin
         scrollbar-thumb-teal-600 hover:scrollbar-thumb-teal-400 scrollbar-track-zinc-600
          scrollbar-thumb-rounded scrollbar-track-rounded pb-3 pt-3">
        {summary.length > 0 && summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <ProcedureDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />)

          // return (
          //   <ProcedureDay
          //     key={date.toString()}
          //     date={date}
          //     amount={4}
          //     defaultCompleted={Math.round(Math.random() * 4)}
          //   />
          // )
          // This return code is for populate all days and have a visual knowledge of the app.

        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => {
          return (

            <div key={index} className="cursor-not-allowed pointer-events-none">
              <Tooth
                alt="tooth icon"
                size="2.5rem"
                weight="duotone"
                color="#27272A"
              />
            </div>

            // <div
            //   key={index}
            //   className="opacity-40 cursor-not-allowed pointer-events-none"
            // >
            //   <ProcedureDay amount={0} completed={0} date={dayjs().format('MM/DD')} />
            // </div>
          )
        })}

      </div>

    </div>
  )
}