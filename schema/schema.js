// Here we define schema, we tell how exactly our data looks like
const graphql = require('graphql');
const _ =  require('lodash');
const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList

} = graphql;

// const users = [
// 	{ id: '11', firstName: 'vipin', age: 28},
// 	{ id: '12', firstName: 'ritika', age: 26}
// ]
// 

const CompanyType = new GraphQLObjectType({
	name: 'company',
	fields: ()=> ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		desc: { type:GraphQLString },
		users: {
			type: new GraphQLList(UserType),
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
					.then(resp => resp.data);
			}
		}
	})
})

// Define type of data a user has
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: ()=> ({
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: {
			type: CompanyType,
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(resp => resp.data);
			}
		}
	})
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
				return axios.get(`http://localhost:3000/users/${args.id}`)
				.then((resp) => resp.data)

			}
		},
		company: {
			type: CompanyType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${args.id}`)
				.then((resp) => resp.data)
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})

