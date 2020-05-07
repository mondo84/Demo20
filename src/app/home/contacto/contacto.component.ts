import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactService } from './contact.service';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit, OnDestroy {

  objChatForm: FormGroup;
  objContactoForm: FormGroup;
  obSocket: any;
  datosChat: any;

  constructor(private argSerContact: ContactService,
              private fb: FormBuilder) {
    this.chatForm();
    this.contactFrom();
  }

  ngOnInit() {
    this.argSerContact.conexion();
    this.obSocket = this.argSerContact.getSocket(); // Se obtiene el socket.
    this.cargaDatos();
  }

  ngOnDestroy(): void {
    // Cerrar conexion de socket.
  }

  chatForm() {
    this.objChatForm = this.fb.group({
      nombre: [''],
      mensaje: ['', {
                      validators: [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(200)
                      ]
              }]
      // areaTexto: ['']
    });
  }

  contactFrom() {
    this.objContactoForm = this.fb.group({
      nombre: ['', {
                validators: [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(50)
                ]
              }],
      mensaje: ['', {
                  validatos: [
                    Validators.required,
                    Validators.minLength(2)
                  ]
                }]
    });
  }

  cargaDatos() {
    // Recibe el evento del socket desde el server.
    this.obSocket.on('msj', (x: any) => {
      console.log(x);
      this.datosChat = x;
      const objChat = document.getElementById('chat');

      const nomb = JSON.parse(x).nombre;
      const msg = JSON.parse(x).mensaje;
      objChat.innerHTML += '<strong>' + nomb + '</strong>: ' + msg + '<br/><br/>';
    });
  }

  onSubmit() {
    // console.log(this.loginForm.value);
    this.argSerContact.enviaMensaje(this.objChatForm.value);
    this.objChatForm.get('mensaje').patchValue('');
  }

  onSubmit2() {
    this.argSerContact.enviaMensaje2(this.objContactoForm.value);
    this.objContactoForm.get('mensaje').patchValue('');
  }
}
