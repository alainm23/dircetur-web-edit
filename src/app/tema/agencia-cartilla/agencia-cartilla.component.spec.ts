import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciaCartillaComponent } from './agencia-cartilla.component';

describe('AgenciaCartillaComponent', () => {
  let component: AgenciaCartillaComponent;
  let fixture: ComponentFixture<AgenciaCartillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenciaCartillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenciaCartillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
