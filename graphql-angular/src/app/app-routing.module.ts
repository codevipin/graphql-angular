import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphqlActionsComponent } from './graphql-actions/graphql-actions.component';

const routes: Routes = [
	{path: '', component: GraphqlActionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
