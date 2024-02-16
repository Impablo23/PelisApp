import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsFilm } from 'src/app/interfaces/detailsFilm';
import { PeliculaFavorita } from 'src/app/interfaces/peliculaFavorita.interface';
import { PeliculasFavoritasService } from 'src/app/services/peliculas-favoritas.service';
import { CLOSE } from 'src/app/shared/messages';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  idUser: string = localStorage.getItem('id_usuario')!;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public peliculalFav: DetailsFilm,
    public peliculasFavSercice: PeliculasFavoritasService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.peliculasFavSercice.deletePeliculaFavorita(this.peliculalFav.id, parseInt(this.idUser,10)).toPromise();
    const RESPONSENOUNDEFINED = RESPONSE!;
    if (RESPONSENOUNDEFINED.ok) {
      this.snackBar.open(RESPONSENOUNDEFINED.message!, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSENOUNDEFINED.ok, data: RESPONSENOUNDEFINED.data });
    } else { this.snackBar.open(RESPONSENOUNDEFINED.message!, CLOSE, { duration: 5000 }); }
  }

}
