import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { QueryGQL, MutationGQL } from '@/gql';
import { safeJsonParse } from '@/helpers';


const schema = new GraphQLSchema({
    query: new QueryGQL(),
    mutation: new MutationGQL()
})

const server = new ApolloServer({ schema });

server.requestOptions.formatError = (error) => {    
    return {        
        message: `${error.name} on ${error.path[0]}`,
        data: safeJsonParse(error.toJSON().message),
    }
}

server.listen({ port: 3000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});