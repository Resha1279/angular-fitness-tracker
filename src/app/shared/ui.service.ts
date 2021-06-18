import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UIService {

  loadingState = new Subject<boolean>()

  constructor(private snackBar: MatSnackBar) { }


  showSnackbar(message: string, action: string, duration: number, position) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: position
    })
  }

}
