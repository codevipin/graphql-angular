import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  usersQuery = gql`
  {
		company(id: "2") {
			id
			name
			users {
				firstName
			}
		}
	}
  `;
  constructor( private apollo: Apollo) { }


  getUsers() {
  	this.apollo.watchQuery({
  		query: this.usersQuery
  	})
  	.valueChanges.subscribe(result => console.log(result))
  	// return "List of users";
  }
}
