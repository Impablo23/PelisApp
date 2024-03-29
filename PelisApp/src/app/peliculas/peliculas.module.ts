import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { MaterialModule } from '../material/material.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { PeliculaPageComponent } from './pages/pelicula-page/pelicula-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { DetailCardComponent } from './components/detail-card/detail-card.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersPageComponent } from '../users/users-page/users-page.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FavouriteListPageComponent } from './pages/favourite-list-page/favourite-list-page.component';




@NgModule({
  declarations: [
    LayoutPageComponent,
    SearchPageComponent,
    PeliculaPageComponent,
    CardComponent,
    DetailCardComponent,
    ListPageComponent,
    DialogComponent,
    FavouriteListPageComponent,


  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatExpansionModule
  ]
})
export class PeliculasModule { }
