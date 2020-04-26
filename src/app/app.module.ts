import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { InterceptorHttpService } from './interceptors/interceptor-http.service'; // Servicio interceptor.

@NgModule({
  declarations: [
    AppComponent,
    NoFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttpService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// configurar la lista blanca en el cors del servidor.
