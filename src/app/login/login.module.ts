import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from '@login/login-routing.module';
import { LoginComponent } from '@login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginServicioService } from '@login/login-servicio.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginServicioService
  ]
})
export class LoginModule { }
