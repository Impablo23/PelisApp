import { PeliculaFavorita } from './../../../interfaces/peliculaFavorita.interface';
import { PeliculasFavoritasService } from './../../../services/peliculas-favoritas.service';
import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DetailsFilm, Genre } from 'src/app/interfaces/detailsFilm';
import { CLOSE } from 'src/app/shared/messages';
import { DialogComponent } from '../dialog/dialog.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})
export class DetailCardComponent {

  constructor(
    private router: Router,
    private peliService: PeliculasFavoritasService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private overlay: Overlay,
  ){}

  @Input()
  public datosPelicula!: DetailsFilm;
  public generos! : Genre;
  public informacion : string = '';
  public idUserNow : string | null = localStorage.getItem('id_usuario');
  // public idPelicula : number | null = this.datosPelicula.id
  detallesPeliculaFavoritaForm!: FormGroup;



  ngOnInit(): void {

  }

  navigateToSearch() {
    this.router.navigate(['./peliculas']);
  }

  // Método que me devuelve la descripcion de la pelicula más pequeña para que no me de error en el html y no se muestren todos los datos bien
  obtenerInfoPelicula(texto: string): string {
    const partes = texto.split('.');
    if (partes.length >= 2) {
        this.informacion = partes[0] + ' ' + partes[1] + ' ' + partes[2];
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

  async confirmAdd( id : number | null) {
    const peliculaFavorita : PeliculaFavorita = {
      id_pelicula: id!,
      id_usuario: parseInt(this.idUserNow!,10)
    }
    const RESP = await this.peliService.addPeliculaFavorita(peliculaFavorita).toPromise();
      const RESPNOUNDEFINED = RESP!
      if (RESPNOUNDEFINED.ok) {
        this.snackBar.open(RESPNOUNDEFINED.message!, CLOSE, { duration: 5000 });
      } else {
        this.snackBar.open(RESPNOUNDEFINED.message!, CLOSE, { duration: 5000 });
      }
  }

  // async confirmDelete( id : number) {

  //   const RESP = await this.peliService.deletePeliculaFavorita(id).toPromise();
  //     const RESPNOUNDEFINED = RESP!
  //     if (RESPNOUNDEFINED.ok) {
  //       this.snackBar.open(RESPNOUNDEFINED.message!, CLOSE, { duration: 5000 });
  //     } else {
  //       this.snackBar.open(RESPNOUNDEFINED.message!, CLOSE, { duration: 5000 });
  //     }
  // }

  isListRoute(id: number): boolean {
    return this.router.url.includes(`/peliculas/${id}`);
  }

  isFavoriteListRoute(): boolean {
    return this.router.url.includes('/peliculas/favourite-list');
  }

  async deletePeliculaFavorita(pelicula: DetailsFilm) {
    const dialogRef = this.dialog.open(DialogComponent, { data:pelicula, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.deleteUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;

      }
    }
  }





}
