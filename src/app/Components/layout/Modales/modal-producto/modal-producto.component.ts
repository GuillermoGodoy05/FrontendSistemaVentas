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
import { NgFor } from '@angular/common';

import { Categoria } from 'src/app/Interfaces/categoria';
import { Producto } from 'src/app/Interfaces/producto';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';


@Component({
  selector: 'app-modal-producto',
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
    NgFor
  ],
  templateUrl: './modal-producto.component.html',
  styleUrl: './modal-producto.component.css'
})
export class ModalProductoComponent {
  formularioProducto: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaCategorias: Categoria[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProductos: Producto,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaService,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService,
  ) {
    this.formularioProducto = this.fb.group({
      nombre: ["", Validators.required],
      idCategoria: ["", Validators.required],
      stock: ["", Validators.required],
      precio: ["", Validators.required],
      esActivo: ['1', Validators.required]
    })

    if (this.datosProductos != null) {
      this.tituloAccion = "Editar",
      this.botonAccion = "Actualizar"
    }

    this._categoriaServicio.lista().subscribe({
      next:(data) => {
        if(data.status) this.listaCategorias = data.value
      },
      error:(e)=>{}
    })

  }

  ngOnInit(): void {
    if(this.datosProductos != null){
      this.formularioProducto.patchValue({
        nombre: this.datosProductos.nombre,
        idCategoria: this.datosProductos.idCategoria,
        stock: this.datosProductos.stock,
        precio: this.datosProductos.precio,
        esActivo: this.datosProductos.esActivo.toString()
      })
    }
  }

  guardarEditar_Producto() {
      const _producto: Producto = {
        idProducto : this.datosProductos == null ? 0 : this.datosProductos.idProducto,
        nombre : this.formularioProducto.value.nombre,
        idCategoria : this.formularioProducto.value.idCategoria,      
        descripcionCategoria : "",      
        precio : this.formularioProducto.value.precio,
        stock : this.formularioProducto.value.stock,
        esActivo : parseInt(this.formularioProducto.value.esActivo)      
  
      }
  
      if(this.datosProductos == null) {
        this._productoServicio.guardar(_producto).subscribe({
          next:(data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El producto fue registrado","Exito");
              this.modalActual.close("true")
            }else
              this._utilidadServicio.mostrarAlerta("No se pudo registrar el producto","Error")
          },
          error:(e) =>{}
        })
      } else {
  
        this._productoServicio.editar(_producto).subscribe({
          next:(data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El producto fue editado","Exito");
              this.modalActual.close("true")
            }else
              this._utilidadServicio.mostrarAlerta("No se pudo editar el producto","Error")
          },
          error:(e) =>{}
        })
  
      }
  
    }

}
