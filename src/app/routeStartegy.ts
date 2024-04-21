import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy,} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private routeStore = new Map<string, DetachedRouteHandle>();
  private reRoutes = ['ndvi', 'ndwi', 'land-cover', 'lst']

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path ?? '';
    return this.reRoutes.includes(path);
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const path = route.routeConfig?.path ?? '';
    this.routeStore.set(path, handle);
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path ?? '';
    return (
      this.reRoutes.includes(path) && !!this.routeStore.get(path)
    );
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const path = route.routeConfig?.path ?? '';
    return this.routeStore.get(path)!;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

}
