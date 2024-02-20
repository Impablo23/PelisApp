import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './pages/error404/error404.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
