import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PelisApp';

  public sidebarItems = [
    {label: 'Buscar', icon: 'search', url: '/peliculas'},
    {label: 'Gestion de Usuarios', icon: 'groups', url: '/users'}
  ]
}
