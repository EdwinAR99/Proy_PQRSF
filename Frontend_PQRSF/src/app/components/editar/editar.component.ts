import { Component, OnInit,TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Traslado } from 'src/app/models/Traslado/traslado';
import { Peticionario } from 'src/app/models/Peticionario/peticionario';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  myForm!: FormGroup;
  pqr: PQRSF = new PQRSF();
  pet: Peticionario = new Peticionario();

  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;

  /**atributos para la previsualizacion */
  files: any = [];
  loading: boolean = true;
  public archivos: any = [];
  public previFile: string = "";
  archivoadjunto!: File;
  //Atributo para la =aptura del anexo
  nombreAnexo: string = "";
  mensaje: any;
  object: any;

  constructor(
    private fb: FormBuilder,
    private pqrSv: PqrsfService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) { }
  
  //comfirm dialog
  modalRef?: BsModalRef;
  message: boolean=false;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
    console.log("Paso las validaciones")

    this.llenarEntidad();
    console.log("Lleno la entidad")

    if(!this.pqrSv.updatePqr(this.pqr)){
      this.toastr.success(`La PQRSF ${this.pqr.pqrRadicado} No se actualizo`);
    } else {
      this.toastr.success(`La PQRSF ${this.pqr.pqrRadicado} se actualizo, Exitosamente`);
    }
  }
  decline(): void {
    this.message = false;
    this.modalRef?.hide();
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      pqrRadicado:[{value: '', disabled: true}, Validators.required],
      pqrFechaAdmision:[{value: '', disabled: true}, Validators.required],
      pqrFechaVencimiento:[ '' , Validators.required],
      pqrTipo:[{value: '', disabled: true}, Validators.required],
      pqrMedio:['', Validators.required],
      pqrAsunto:['', Validators.required],
      petTipo:['', Validators.required],
      petNombre:[''],
      petDireccion:[''],
      petTelefono:[''],
      petCorreo:['']
    });

    this.rellenarForm();

    this.pqr = new PQRSF();
  }

  public async rellenarForm(){
    var id = JSON.parse(localStorage.getItem('id') || '3');
    (await this.pqrSv.getPqr(id)).subscribe((data) => (
      this.pqr = data)
    );
    //Dormir el hilo principal sino el pendejo se pasa de vrga y pasa derecho
    await new Promise(f => setTimeout(f, 1000));

    (await this.pqrSv.obtenerAnexoPQR(this.pqr.pqrAnexo)).subscribe((res) => {
      this.object = res;
      console.log(res)
    });

    //Dormir el hilo principal sino el pendejo se pasa de vrga y pasa derecho
    await new Promise(f => setTimeout(f, 1000));

    this.extraerBase(this.object).then((filePDF: any) => {
      this.previFile = filePDF.base;
      console.log(filePDF);
    });
    //Dormir el hilo principal sino el pendejo se pasa de vrga y pasa derecho
    await new Promise(f => setTimeout(f, 1000));
    console.log(this.object)
    console.log(this.previFile);

    //Llena los campos del formulario
    this.myForm.patchValue({
      pqrRadicado: this.pqr.pqrRadicado, 
      pqrTipo: this.pqr.pqrTipo, 
      pqrMedio: this.pqr.pqrMedio,
      pqrAsunto: this.pqr.pqrAsunto
    });
    
    //Llena los campos del formulario de fechas
    this.todayWithPipe = this.pipe.transform(this.pqr.pqrFechaAdmision, 'yyyy-MM-dd');
    this.myForm.patchValue({ pqrFechaAdmision: this.todayWithPipe});

    this.todayWithPipe = this.pipe.transform(this.pqr.pqrFechaVencimiento, 'yyyy-MM-dd');
    this.myForm.patchValue({ pqrFechaVencimiento: this.todayWithPipe });
    
    //Llena los campos de peticionario
    if (this.pqr.petId.petTipo != null){
      this.myForm.patchValue({
        petTipo: this.pqr.petId.petTipo,
        petNombre: this.pqr.petId.petNombre,
        petDireccion: this.pqr.petId.petDireccion,
        petTelefono: this.pqr.petId.petTelefono,
        petCorreo: this.pqr.petId.petCorreo
      });
    } else {
      this.myForm.patchValue({
        petTipo: 'ANONIMO'
      });
    }

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

  }

  public llenarEntidad(){
    this.pqr.pqrRadicado = this.myForm.value.pqrRadicado;
    this.pqr.pqrTipo = this.myForm.value.pqrTipo;
    this.pqr.pqrFechaAdmision = this.pipe.transform(this.myForm.value.pqrFechaAdmision, 'yyyy-MM-dd');
    this.pqr.pqrFechaVencimiento = this.pipe.transform(this.myForm.value.pqrFechaVencimiento, 'yyyy-MM-dd');

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
