import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoFoundComponent } from './no-found/no-found.component';

// Ruatas de la app.
const routes: Routes = [
  {
    path: 'login',
    loadChildren: async () => {
        const moduloLogin = await import('./login/login.module');
        return moduloLogin.LoginModule;
      }
  },
  {
    path: 'home',
    loadChildren: async () => {
      const moduloHome = await import('./home/home.module');
      return moduloHome.HomeModule;
    }
  },
  {
    path: '**', component: NoFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
