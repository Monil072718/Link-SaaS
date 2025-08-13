import { createYoga, createSchema } from 'graphql-yoga';
import { gql } from 'graphql-tag';
import { supabase } from '../../lib/supabaseClient'; // adjust path if needed

// GraphQL Schema
const typeDefs = gql`
  type Link {
    id: ID!
    title: String!
    url: String!
  }

  type Query {
    links: [Link!]!
  }

  type Mutation {
    addLink(title: String!, url: String!): Link!
  }
`;

const resolvers = {
  Query: {
    links: async () => {
      const { data, error } = await supabase.from('links').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  },
  Mutation: {
    addLink: async (_: any, { title, url }: any) => {
      const { data, error } = await supabase
        .from('links')
        .insert([{ title, url }])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  },
};

// Export Yoga handler for Next.js
export default createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: '/api/graphql', // optional
});

// Disable Next.js body parser (needed for Yoga)
export const config = {
  api: {
    bodyParser: false,
  },
};
