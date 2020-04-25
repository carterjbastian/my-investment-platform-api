# Carter's Base Node server

## Includes

Set up ready to go with:

- Express routes set up
- Basic libraries (lodash, bluebird, request-promise, etc.) installed
- HTTP request Logging (morgan)
- Linting & Prettier
- MongoDB & Mongoose set up and ready to use
- Scripting abilities

## Set up

```
cd newRepo/

# Pull it in
git init
git remote add base https://github.com/carterjbastian/server-starter.git
git pull base master
git remote remove base

# Change DB_NAME in initMongo.js to use a new local db name
# Set it up
npm install
mongod &
npm run dev

# Test your deb connection
node src/scripts/addMetadata.js # Then hit /api/metadata to verify
```
