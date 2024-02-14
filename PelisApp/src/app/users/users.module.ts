import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './users-page/users-page.component';
import { AddUsersComponent } from './users-page/add-users/add-users.component';
import { EditUsersComponent } from './users-page/edit-users/edit-users.component';
import { DeleteUsersComponent } from './users-page/delete-users/delete-users.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersPageComponent,
    AddUsersComponent,
    EditUsersComponent,
    DeleteUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
