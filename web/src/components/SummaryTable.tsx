import { useEffect, useState } from "react";
import { api } from "../lib/axios";

import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { ProcedureDay } from "./ProcedureDay";

import { Tooth } from "@phosphor-icons/react";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimunSummaryDatesSize = 21 * 7 // 21 weeks or 18 * 7 = 18 weeks
const amountOfDaysToFill = minimunSummaryDatesSize - summaryDates.length;
console.log(amountOfDaysToFill);

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
      <div className="grid grid-rows-7 grid-flow-row gap-3">
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

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <ProcedureDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />)

          // return (
          //   <ProcedureDay
          //     key={date.toString()}
          //     date={date}
          //     amount={5}
          //     completed={Math.round(Math.random() * 5)}
          //   />
          // )
          // This return code is for populate all days and have a visual knowledge of the app.

        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => {
          return (

            <div className="cursor-not-allowed pointer-events-none">
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