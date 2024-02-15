import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Permises } from 'src/app/interfaces/api-response.interface';
import { DetailsFilm } from 'src/app/interfaces/detailsFilm';
import { PeliculaFavorita } from 'src/app/interfaces/peliculaFavorita.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PeliculasFavoritasService } from 'src/app/services/peliculas-favoritas.service';
import { PeliculaService } from 'src/app/services/peliculas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutPageComponent implements OnInit{



  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsuarioService,
    private pelisFavService: PeliculasFavoritasService,
    private peliculasService: PeliculaService
  ){}

  public nombre_publico!: string;
  public id_rol!:string;
  public idUserNow : string | null = localStorage.getItem('id_usuario');
  public token: string = localStorage.getItem('token')!;

  public listadoPeliculasFavoritas: PeliculaFavorita[] = [];
  public listadoDatosPeliculasFavoritas: DetailsFilm[] = [];

  ngOnInit(): void {
    this.nombre_publico = localStorage.getItem('nombre_publico')!;
    this.id_rol = localStorage.getItem('id_rol')!;
    this.getPeliculasFavoritas();
    // console.log(this.listadoDatosPeliculasFavoritas);

  }

  public sidebarItems = [
    {label: 'Listado', icon: 'format_list_bulleted', url: 'list'},
    {label: 'Buscar', icon: 'search', url: 'search'}
  ]

  public adminItems = [
    {label: 'Gestion de Usuarios', icon: 'groups', url: '/users'}
  ]

  salir() {
    // localStorage.clear();
    this.authService.doLogout()
      .subscribe( response => {});
    this.router.navigate(['auth']);
  }

  async getPeliculasFavoritas() {
    const RESPONSE = await this.pelisFavService.getAllPeliculasFavoritas(parseInt(this.idUserNow!,10)).toPromise();
    const RESPNOUNDEFINED = RESPONSE!
    if (RESPNOUNDEFINED.ok) {
      this.listadoPeliculasFavoritas = RESPNOUNDEFINED.data as PeliculaFavorita[];
      // console.log(this.listadoPeliculasFavoritas)
      this.conseguirDatosPeliculas(this.listadoPeliculasFavoritas);
    }
  }

  async conseguirDatosPeliculas(listadoPeliculasFavoritas: PeliculaFavorita[]) {

    for (let i = 0; i < listadoPeliculasFavoritas.length; i++) {
      // console.log(listadoPeliculasFavoritas[i].id_pelicula.toString())
      // console.log(listadoPeliculasFavoritas)

      this.peliculasService.getFilmById(listadoPeliculasFavoritas[i].id_pelicula.toString()).subscribe(
        (respuesta) => {
          const pelicula : DetailsFilm = respuesta
          // console.log(pelicula);
          this.listadoDatosPeliculasFavoritas?.push(pelicula);
          // console.log(this.listadoDatosPeliculasFavoritas);
          return;
        });
    }
  }



}
