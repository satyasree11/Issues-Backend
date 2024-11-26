const {gql} = require('graphql-tag');

const typeDefs = gql`
    type AddEmailResponse {
        success:Boolean
        message:String
        email:Email
    }
    type Email {
        id: ID!
        email: String!
        customProbelms:[String]
    }
    type incrementWaitlistRes {
        count:Int!
        success:Boolean!
        
    }
    type Mutation {
        addEmail(email:String!,customProbelms:[String!]): AddEmailResponse
        incrementWaitlist:incrementWaitlistRes!
    }
    type Query {
        getWaitlistCount: Int!
        getEmails:[Email]
    }

`;
module.exports= {typeDefs};