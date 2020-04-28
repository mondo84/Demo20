import { ContactService } from './contact.service';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  private obj: ContactService;

  constructor(private argSerContact: Injector) {
  }

  ngOnInit() {
    this.obj = this.argSerContact.get(ContactService);
    this.obj.listen('test event')
    .subscribe( (res) => {
      console.log(res);
    });

    this.lista();
    this.muestraTyping();
  }

  isWritter() { // Envia los datos en tiempo real.
    this.obj.emit('typing', { datos: 'escribiendo' } );
  }

  muestraTyping() { // Muestra los datos en tiempo real.
    this.obj.on('typing');
  }

  enviar() {
    // this.obj.emit('send', 'datos envidos');
    const objJson = { nombre: 'Yesid', msg: 'Mensaje enviado.' };
    this.obj.emit('datos', objJson );
  }

  lista() {
    this.obj.on('datos');
  }
}
