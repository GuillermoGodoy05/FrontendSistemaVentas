import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog'

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';

import { FormsModule } from '@angular/forms'; // <--- Importa FormsModule
import { MatDialogModule } from '@angular/material/dialog'; 


import { Venta } from 'src/app/Interfaces/venta';
import { DetalleVenta } from 'src/app/Interfaces/detalle-venta';
import { UsuarioService } from 'src/app/Services/usuario.service'; 
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service'; 


@Component({
  selector: 'app-modal-detalle-venta',
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './modal-detalle-venta.component.html',
  styleUrl: './modal-detalle-venta.component.css'
})
export class ModalDetalleVentaComponent {

  fechaRegistro:string = "";
  numeroDocumento:string = "";
  tipoPago: string ="";
  total: string ="";
  detalleVenta: DetalleVenta[] = [];
  columnasTabla : string[] = ['producto', 'cantidad', 'precio', 'total']

  constructor(@Inject(MAT_DIALOG_DATA) public _venta: Venta){
    this.fechaRegistro = _venta.fechaRegistro!;
    this.numeroDocumento = _venta.numeroDocumento!;
    this.tipoPago = _venta.tipoPago;
    this.total = _venta.totalTexto;
    this.detalleVenta = _venta.detalleVenta;

  }

  ngOnInit():void {

  }

}
