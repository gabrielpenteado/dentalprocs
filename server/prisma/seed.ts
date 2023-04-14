import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstProcedureId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstProcedureCreationDate = new Date('2022-12-31T03:00:00.000')

const secondProcedureId = '00880d75-a933-4fef-94ab-e05744435297'
const secondProcedureCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdProcedureId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdProcedureCreationDate = new Date('2023-01-08T03:00:00.000')

async function run() {
  await prisma.procedure.deleteMany()
  await prisma.day.deleteMany()

  /**
   * Create procedures
   */
  await Promise.all([
    prisma.procedure.create({
      data: {
        id: firstProcedureId,
        title: 'Extractions',
        created_at: firstProcedureCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
          ]
        }
      }
    }),

    prisma.procedure.create({
      data: {
        id: secondProcedureId,
        title: 'Fillings',
        created_at: secondProcedureCreationDate,
        weekDays: {
          create: [
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ]
        }
      }
    }),

    prisma.procedure.create({
      data: {
        id: thirdProcedureId,
        title: 'Root Canal',
        created_at: thirdProcedureCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ]
        }
      }
    })
  ])

  await Promise.all([
    /**
     * Procedures (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Monday */
        date: new Date('2023-01-02T03:00:00.000z'),
        DayProcedures: {
          create: {
            procedure_id: firstProcedureId,
          }
        }
      }
    }),

    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Friday */
        date: new Date('2023-01-06T03:00:00.000z'),
        DayProcedures: {
          create: {
            procedure_id: firstProcedureId,
          }
        }
      }
    }),

    /**
     * Procedures (Complete/Available): 2/2
     */
    prisma.day.create({
      data: {
        /** Wednesday */
        date: new Date('2023-01-04T03:00:00.000z'),
        DayProcedures: {
          create: [
            { procedure_id: firstProcedureId },
            { procedure_id: secondProcedureId },
          ]
        }
      }
    }),
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })