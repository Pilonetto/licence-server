const schemas = require('../../schemas/auth')

module.exports = function (fastify, opts, next) {

    fastify.post('/log/save', { schema: schemas.log }, async function (request, reply) {
        console.log(request.body);  
        const { message } = request.body
        const { deviceid } = request.body
        fastify.mysql.query('INSERT INTO tbl_logs (`device`, `message`) VALUES (?,?)',[deviceid,message], (err, result) => {
            console.log(err || result)
            if (err){
                reply.status(401).send({ message: 'Falha'})
            } else {
                reply.send({ message: 'Log salvo'})
            }            
        })
    })
    fastify.get('/licence/check', async function (request, reply) {
        let id = request.query.id
        let chave = request.query.token
        console.log(chave)
        fastify.mysql.query('SELECT * FROM `licencas` WHERE `token` = ? AND ativo = 1',[chave], (err, result) => {
            console.log(err || result)
            if (err){
                reply.status(401).send({ message: 'Erro interno'})
            } else {
                if(result.length > 0){
                    reply.status(200).send({ message: 'Empresa Licenciada', cnpj: result[0].cnpj})
                } else {
                    reply.status(401).send({ message: 'Falha'})
                }
            }            
        })
    })        
    next()
}
