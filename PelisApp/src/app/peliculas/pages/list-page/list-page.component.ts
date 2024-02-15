import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/result.interface';
import { PeliculaService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  constructor(private peliculasService : PeliculaService){}

  ngOnInit(): void {
    this.popularFilms();
  }

  ngOnSubmit(): void {
    this.popularFilms();
  }

  contador: number = 1;

  public peliculasPopulares: Result[] = this.peliculasService.listadoMovies;

  popularFilms() {
    this.peliculasService.getPopularFilms(this.contador).subscribe(
      (root) => {
        this.peliculasService.listadoMovies = root.results;
        this.peliculasPopulares= this.peliculasService.listadoMovies.filter(result => result.poster_path !== null && result.poster_path !== '');
      }
    )
  }

  siguientePagina() {
    this.contador += 1;
    this.popularFilms();
  }

  anteriorPagina() {
    this.contador -= 1;
    this.popularFilms();
  }

}
