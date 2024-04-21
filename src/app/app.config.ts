import { ApplicationConfig } from '@angular/core';
import {provideRouter, RouteReuseStrategy} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AppModule} from "./app/app.module";
import {provideHttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {CustomRouteReuseStrategy} from "./routeStartegy";



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),
    provideHttpClient(), DatePipe,  provideCharts(withDefaultRegisterables()),
  {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    }]
};
