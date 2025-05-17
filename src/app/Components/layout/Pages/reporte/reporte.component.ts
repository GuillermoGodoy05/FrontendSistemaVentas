import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import moment from 'moment';
import * as XLSX from 'xlsx';


import { NgFor } from '@angular/common';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'

import { Reporte } from 'src/app/Interfaces/reporte';
import { VentaService } from 'src/app/Services/venta.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YY'
  },
  display: {
    dateInput: 'DD/MM/YY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-reporte',
  imports: [
    CommonModule,

    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatGridListModule,

    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,


    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }
  ]
})
export class ReporteComponent implements OnInit {

  formularioFiltro: FormGroup;
  listaVentasReporte: Reporte[] = [];
  columnasTabla: string[] = [
    'fechaRegistro', 'numeroVenta', 'tipoPago', 'total', 'producto', 'cantidad', 'precio', 'totalProducto'
  ]
  dataVentaReporte = new MatTableDataSource(this.listaVentasReporte);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) 
  {

    this.formularioFiltro = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]

    })

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataVentaReporte.paginator = this.paginacionTabla;
  }

  // Buscar ventas
  buscarVentas() {
    const _fechaInicio = moment(this.formularioFiltro.value.fechaInicio).format('DD/MM/YYYY');
    const _fechaFin = moment(this.formularioFiltro.value.fechaFin).format('DD/MM/YYYY');

    if (_fechaInicio === "Invalid date" || _fechaFin === "Invalid date") {
      this._utilidadServicio.mostrarAlerta("Debe ingresar ambas fechas", "Oops!")
      return;
    }

    this._ventaServicio.reporte(
      _fechaInicio,
      _fechaFin
    ).subscribe({
      next: (data) => {
        if(data.status){
          this.listaVentasReporte = data.value; //busca info en la api
          this.dataVentaReporte.data = data.value; //actualiza el origen de la información de nuestra tabla
        }
        else{
          this.listaVentasReporte = [];
          this.dataVentaReporte.data = [];
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops!");
        }
      },
      error:(e) => {} // console log (e) en caso de error
    })
  }

  // Exportar planilla de Excel

  exportarExcel(){
    const wb = XLSX.utils.book_new(); // nuevo libro
    const ws = XLSX.utils.json_to_sheet(this.listaVentasReporte); //exporta por medio del array listaVentasReporte

    XLSX.utils.book_append_sheet(wb,ws,"Reporte");
    XLSX.writeFile(wb,"Reporte Ventas.xlsx");

  }


}
