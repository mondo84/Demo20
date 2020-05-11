import { Component, OnInit } from '@angular/core';
import { URL_GRAFICO_1, URL_GRAFICO_2 } from '@environments/environment';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  // Ruta de graficos estadisticos.
  grafico1 = URL_GRAFICO_1;
  grafico2 = URL_GRAFICO_2;

  constructor() { }

  ngOnInit() {
  }

}
