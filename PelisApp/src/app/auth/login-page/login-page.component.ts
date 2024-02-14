import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  @Output() valueChange = new EventEmitter();

  loginForm!: FormGroup;
  alerta!: string;
  showSpinner!: boolean;
  error!: string;


  constructor(
              private authService: AuthService,
              private router: Router,
              private cookieService: CookieService,
              private snackBar: MatSnackBar,
              private commonService: CommonService
            ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async acceder() {

    if (this.loginForm.valid) {

      const data = this.loginForm.value;

      const RESPONSE = await this.authService.doLogin(data).toPromise();
      const RESPONSENOUNDEFINED = RESPONSE!;
        // console.log(response);
      if (RESPONSENOUNDEFINED.ok) {
        if (RESPONSENOUNDEFINED.data.token) {
          // this.cookieService.set('token', RESPONSE.data.token);
          // console.log('ya he puesto el token');
          localStorage.setItem('token', RESPONSENOUNDEFINED.data.token);
          localStorage.setItem('usuario', RESPONSENOUNDEFINED.data.usuario);
          localStorage.setItem('nombre_publico', RESPONSENOUNDEFINED.data.nombre_publico);
          localStorage.setItem('ultimaOpcion', RESPONSENOUNDEFINED.data.opcion);
          localStorage.setItem('ultimoGrupo', RESPONSENOUNDEFINED.data.grupo);
          this.commonService.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESPONSENOUNDEFINED.data.token}`
          });
          this.router.navigate([`/peliculas`]);

        } else if (RESPONSENOUNDEFINED.data.valido === 0) {
          this.snackBar.open('Usuario inhabilitado', 'Cerrar', {duration: 5000});
        } else if (RESPONSENOUNDEFINED.data.valido === 1) {
          this.snackBar.open('Usuario o contraseña incorrectas', 'Cerrar', {duration: 5000});
        }
      }
    }
  }


}
