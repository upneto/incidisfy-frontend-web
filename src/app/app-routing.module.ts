import { Login } from 'src/app/models/login';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Components */
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageAberturaReclamacaoComponent } from './pages/page-abertura-reclamacao/page-abertura-reclamacao.component';
import { PageAnexoReclamacaoComponent } from './pages/page-anexo-reclamacao/page-anexo-reclamacao.component';
import { PageListaReclamacaoComponent } from './pages/page-lista-reclamacao/page-lista-reclamacao.component';

export class PathRouter {
	static login: string = 'login';
  static abertura: string = 'abertura';
  static anexo: string = 'anexo';
  static lista: string = 'lista';
}

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: PathRouter.login, component: PageLoginComponent },
  { path: PathRouter.abertura, component: PageAberturaReclamacaoComponent },
  { path: PathRouter.anexo, component: PageAnexoReclamacaoComponent },
  { path: PathRouter.lista, component: PageListaReclamacaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
