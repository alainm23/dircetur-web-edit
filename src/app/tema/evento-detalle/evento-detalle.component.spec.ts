import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoDetalleComponent } from './evento-detalle.component';

describe('EventoDetalleComponent', () => {
  let component: EventoDetalleComponent;
  let fixture: ComponentFixture<EventoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
