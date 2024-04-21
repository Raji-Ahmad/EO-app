import {Component, Input, input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import { EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {satFormI} from "../interfaces";
import {MatTooltip} from "@angular/material/tooltip";
import {MatTabsModule} from '@angular/material/tabs';
import {DatePipe} from "@angular/common";
import {EoServiceService, Istate} from "../services/eo-service.service";

@Component({
  selector: 'app-sat-form',
  standalone: true,
  imports: [
    CommonModule,
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
    ReactiveFormsModule,
    FormsModule,
    MatTooltip,
    MatTabsModule
  ],
  templateUrl: './sat-form.component.html',
  styleUrl: './sat-form.component.scss'
})
export class SatFormComponent implements OnInit{
    // themap
  @Input({required: false}) noSensor:boolean= false
  @Output() formSubmit: EventEmitter<satFormI > = new EventEmitter<satFormI>();
  @Output() formFile: EventEmitter<File | null> = new EventEmitter<File | null>()

  file: File | null = null;
  protected isHandset: boolean = false;
  form: FormGroup;
  states: Istate[] = []

  constructor(private bs: BreaksService, private fb: FormBuilder, private datePipe: DatePipe, private EOService: EoServiceService) {
      this.form = this.fb.group({})
  }

  ngOnInit(): void {
     this.form = this.fb.group({
      sdate: ['', Validators.required],
      edate: ['', Validators.required],
      sensor: {value: '', disabled:this.noSensor},
      state: [''],
      aoi: ['']
    });

    this.bs.isHandset$.subscribe(result => {
      // console.log(result);
      this.isHandset = result;
      if (result) {
      }
    });

    this.EOService.getStateNames().subscribe(result => this.states = result)
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
      this.formFile.emit(files[0])
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Emit form value to parent component
      const formValue = { ...this.form.value };
      formValue.sdate = this.datePipe.transform(formValue.sdate, 'yyyy-MM-dd');
      formValue.edate = this.datePipe.transform(formValue.edate, 'yyyy-MM-dd');
      console.log(formValue)
      this.formSubmit.emit(formValue as satFormI);
      this.formFile.emit(this.file)
    }
  }
}
