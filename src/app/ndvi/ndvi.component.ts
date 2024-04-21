import {Component} from '@angular/core';
import {EOPageComponent} from "../eo-page/eo-page.component";
@Component({
  selector: 'app-ndvi',
  standalone: true,
  imports: [
    EOPageComponent
  ],
  templateUrl: './ndvi.component.html',
  styleUrl: './ndvi.component.scss'
})
export class NDVIComponent {

  title = 'NDVI'
  serviceName = 'getNDVI'

}
