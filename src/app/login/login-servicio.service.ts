import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioI } from '../interfaces/usuario-i';

import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LS_TOKEN } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginServicioService {

  constructor(private objHttp: HttpClient) { }

  validUser(datos: UsuarioI): Observable<UsuarioI> {
    const URL_API = 'http://localhost:3000/usuario/sigin';
    const obj$ = this.objHttp.post<UsuarioI>(URL_API, datos);
    return obj$;
  }

  // ====== Devuelve el token creado.
  getToken(): string {
    return localStorage.getItem(LS_TOKEN); // Devuelve el token.
  }

  getUsuarios(): Observable<UsuarioI> {
    const URL_API = 'http://localhost:3000/usuario';
    const obj$ = this.objHttp.get<UsuarioI>(URL_API);
    return obj$;
  }
}
