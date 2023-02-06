import { Component, OnInit, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Traslado } from 'src/app/models/Traslado/traslado';
import { Peticionario } from 'src/app/models/Peticionario/peticionario';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit{
  Spqr:string | undefined;
  myForm!: FormGroup;
  pqr: PQRSF = new PQRSF();
  tras: Traslado = new Traslado();
  pet: Peticionario = new Peticionario();

  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private pqrSv: PqrsfService,
    private sanitizer: DomSanitizer
  ) { }

  /**atributos para la previsualizacion */
  files: any = [];
  loading: boolean = true;
  public archivos: any = [];
  public previFaile:string="";
  archivoadjunto!: File;
  
  
  ngOnInit() {
    this.myForm = this.fb.group({
      pqrRadicado:['', Validators.required],
      pqrFechaAdmision:['', Validators.required],
      pqrFechaVencimiento:[ '' , Validators.required],
      pqrTipo:['', Validators.required],
      traOficioNum:['', Validators.required],
      traNombre:['', Validators.required],
      traDependencia:['', Validators.required],
      pqrMedio:['', Validators.required],
      pqrAsunto:['', Validators.required],
      petTipo:['', Validators.required],
      petNombre:[''],
      petDireccion:[''],
      petTelefono:[''],
      petCorreo:['']
    });


    this.Spqr=this.myForm.value.traOficioNum;
   
    this.rellenarForm();

    this.pqr = new PQRSF();
  }

  public rellenarForm(){
    this.myForm.patchValue({ pqrTipo:'Tipo PQRSF', pqrMedio: 'Medio de Petición', petTipo: 'Tipo Peticionario'});
    this.todayWithPipe = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.myForm.patchValue({ pqrFechaAdmision: this.todayWithPipe});    
  }

  //Accesor para los campos del formulario
  public get f():any{
    return this.myForm.controls;
  }

  SendDataonChange(event: any) {
    if (event.target.value == "PETICION" || event.target.value == "QUEJA" || event.target.value == "RECLAMO" || event.target.value == "SUGERENCIA"){
      this.today.setDate(this.today.getDate() + 15);
      this.myForm.patchValue({ pqrFechaVencimiento: this.pipe.transform(this.today, 'yyyy-MM-dd')});
      this.today = new Date();
    } else if (event.target.value == "INFORMACION"){
      this.today.setDate(this.today.getDate() + 10);
      this.myForm.patchValue({ pqrFechaVencimiento: this.pipe.transform(this.today, 'yyyy-MM-dd')});
      this.today = new Date();
    } else if (event.target.value == "CONSULTA" || event.target.value == "FELICITACIÓN"){
      this.today.setDate(this.today.getDate() + 30);
      this.myForm.patchValue({ pqrFechaVencimiento: this.pipe.transform(this.today, 'yyyy-MM-dd')});
      this.today = new Date();
    } 
  }

  public submitFormulario(){

    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }

    this.llenarEntidad();

    if(!this.pqrSv.addPqr(this.pqr)){
      alert("No se pudo agregar la peticion")
    } else {
      this.toastr.success(`La PQRSF con numero de radicado ${this.pqr.pqrRadicado} se agrego Exitosamente`,'Agregar');
      
    }

  }

  public llenarEntidad(){
    this.pqr.pqrRadicado = this.myForm.value.pqrRadicado;
    this.pqr.pqrTipo = this.myForm.value.pqrTipo;
    this.pqr.pqrFechaAdmision = this.pipe.transform(this.myForm.value.pqrFechaAdmision, 'yyyy-MM-dd');
    this.pqr.pqrFechaVencimiento = this.pipe.transform(this.myForm.value.pqrFechaVencimiento, 'yyyy-MM-dd');
    
    this.tras.traOficioNum = this.myForm.value.traOficioNum;
    this.tras.traNombre = this.myForm.value.traNombre;
    this.tras.traDependencia = this.myForm.value.traDependencia;

    //archivo adjunto(pdf)
    this.pqr.pqrAnexo= this.archivoadjunto;
    
    this.pqr.traId = [this.tras];
    this.pqr.pqrMedio = this.myForm.value.pqrMedio;
    this.pqr.pqrAsunto = this.myForm.value.pqrAsunto;

    if (this.myForm.value.petTipo !== 'ANONIMO'){
      this.pet.petTipo = this.myForm.value.petTipo;
      this.pet.petNombre = this.myForm.value.petNombre;
      this.pet.petDireccion = this.myForm.value.petDireccion;
      this.pet.petCorreo = this.myForm.value.petCorreo;
      this.pet.petTelefono = this.myForm.value.petTelefono;
    } else {
      this.pet.petId = 1;
      this.pet.petTipo = 'ANONIMO';
      this.pet.petNombre = '';
      this.pet.petDireccion = '';
      this.pet.petCorreo = '';
      this.pet.petTelefono = '';
    }
    this.pqr.petId = this.pet;

    this.pqr.pqrEstado = 'TRAMITE';
  }
  
  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0];
    this.archivoadjunto = archivoCapturado;
    this.pqr.pqrAnexo;
    this.extraerBase(archivoCapturado).then((filePDF:any)=>{
      this.previFaile = filePDF.base;
      console.log(filePDF);
    })
    this.archivos.push(archivoCapturado);
    //console.log(event.target.files);
  }
  extraerBase = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeFile = window.URL.createObjectURL($event);
        const filePDF = this.sanitizer.bypassSecurityTrustUrl(unsafeFile);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({ base: reader.result });
        };
        reader.onerror = (error) => {
          resolve({ base: null });
        };
      } catch (e) {
        return null;
      }
      return null;
    });

}
function archivoUp() {
  throw new Error('Function not implemented.');
}

