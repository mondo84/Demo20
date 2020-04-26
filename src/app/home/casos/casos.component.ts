import { CasosServicioService } from './casos-servicio.service';
import { Component, OnInit, Injector,  } from '@angular/core';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html',
  styleUrls: ['./casos.component.css']
})
export class CasosComponent implements OnInit {

  // Inyeccion de servicio opcion 2.
  constructor(private objCasosServ: Injector) { }

  ngOnInit() {
    this.getAllCasos();
  }

  getAllCasos(): void {
    // Llamada a metodo de servicio inyectado opcion 2.
    const objCasServ = this.objCasosServ.get(CasosServicioService);
    objCasServ.getUsuarios()  // Sustituir el llamado por el metodo de casos.
    .subscribe({
      next: (res) => { console.log(res); },
      error: (err) => { console.log(err.message); },
      complete: () => console.log('Completado')
    });
  }
}
