import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CasosServicioService } from './casos-servicio.service';
import { Component, OnInit, Injector,  } from '@angular/core';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html',
  styleUrls: ['./casos.component.css']
})
export class CasosComponent implements OnInit {

  datos: any;         // Datos tabla.
  toogle = false;     // Modal 1
  toogle2 = false;    // Modal 2
  focusInput = false; // Toggle manejador de clase en label.
  // disabledEdit = false;
  txtBtn = 'Editar';

  numeroDeCaso: number;
  fechaCreacion: string;

  // Formuarios reactivos.
  objFb: FormGroup;
  objFbSelReg: FormGroup;

  nuevo = 0;

  // Inyeccion de servicio opcion 2.
  // constructor(private objCasosServ: Injector) {}
  constructor(private objCasosServ: CasosServicioService,
              private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.objCasosServ.setupSocketConnection();  // Inicia socket.
    this.getCasos();
    this.formGuardar();
    this.formSeleccionarReg();
  }

  getCasos() {
    this.objCasosServ.socket.on('tabla', (r: any) => {
      console.log(JSON.parse(r).length);
      this.datos = JSON.parse(r);
      this.nuevo = JSON.parse(r).length;
    });
  }

  guardar() {
    console.log(this.objFb.value);
    this.objCasosServ.reqCasos(this.objFb.value);
  }

  guardarCambios() {
    // console.log(this.objFbSelReg.value); // Envia datos no incluye campos deshabilitados.
    // Envia datos incluyendo campos deshabilitados.
    console.log(this.objFbSelReg.getRawValue());
    this.objCasosServ.reqCasos(this.objFbSelReg.getRawValue());
  }

  formGuardar() {
    this.objFb = this.fb.group({
      id: ['12'],
      estado: ['Activo'],
      creacion: ['hoy'],
      resp: ['', {
                  validators: [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                  ]
                }
      ]
    });
  }

  formSeleccionarReg() {
    this.objFbSelReg = this.fb.group({
      id: ['',
              {
                validators: [
                  Validators.required,
                  Validators.minLength(1)
                ]
              }
          ],
      estado: ['Activo'],
      creacion: ['hoy'],
      resp: [{ value: '', disabled: true }, {
              validators: [
                Validators.required,
                Validators.minLength(2)
              ]
      }],
      check: [{ value: false, disabled: false }]
    });
  }

  getError(controlName: string) {
    const objControl = this.objFb.get(controlName);
    let error = '';

    switch (controlName) {
      case 'resp':
          if (objControl.invalid && ( objControl.touched || objControl.dirty )) {
            if (objControl.errors.required) {
              error = 'El nombre es requerido.';
            } else if (objControl.errors.minlength) {
              error += 'El nombre debe tener minimo 2 caracteres.';
            } else if (objControl.errors.maxlength) {
              error += 'El nombre puede tener maximo 30 caracteres.';
            }
          }
          break;
    }

    return error;
  }

  getRow(arg: any) {
    this.toogle2 = true;  // Muestra el modal.
    // alert( JSON.stringify(arg) );
    // console.log(arg);

    // Se obtienen los controles del formulario.
    const id = this.objFbSelReg.get('id');
    const campoForm = this.objFbSelReg.get('resp');

    this.numeroDeCaso = arg.id;         // Se setea la etiqueta con el ID.
    id.patchValue(arg.id);              // Se setea el campo id.
    campoForm.patchValue(arg.resp);        // Se setea el campo nombre.
    this.fechaCreacion = arg.creacion;  // Se setea la etiqueta fecha de creacion.
    this.validaBlur(2);  // Metodo que valida el campo cuando esta en blur.
  }

  // Valida el campo cuando esta en blur
  validaBlur(numForm: number) {
    // console.log(`Formulario ${numForm}`);
    switch (numForm) {
      case 1:
        const inputFormNewReg = this.objFb.get('resp');  // Formulario registro.
        if ( inputFormNewReg.value.length <= 0 ) {
          this.focusInput = false;  // console.log('Baja');
        } else {
          this.focusInput = true;   // console.log('No baja');
        }
        break;
      case 2:
        const inputFormSelReg = this.objFbSelReg.get('resp');  // Formulario editar.
        if ( inputFormSelReg.value.length <= 0 ) {
          this.focusInput = false;  // console.log('Baja');
        } else {
          this.focusInput = true;   // console.log('No baja');
        }
        break;
    }
  }

  habilitaCampo() {
    const campoCheck = this.objFbSelReg.get('check');
    const campoNombre = this.objFbSelReg.get('resp');

    if ( campoCheck.value ) {
      // if (campoNombre.disabled) { }
        campoNombre.enable();
    } else {
        campoNombre.disable();
    }
  }

  abreModal() {
    this.toogle = !this.toogle;
    this.validaBlur(1);
  }

  cierraModal() {
    console.log('Limpia los campos');
    this.toogle = !this.toogle;

    this.objFb.reset({
      resp: {value: '', disabled: false}
    });
  }
}
