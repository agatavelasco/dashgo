import { createServer, Factory, Model, Response } from 'miragejs'
import faker from 'faker'

type User = { //como se User fosse a tabela e as colunas: name, email, created_at
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return  `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        }
      })
    },

    seeds(server) {
      server.createList('user', 200) // criar 10 usuarios
    },

    routes() {

      this.namespace = 'api'; // a rota para acessar será /api/users
      this.timing = 750; // toda requisição feita ao mirage irá demorar 750 milisegundos

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) -1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )
      });

      this.get('/users/:id');
      this.post('/users');

      this.namespace = ''; // reseta o namespace para nao prejudicar caso haja pasta api no next
      this.passthrough()
    }
  })

  return server;
}