import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
  imports: [
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule,
  ],
  exports: [],
  declarations: [SignupComponent, LoginComponent],
  providers: [],
})
export class AuthModule { }
