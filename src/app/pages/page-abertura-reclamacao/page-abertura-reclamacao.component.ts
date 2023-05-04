import { Component, OnInit } from '@angular/core';
import { AbstractPages } from '../AbstractPages';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertType } from 'src/app/models/payloads/Alert';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PathRouter } from 'src/app/app-routing.module';
import { StateService } from 'src/app/services/state/state-service';

@Component({
  selector: 'app-page-abertura-reclamacao',
  templateUrl: './page-abertura-reclamacao.component.html',
  styleUrls: ['./page-abertura-reclamacao.component.css']
})
export class PageAberturaReclamacaoComponent extends AbstractPages implements OnInit {

  private urlCliente = `${environment.api.cliente}`;
  private urlCategoria = `${environment.api.categoria}`;
  private urlProduto = `${environment.api.produto}`;
  private urlReclamacao = `${environment.api.reclamacao}`;

  public formAbertura!: FormGroup;

  // Inputs
  public isSearchValid: boolean = true;
  public isInsertValid: boolean = true;

  // Combos
  public comboCategoria: any;
  public comboProduto: any;

  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private http: HttpClient, private router: Router
    ) {
    super();
  }

  ngOnInit(): void {
    super.buildAlert();
    this.buildForm();

    // Inicializa os combos
    this.callCategoriaService();
    this.callProdutoService();
  }

  buildForm(): void {
    this.formAbertura = this.formBuilder.group({
      // Dados Cliente
      documento: new FormControl({ value: '', disabled: false }, [
        Validators.minLength(11),
        Validators.maxLength(16),
        Validators.required
      ]),
      codigoCliente: new FormControl({ value: '', disabled: true }, [
        Validators.minLength(9),
        Validators.required
      ]),
      descricaoCliente: new FormControl({ value: '', disabled: true }),

      // Dados categoria
      codigoCategoria: new FormControl({ value: '', disabled: false }, [
        Validators.required
      ]),

      // Dados Produto
      codigoProduto: new FormControl({ value: '', disabled: false }, [
        Validators.required
      ]),

      // Dados Reclamacao
      descricao: new FormControl({ value: '', disabled: false }, [
        Validators.maxLength(500),
        Validators.required
      ]),
    });
  }

  /**
   * ---------------------------------------------------------------
   *
   *        Combos
   *
   * ---------------------------------------------------------------
   */


  callCategoriaService(): void {
    this.http.get(`${this.urlCategoria}`, { headers: super.getHeaders() })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("ERRO " + JSON.stringify(error));
        this.showMessage('Não foi possível efetuar a operação!', AlertType.error);
        return throwError(error.message);
      })
    )
    .subscribe({
      next: (data: any) => {
        console.log("CATEGORIA => " + JSON.stringify(data));
        this.comboCategoria = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.showMessage('Não foi possível efetuar a consulta por categorias!', AlertType.error);
      },
    });
  }

  callProdutoService(): void {
    this.http.get(`${this.urlProduto}`, { headers: super.getHeaders() })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("ERRO " + JSON.stringify(error));
        this.showMessage('Não foi possível efetuar a operação!', AlertType.error);
        return throwError(error.message);
      })
    )
    .subscribe({
      next: (data: any) => {
        console.log("PRODUTO => " + JSON.stringify(data));
        this.comboProduto = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.showMessage('Não foi possível efetuar a consulta por produtos!', AlertType.error);
      },
    });
  }

  /**
   * ---------------------------------------------------------------
   *
   *        Actions
   *
   * ---------------------------------------------------------------
   */

  findConsumer(): void {

    this.isSearchValid = true;
    var documentoFormat = this.formAbertura.value.documento.replace(/[^\d]/g, '');
    console.log("DOCUMENTO CLIENTE (ENTRADA!) => " + JSON.stringify(documentoFormat));

    if(documentoFormat == '') {
      this.isSearchValid = false;
      this.showMessage('Campo "Documento" invalido!', AlertType.warning);
      return;
    }

    this.http.get(`${this.urlCliente}/` + documentoFormat, { headers: super.getHeaders() })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("ERRO " + JSON.stringify(error));
        this.showMessage('Não foi possível efetuar a operação!', AlertType.error);
        return throwError(error.message);
      })
    )
    .subscribe({
      next: (data: any) => {
        console.log("CLIENTE => " + JSON.stringify(data));
        this.formAbertura.patchValue({
          codigoCliente: data.documento,
          descricaoCliente: data.nome
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.showMessage('Cliente não encontrado!', AlertType.error);
      },
    });
  }

  insert(): void {

    this.isInsertValid = true;
    if (!this.formAbertura.valid) {
      this.isInsertValid = false;
      return;
    }

    const reclamacao = JSON.stringify(this.formAbertura.value);
    console.log("RECLAMACAO (ENTRADA!) => " + JSON.stringify(reclamacao));
    this.http.post(`${this.urlReclamacao}`, reclamacao, { headers: super.getHeaders() })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("ERRO " + JSON.stringify(error));
        this.showMessage('Não foi possível efetuar a operação!', AlertType.error);
        return throwError(error.message);
      })
    )
    .subscribe({
      next: (data) => {
        this.showMessage('Operação realizada com sucesso!', AlertType.info);
        this.stateService.data = data;
        this.router.navigateByUrl(PathRouter.anexo);
      },
      error: (error) => {
        this.isInsertValid = false;
        console.error('There was an error!', error);
        this.showMessage('Não foi possível efetuar a operação!', AlertType.error);
      },
    });
  }
}
