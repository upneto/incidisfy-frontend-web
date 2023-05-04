import { Component, OnInit } from '@angular/core';
import { AbstractPages } from '../AbstractPages';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/state/state-service';
import { Reclamacao } from 'src/app/models/reclamacao';
import { MatTableDataSource } from '@angular/material/table';
import { AlertType } from 'src/app/models/payloads/Alert';
import { Anexo } from 'src/app/models/anexo';

@Component({
  selector: 'app-page-anexo-reclamacao',
  templateUrl: './page-anexo-reclamacao.component.html',
  styleUrls: ['./page-anexo-reclamacao.component.css']
})
export class PageAnexoReclamacaoComponent extends AbstractPages implements OnInit {

  private urlAnexo = `${environment.api.anexo}`;
  private urlReclamacao = `${environment.api.reclamacao}`;

  // Inputs
  public reclamacao!: Reclamacao;
  public formAnexo!: FormGroup;

  public isSearchValid: boolean = true;
  public isInsertValid: boolean = true;

  // Tabela
  public displayedColumns: string[] = [
    'nomeArquivo'
  ];
  public dataSource = new MatTableDataSource<Anexo>([]);
  public clickedRows = new Set<Anexo>();
  public filterValues: any = {};
  public filterSelectObj: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private http: HttpClient
  ) {
    super();
  }

  ngOnInit(): void {
    super.buildAlert();
    this.buildForm();

    // Cria filtros para a lista
    this.filterSelectObj.filter((o: any) => {
      o.options = this.getFilterObject(this.dataSource.data, o.columnProp);
    });
  }

  buildForm(): void {

    this.reclamacao = this.stateService.data as Reclamacao;
    if(this.reclamacao == null) {
      this.reclamacao = new Reclamacao();
    }
    console.log('Reclamacao => ' + this.reclamacao.codigo);

    this.formAnexo = this.formBuilder.group({
      // Dados Cliente
      codigo: new FormControl({ value: this.reclamacao.codigo, disabled: false }, [
        Validators.maxLength(100),
        Validators.required
      ]),
      documento: new FormControl({ value: this.reclamacao.codigoCliente, disabled: true }, [
        Validators.required
      ])
    });
  }

  /**
   * -----------------------------------------
   *            Funcoes
   * -----------------------------------------
   */

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if(selectedFile) {
      const anexo: Anexo = new Anexo();
      anexo.codigoReclamacao = this.formAnexo.value.codigo;
      anexo.nomeArquivo = selectedFile.name;
      anexo.tamanho = selectedFile.size;
      anexo.extensao = selectedFile.type;

      this.fileToBase64(selectedFile, (base64String) => {
        anexo.arquivo = base64String;
        if(!base64String) {
          this.showMessage('Não foi possível efetuar a operação!', AlertType.error);
          return;
        }
        this.upload(anexo);
      });
    }
  }

  findReclamation() {

  }

  upload(anexo: Anexo) {
    console.log(JSON.stringify(anexo));

    this.dataSource.data.push(anexo);
    this.dataSource.data = this.dataSource.data
  }

  download(row: any) {

  }

  /**
   * -----------------------------------------
   *            Call Endpoints
   * -----------------------------------------
   */

  callUploadService() {

  }

  /**
   * -----------------------------------------
   *            FILTRAR LISTA
   * -----------------------------------------
   */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any[] = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  /**
   * -----------------------------------------
   *            Utilitarios
   * -----------------------------------------
   */

  fileToBase64(file: File, callback: (base64String: string) => void) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
      const base64String = reader.result?.toString().replace(/^data:.+;base64,/, '') || '';
      callback(base64String);
    };
  }
}
