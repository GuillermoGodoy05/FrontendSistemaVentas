import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';

import { Rol } from 'src/app/Interfaces/rol';
import { Usuario } from 'src/app/Interfaces/usuario';
import { RolService } from 'src/app/Services/rol.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-usuario',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent {

  formularioUsuario: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaRoles: Rol[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuarios: Usuario,
    private fb: FormBuilder,
    private _rolServicio: RolService,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ) {

    this.formularioUsuario = this.fb.group({
      nombreCompleto: ["", [Validators.required, Validators.maxLength(100)]],
      correo: ["", [Validators.required, Validators.email, Validators.maxLength(100)]],
      idRol: ["", Validators.required],
      clave: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      esActivo: ['1', Validators.required]
    });


    if (this.datosUsuarios != null) {
      this.tituloAccion = "Editar",
        this.botonAccion = "Actualizar"
    }

    this._rolServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaRoles = data.value
      },
      error: (e) => { }
    })

  }

  ngOnInit(): void {
    if (this.datosUsuarios != null) {
      this.formularioUsuario.patchValue({
        nombreCompleto: this.datosUsuarios.nombreCompleto,
        correo: this.datosUsuarios.correo,
        idRol: this.datosUsuarios.idRol,
        clave: this.datosUsuarios.clave,
        esActivo: this.datosUsuarios.esActivo.toString()
      })
    }
  }

  guardarEditar_Usuario() {
    const _usuario: Usuario = {
      idUsuario: this.datosUsuarios == null ? 0 : this.datosUsuarios.idUsuario,
      nombreCompleto: this.formularioUsuario.value.nombreCompleto,
      correo: this.formularioUsuario.value.correo,
      clave: this.formularioUsuario.value.clave,
      idRol: this.formularioUsuario.value.idRol,
      rolDescripcion: "",
      esActivo: parseInt(this.formularioUsuario.value.esActivo)

    }

    if (this.datosUsuarios == null) {
      this._usuarioServicio.guardar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("El usuario fue registrado", "Exito");
            this.modalActual.close("true")
          } else
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el usuario", "Error")
        },
        error: (e) => { }
      })
    } else {

      this._usuarioServicio.editar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("El usuario fue editado", "Exito");
            this.modalActual.close("true")
          } else
            this._utilidadServicio.mostrarAlerta("No se pudo editar el usuario", "Error")
        },
        error: (e) => { }
      })

    }

  }

}
