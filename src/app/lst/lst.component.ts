import {Component, signal} from '@angular/core';
import {EoServiceService, Ihistogram, IwmsResponse} from "../services/eo-service.service";
import {satFormI} from "../interfaces";
import {Polygon} from "leaflet";
import {Subscription} from "rxjs";
import {BreaksService} from "../breaks.service";
import {MessagesService} from "../services/messages.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpHeaders} from "@angular/common/http";
import {SpinnerDialogComponent} from "../spinner-dialog/spinner-dialog.component";
import {AnalyticsGridComponent} from "../analytics-grid/analytics-grid.component";
import {ChartComponent} from "../chart/chart.component";
import {MapComponent} from "../map/map.component";
import {SatFormComponent} from "../sat-form/sat-form.component";
import {EOPageComponent} from "../eo-page/eo-page.component";

@Component({
  selector: 'app-lst',
  standalone: true,
  imports: [
    AnalyticsGridComponent,
    ChartComponent,
    MapComponent,
    SatFormComponent,
    EOPageComponent
  ],
  templateUrl: './lst.component.html',
  styleUrl: './lst.component.scss'
})
export class LstComponent {
  title = 'Land Surface Temperature'
  shortTitle = 'LST'
  serviceName = "getLST"
  colors = ['#040274', '#0502ce',
    '#0502e6',  '#235cb1', '#269db1',
    '#30c8e2',  '#3be285',  '#86e26f',
    '#3ae237', '#ffd611',
    '#ffb613', '#ff6e08',  '#ff0000',
    '#de0101', '#911003']
}
