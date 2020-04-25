// Required before tests are run
console.log('Setting up the tests')

// Use dirty-chai plugin
const initMongo = require('../initMongo')
const chai = require('chai')

chai.use(require('dirty-chai'))

// Connect to mongo
initMongo()

// TODO(carter): Import Pre-compiled Test DB and/or bootstrap!
