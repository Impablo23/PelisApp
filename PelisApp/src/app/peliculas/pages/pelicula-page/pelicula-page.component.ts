import { Component, OnInit } from '@angular/core';
import { DetailsFilm } from '../../../interfaces/detailsFilm';
import { PeliculaService } from 'src/app/services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-pelicula-page',
  templateUrl: './pelicula-page.component.html',
  styleUrls: ['./pelicula-page.component.css']
})
export class PeliculaPageComponent implements OnInit {

  public datos! : DetailsFilm;

  constructor(
    private peliculasService: PeliculaService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ){}

  goToSearch() : void {
    this.router.navigate(['./peliculas']);
  }

  ngOnInit() : void {

    const id = this.activateRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.peliculasService.getFilmById(id).subscribe(
      (respuesta) => {
        if (!respuesta) return this.router.navigate(['./peliculas']);

        this.datos = respuesta;

        return;
      });
    }
  }
}


