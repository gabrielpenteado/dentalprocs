import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { ProcedureDay } from "./ProcedureDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

console.log(summaryDates)

export function SummaryTable() {
  return (
    <div className="w-full flex">
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
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />
        <ProcedureDay />

      </div>

    </div>
  )
}