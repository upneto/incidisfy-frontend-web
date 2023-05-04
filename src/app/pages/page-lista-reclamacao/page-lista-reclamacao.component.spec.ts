import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListaReclamacaoComponent } from './page-lista-reclamacao.component';

describe('PageListaReclamacaoComponent', () => {
  let component: PageListaReclamacaoComponent;
  let fixture: ComponentFixture<PageListaReclamacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListaReclamacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageListaReclamacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
