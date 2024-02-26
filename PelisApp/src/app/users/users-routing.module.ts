import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './users-page/users-page.component';
import { AddUsersComponent } from './users-page/add-users/add-users.component';
import { EditUsersComponent } from './users-page/edit-users/edit-users.component';
import { DeleteUsersComponent } from './users-page/delete-users/delete-users.component';

const routes: Routes = [

  {
    // localhost:4200/users/
    path: '',
    component: UsersPageComponent,
    children: [
      {path: '**', redirectTo: 'users'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
