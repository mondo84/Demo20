import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServicioService } from '@login/login-servicio.service';
import { UsuarioI } from '@interfaces/usuario-i';
import { Router } from '@angular/router';

// Variables de entorno.
import { LS_TOKEN, PATTERN_EMAIL } from '@environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  txtBtnLoginD = 'Inicio';
  txtBtnLoginB = 'Bloqueado';

  constructor(private objFb: FormBuilder,
              private objLgService: LoginServicioService,
              private objRouter: Router) {
    this.formLogin();
  }

  ngOnInit() {
  }

  // Crea el formulario.
  formLogin(): void {
    this.loginForm = this.objFb.group({
      email: [{ value: '', disabled: false }, {
                    validators: [
                      Validators.required,
                      Validators.minLength(10),
                      Validators.maxLength(30),
                      Validators.pattern(PATTERN_EMAIL)
                    ]
                  }
              ],
      password: [{ value: '', disabled: false }, {
                    validators: [
                      Validators.required,
                      Validators.minLength(5),
                      Validators.maxLength(20)
                    ]
      }]
    });
  }

  validar() {
    // Recibe los datos del formulario en formato json.
    this.objLgService.validUser(this.loginForm.value)
    .subscribe({
      next: (res: UsuarioI) => {
        // console.log(res);                            // Debug.
        if ( res.auth ) {
          localStorage.setItem(LS_TOKEN, res.token); // Guarda token en el local storage.
          this.objRouter.navigate(['app']);            // Navegacion al home de la app.
        } else {
          console.log(`msg: ${res.msg}`);
        }
      },
      error: (err) => console.log(err.message),
      complete: () => console.log('Completado')
    });
  }

  getError(nombreControl: string) {
    // Se recupera el control indicado.
    const control = this.loginForm.get(nombreControl);
    let error = '';

    switch (nombreControl) {
    case 'email':
        if ( control.invalid && (control.touched || control.dirty) ) {
          // error = JSON.stringify(control.errors);

          if (control.errors.required) {
            error = 'El email es requerido';
          } else if (control.errors.minlength) {
            error += 'El email debe tener minimo 10 caracteres.';
          } else if (control.errors.maxlength) {
            error += 'El email puede tener maximo 30 caracteres.';
          } else if (control.errors.pattern) {
            error += 'El email es invalido.';
          }
        }
        break;
      case 'password':
        if ( control.invalid && (control.touched || control.dirty) ) {

          if (control.errors.required) {
            error = 'El password es requerido';
          } else if (control.errors.minlength) {
            error += 'El password debe tener minimo 5 caracteres.';
          } else if (control.errors.maxlength) {
            error += 'El password puede tener maximo 20 caracteres.';
          }
        }
        break;
    }

    return error; // Retorna el error.
  }
}
