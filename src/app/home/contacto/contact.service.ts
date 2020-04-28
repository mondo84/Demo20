import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class ContactService {

  socket: any;
  readonly urlWs: string = 'ws://localhost:3000';

  constructor() {
    this.socket = io(this.urlWs); // Conexion al servidor.
  }

  listen(eventName: string): Observable<any> {
    return new Observable((res) => {
      this.socket.on(eventName, (data) => {
        res.next(data);
        res.error( err => console.error(err.error) );
        res.complete();
      });
    });
  }

  emit(eventName: string, data: any) {
    // this.socket.on(eventName, data);
    this.socket.emit(eventName, JSON.stringify(data));
  }

  on(eventName: string) {
    this.socket.on(eventName, (argSocket) => {
      console.log( JSON.parse(argSocket));
    });
  }
}
