import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../Interfaces/response-api';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private urlApi: string = environment.endpoint + "Menu/";

  constructor(private http: HttpClient) { }

  lista(idUsuario:number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Lista?idUsuario=${idUsuario}`)
  }
}
