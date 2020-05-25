// Require the framework and instantiate it
const path = require('path');

const fastify = require('fastify')({
  logger: true
})
const AutoLoad = require('fastify-autoload')

// fastify.register(require('fastify-jwt'), {
//   secret: 'supersecret'
// })
fastify.register(require('fastify-cors'), { 
  origin: true,
  methods: ['GET', 'PUT', 'POST','OPTIONS']

})

fastify.register(require('fastify-mysql'), {
  host: '162.241.203.10',
  user: 'treeau37_licence',
  password: 'Marlon@040826',
  database: 'treeau37_licence',
  connectionLimit: 5,
});

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: { prefix: '/v1' }
})

/*fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes/products'),
  options: { prefix: '/v1' }
})*/

// Run the server!



const start = async () => {
  try {      
    await fastify.listen(process.env.PORT || 3000,'0.0.0.0');
  
    
    fastify.log.info(`server listening on 127.0.0.1`)


  } catch (err) {
      fastify.log.error(err)
      process.exit(1)
  }
}
start()
