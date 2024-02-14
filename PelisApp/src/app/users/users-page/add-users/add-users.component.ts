import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from 'src/app/interfaces/rol';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {

  usuarioForm!: FormGroup;
  roles!: Rol[];

  constructor(public dialogRef: MatDialogRef<AddUsersComponent>,
              private servicioRoles: RolesService,
              private servicioUsuario: UsuarioService,
              public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.usuarioForm = new FormGroup({
      usuario: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      id_rol: new FormControl(null, [Validators.required]),
      nombre_publico: new FormControl(null),
      observaciones: new FormControl(null)
    });

    this.getRoles();
  }

  async getRoles() {
    const RESPONSE = await this.servicioRoles.getAllRoles().toPromise();
    const RESPNOUNDEFINED = RESPONSE!
    if (RESPNOUNDEFINED.ok) {
      this.roles = RESPNOUNDEFINED.data as Rol[];
    }
  }

  async confirmAdd() {
    // console.log(this.usuarioForm.value);
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value!;

      const RESP = await this.servicioUsuario.addUsuario(usuario).toPromise();
      const RESPNOUNDEFINED = RESP!
      if (RESPNOUNDEFINED.ok) {
        this.snackBar.open(RESPNOUNDEFINED.message!, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPNOUNDEFINED.ok, data: RESPNOUNDEFINED.data});
      } else {
        this.snackBar.open(RESPNOUNDEFINED.message!, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }

}
