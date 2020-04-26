import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CasosComponent } from './casos/casos.component';
import { ContactoComponent } from './contacto/contacto.component';


@NgModule({
  declarations: [
    HomeComponent,
    EstadisticasComponent,
    CasosComponent,
    ContactoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
