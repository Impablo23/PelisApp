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
  public generos! : Genre

  ngOnInit(): void {
    if (!this.datosPelicula) throw new Error('Film is required');
  }

  navigateToSearch() {
    this.router.navigate(['./peliculas']);
  }

}
