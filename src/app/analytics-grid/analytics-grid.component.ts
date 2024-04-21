import { Component } from '@angular/core';
import {BreaksService} from "../breaks.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDivider} from "@angular/material/divider";
import {provideNativeDateAdapter} from "@angular/material/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-analytics-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatGridList,
    MatGridTile,
    MatDivider
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './analytics-grid.component.html',
  styleUrl: './analytics-grid.component.scss'
})
export class AnalyticsGridComponent {

  protected isHandset: boolean = false;
  protected gridHeight: number = 0;

  constructor(private bs: BreaksService) {

  }

  ngOnInit(): void {
    const toolbar = document.querySelector('#navtool');
    const toolbarHeightString = window.getComputedStyle(toolbar!).getPropertyValue('--mat-toolbar-standard-height');

    // Remove 'px' suffix and cast to number
    const toolbarHeight = parseInt(toolbarHeightString.replace('px', ''), 10);
    const viewportHeight = window.innerHeight;
    this.gridHeight = 65 //(viewportHeight - toolbarHeight) / 10;

    this.bs.isHandset$.subscribe(result => {
      // console.log(result);
      this.isHandset = result;
      if (result) {
        const toolbar = document.querySelector('#navtool');
        const toolbarHeightString = window.getComputedStyle(toolbar!).getPropertyValue('--mat-toolbar-mobile-height');

        // Remove 'px' suffix and cast to number
        const toolbarHeight = parseInt(toolbarHeightString.replace('px', ''), 10);
        const viewportHeight = window.innerHeight;
        this.gridHeight = 65 //(viewportHeight - toolbarHeight - 0.699 * toolbarHeight) / 10;
      }
    });
  }

}
