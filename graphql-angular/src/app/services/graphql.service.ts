import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

import { fetchAllUser, fetchUser, addUser } from '../services/graphql.query';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  public querySubscription: Subscription;
  constructor( private apollo: Apollo) { }

  getUsers() {
  	return this.apollo.watchQuery({
  		query: fetchAllUser
  	})
  }

  addUser() {
  	return this.apollo.mutate({
  		mutation: addUser,
  		refetchQueries: [{query:fetchAllUser}]
  	})
  }
}
