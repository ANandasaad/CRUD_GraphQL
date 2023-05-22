 import {ApolloServer} from '@apollo/server';
 import { startStandaloneServer } from '@apollo/server/standalone';
 import typeDefs from './schema/type-defs.js';
 import resolvers from './schema/resolvers.js';

import mongoose from 'mongoose';

import { MONGO_URL } from './config.js';



 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    
});

mongoose.connect(MONGO_URL,{useNewUrlParser:true}).then(()=>{
    console.log("Mongodb connection successful");
    return  startStandaloneServer(server,{
      listen:{
        port:5000
      }
    })
}).then((res)=>{
    console.log(`Server runninh at ${res.url}`);
})

// const { url } = await startStandaloneServer(server);
// console.log(`🚀 Server ready at ${url}`);