import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutPageComponent implements OnInit{

  public nombre_publico!: string;

  constructor(private authService: AuthService, private router: Router, private userService: UsuarioService){}

  ngOnInit(): void {
    this.nombre_publico = localStorage.getItem('nombre_publico')!;
  }

  public sidebarItems = [
    {label: 'Listado', icon: 'format_list_bulleted', url: 'list'},
    {label: 'Buscar', icon: 'search', url: 'search'},
    {label: 'Gestion de Usuarios', icon: 'groups', url: '/users'}
  ]

  salir() {
    this.authService.doLogout()
      .subscribe( response => {});
    this.router.navigate(['auth']);
  }




}
