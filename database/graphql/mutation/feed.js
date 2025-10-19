import { gql } from '@apollo/client';

// schema de dados para a mutation de adicionar post no feed
export const ADD_FEED_POST = gql`
	mutation AddFeedPost(
		$user: JSON!
		$time: Int!
		$stats: JSON!
		$category: String!
		$description: String!
		$timestamp: String!
	) {
		createFeed(
			user: $user
			time: $time
			stats: $stats
			category: $category
			description: $description
			timestamp: $timestamp
		) {
			id
			user
			time
			stats
			category
			description
			timestamp
		}
	}
`;

export const DELETE_FEED_POST = gql`
	mutation DeleteFeedPost($id: ID!) {
		deleteFeed(id: $id) {
			id
		}
	}
`;