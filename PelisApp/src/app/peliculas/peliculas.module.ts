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
import { PeliPipe } from './pipes/pelicula-image.pipe';


@NgModule({
  declarations: [
    LayoutPageComponent,
    SearchPageComponent,
    PeliculaPageComponent,
    CardComponent,
    DetailCardComponent,
    PeliPipe
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PeliculasModule { }
