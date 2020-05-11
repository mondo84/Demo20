import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interface de usuario.
import { UsuarioI } from '@interfaces/usuario-i';

// Libreria Rxjs
import { Observable } from 'rxjs';

// Variables de entorno.
import { LS_TOKEN, URL_API_SIGIN, URL_API_GET_USER } from '@environments/environment';

@Injectable({ providedIn: 'root' }) // Auto proveer en el app.module
export class LoginServicioService {

  constructor(private objHttp: HttpClient) { }  // Inyeccion del servicio HttpClient

  validUser(datos: UsuarioI): Observable<UsuarioI> {

    const obj$ = this.objHttp.post<UsuarioI>(URL_API_SIGIN, datos);
    return obj$;
  }

  // ====== Devuelve el token creado.
  getToken(): string {
    return localStorage.getItem(LS_TOKEN); // Devuelve el token.
  }

  getUsuarios(): Observable<UsuarioI> {
    const obj$ = this.objHttp.get<UsuarioI>(URL_API_GET_USER);
    return obj$;
  }
}
