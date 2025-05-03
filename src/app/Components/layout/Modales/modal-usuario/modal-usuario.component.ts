import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { Rol } from '../../../../Interfaces/rol';
import { Usuario } from '../../../../Interfaces/usuario';
import { RolService } from '../../../../Services/rol.service';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-usuario',
  imports: [],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent {

  constructor() {}

  ngOnInit(): void {

  }

}
