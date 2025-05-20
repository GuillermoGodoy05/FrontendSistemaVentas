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
import {MatGridListModule} from '@angular/material/grid-list';


import { DashBoardService } from 'src/app/Services/dash-board.service';

import { Chart, registerables } from 'chart.js'


Chart.register(...registerables);

@Component({
  selector: 'app-dash-board',
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
    MatGridListModule
  ],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {

  totalIngresos: string = "0";
  totalVentas: string = "0";
  totalProductos: string = "0";

  constructor(
    private _dashboardServicio: DashBoardService
  ) {
  }

  mostrarGrafico(labelGrafico: any[], dataGrafico: any[]) {

    const chartBarras = new Chart('chartBarras', {
      type: 'bar',
      data: {
        labels: labelGrafico,
        datasets: [{
          label: "# de Ventas",
          data: dataGrafico,
          backgroundColor: [
            'rgba(54,162,235,0.2)'
          ],
          borderColor: [
            'rgba(54,162,235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true // Escala en el eje Y empieza desde cero
          }
        }
      }

    });

  }

  ngOnInit(): void {
    this._dashboardServicio.resumen().subscribe({
      next: (data) => {
        if (data.status) {
          this.totalIngresos = data.value.totalIngresos;
          this.totalVentas = data.value.totalVentas;
          this.totalProductos = data.value.totalProductos

          const arrayData: any[] = data.value.ventasUltimaSemana;

          const labelTemp = arrayData.map((value) => value.fecha)
          const dataTemp = arrayData.map((value) => value.total)          
          this.mostrarGrafico(labelTemp, dataTemp)
        }
      },
      error: (e) => {}
    })
  }


}
