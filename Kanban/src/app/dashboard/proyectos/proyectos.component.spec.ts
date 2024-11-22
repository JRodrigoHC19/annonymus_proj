import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ProyectosComponent } from './proyectos.component';
import { beforeEach, describe, it } from 'node:test';

describe('ProyectosComponent', () => {
  let component: ProyectosComponent;
  let fixture: ComponentFixture<ProyectosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectosComponent],
      imports: [FormsModule, CommonModule] // Importar módulos necesarios
    });
    fixture = TestBed.createComponent(ProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
