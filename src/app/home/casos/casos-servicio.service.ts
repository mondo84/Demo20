import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioI } from 'src/app/interfaces/usuario-i';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CasosServicioService {

  constructor(private objHttp: HttpClient) { }

  getUsuarios(): Observable<UsuarioI> {
    const URL_API = 'http://localhost:3000/usuario';
    const obj$ = this.objHttp.get<UsuarioI>(URL_API);
    return obj$;
  }
}
