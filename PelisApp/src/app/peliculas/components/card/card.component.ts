import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/interfaces/result.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  constructor(private router: Router){}

  @Input()
  public pelicula!: Result;

  ngOnInit(): void {
    if (!this.pelicula) throw new Error('Film is required');
  }

  navigateToMovie(movieId: number) {
    this.router.navigate(['./peliculas', movieId]);
  }

}
