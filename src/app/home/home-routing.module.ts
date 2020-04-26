import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CasosComponent } from './casos/casos.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'graficos', pathMatch: 'full'
  },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'graficos', component: EstadisticasComponent },
      { path: 'casos', component: CasosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
