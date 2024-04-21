import {inject, Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, Observable, shareReplay, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreaksService {

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 1000px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor() {
  }
}
