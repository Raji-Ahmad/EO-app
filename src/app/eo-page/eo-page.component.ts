import {Component, Input, signal} from '@angular/core';
import {AnalyticsGridComponent} from "../analytics-grid/analytics-grid.component";
import {MapComponent} from "../map/map.component";
import {MatButton} from "@angular/material/button";
import {
    MatDatepickerToggle,
    MatDateRangeInput,
    MatDateRangePicker,
    MatEndDate,
    MatStartDate
} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {BreaksService} from "../breaks.service";
import {satFormI} from "../interfaces";
import {SatFormComponent} from "../sat-form/sat-form.component";
import {EoServiceService, Ihistogram, IwmsResponse} from "../services/eo-service.service";
import {Polygon} from "leaflet";
import {Observable, Subscription} from "rxjs";
import {MessagesService} from "../services/messages.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpHeaders} from "@angular/common/http";
import {SpinnerDialogComponent} from "../spinner-dialog/spinner-dialog.component";
import {ChartComponent} from "../chart/chart.component";
import {HistComponent} from "../hist/hist.component";

@Component({
  selector: 'app-eo-page',
  standalone: true,
  imports: [
    AnalyticsGridComponent,
    MapComponent,
    MatButton,
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatEndDate,
    MatFormField,
    MatGridList,
    MatGridTile,
    MatHint,
    MatIcon,
    MatLabel,
    MatOption,
    MatSelect,
    MatStartDate,
    MatSuffix,
    SatFormComponent,
    ChartComponent,
    HistComponent
  ],
  templateUrl: './eo-page.component.html',
  styleUrl: './eo-page.component.scss'
})
export class EOPageComponent {
  // themap
  @Input({required: false}) noSensor:boolean= false
  @Input({required: true}) title:string= 'EO Page'
  @Input({required: true}) serviceName:string= ''
  @Input() colors: string[] = ['#9958cc']
  @Input() disableLabels: boolean = false
  @Input() disableLegend: boolean = false

  themeLayer = signal<string>('')
  hist = signal<Ihistogram| null>(null)
  file: File | null = null;
  form: satFormI | null = null;
  drawnFilter: Polygon|null = null
  protected isHandset: boolean = false;
  isLoading = signal<boolean>(false)
  private wmsLayer$: Subscription | null = null;


  constructor(private bs: BreaksService, private Eoservice: EoServiceService,
              private message: MessagesService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.bs.isHandset$.subscribe(result => {
      // console.log(result);
      this.isHandset = result;
      if (result) {
      }
    });
  }

  fileUpdate(value: File | null) {
    this.file = value;
  }

  formSubmitted(value: satFormI) {
    this.openLoadingDialog('200ms', '200ms')
    this.isLoading.set(true);

    const formData = new FormData();
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (key == 'aoi' && this.file) {
          formData.append(key, this.file as Blob, this.file?.name);
        } else {
          formData.append(key, value[key as keyof satFormI]);
        }
      }
    }

    if (this.drawnFilter){
      let polygonGeoJSON = this.drawnFilter.toGeoJSON()
      let polygonGeoJSONString = JSON.stringify(polygonGeoJSON);
      console.log(polygonGeoJSONString)
      formData.append('geojson', polygonGeoJSONString)
    }

    const headers = new HttpHeaders({});
    if (!this.Eoservice || !(this.serviceName in this.Eoservice)) {
      throw new Error(`Method ${this.serviceName} not found on EoService service not initialized.`);
    }
    const methodName: keyof EoServiceService = this.serviceName as keyof EoServiceService;
    const ServiceMethod = this.Eoservice[this.serviceName as keyof EoServiceService];

    this.wmsLayer$ = this.Eoservice[methodName](formData, headers).subscribe({
      next: (response: IwmsResponse) => {
        if (response.status == 'success') {
          this.themeLayer.set(response.url)
          this.hist.set(response.histogram)
          this.message.showSuccessToast(`Adding ${this.title} Layer`)

        } else {
          if(response.message){
            this.message.showErrorToast(response.message)
          }
          else {this.message.showErrorToast("Server error. Try a small area or try again later")}
        }
      },
      error: (err:Error) => {
        this.message.showErrorToast("Server error. Try a small area or try again later")
        this.isLoading.set(false);
        this.dialog.closeAll();
      },
      complete: () => {
        console.log('complete')
        this.isLoading.set(false);
        this.dialog.closeAll();
      },
    })
  }

  openLoadingDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(SpinnerDialogComponent, {
      disableClose: true,
      width: '150px',
      hasBackdrop: true,
      data: {question: ''},
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      if (this.wmsLayer$) {
        console.log('unsubscribed');
        this.wmsLayer$.unsubscribe()
      }

      this.isLoading.set(false);

    });
  }

  drawnFilterHandle(layer: Polygon){
    this.drawnFilter = layer
  }
}
