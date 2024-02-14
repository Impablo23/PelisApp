import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent {


  usuarioForm!: FormGroup;
  roles!: Rol[];

  constructor(public dialogRef: MatDialogRef<EditUsersComponent>,
              private servicioRoles: RolesService,
              private servicioUsuario: UsuarioService,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public usuario: Usuario
  ) { }

  ngOnInit() {

    this.usuarioForm = new FormGroup({
      id_usuario: new FormControl(this.usuario.id_usuario, [Validators.required]),
      usuario: new FormControl(this.usuario.usuario, [Validators.required, Validators.email]),
      nombre_publico: new FormControl(this.usuario.nombre_publico),
      password: new FormControl(''),
      habilitado: new FormControl(Number(this.usuario.habilitado) === 1, [Validators.required]),
      id_rol: new FormControl(this.usuario.id_rol, [Validators.required]),
      observaciones: new FormControl(this.usuario.observaciones)
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
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;

      const RESP = await this.servicioUsuario.editUsuario(usuario).toPromise();
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
