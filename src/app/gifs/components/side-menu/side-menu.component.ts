import { Component } from '@angular/core';
import { SideMunuHeadersComponent } from './side-munu-headers/side-munu-headers.component';
import { SideMenuOptionsComponent } from './side-menu-options/side-menu-options.component';

@Component({
  selector: 'gifs-side-menu',
  imports: [SideMunuHeadersComponent, SideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {}
