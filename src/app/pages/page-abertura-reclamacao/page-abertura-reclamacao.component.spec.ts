import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAberturaReclamacaoComponent } from './page-abertura-reclamacao.component';

describe('PageAberturaReclamacaoComponent', () => {
  let component: PageAberturaReclamacaoComponent;
  let fixture: ComponentFixture<PageAberturaReclamacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAberturaReclamacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAberturaReclamacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
