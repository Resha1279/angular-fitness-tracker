
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service'
import * as fromRoot from '../app.reducer'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router, private store: Store<fromRoot.State>) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if (this.store.select(fromRoot.getIsAuth)) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login'])
  //   }

  // }

  canLoad(route: Route) {
    if (this.store.select(fromRoot.getIsAuth)) {
      return true;
    } else {
      this.router.navigate(['/login'])
    }
  }
}
