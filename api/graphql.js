import { ApolloServer } from '@apollo/server';
import { startServerAndCreateHandler } from '@as-integrations/aws-lambda';
import gql from 'graphql-tag';

// Dados mockados em memória
let feedData = [
  {
    id: '1',
    user: { id: 1, name: 'Ana Silva Correia' },
    time: 1800,
    stats: { distance: '2 Km', calories: '300 Kcal', heartRate: '120 BPM' },
    category: 'corrida',
    description: 'Hoje fiz uma corrida matinal e olha foi ótima, bem melhor do que ontem',
    timestamp: '2025-01-15T07:30:00Z',
  },
  {
    id: '2',
    user: { id: 2, name: 'Carlos Mendes' },
    time: 2700,
    stats: { distance: '7.2 Km', calories: '450 Kcal', heartRate: '140 BPM' },
    category: 'corrida',
    description: 'Treino intervalado hoje! Consegui manter um ritmo bem legal durante todo o percurso',
    timestamp: '2025-01-15T18:45:00Z',
  },
  {
    id: '3',
    user: { id: 3, name: 'Marina Santos' },
    time: 1200,
    stats: { distance: '3.5 Km', calories: '250 Kcal', heartRate: '110 BPM' },
    category: 'caminhada',
    description: 'Corrida rápida no final do dia. Preciso melhorar a resistência, mas foi um bom treino!',
    timestamp: '2025-01-15T19:15:00Z',
  },
  {
    id: '4',
    user: { id: 4, name: 'João Lima' },
    time: 3600,
    stats: { distance: '10.0 Km', calories: '600 Kcal', heartRate: '150 BPM' },
    category: 'caminhada',
    description: 'Long run de domingo! Que sensação incrível completar os 10km.',
    timestamp: '2025-01-14T08:00:00Z',
  },
  {
    id: '5',
    user: { id: 5, name: 'Letícia Oliveira' },
    time: 2100,
    stats: { distance: '6.0 Km', calories: '380 Kcal', heartRate: '130 BPM' },
    category: 'caminhada',
    description: 'Primeiro treino da semana! Voltando ao ritmo depois do final de semana.',
    timestamp: '2025-01-13T06:30:00Z',
  },
  {
    id: '6',
    user: { id: 6, name: 'Rafael Costa' },
    time: 1500,
    stats: { distance: '4.2 Km', calories: '280 Kcal', heartRate: '115 BPM' },
    category: 'caminhada',
    description: 'Treino regenerativo hoje. Focando na recuperação mas mantendo o corpo em movimento',
    timestamp: '2025-01-13T17:20:00Z',
  },
];

// Schema GraphQL
const typeDefs = gql`
  type User {
    id: Int!
    name: String!
  }

  type Stats {
    distance: String!
    calories: String!
    heartRate: String!
  }

  type Feed {
    id: ID!
    user: User!
    time: Int!
    stats: Stats!
    category: String!
    description: String!
    timestamp: String!
  }

  type Query {
    allFeeds(filter: FilterInput): [Feed!]!
    Feed(id: ID!): Feed
  }

  input FilterInput {
    category: String
  }

  input UserInput {
    id: Int!
    name: String!
  }

  input StatsInput {
    distance: String!
    calories: String!
    heartRate: String!
  }

  type Mutation {
    createFeed(
      user: UserInput!
      time: Int!
      stats: StatsInput!
      category: String!
      description: String!
      timestamp: String!
    ): Feed!
    
    deleteFeed(id: ID!): Feed
  }
`;

// Resolvers
const resolvers = {
  Query: {
    allFeeds: (_, { filter }) => {
      if (filter?.category) {
        return feedData.filter(feed => feed.category === filter.category);
      }
      return feedData;
    },
    Feed: (_, { id }) => {
      return feedData.find(feed => feed.id === id);
    },
  },
  Mutation: {
    createFeed: (_, args) => {
      const newFeed = {
        id: String(feedData.length + 1),
        user: args.user,
        time: args.time,
        stats: args.stats,
        category: args.category,
        description: args.description,
        timestamp: args.timestamp,
      };
      feedData.push(newFeed);
      return newFeed;
    },
    deleteFeed: (_, { id }) => {
      const index = feedData.findIndex(feed => feed.id === id);
      if (index === -1) return null;
      const deleted = feedData[index];
      feedData.splice(index, 1);
      return deleted;
    },
  },
};

// Criar servidor Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Handler para Vercel (compatível com AWS Lambda)
const handler = startServerAndCreateHandler(server);

export default async function (req, res) {
  // Converter Request/Response do Vercel para formato Lambda
  const event = {
    httpMethod: req.method,
    headers: req.headers,
    body: JSON.stringify(req.body),
    path: req.url,
  };

  const context = {};

  const result = await handler(event, context);

  res.status(result.statusCode);
  Object.keys(result.headers || {}).forEach(key => {
    res.setHeader(key, result.headers[key]);
  });
  res.send(result.body);
}
