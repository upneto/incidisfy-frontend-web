
/* CORE */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';

/** Componentes */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { PageLoginComponent } from './pages/page-login/page-login.component';
import { StateService } from './services/state/state-service';

import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptos/loading.interceptor';
import { PageAberturaReclamacaoComponent } from './pages/page-abertura-reclamacao/page-abertura-reclamacao.component';
import { PageAnexoReclamacaoComponent } from './pages/page-anexo-reclamacao/page-anexo-reclamacao.component';
import { PageListaReclamacaoComponent } from './pages/page-lista-reclamacao/page-lista-reclamacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageLoginComponent,
    PageAberturaReclamacaoComponent,
    PageAnexoReclamacaoComponent,
    PageListaReclamacaoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AngularMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgbModule,

    MatNativeDateModule,
    MatSelectModule,
    NgxMatSelectSearchModule,

    NgbAlertModule
  ],
  providers: [
    StateService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
