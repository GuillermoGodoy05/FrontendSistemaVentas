import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../Interfaces/response-api';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  private urlApi: string = environment.endpoint + "DashBoard/";

  constructor(private http: HttpClient) { }

  resumen(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Resumen`)
  }
}
