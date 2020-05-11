import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// interfaces
import { UsuarioI } from '@interfaces/usuario-i';
import { CasoI } from '@interfaces/caso-i';

// rxjs
import { Observable } from 'rxjs';

// socket io-client
import * as io from 'socket.io-client';
import { URL_API_GET_USER } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CasosServicioService {

  socket: any;
  readonly url: string = 'ws://localhost:3000';

  constructor(private objHttp: HttpClient) {
  }

  setupSocketConnection() {
    this.socket = io(this.url); // Instancia del socket.
    // Se envia evento de info al servidor.
  }

  getUsuarios(): Observable<UsuarioI> {

    const obj$ = this.objHttp.get<UsuarioI>(URL_API_GET_USER);
    return obj$;
  }

  reqCasos(argForm: CasoI) {
    this.socket.emit('tabla', JSON.stringify(argForm));
  }

  getAllCasos(): Observable<any> {

    return new Observable ( (observer$) => {
      this.socket.on('tabla', (r: any) => {
        observer$.next( JSON.parse(r));
        observer$.error({error: 'Algo anda mal'});
        observer$.complete();
      });
    });
  }

  getCasos() {
    const datos: any = [
      { id: 1, estado: 'Abierto', creacion: '02', resp: 'Yesid' },
      { id: 2, estado: 'Cerrado', creacion: '03', resp: 'Enrique' },
      { id: 3, estado: 'Abierto', creacion: '04', resp: 'Davila' },
      { id: 4, estado: 'Abierto', creacion: '02', resp: 'Yesid' },
      { id: 5, estado: 'Cerrado', creacion: '03', resp: 'Enrique' },
      { id: 6, estado: 'Abierto', creacion: '04', resp: 'Davila' },
      { id: 7, estado: 'Abierto', creacion: '02', resp: 'Yesid' },
      { id: 8, estado: 'Cerrado', creacion: '03', resp: 'Enrique' },
      { id: 10, estado: 'Abierto', creacion: '04', resp: 'Davila' }
    ];
    return new Observable ( (observer) => {
      observer.next(datos);
      observer.error({msg: 'Algo anda mal'});
      observer.complete();
    });
  }
}
