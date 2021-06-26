
import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  constructor(
    private store: Store<fromRoot.State>
  ) { }

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth)
  }
}
