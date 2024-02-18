import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors'
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers/';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config';

async function startServer() {
    const app = express();
    app.use(cors());

    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app }); // Connect Apollo Server to Express

    app.listen(4000, () => console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`));

    await connectDB(); 
}

startServer();
