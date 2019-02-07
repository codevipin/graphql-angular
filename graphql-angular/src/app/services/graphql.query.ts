import gql from 'graphql-tag';

export const fetchAllUser = gql`
query{
	users {
		id
		firstName
		age
	}
}`;

export const fetchUser = gql`
{
	company(id: "2") {
		id
		name
		users {
			firstName
		}
	}
}
`
	
export const addUser = gql`
	mutation addUser($firstName: String!, $age:Int!){
		addUsers(firstName: $firstName, age: $age) {
			id
			firstName
		}
	}
`;