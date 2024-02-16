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
    this.popularFilms(this.contador);
  }

  contador: number = 1;
  public peliculasPopulares: Result[] = [];

  popularFilms(pageNumber: number) {
    this.peliculasService.getPopularFilms(pageNumber).subscribe(
      (root) => {
        this.peliculasPopulares = root.results.filter(result => result.poster_path !== null && result.poster_path !== '');
        console.log(this.peliculasPopulares);
      }
    )
  }

  siguientePagina() {
    this.contador += 1;
    this.popularFilms(this.contador);
  }

  anteriorPagina() {
    if (this.contador > 1) {
      this.contador -= 1;
      this.popularFilms(this.contador);
    }
  }

}
