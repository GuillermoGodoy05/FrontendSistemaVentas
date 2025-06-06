import { Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; 

import {MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog'


import { MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';


import { ModalUsuarioComponent } from 'src/app/Components/layout/Modales/modal-usuario/modal-usuario.component'
import { Usuario } from 'src/app/Interfaces/usuario'; 
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service'; 
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario',
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
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, AfterViewInit {
 
  columnasTabla: string[] = ['nombreCompleto', 'correo','rolDescripcion','estado','acciones']
  dataInicio:Usuario[] = []
  dataListaUsuarios = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator; // !Omite que sea null

  constructor(
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService

  ){}
/* 
  if (data.status) {
            // Si el estado es exitoso, ordenamos los productos antes de asignarlos
            // idProducto, es la forma de identificar el orden de creación.          
            const productosOrdenados = data.value.sort((a: Producto, b: Producto) => b.idProducto - a.idProducto);
            this.dataListaProductos.data = productosOrdenados;
          } else { */

  obtenerUsuarios() {
    this._usuarioServicio.lista().subscribe({
      next:(data) => {
        if(data.status){
          const usuariosOrdenados = data.value.sort((a:Usuario, b: Usuario)=> b.idUsuario - a.idUsuario);
          this.dataListaUsuarios.data = usuariosOrdenados;
        }
        else
        this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops")
      },
      error:(e)=>{}
    })
  }
  
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla;
  }
  

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoUsuario(){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose:true
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true") this.obtenerUsuarios();

    })
  }   


  editarUsuario(usuario:Usuario){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose:true,
      data:usuario
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true") this.obtenerUsuarios();
    })
  }  

  eliminarUsuario(usuario:Usuario) {

    Swal.fire({
        title: "¿Desea eliminar el usuario",
        text: usuario.nombreCompleto,
        icon: "warning",
        confirmButtonColor: '#3085d6',
        confirmButtonText: "Si, eliminar",
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._usuarioServicio.eliminar(usuario.idUsuario).subscribe({
          next:(data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El usuario fue eliminado", "Listo!");
              this.obtenerUsuarios();
            }else
            this._utilidadServicio.mostrarAlerta("No se pudo eliminar el usuario", "Error")
          },
          error:(e)=>{}
        })
      }
    })

  }

}



