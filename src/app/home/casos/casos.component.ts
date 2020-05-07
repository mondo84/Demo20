import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CasosServicioService } from './casos-servicio.service';
import { Component, OnInit, Injector,  } from '@angular/core';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html',
  styleUrls: ['./casos.component.css']
})
export class CasosComponent implements OnInit {

  datos: any;
  toogle = false;
  objFb: FormGroup;
  nuevo = 0;

  // Inyeccion de servicio opcion 2.
  // constructor(private objCasosServ: Injector) {}
  constructor(private objCasosServ: CasosServicioService,
              private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.objCasosServ.setupSocketConnection();
    this.getCasos();
    this.formGuardar();
  }

  getCasos() {
    this.objCasosServ.socket.on('tabla', (r) => {
      this.datos = JSON.parse(r);
      this.nuevo = JSON.parse(r).length;
    });
  }

  guardar() {
    console.log(this.objFb.value);
    this.objCasosServ.reqCasos(this.objFb.value);
  }

  formGuardar() {
    this.objFb = this.fb.group({
      id: [''],
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
}
