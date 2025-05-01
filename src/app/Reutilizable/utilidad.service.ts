import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar'
import { Sesion } from '../Interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _sackBar: MatSnackBar) {}

  mostrarAlerta(mensaje:string,tipo:string) {

    this._sackBar.open(mensaje,tipo,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    })
  }
  guardarSesionUsuario(usuarioSession: Sesion) {
      localStorage.setItem("usuario", JSON.stringify(usuarioSession))
  }

  obtenerSesionUsuario(){
    const dataCadena = localStorage.getItem("usuario");

    // signo de exclamació: esperamos si o si un valor que no sea nulo 
    const usuario= JSON.parse(dataCadena!)
  }

  eliminarSesionUsuario(){
    localStorage.removeItem("usuario")
  }


}
