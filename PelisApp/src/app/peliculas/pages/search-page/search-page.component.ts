import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Result } from 'src/app/interfaces/result.interface';
import { PeliculaService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  public searchForm: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });

  public peliculas: Result[] = this.peliculasService.listadoMovies


  constructor(private peliculasService: PeliculaService, private snackbar: MatSnackBar){}


  public searchPelicula(){
    const valor: string = this.searchForm.get('searchInput')!.value;
    if (!valor.trim()) {
      return; // No realizar la búsqueda si el término está vacío
    }

    this.peliculasService.listadoMovies= [];

    this.loadMovies();



  }

  private loadMovies() {
    const busqueda = this.searchForm.get('searchInput')!.value;

    this.peliculasService.getFilmByName(busqueda).subscribe(
      (respuesta) => {
        this.peliculasService.listadoMovies = respuesta.results;
        this.peliculas= this.peliculasService.listadoMovies.filter(result => result.poster_path !== null && result.poster_path !== '');
        console.log(this.peliculasService.listadoMovies)
        if(this.peliculasService.listadoMovies.length === 0) {
          this.snackbar.open("No se han encontrado resultados de "+busqueda, "Cerrar",{duration: 2000,panelClass:['background']})
        }
      },
      (error) => {
        console.error('Error en la solicitud HTTP:', error);
      }
      );
}

}
