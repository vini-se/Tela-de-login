import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
