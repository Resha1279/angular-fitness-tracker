import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false
  private loadingStateSubscription: Subscription

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.loadingStateSubscription = this.uiService.loadingState.subscribe(state => {
      this.isLoading = state
    })

    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })
  }


  ngOnDestroy() {
    if (this.loadingStateSubscription) {
      this.loadingStateSubscription.unsubscribe();
    }
  }

}
