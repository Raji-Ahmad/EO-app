import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, Observable, shareReplay} from "rxjs";
import {AsyncPipe, CommonModule} from "@angular/common";
import {BreaksService} from "../breaks.service";

@Component({
  selector: 'app-split-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavContainer,
    MatSidenav,
    MatToolbar,
    MatIcon,
    MatIconButton,
    AsyncPipe,
    MatSidenavModule,
  ],
  templateUrl: './split-panel.component.html',
  styleUrl: './split-panel.component.scss'
})
export class SplitPanelComponent {

  private breakpointObserver = inject(BreakpointObserver);

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );

  isHandset$: Observable<boolean> = this.bs.isHandset$;
  isHandset:boolean = false;
  @ViewChild('drawer', { static: true }) drawer: MatSidenav|null = null;

    constructor(private bs: BreaksService) {
      this.isHandset$.subscribe(isHandset => {
      this.isHandset = isHandset
      })
  }

  closeLeft(){
      if (this.isHandset){
        this.drawer!.toggle()
      }

  }

}
