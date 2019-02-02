// Here we define schema, we tell how exactly our data looks like
const graphql = require('graphql');
const _ =  require('lodash')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema

} = graphql;

const users = [
	{ id: '11', firstName: 'vipin', age: 28},
	{ id: '12', firstName: 'ritika', age: 26}
]

// Define type of data a use has
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt }
	}
})

// const Mutation = new GraphQLObjectType({
// 	name: 'Mutation',
// 	fields: {
// 		addUsers: {
// 			type: UserType,
// 			args: {
// 				id: { type: GraphQLString },
// 				firstName: { type: GraphQLString },
// 				age: { type: GraphQLInt }
// 			},
// 			resolve(parentValue, args) {
// 				return users.push(args)
// 			}
// 		}
// 	}
// })

// RootQuery is something that allow GraphQL to just to a graph of data,
// eg. give me a user wiht id of 23
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve:(parentValue, args) =>{
				return _.find(users, {id: args.id})
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})

