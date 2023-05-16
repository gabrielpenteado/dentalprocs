import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import dayjs from 'dayjs';
import { prisma } from './lib/prisma';

export async function appRoutes(app: FastifyInstance) {
  app.post('/procedures', async (req) => {
    const createProcedureBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6))
    })

    const { title, weekDays } = createProcedureBody.parse(req.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.procedure.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    })
  })

  app.get('/day', async (req) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(req.query);

    const parsedDate = dayjs(date).startOf('day');
    const weekDay = parsedDate.get('day');

    const possibleProcedures = await prisma.procedure.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayProcedures: true,
      }
    })

    const completedProcedures = day?.dayProcedures.map(dayProcedure => {
      return dayProcedure.procedure_id;
    }) ?? []

    return {
      possibleProcedures,
      completedProcedures,
    }
  })

  // completed / not completed a procedure
  app.patch('/procedures/:id/toggle', async (req) => {
    const toggleProcedureParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = toggleProcedureParams.parse(req.params);

    const today = dayjs().startOf('day').toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        }
      })
    }

    const dayProcedure = await prisma.dayProcedure.findUnique({
      where: {
        day_id_procedure_id: {
          day_id: day.id,
          procedure_id: id,
        }
      }
    })

    if (dayProcedure) {
      await prisma.dayProcedure.delete({
        where: {
          id: dayProcedure.id,
        }
      })
    } else {
      await prisma.dayProcedure.create({
        data: {
          day_id: day.id,
          procedure_id: id,
        }
      })
    }

  })

  app.get('/summary', async () => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM
            day_procedures DP
          WHERE 
            DP.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM
            procedure_week_days PWD
          JOIN procedures P
            ON P.id = PWD.procedure_id
          WHERE
            PWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND P.created_at <= D.date
        ) as amount
      FROM 
        days D

    `

    return summary;
  })


  app.get('/chart', async () => {
    const chartAllProceduresCompleted = await prisma.$queryRaw`
      SELECT title, cast(COUNT (*) as float) AS total
      FROM day_procedures
      JOIN procedures
      ON day_procedures.procedure_id = procedures.id
      GROUP BY title;
    `
    return chartAllProceduresCompleted;
  })

}

