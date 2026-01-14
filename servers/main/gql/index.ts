import { GraphQLObjectType } from 'graphql';
import { UserGQL } from './userGQL';


export class QueryGQL extends GraphQLObjectType {
    constructor() {
        const users = new UserGQL()
        super({
            name: "Query",
            fields: {
                ...users.queries,
            }
        })
    }
}
export class MutationGQL extends GraphQLObjectType {
    constructor() {
        const users = new UserGQL()
        super({
            name: "Mutation",
            fields: {
                ...users.mutations
            }
        })
    }
}

