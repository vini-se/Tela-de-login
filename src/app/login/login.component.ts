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
      email: ['admin@admin', Validators.compose([Validators.required, Validators.email])],
      password: ['admin123', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  openSubmitModal(template: TemplateRef<any>): void {
    this.submitLoginForm();
    this.modalRef = this._modalService.show(template);
  }

  submitLoginForm(): void {
    const pegarValue: ILogin = this.loginForm.value;
    const { email, password, ...outros } = pegarValue;

    const userWebToken = {date : new Date(Date.now()).toLocaleString([], {dateStyle: 'short'}), status: 'userIsLogged'}

    this.classSubmitModal = 'text-';

    if (email === "admin@admin" && password === "admin123") {
      localStorage.setItem('webToken', JSON.stringify(userWebToken));
      const retrievedUserWebToken: any = localStorage.getItem('webToken');

      this.phraseSubmitModal = 'Login com sucesso!<br><br>Data do login: ' + JSON.parse(retrievedUserWebToken).date;
      this.classSubmitModal += 'success';
    }
    else {
      localStorage.removeItem('webToken');
      this.phraseSubmitModal = 'Email ou senha inválida!';
      this.classSubmitModal += 'danger';
    }
  }
}
