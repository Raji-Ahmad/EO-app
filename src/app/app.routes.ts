import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NDVIComponent} from "./ndvi/ndvi.component";
import {NdwiComponent} from "./ndwi/ndwi.component";
import {LandCoverComponent} from "./land-cover/land-cover.component";
import {LstComponent} from "./lst/lst.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ndvi', component: NDVIComponent},
{ path: 'ndwi', component: NdwiComponent},
{ path: 'land-cover', component: LandCoverComponent},
  {path: 'lst', component: LstComponent}];
