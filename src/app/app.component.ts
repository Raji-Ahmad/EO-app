import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavigationComponent} from "./navigation/navigation.component";
import {SplitPanelComponent} from "./split-panel/split-panel.component";
import {BreaksService} from "./breaks.service";
import {Observable} from "rxjs";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {NDVIComponent} from "./ndvi/ndvi.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, SplitPanelComponent, SideMenuComponent, MatNavList, MatListItem, RouterLink, MatIcon, NDVIComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Earth Observation';
  protected isHandset: boolean = false;
   fillerNav:string[][] = [['NDVI', '/ndvi', 'grass'], ['NDWI', '/ndwi', 'water'], ["Land Cover", '/land-cover', 'terrain '], ['Surface Temperature', '/lst', 'whatshot']]

  constructor(private bs: BreaksService) {
    bs.isHandset$.subscribe(result => {
      this.isHandset = result;
    });
  }
}
