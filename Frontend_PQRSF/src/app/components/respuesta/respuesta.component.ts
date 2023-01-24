import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { Respuesta } from 'src/app/models/Respuesta/Respuesta';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import * as moment from 'moment';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.css']
})
export class RespuestaComponent implements OnInit {

  myForm!: FormGroup;
  res: Respuesta = new Respuesta();
  pqr: PQRSF = new PQRSF();

  tiempoRes!: number;

  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;

  constructor(
    private fb: FormBuilder,
    private pqrSv: PqrsfService) 
  {}

  ngOnInit(): void{
    this.myForm = this.fb.group({
      resFechaRespuesta:['', Validators.required],
      resTiempoRespuesta:[{value:'', disabled:true}],
      resOficioRespuesta:['', Validators.required]  
    });

    this.rellenarForm();
  }

  //Accesor para los campos del formulario
  public get f():any{
    return this.myForm.controls;
  }

  public async rellenarForm(){
    var id = JSON.parse(localStorage.getItem('id') || '3');
    (await this.pqrSv.getPqr(id)).subscribe((data) => (
      this.pqr = data)
    );
    
    await new Promise(f => setTimeout(f, 1000));

    this.todayWithPipe = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.myForm.patchValue({ resFechaRespuesta: this.todayWithPipe}); 
    
    this.todayWithPipe = moment(this.todayWithPipe).format('yyyy-MM-DD');
    let fechaRespuesta: Date = new Date(this.todayWithPipe);
    
    this.todayWithPipe = moment(this.pqr.pqrFechaAdmision).format('yyyy-MM-DD');
    let fechaAdmision: Date = new Date(this.todayWithPipe); 

    this.tiempoRes = (fechaRespuesta.getTime() - fechaAdmision.getTime())/86400000;

    this.myForm.patchValue({ resTiempoRespuesta: this.tiempoRes + ' dias' });

  }

  public SendDate(event: any) {    
    this.todayWithPipe = moment(this.myForm.value.resFechaRespuesta).format('yyyy-MM-DD');
    let fechaRespuesta: Date = new Date(this.todayWithPipe);
    
    this.todayWithPipe = moment(this.pqr.pqrFechaAdmision).format('yyyy-MM-DD');
    let fechaAdmision: Date = new Date(this.todayWithPipe);

    this.tiempoRes = (fechaRespuesta.getTime() - fechaAdmision.getTime())/86400000;

    this.myForm.patchValue({ resTiempoRespuesta: this.tiempoRes + ' dias' });
  }

  public submitFormulario() {

  }

  public llenarEntidad() {

  }

}
