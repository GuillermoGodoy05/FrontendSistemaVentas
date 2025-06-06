import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../Interfaces/response-api';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi: string = environment.endpoint + "Categoria/";

  constructor(private http: HttpClient) { }

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }
}
