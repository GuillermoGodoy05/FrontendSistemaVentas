import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; 
import { RouterOutlet, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';

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

}
