import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Menu } from 'src/app/Interfaces/menu';

import { CommonModule } from '@angular/common';
import { MenuService } from 'src/app/Services/menu.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';


@Component({
  selector: 'app-layout',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatSidenavModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  listaMenus: Menu[] = []
  correoUsuario: string = "";
  rolUsuario: string = "";

  constructor(
    private router: Router,
    private _menuServicio: MenuService,
    private _utilidadServicio: UtilidadService
  ) { }

  ngOnInit(): void {
    const usuario = this._utilidadServicio.obtenerSesionUsuario();
    if (!this._utilidadServicio.isLoggedIn()) {
      this.router.navigate(['/login']); // <-- Redirige a la ruta de tu componente de login
      return; // Detiene la ejecución del resto del ngOnInit si no está logueado
    }

    if (usuario != null) {
      this.correoUsuario = usuario.correo;
      this.rolUsuario = usuario.rolDescripcion;

      this._menuServicio.lista(usuario.idUsuario).subscribe({

        next: (data) => {
          if (data.status) {
            // quito '/pages/' si está presente
            this.listaMenus = (data.value as Menu[]).map((menu: Menu) => ({
              ...menu,
              url: '/' + menu.url.replace(/^\/?pages\//, '')
            }));
            console.log('Rutas procesadas:', this.listaMenus.map(m => m.url));
          }
        },
        error: (e) => { }
      })
    }
  }

  cerrarSesion() {
    this._utilidadServicio.eliminarSesionUsuario();
    this.router.navigate(['login'])
  }


}
