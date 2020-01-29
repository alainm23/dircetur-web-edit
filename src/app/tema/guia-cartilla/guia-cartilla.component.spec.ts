import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaCartillaComponent } from './guia-cartilla.component';

describe('GuiaCartillaComponent', () => {
  let component: GuiaCartillaComponent;
  let fixture: ComponentFixture<GuiaCartillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaCartillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaCartillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
