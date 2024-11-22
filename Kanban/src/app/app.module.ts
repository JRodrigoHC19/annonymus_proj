import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Módulo de rutas
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { ProyectosComponent } from './dashboard/proyectos/proyectos.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { ConfiguracionComponent } from './dashboard/configuracion/configuracion.component';
import { LogoutComponent } from './dashboard/logout/logout.component';
import { InicioComponent } from './dashboard/inicio/inicio.component';
import { ProyectoDetalleComponent } from './dashboard/proyecto-detalle/proyecto-detalle.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsuariosComponent,
    ProyectosComponent,
    PerfilComponent,
    ConfiguracionComponent,
    LogoutComponent,
    InicioComponent,
    ProyectoDetalleComponent,
    //CrearGruposComponent  // Solo AppComponent aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Módulo de rutas
    // No necesitas importar LoginComponent o LoginDocenteComponent aquí
    RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
