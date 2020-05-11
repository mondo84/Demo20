import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactService } from './contact.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { PATTERN_EMAIL } from '@environments/environment'; // Variables de entorno.

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit, OnDestroy {

  objChatForm: FormGroup;     // Formulario 1.
  objContactoForm: FormGroup; // Formulario 2.
  obSocket: any;              // Socket.
  datosChat: any;             // Datos del chat.

  focusInput = false;
  focusInput2 = false;
  focusInput3 = false;

  txtBtnChatD = 'Enviar';
  txtBtnChatB = 'Bloqueado';

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
                  validators: [
                    Validators.required,
                    Validators.minLength(2)
                  ]
                }],
      email: ['elmondoles@gmail.com', {
                  validators: [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(100),
                    Validators.pattern(PATTERN_EMAIL)
                  ]
      }]
    });
  }

  cargaDatos() {
    // Recibe el evento del socket desde el server.
    this.obSocket.on('msj', (x: any) => {
      console.log(x);
      this.datosChat = x;
    });
  }

  onSubmit() {
    // console.log(this.objChatForm.value);
    this.argSerContact.enviaMensaje(this.objChatForm.value);
    this.objChatForm.get('mensaje').patchValue('');
  }

  onSubmit2() {
    this.argSerContact.enviaMensaje2(this.objContactoForm.value);
    this.objContactoForm.get('mensaje').patchValue('');
  }

  // Toggle de los labels.
  validaClick(numForm: number) {
    switch (numForm) {
      case 1:
        this.focusInput = true;
        break;
      case 2:
        this.focusInput2 = true;
        break;
      case 3:
        this.focusInput3 = true;
        break;
    }
  }

  validaBlur(numForm: number) {
    // console.log(`Formulario ${numForm}`);
    switch (numForm) {
      case 1:
        const inputFormNewReg = this.objContactoForm.get('nombre');  // Formulario registro.
        if ( inputFormNewReg.value.length <= 0 ) {
          this.focusInput = false;  // console.log('Baja');
        } else {
          this.focusInput = true;   // console.log('No baja');
        }
        break;
      case 2:
        const inputNombreFormSelReg = this.objChatForm.get('nombre');  // Formulario editar.
        if ( inputNombreFormSelReg.value.length <= 0 ) {
          this.focusInput2 = false;  // console.log('Baja');
        } else {
          this.focusInput2 = true;   // console.log('No baja');
        }
        break;
      case 3:
        const inputMensajeFormSelReg = this.objChatForm.get('mensaje'); // Formulario editar.
        if ( inputMensajeFormSelReg.value.length <= 0 ) {
          this.focusInput3 = false;  // console.log('Baja');
        } else {
          this.focusInput3 = true;   // console.log('No baja');
        }
        break;
    }
  }
}
