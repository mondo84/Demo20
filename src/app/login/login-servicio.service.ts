import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioI } from '../interfaces/usuario-i';

import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginServicioService {

  constructor(private objHttp: HttpClient) { }

  validUser(datos: UsuarioI): Observable<UsuarioI> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const URL_API = 'http://localhost:3000/usuario/sigin';
    // console.log('Datos: ', datos);
    // console.log(argUser);
    const obj$ = this.objHttp.post<UsuarioI>(URL_API, datos, httpOptions);
    return obj$;
  }
}
