import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

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

  getEventoSocket() {
    /*
    this.socket.on('msj', (x: any) => {
      console.log(x);
      // this.datosChat = x;
    });
    */

    return new Observable( (observer) => {
      this.socket.on('msj', (data: any) => {

        if ( data.length < 0) {
          observer.error('Error de datos. No hay');
        } else {
          observer.next(data);
          // observer.next('datos enviados');
          // observer.complete(); // marca el observable y
          // no permite escuchar mas cambios en la data.
        }
        // observer.complete();
      }
        // Al escuchar el evento de desconexion de socket
        // se marca como completado el observable.
      );
    });
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
