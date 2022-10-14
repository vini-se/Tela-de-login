import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.createForm();
  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }
}
