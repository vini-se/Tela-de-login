import { Component, OnDestroy, OnInit, TemplateRef  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ILogin } from './../shared/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  modalRef?: BsModalRef;
  classSubmitModal!: string;
  phraseSubmitModal: string = 'Valor inicial não alterado';

  constructor(

    private _formBuilder: FormBuilder,
    private _modalService: BsModalService

   ){

    this.createLoginForm();

  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    localStorage.removeItem('webToken');
  }

  createLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  openSubmitModal(template: TemplateRef<any>): void {
    this.submitLoginForm();
    this.modalRef = this._modalService.show(template);
  }

  submitLoginForm(): void {
    const pegarValue: ILogin = this.loginForm.value;
    const { email, password, ...outros } = pegarValue;
    this.classSubmitModal = 'text-';

    if (email === "admin@admin" && password === "admin123") {
      localStorage.setItem('webToken', 'userIsLogged');
      // webToken: {date = new Date(), status = 'userIsLogged'}
      const userWebToken = localStorage.getItem('webToken');
      this.phraseSubmitModal = 'Login com sucesso! ' + userWebToken;
      this.classSubmitModal += 'success';
    }
    else {
      localStorage.removeItem('webToken');
      this.phraseSubmitModal = 'Email ou senha inválida!';
      this.classSubmitModal += 'danger';
    }
  }
}
