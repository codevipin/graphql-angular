import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-graphql-actions',
  templateUrl: './graphql-actions.component.html',
  styleUrls: ['./graphql-actions.component.scss']
})
export class GraphqlActionsComponent implements OnInit, OnDestroy {
  
  private querySubscription: Subscription;
  private addUserSubs: Subscription;
  loading:boolean = false;
  data:any = [];

  constructor(private graphQLService: GraphqlService) { }

  ngOnInit() {
  	this.querySubscription = this.graphQLService.getUsers()
  	.valueChanges.subscribe(
  		({data, loading}) => {
  			console.log(data)
  			this.loading = loading;
  			this.data = data;
  		}
  	)
  }

  addUser(userForm) {
  	this.addUserSubs = this.graphQLService.addUser(userForm.value).subscribe(result => console.log(result))

  }

  ngOnDestroy() {
  	this.querySubscription.unsubscribe();
  }

}
