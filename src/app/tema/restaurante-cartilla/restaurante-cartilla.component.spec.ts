import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteCartillaComponent } from './restaurante-cartilla.component';

describe('RestauranteCartillaComponent', () => {
  let component: RestauranteCartillaComponent;
  let fixture: ComponentFixture<RestauranteCartillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestauranteCartillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranteCartillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
