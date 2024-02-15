
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/pages/error404/error404.component';
import { canActivateGuard, canMatchGuard } from './guards/auth.guard';
import { cantActivateGuard, cantMatchGuard } from './guards/public.guard';


const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canMatch: [cantMatchGuard], //Anclamos la función del canMatch
    // canActivate: [cantActivateGuard]
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./peliculas/peliculas.module').then(m => m.PeliculasModule),
    // canMatch: [canMatchGuard], //Anclamos la función del canMatch
    // canActivate: [canActivateGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    // canActivate: [canActivateGuard]
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
