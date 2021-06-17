import { Injectable } from '@angular/core';
import { User } from './user.model'
import { AuthData } from './auth-data.model'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>()//just like eventEmitter. Other components can subscribe to this like a state and get real time change.

  private isAuthenticated = false;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) { }


  registerUser(authData: AuthData) {

    this.angularFireAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result)
      this.authSuccessfully()
    }).catch(error => {
      console.log(error)
    })


  }

  login(authData: AuthData) {
    this.angularFireAuth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result)
      this.authSuccessfully()
    }).catch(error => {
      console.log(error)
    })
  }

  logout() {
    this.isAuthenticated = false

    this.authChange.next(false)//used just like event emitter .next() instead of .emit()

    this.router.navigate(['/login'])
  }

  authSuccessfully() {
    this.authChange.next(true)
    this.router.navigate(['/training'])
    this.isAuthenticated = true
  }


  isAuth() {
    return this.isAuthenticated
  }

}
