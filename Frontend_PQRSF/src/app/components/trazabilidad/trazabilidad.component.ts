import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { Router } from '@angular/router';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { Traslado } from 'src/app/models/Traslado/traslado';
import * as moment from 'moment';
import { getLocaleDateTimeFormat, getLocaleDayNames, getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrazabilidadComponent implements OnInit {
 tiempo:number | undefined;
 traza:Traslado[]=[];
 pqid:number | undefined;
 pqrsf:PQRSF=new PQRSF();
  constructor(private service: PqrsfService, private router: Router) { }

  ngOnInit():void {
    this.getSeguimiento();
  }
  async getSeguimiento(){
   var id= JSON.parse(localStorage.getItem("id")||"3");
    (await this.service.getTraslado(id)).subscribe(data=>this.traza=data);
    (await this.service.getPqr(id)).subscribe(data=>this.pqrsf=data); 
    var fecha=new Date();
    //fecha.setDate(this.pqrsf.pqrFechaVencimiento);
    var hoy=Date.now();
    moment(hoy).format("YYYY-MM-DD");
    this.tiempo=fecha.getDay();
    this.pqid=id;
  }
}
export class ButtonTypesExample {}
export class TooltipCustomClassExample {}