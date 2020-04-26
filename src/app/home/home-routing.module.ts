import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COmponentes de la app.
import { HomeComponent } from './home.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CasosComponent } from './casos/casos.component';
import { ContactoComponent } from './contacto/contacto.component';

// Arreglo de rutas.
const routes: Routes = [
  {
    path: '', redirectTo: 'graficos', pathMatch: 'full'
  },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'graficos', component: EstadisticasComponent },
      { path: 'casos', component: CasosComponent },
      { path: 'contacto', component: ContactoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
