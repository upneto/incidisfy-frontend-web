import { Component, OnInit } from '@angular/core';
import { AbstractPages } from '../AbstractPages';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { Reclamacao } from 'src/app/models/reclamacao';
import { HttpClient } from '@angular/common/http';
import { StateService } from 'src/app/services/state/state-service';
import { AlertType } from 'src/app/models/payloads/Alert';
import { Router } from '@angular/router';
import { PathRouter } from 'src/app/app-routing.module';

@Component({
  selector: 'app-page-lista-reclamacao',
  templateUrl: './page-lista-reclamacao.component.html',
  styleUrls: ['./page-lista-reclamacao.component.css']
})
export class PageListaReclamacaoComponent extends AbstractPages implements OnInit {

  private urlReclamacao = `${environment.api.reclamacao}`;

   // Tabela
   public displayedColumns: string[] = [
    'codigo', 'descricao', 'statusAberto', 'reincidente'
  ];
  public dataSource = new MatTableDataSource<Reclamacao>([]);
  public clickedRows = new Set<Reclamacao>();
  public filterValues: any = {};
  public filterSelectObj: any = [];

  constructor(
    private router: Router,
    private stateService: StateService,
    private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.buildAlert();

    // Pesquisar lista Ordens de serviço
    this.findAll();

    // Cria filtros para a lista
    this.filterSelectObj.filter((o: any) => {
      o.options = this.getFilterObject(this.dataSource.data, o.columnProp);
    });
  }

  findAll(): Reclamacao[] {
    let list: Reclamacao[] = [];
    this.http.get(`${this.urlReclamacao}`, { headers: super.getHeaders() }).subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.showMessage('Não foi possível efetuar a consulta!', AlertType.error);
      }
    });
    return list;
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
   *             NAVEGACAO
   * -----------------------------------------
   */

  detalhar(row: Reclamacao) {
    this.stateService.data = row;
    console.log('Selecionado => ' + this.stateService.data);
    this.router.navigateByUrl(PathRouter.abertura);
  }

}
