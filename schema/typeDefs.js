const {gql} = require('graphql-tag');

const typeDefs = gql`
    type AddEmailResponse {
        success:Boolean
        message:String
    }
    type Email {
        id: ID!
        email: String!
    }
    type incrementWaitlistRes {
        count:Int!
        success:Boolean!
    }
    type Mutation {
        addEmail(email:String!): AddEmailResponse
        incrementWaitlist:incrementWaitlistRes!
    }
    type Query {
        getWaitlistCount: Int!
        getEmails:[Email]
    }

`;
module.exports= {typeDefs};