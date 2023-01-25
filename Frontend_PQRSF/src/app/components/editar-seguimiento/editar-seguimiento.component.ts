import { Component, OnInit } from '@angular/core';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Traslado } from 'src/app/models/Traslado/traslado';
import { Peticionario } from 'src/app/models/Peticionario/peticionario';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';

@Component({
  selector: 'app-editar-seguimiento',
  templateUrl: './editar-seguimiento.component.html',
  styleUrls: ['./editar-seguimiento.component.css'],
})
export class EditarSeguimientoComponent implements OnInit {

  myForm!: FormGroup;
  pqr: PQRSF = new PQRSF();
  tras: Traslado = new Traslado();

  constructor (
    private fb: FormBuilder,
    private pqrSv: PqrsfService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      traOficioNum:['', Validators.required],
      traNombre:['', Validators.required],
      traDependencia:['', Validators.required]
    });

    this.obtenerDatos();
  }

  //Accesor para los campos del formulario
  public get f():any{
    return this.myForm.controls;
  }

  public async obtenerDatos() {
    var id = JSON.parse(localStorage.getItem('id') || '3');
    (await this.pqrSv.getPqr(id)).subscribe((data) => {
        this.pqr = data;
        console.log(data)
      }
    );

    await new Promise(f => setTimeout(f, 1000));

  }

  public submitFormulario() {
    console.log("Entra a la funcion")
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
    console.log("Pasa validaciones")

    this.llenarEntidad();
    console.log("Pasa llenar la entidad")

    if(!this.pqrSv.addTra(this.tras)){
      alert("No se pudo agregar el traslado");
    } else {
      alert("Traslado agregado correctamente");
    }

  }

  public llenarEntidad() {
    this.tras.traOficioNum = this.myForm.value.traOficioNum;
    this.tras.traNombre = this.myForm.value.traNombre;
    this.tras.traDependencia = this.myForm.value.traDependencia;
    this.tras.pqrId = this.pqr
  }

}
