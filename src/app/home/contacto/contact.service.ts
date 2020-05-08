import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContactService {

  private socket: any;
  readonly urlWs: string = 'ws://localhost:3000/'; // Url API socket.error
  // readonly urlWs: string = 'ws://echo.websocket.org';

  constructor(private objHttp: HttpClient ) {
    this.socket = io.connect(this.urlWs);
  }

  conexion() {
    this.socket.on('info', (data: any) => {
      console.log(data);  // Muestra datos del evento 'info', emitido desde el server.
      // this.socket.on('msj', (x: any) => console.log(JSON.parse(x)));
    });
  }

  enviaMensaje(argMsj: any) {
    this.socket.emit('msj', JSON.stringify(argMsj));
  }

  enviaMensaje2(argMsj: any) {
    console.log(argMsj);
    this.objHttp.post('http://localhost:3000/contacto', argMsj)
    .subscribe({
      next: (r) => console.log( r ),
      error: (err) => console.log(err.message),
      complete: () => { console.log('Completado'); }
    });
    // this.socket.emit('msj', JSON.stringify(argMsj));
  }

  getSocket() {
    return this.socket;
  }

/*
  // Inicia el socket del cliente.
  listen(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
        observer.error({msj: 'Problema al obtener los datos'});
        observer.complete();
      });
    });
  }
  */
}
