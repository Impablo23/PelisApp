import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label: 'Buscar', icon: 'search', url: './search'},
    {label: 'Gestion de Usuarios', icon: 'groups', url: './'}
  ]

}
