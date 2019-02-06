import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-graphql-actions',
  templateUrl: './graphql-actions.component.html',
  styleUrls: ['./graphql-actions.component.scss']
})
export class GraphqlActionsComponent implements OnInit {

  constructor(private graphQLService: GraphqlService) { }

  ngOnInit() {
  }

  fetchUsers() {
  	console.log("fetch graphQL users")
  	this.graphQLService.getUsers()

  }

}
