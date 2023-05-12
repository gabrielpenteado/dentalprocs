import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';


const app = Fastify();

app.register(cors); // Possible to config to only some address have access to the back-end 
// "origin: 'http://endereço/rota'"

app.register(appRoutes);

app.listen({
  port: 3333,
  host: '0.0.0.0',
}).then((url) => {
  console.log(`Server running on ${url}`);
})