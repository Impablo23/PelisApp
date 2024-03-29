import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { PeliculaPageComponent } from './pages/pelicula-page/pelicula-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { UsersPageComponent } from '../users/users-page/users-page.component';
import { FavouriteListPageComponent } from './pages/favourite-list-page/favourite-list-page.component';



const routes: Routes = [

  {
    // localhost:4200/peliculas/
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'search', component: SearchPageComponent},
      {path: 'list', component: ListPageComponent},
      {path: 'favourite-list', component: FavouriteListPageComponent},
      {path: ':id', component: PeliculaPageComponent},
      {path: '**', redirectTo: 'list'},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
