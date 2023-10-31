// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Query {
			users: [User]
			user(id: ID!): User
		}
		# type Mutation {
		# 	# addUser(name: String!, surname: String!, created_at: Timestamp): User
		# 	# deleteUser(id: ID!): User
		# 	# updateUser(id: ID!, name: String!, surname: String!): User
		# }
		type User {
			id: ID
			name: String
			email: String
            password: String
            token: String
		}
`;

export { typeDefs };