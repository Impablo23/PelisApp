import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CLOSE } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css']
})
export class DeleteUsersComponent {

  constructor(public dialogRef: MatDialogRef<DeleteUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
    private servicioUsuario: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  async deleteUser() {
    const RESP = await this.servicioUsuario.deleteUsuario(this.usuario).toPromise();
    const RESPNOUNDEFINED = RESP!
    if (RESPNOUNDEFINED.ok) {
      this.snackBar.open(RESPNOUNDEFINED.message!, CLOSE, { duration: 5000 });
      this.dialogRef.close({ok: RESPNOUNDEFINED.ok, data: RESPNOUNDEFINED.data});
    } else {
      this.snackBar.open(RESPNOUNDEFINED.message!, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
  this.dialogRef.close({ok: false});
  }

}
