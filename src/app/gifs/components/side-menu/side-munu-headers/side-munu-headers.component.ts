import { Component } from '@angular/core';
import { environment } from '@envioroments/environment';
/* import { environment } from '../../../../../environments/environment'; */

@Component({
  selector: 'gifs-side-munu-headers',
  templateUrl: './side-munu-headers.component.html',
})
export class SideMunuHeadersComponent {
  env = environment;
}
