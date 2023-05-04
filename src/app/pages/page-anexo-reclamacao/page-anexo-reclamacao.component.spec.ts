import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAnexoReclamacaoComponent } from './page-anexo-reclamacao.component';

describe('PageAnexoReclamacaoComponent', () => {
  let component: PageAnexoReclamacaoComponent;
  let fixture: ComponentFixture<PageAnexoReclamacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAnexoReclamacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAnexoReclamacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
