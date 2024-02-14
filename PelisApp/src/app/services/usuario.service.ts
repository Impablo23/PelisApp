import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { Usuario } from '../interfaces/usuario.interface';
import { ApiResponse } from '../interfaces/api-response.interface';
import { environments } from '../environments/environments';


const ENDPOINT = 'usuario';

const urlSGE : string = environments.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  usuarios: Usuario[] = [];


  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  getAllUsuarios() {
    return this.http.get<ApiResponse>(`${urlSGE}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addUsuario(usuario: Usuario) {
    const body = JSON.stringify(usuario);
    return this.http.post<ApiResponse>(`${urlSGE}/${ENDPOINT}.php`, body, {headers: this.commonService.headers });
  }

  editUsuario(usuario: Usuario, route?: string) {
    const body = JSON.stringify(usuario);

    if (route) {
      route = `?route=${route}`;
    } else {
      route = '';
    }

    return this.http.put<ApiResponse>(`${urlSGE}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headers });
  }

  deleteUsuario(usuario: Usuario) {
    return this.http.delete<ApiResponse>(`${urlSGE}/${ENDPOINT}.php?id=${usuario.id_usuario}`, { headers: this.commonService.headers });
  }

  removeUsuario(idUser: number) {
    this.usuarios = this.usuarios.filter(usuario => {
      return Number(usuario.id_usuario) !== Number(idUser);
    });
  }

  updateUsuario(usuario: Usuario) {
    let index = null;
    this.usuarios.filter((usuarioFilter, indexFilter) => {
      if (usuario.id_usuario === usuarioFilter.id_usuario) {
        index = indexFilter;
      }
    });

    if (index) {
      this.usuarios[index] = usuario;
    }
  }

}
