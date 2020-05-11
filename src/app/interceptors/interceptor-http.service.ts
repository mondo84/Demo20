import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { LoginServicioService } from '@login/login-servicio.service';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InterceptorHttpService implements HttpInterceptor {

  constructor(private objLgService: LoginServicioService) { }

  // Implementacion del metodo intercept.
  intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(req.body);
    const token = this.objLgService.getToken(); // Recupera el token.

    let newHeaders = req.headers;

    if (token) {
      // Si tenemos un token, lo anexamos al encabezado.
      newHeaders = newHeaders.append('Authorization', `Bearer ${token}`);
      newHeaders = newHeaders.append('Content-Type', 'application/json');
    }

    // Se clona la request para poder ser manipulada. Y se le agrega el token.
    const reqClone = req.clone({ headers: newHeaders });

    // Retorna el request clonado con los nuevos valores.
    return next.handle(reqClone).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores del service. Maneja los errores de todas las peticiones http.
  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // Se produjo un error del lado del cliente o de la red.
      console.error('Ha ocurrido un error:', error.error.message);

    } else {
      // El backend devolvió un código de respuesta fallido.
      // La respuesta del body puede contener detalles del error,
      console.error('Backend retona codigo: ' + error.status );
      console.error('Respuesta del body: ' + error.message );
    }

    // Retorna un observable con una respuesta al usuario.
    return throwError(
      error
    );
  }
}
