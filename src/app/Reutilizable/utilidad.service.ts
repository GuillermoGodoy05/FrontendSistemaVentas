import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar'
import { Sesion } from '../Interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _sackBar: MatSnackBar) { }

  mostrarAlerta(mensaje: string, tipo: string) {

    this._sackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }
  guardarSesionUsuario(usuarioSession: Sesion) {
    if (typeof window !== 'undefined') {
      localStorage.setItem("usuario", JSON.stringify(usuarioSession));
    } else {
      console.warn('localStorage no está disponible, la sesión no se guardará.');
    }
  }

  obtenerSesionUsuario(): Sesion | null {
    if (typeof window !== 'undefined') {
      const dataCadena = localStorage.getItem("usuario");
      if (dataCadena) {
        try {
          const usuario = JSON.parse(dataCadena) as Sesion;
          return usuario;
        } catch (error) {
          console.error('Error al parsear la sesión del usuario:', error);
          return null;
        }
      }
    } else {
      console.warn('localStorage no está disponible, no se puede obtener la sesión.');
    }
    return null;
  }

  eliminarSesionUsuario() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("usuario");
    } else {
      console.warn('localStorage no está disponible, no se puede eliminar la sesión.');
    }
  }

  isLoggedIn(): boolean {
    const usuario = this.obtenerSesionUsuario();    
    return usuario !== null && usuario !== undefined;
  }
}
