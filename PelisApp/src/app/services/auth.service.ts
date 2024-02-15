import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { environments } from '../environments/environments';
import { CommonService } from './common.service';

const urlSGE : string = environments.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private cookieService: CookieService, private commonService: CommonService) {}

  doLogin(data: any) {
    const body = JSON.stringify(data);
    return this.http.post<ApiResponse>(`${urlSGE}/login.php`, body);
  }

  public async isAuthenticated(url: string): Promise<boolean> {

    let rutaSeleccionada: string;
    const promise = new Promise<boolean>((resolve, reject) => {
      rutaSeleccionada = url.substring(1);
      rutaSeleccionada = rutaSeleccionada.split('/')[0];
      this.http.get<ApiResponse>(`${url}/check_usuarios.php?ruta=${ rutaSeleccionada }`,  { headers: this.commonService.getHeaders() } )
      .subscribe((response: ApiResponse) => {
      resolve(response.ok);
      });
    });
    return promise;
  }

  doLogout() {
    const body = new FormData();
    const usuario = localStorage.getItem('usuario')!;
    body.append('user', usuario);
    this.cookieService.deleteAll();
    localStorage.clear();
    return this.http.post(`${urlSGE}/logout.php`, body);
  }

  resetPassword(formularioCorreo: any) {
    const body = JSON.stringify(formularioCorreo);
    return this.http.post<ApiResponse>(`${urlSGE}/olvidar_pwd.php`, body, {headers: this.commonService.headers});
  }

  checkPassToken(tokenPasswd: string) {

    const body = JSON.stringify({ token: tokenPasswd });

    return this.http.post<ApiResponse>(`${urlSGE}/check_token_passwd.php`, body);
  }

  generateNewPass(data: any) {
    const body = JSON.stringify(data);

    return this.http.put<ApiResponse>(`${urlSGE}/reset_pass.php`, body);

  }
}
