import { Routes } from '@angular/router';
import { LayoutComponent } from './Components/layout/layout.component';
import { DashBoardComponent } from './Components/layout/Pages/dash-board/dash-board.component';
import { UsuarioComponent } from './Components/layout/Pages/usuario/usuario.component';
import { ProductoComponent } from './Components/layout/Pages/producto/producto.component';
import { VentaComponent } from './Components/layout/Pages/venta/venta.component';
import { HistorialVentaComponent } from './Components/layout/Pages/historial-venta/historial-venta.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
    
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./Components/layout/Pages/dash-board/dash-board.component').then(c => c.DashBoardComponent)
            },
            {
                path: 'usuarios',
                loadComponent: () => import('./Components/layout/Pages/usuario/usuario.component').then(c => c.UsuarioComponent)
            },
            {
                path: 'productos',
                loadComponent: () => import('./Components/layout/Pages/producto/producto.component').then(c => c.ProductoComponent)
            },
            {
                path: 'venta',
                loadComponent: () => import('./Components/layout/Pages/venta/venta.component').then(c => c.VentaComponent)
            },
            {
                path: 'historial-venta',
                loadComponent: () => import('./Components/layout/Pages/historial-venta/historial-venta.component').then(c => c.HistorialVentaComponent)
            },
            {
                path: 'reportes',
                loadComponent: () => import('./Components/layout/Pages/historial-venta/historial-venta.component').then(c => c.HistorialVentaComponent)
            },
        ]
    },   
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: "full"
    },   
    {
        path:'**',
        redirectTo:'login',
        pathMatch:"full"
    }

];

/*

{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'dashboard',
      loadComponent: () => import('./Components/layout/Pages/dash-board/dash-board.component').then(c => c.DashBoardComponent)
    },
    {
      path: 'usuarios',
      loadComponent: () => import('./Components/layout/Pages/usuario/usuario.component').then(c => c.UsuarioComponent)
    },
    {
      path: 'productos',
      loadComponent: () => import('./Components/layout/Pages/producto/producto.component').then(c => c.ProductoComponent)
    },
    {
      path: 'venta',
      loadComponent: () => import('./Components/layout/Pages/venta/venta.component').then(c => c.VentaComponent)
    },
    {
      path: 'historial-venta',
      loadComponent: () => import('./Components/layout/Pages/historial-venta/historial-venta.component').then(c => c.HistorialVentaComponent)
    },
    {
      path: 'reportes',
      loadComponent: () => import('./Components/layout/Pages/historial-venta/historial-venta.component').then(c => c.HistorialVentaComponent)
    },
  ]
},

{
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashBoardComponent },
            { path: 'usuarios', component: UsuarioComponent },
            { path: 'productos', component: ProductoComponent },
            { path: 'venta', component: VentaComponent },
            { path: 'historial-venta', component: HistorialVentaComponent },
            { path: 'reportes', component: HistorialVentaComponent },
        ]
    },

*/