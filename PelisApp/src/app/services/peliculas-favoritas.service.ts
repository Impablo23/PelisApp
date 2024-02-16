import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Rol } from '../interfaces/rol';
import { CommonService } from './common.service';
import { environments } from '../environments/environments';
import { PeliculaFavorita } from '../interfaces/peliculaFavorita.interface';

const urlSGE : string = environments.baseUrl;
const ENDPOINT = 'peliculas_favoritas';

@Injectable({
  providedIn: 'root'
})
export class PeliculasFavoritasService {

  peliculasFavoritas!: PeliculaFavorita[];
  peliculaFavorita!: PeliculaFavorita;

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  getAllPeliculasFavoritas(id_usuario: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${urlSGE}/${ENDPOINT}.php?id_usuario=${id_usuario}`, { headers: this.commonService.headers });
  }

  addPeliculaFavorita(peliculaFavorita: PeliculaFavorita) {
    const body = JSON.stringify(peliculaFavorita);
    return this.http.post<ApiResponse>(`${urlSGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editPeliculaFavorita(peliculaFavorita: PeliculaFavorita) {
    const body = JSON.stringify(peliculaFavorita);
    return this.http.put<ApiResponse>(`${urlSGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deletePeliculaFavorita(id_pelicula: number , id_usuario: number) {
    return this.http.delete<ApiResponse>(`${urlSGE}/${ENDPOINT}.php?id_pelicula=${id_pelicula}&id_usuario=${id_usuario}`, { headers: this.commonService.headers });
  }



}
