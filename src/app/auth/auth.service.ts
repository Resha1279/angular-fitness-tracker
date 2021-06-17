import { Injectable } from '@angular/core';
import { User } from './user.model'
import { AuthData } from './auth-data.model'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth, } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>()//just like eventEmitter. Other components can subscribe to this like a state and get real time change.

  private isAuthenticated = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiService: UIService
  ) { }




  initAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        console.log(user)
        this.isAuthenticated = true
        this.authChange.next(true)
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscriptions()

        this.authChange.next(false)//used just like event emitter .next() instead of .emit()
        this.router.navigate(['/login'])
        this.isAuthenticated = false
      }
    })
  }





  registerUser(authData: AuthData) {
    this.uiService.loadingState.next(true)
    this.angularFireAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.uiService.loadingState.next(false)
    }).catch(error => {
      this.uiService.loadingState.next(false)
      this.snackbar.open(error.message, null, {
        duration: 5000,
        verticalPosition: 'top'
      })
    })


  }

  login(authData: AuthData) {
    this.uiService.loadingState.next(true)
    this.angularFireAuth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.uiService.loadingState.next(false)
    }).catch(error => {
      this.uiService.loadingState.next(false)
      this.snackbar.open(error.message, null, {
        duration: 5000,
        verticalPosition: 'top'
      })
    })
  }

  logout() {

    this.angularFireAuth.signOut()

  }


  isAuth() {
    return this.isAuthenticated
  }

}
