import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit{

  public nombre_publico!: string;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.nombre_publico = localStorage.getItem('nombre_publico')!;
  }

  public sidebarItems = [
    {label: 'Buscar', icon: 'search', url: '/peliculas'},
    {label: 'Gestion de Usuarios', icon: 'groups', url: '/users'}
  ]

  salir() {
    this.authService.doLogout()
      .subscribe( response => {});
    this.router.navigate(['auth']);
  }



}
