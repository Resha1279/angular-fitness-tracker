import { Injectable } from '@angular/core';
import { User } from './user.model'
import { AuthData } from './auth-data.model'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>()//just like eventEmitter. Other components can subscribe to this like a state and get real time change.

  private user: User;

  constructor(private router: Router) { }


  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };

    this.authChange.next(true)
    this.router.navigate(['/training'])
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };

    this.authChange.next(true)
    this.router.navigate(['/training'])
  }

  logout() {
    this.user = null;
    this.authChange.next(false)//used just like event emitter .next() instead of .emit()

    this.router.navigate(['/login'])
  }

  getUser() {
    return { ...this.user }
  }

  isAuth() {
    return this.user != null
  }

}
