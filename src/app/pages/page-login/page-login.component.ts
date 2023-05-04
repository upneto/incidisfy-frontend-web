import { AlertType } from './../../models/payloads/Alert';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AbstractPages } from '../AbstractPages';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PathRouter } from 'src/app/app-routing.module';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css'],
})
export class PageLoginComponent extends AbstractPages implements OnInit {

  private urlBase = `${environment.api.login}`;

  public formLogin!: FormGroup;
  public isValid: boolean = true;

  constructor(
    private router: Router,
    private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.buildForm(new Login());
    super.buildAlert();
  }

  buildForm(login: Login): void {
    this.isValid = true;
    this.formLogin = new FormGroup({
      usuario: new FormControl({ value: login.usuario, disabled: false }, [
        Validators.maxLength(30),
        Validators.required,
      ]),
      senha: new FormControl({ value: login.senha, disabled: false }, [
        Validators.maxLength(30),
        Validators.required,
      ]),
    });
  }

  doLogin(): void {
    if (this.formLogin.valid) {
      console.log('Executou login! ' + this.formLogin.value);
      this.callService();
    } else {
      this.isValid = false;
      console.log('Formulario invalido!');
    }
  }

  callService(): void {
    const logon = JSON.stringify(this.formLogin.value);

    console.log("LOGON => " + logon);
    console.log("URL   => " + this.urlBase);
    console.log("HTTP IS ACTIVE   => " + this.httpClient != null);

    this.httpClient.post(this.urlBase, logon, { headers: super.getHeaders() }).subscribe({
      next: (data: any) => {
        if(data) {
          console.log(JSON.stringify(data));
          this.isValid = true;
          super.setStorageItem('JWT_TOKEN', data.token)
          this.router.navigateByUrl(PathRouter.abertura);
        }
      },
      error: (error) => {
        this.isValid = false;
        console.error('There was an error!', error);
        this.showMessage('Erro ao efetuar o login', AlertType.error);
      },
    });
  }
}
