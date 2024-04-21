import {Component} from '@angular/core';
import {EOPageComponent} from "../eo-page/eo-page.component";
import {Observable} from "rxjs";
import {BreaksService} from "../breaks.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-land-cover',
  standalone: true,
  imports: [EOPageComponent, AsyncPipe],
  templateUrl: './land-cover.component.html',
  styleUrl: './land-cover.component.scss'
})
export class LandCoverComponent {
  title = 'Land cover'
  serviceName = 'getLandCover'
  noSensor = true
  colors = [
    '#419BDF', '#397D49', '#88B053', '#7A87C6', '#E49635', '#DFC35A',
    '#C4281B', '#A59B8F', '#B39FE1'
  ]
  disableLabels:Observable<boolean>

  constructor(private bs: BreaksService) {
    this.disableLabels=bs.isHandset$
  }
}
