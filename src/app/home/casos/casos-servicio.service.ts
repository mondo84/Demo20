import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// interface
import { UsuarioI } from 'src/app/interfaces/usuario-i';

// rxjs
import { Observable } from 'rxjs';

// socket io-client
// import * as io from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class CasosServicioService {

  // socket: any;
  // readonly url: string = 'ws://localhost:3000';

  constructor(private objHttp: HttpClient) {
    // this.socket = io(this.url); // Instancia del socket.
  }

  getUsuarios(): Observable<UsuarioI> {
    const URL_API = 'http://localhost:3000/usuario';
    const obj$ = this.objHttp.get<UsuarioI>(URL_API);
    return obj$;
  }


}
