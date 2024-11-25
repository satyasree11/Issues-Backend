const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const emailSchema = require('./models/email');
const {ApolloServer}= require('@apollo/server');
const {expressMiddleware}=require('@apollo/server/express4');
const {typeDefs} = require('./schema/typeDefs');
const {resolvers}= require('./schema/resolvers');
const cors = require('cors');
require('dotenv').config();
const app= express();
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const startApolloServer = async () => {
 // const app = express();
  app.use(bodyParser.json());
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
   app.use('/graphql', expressMiddleware(server));
   const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
  });
};
startApolloServer();