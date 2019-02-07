// Here we define schema, we tell how exactly our data looks like
const graphql = require('graphql');
const _ =  require('lodash');
const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull

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

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUsers: {
			type: UserType,
			args: {
				firstName: { type: GraphQLNonNull(GraphQLString) },
				age: { type: GraphQLNonNull(GraphQLInt) },
				companyId: { type: GraphQLString }
			},
			resolve(parentValue, { firstName, age }) {
				return axios.post(`http://localhost:3000/users`, { firstName, age } )
					.then(resp => resp.data);
			}
		},
		deleteUser: {
			type: UserType,
			args: {
				userId: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, {userId}) {
				return axios.delete(`http://localhost:3000/users/${userId}`)
					.then(resp => resp.data);
			}
		},
		updateUser: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLString) },
				firstName: { type: GraphQLString },
				age: { type: GraphQLInt },
				companyId: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				return axios.patch(`http://localhost:3000/users/${args.id}`, args)
					.then(resp => resp.data);
			}
		}
	}
})


// RootQuery is something that allow GraphQL to just to a graph of data,
// eg. give me a user wiht id of 23
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		users: {
			type: new GraphQLList(UserType),
			resolve(parentValue, args) {
				return axios.get('http://localhost:3000/users/')
					.then((resp) => resp.data)
			}
		},
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
	query: RootQuery,
	mutation:Mutation
})

