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

    const completeProcedures = day?.dayProcedures.map(dayProcedure => {
      return dayProcedure.procedure_id;
    })

    return {
      possibleProcedures,
      completeProcedures,
    }
  })
}

