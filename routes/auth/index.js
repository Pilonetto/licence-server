const schemas = require('../../schemas/auth')

module.exports = function (fastify, opts, next) {
    fastify.addHook("onRequest", async (request, reply) => {
        try {
            console.log(request.raw.originalUrl);

            if (request.raw.originalUrl == '/v1/auth/token') {
                console.log('Wait autenthication');
            } else if (request.raw.originalUrl == '/v1/auth/apptoken'){
                console.log('Wait autenthication too');
            } else {
               await request.jwtVerify();
            }
        } catch (err) {
            reply.send(err)
        }
    });

    fastify.post('/auth/token', { schema: schemas.token }, async function (request, reply) {
        const { secret } = request.body

        console.log(request.body);        
        fastify.mysql.query('SELECT `email`,`senha` FROM `usuarios` WHERE `status` = 10 and `id` = ?',[secret], (err, result) => {
            console.log(err || result)

            console.log(result.length)            

            if (result.length == 0) {
                reply.status(401).send({ message: 'Invalid secret key'})
            } else {
                const token = fastify.jwt.sign(
                    { sub: result[0].email },
                    { expiresIn: '1h' }
                )
                reply.send({ token })
            }
        })
    })

    fastify.post('/auth/apptoken', { schema: schemas.appauth }, async function (request, reply) {
        const { username } = request.body
        const { password } = request.body

        console.log(request.body);        
        fastify.mysql.query('SELECT `email`,`senha` FROM `usuarios` WHERE `email` = ? and `senha` = ?',[username, password], (err, result) => {
            console.log(err || result)

            console.log(result.length)            

            if (result.length == 0) {
                reply.status(401).send({ message: 'Invalid secret key'})
            } else {
                const token = fastify.jwt.sign(
                    { sub: result[0].email },
                    { expiresIn: '8h' }
                )
                reply.send({ token })
            }
        })
    })

    
    next()
}
