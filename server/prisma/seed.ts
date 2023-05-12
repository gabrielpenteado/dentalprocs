import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const firstProcedureId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstProcedureCreationDate = new Date('2023-01-02T03:00:00.000')

const secondProcedureId = '00880d75-a933-4fef-94ab-e05744435297'
const secondProcedureCreationDate = new Date('2023-01-02T03:00:00.000')

const thirdProcedureId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdProcedureCreationDate = new Date('2023-01-02T03:00:00.000')

const fourthProcedureId = '7376a39c-f050-11ed-a05b-0242ac120003'
const fourthProcedureCreationDate = new Date('2023-01-02T03:00:00.000')

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
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
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
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
          ]
        }
      }
    }),

    prisma.procedure.create({
      data: {
        id: thirdProcedureId,
        title: 'Root Canals',
        created_at: thirdProcedureCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
          ]
        }
      }
    }),

    prisma.procedure.create({
      data: {
        id: fourthProcedureId,
        title: 'Implants',
        created_at: fourthProcedureCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
          ]
        }
      }
    })

  ])


  await Promise.all([
    /**
     * Procedures (Completed/Available): 1/4
     */
    prisma.day.create({
      data: {
        /** Tuesday */
        date: new Date('2023-01-03T03:00:00.000z'),
        dayProcedures: {
          create: {
            procedure_id: firstProcedureId,
          }
        }
      }
    }),

    /**
     * Procedures (Completed/Available): 2/4
     */
    prisma.day.create({
      data: {
        /** Wednesday */
        date: new Date('2023-01-04T03:00:00.000z'),
        dayProcedures: {
          create: [
            { procedure_id: firstProcedureId },
            { procedure_id: secondProcedureId },
          ]
        }
      }
    }),

    /**
     * Procedures (Completed/Available): 3/4
     */
    prisma.day.create({
      data: {
        /** Thursday */
        date: new Date('2023-01-05T03:00:00.000z'),
        dayProcedures: {
          create: [
            { procedure_id: firstProcedureId },
            { procedure_id: secondProcedureId },
            { procedure_id: thirdProcedureId },
          ]
        }
      }
    }),

    /**
     * Procedures (Completed/Available): 4/4
     */
    prisma.day.create({
      data: {
        /** Thursday */
        date: new Date('2023-01-06T03:00:00.000z'),
        dayProcedures: {
          create: [
            { procedure_id: firstProcedureId },
            { procedure_id: secondProcedureId },
            { procedure_id: thirdProcedureId },
            { procedure_id: fourthProcedureId },
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