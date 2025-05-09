import { Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; 

import {MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog'

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component'; 
import { Usuario } from '../../../../Interfaces/usuario';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario',
  imports: [
    CommonModule
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

  obtenerUsuario() {
    this._usuarioServicio.lista().subscribe({
      next:(data) => {
        if(data.status)
          this.dataListaUsuarios.data = data.value;
        else
        this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops")
      },
      error:(e)=>{}
    })
  }
  
  ngOnInit(): void {
    this.obtenerUsuario();
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla;
  }
  
 


}
