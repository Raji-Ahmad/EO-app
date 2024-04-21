import {Component} from '@angular/core';
import {EOPageComponent} from "../eo-page/eo-page.component";
@Component({
  selector: 'app-ndwi',
  standalone: true,
  imports: [
    EOPageComponent
  ],
  templateUrl: './ndwi.component.html',
  styleUrl: './ndwi.component.scss'
})
export class NdwiComponent {

  title = 'NDWI'
  serviceName = 'getNDWI'

}
