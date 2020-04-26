import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CasosComponent } from './casos/casos.component';


@NgModule({
  declarations: [HomeComponent, EstadisticasComponent, CasosComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
