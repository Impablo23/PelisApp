import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsFilm, Genre } from 'src/app/interfaces/detailsFilm';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css']
})
export class DetailCardComponent {

  constructor(private router: Router){}

  @Input()
  public datosPelicula!: DetailsFilm;
  public generos! : Genre;
  public informacion : string = '';

  ngOnInit(): void {

  }

  navigateToSearch() {
    this.router.navigate(['./peliculas']);
  }

  // Método que me devuelve la descripcion de la pelicula más pequeña para que no me de error en el html y no se muestren todos los datos bien
  obtenerInfoPelicula(texto: string): string {
    const partes = texto.split('.');
    if (partes.length >= 2) {
        this.informacion = partes[0] + ' ' + partes[1];
    } else {
        this.informacion = texto; // Si no hay dos partes, simplemente muestra el texto completo
    }

    if (texto.length === 0) {
      return 'En estos momentos no podemos mostrar la descripción de la pelicula debido a que estamos arreglando el servidor';
    }

    return this.informacion;

  }

  //Metodo para controlar de que si no tiene fondo que le aplique el mismo que de la imagen de portada
  controlarErrorFondo(texto: string): string {

    if (this.datosPelicula.backdrop_path==='' || this.datosPelicula.backdrop_path===null) {
      return this.datosPelicula.poster_path;
    }
    return this.datosPelicula.backdrop_path;

  }

}
