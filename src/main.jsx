import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Detecta se está em produção ou desenvolvimento
const GRAPHQL_URI = import.meta.env.PROD 
	? '/graphql'  // Produção (Vercel)
	: 'http://localhost:3001/graphql';  // Desenvolvimento (localhost)

const client = new ApolloClient({
	uri: GRAPHQL_URI,
	cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
