import { createServer, Factory, Model } from 'miragejs'
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
      server.createList('user', 10) // criar 10 usuarios
    },

    routes() {

      this.namespace = 'api'; // a rota para acessar será /api/users
      this.timing = 750; // toda requisição feita ao mirage irá demorar 750 milisegundos

      this.get('/users');
      this.post('/users');

      this.namespace = ''; // reseta o namespace para nao prejudicar caso haja pasta api no next
      this.passthrough()
    }
  })

  return server;
}