import { gql } from "@apollo/client";

// criando uma query GraphQL e definindo nome GetFeed e variavel GET_FEED
export const GET_FEED = gql`
  query GetFeed {
    allFeeds {
      id
      user
      time
      stats
      description
    }
  }
`;

export const GET_FEED_BY_CATEGORY = gql`
	query GetFeedByCategory($category: String) {
		allFeeds(filter: { category: $category }) {
			id
			user
			time
			stats
			description
		}
	}
`;