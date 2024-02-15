import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from './services/usuario.service';
import { PeliculasFavoritasService } from './services/peliculas-favoritas.service';
import { PeliculaService } from './services/peliculas.service';
import { PeliculaFavorita } from './interfaces/peliculaFavorita.interface';
import { DetailsFilm } from './interfaces/detailsFilm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PelisApp';

}
