import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { ProcedureDay } from "./ProcedureDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimunSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimunSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
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
          return <ProcedureDay key={date.toString()} />
        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => {
          return (
            <div
              key={index}
              className="opacity-40 cursor-not-allowed"
            >
              <ProcedureDay />
            </div>
          )
        })}

      </div>

    </div>
  )
}