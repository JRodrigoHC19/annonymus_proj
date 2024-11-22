import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoDetalleComponent } from './proyecto-detalle.component';

describe('ProyectoDetalleComponent', () => {
  let component: ProyectoDetalleComponent;
  let fixture: ComponentFixture<ProyectoDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectoDetalleComponent]
    });
    fixture = TestBed.createComponent(ProyectoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
