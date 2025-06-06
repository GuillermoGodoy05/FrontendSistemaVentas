import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog'


import { MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';


import { ModalProductoComponent } from 'src/app/Components/layout/Modales/modal-producto/modal-producto.component';
import { Producto } from 'src/app/Interfaces/producto';
import { ProductoService } from 'src/app/Services/producto.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-producto',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre', 'categoria', 'stock', 'precio', 'estado', 'acciones']
  dataInicio: Producto[] = []
  dataListaProductos = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator; // !Omite que sea null

  constructor(
    private dialog: MatDialog,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService

  ) { }

  obtenerProductos() {
    this._productoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          // Si el estado es exitoso, ordenamos los productos antes de asignarlos
          // idProducto, es la forma de identificar el orden de creación.          
          const productosOrdenados = data.value.sort((a: Producto, b: Producto) => b.idProducto - a.idProducto);
          this.dataListaProductos.data = productosOrdenados;
        } else {
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops")
        }
      },
      error: (e) => { }
    })
}

ngOnInit(): void {
  this.obtenerProductos();
}

ngAfterViewInit(): void {
  this.dataListaProductos.paginator = this.paginacionTabla;
}


aplicarFiltroTabla(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataListaProductos.filter = filterValue.trim().toLocaleLowerCase();
}

nuevoProducto() {
  this.dialog.open(ModalProductoComponent, {
    disableClose: true
  }).afterClosed().subscribe(resultado => {
    if (resultado === "true") this.obtenerProductos();

  })
}


editarProducto(usuario: Producto) {
  this.dialog.open(ModalProductoComponent, {
    disableClose: true,
    data: usuario
  }).afterClosed().subscribe(resultado => {
    if (resultado === "true") this.obtenerProductos();
  })
}

eliminarProducto(producto: Producto) {

  Swal.fire({
    title: "¿Desea eliminar el producto",
    text: producto.nombre,
    icon: "warning",
    confirmButtonColor: '#3085d6',
    confirmButtonText: "Si, eliminar",
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: 'No, volver'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      this._productoServicio.eliminar(producto.idProducto).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("El producto fue eliminado", "Listo!");
            this.obtenerProductos();
          } else
            this._utilidadServicio.mostrarAlerta("No se pudo eliminar el producto", "Error")
        },
        error: (e) => { }
      })
    }
  })

}

}
