import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { Router } from '@angular/router';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { Traslado } from 'src/app/models/Traslado/traslado';
import { DatePipe, formatDate } from '@angular/common';
import * as moment from 'moment';
import {
  getLocaleDateTimeFormat,
  getLocaleDayNames,
  getLocaleTimeFormat,
} from '@angular/common';
import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { delay } from 'rxjs';

@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TrazabilidadComponent implements OnInit {
  //Tiempo restante en dias
  tiempoRes: number | undefined;
  tiempoTrascurrido: number | undefined;

  traza: Traslado[] = [];
  pqid: number | undefined;
  pqrsf: PQRSF = new PQRSF();

  //Fechas
  today: Date = new Date();
  fecha!: string;

  constructor(private service: PqrsfService, private router: Router) {}

  ngOnInit(){
    this.getSeguimiento();
  }
  async getSeguimiento() {
    var id = JSON.parse(localStorage.getItem('id') || '3');
    (await this.service.getTraslado(id)).subscribe(
      (data) => (this.traza = data)
    );
    (await this.service.getPqr(id)).subscribe((data) => (
      this.pqrsf = data)
    );
    //Dormir el hilo principal sino el pendejo se pasa de vrga y pasa derecho
    await new Promise(f => setTimeout(f, 1000));

    //Algoritmo de tiempo restante
    this.fecha = moment(this.pqrsf.pqrFechaVencimiento).format('yyyy-MM-DD');
    let fechaVencimiento: Date = new Date(this.fecha);
    this.fecha = moment(this.today).format('yyyy-MM-DD');
    let fechaActual: Date = new Date(this.fecha);
    this.tiempoRes = (fechaVencimiento.getTime() - fechaActual.getTime())/86400000;

    //Algoritmo de tiempo transcurrido
    this.fecha = moment(this.pqrsf.pqrFechaAdmision).format('yyyy-MM-DD');
    let fechaAdmision: Date = new Date(this.fecha);
    this.tiempoTrascurrido = (fechaActual.getTime() - fechaAdmision.getTime())/86400000;

    this.pqid = id;
  }
}
export class ButtonTypesExample {}
export class TooltipCustomClassExample {}
