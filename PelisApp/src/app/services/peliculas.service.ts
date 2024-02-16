
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Root } from '../interfaces/root.interface';
import { Result } from '../interfaces/result.interface';
import { environments, environmentsApi } from '../environments/environments';
import { DetailsFilm } from '../interfaces/detailsFilm';


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private baseUrlApi: string = environmentsApi.baseUrlApi

  public listadoMovies: Result[] = [];

  private bearer_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDM3NGY0MGIzM2NjYzdlZjM1Yzk4ZjEyZmU0ZWE4OCIsInN1YiI6IjY1YzNjNTQ2OTVhY2YwMDE4MzFkM2NiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lK_wNjuzms8uAHiSB758XmHZKehwYGj3Qlc5fZswCSY";

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.bearer_token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getFilmByName(name: string,numPages: number): Observable<Root> {
    return this.http.get<Root>(`${this.baseUrlApi}search/movie?query=${name}&language=es-ES&page=${numPages}`, { headers: this.headers });
  }

  getFilmById(id: string): Observable<DetailsFilm> {
    return this.http.get<DetailsFilm>(`${this.baseUrlApi}movie/${id}?language=es-ES`, { headers: this.headers })
  }

  getPopularFilms(numPages: number): Observable<Root> {
    return this.http.get<Root>(`${this.baseUrlApi}movie/popular?language=en-US&page=${numPages}`, { headers: this.headers })
  }

}


