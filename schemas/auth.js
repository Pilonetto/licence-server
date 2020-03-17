const log = {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    },
    body: {
      type: 'object',
      properties: {        
        message: { type: 'string', minLength: 1 },
        deviceid: { type: 'string', minLength: 1 },
      }
      
    }
  }

  const appauth = {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    },
    body: {
      type: 'object',
      properties: {        
        username: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 1 } 
      },      
      required: ['username']
    }
  }
  
  

  module.exports = { log , appauth}