import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Traslado } from 'src/app/models/Traslado/traslado';
import { Peticionario } from 'src/app/models/Peticionario/peticionario';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  Spqr: string | undefined;
  myForm!: FormGroup;
  pqr: PQRSF = new PQRSF();
  tras: Traslado = new Traslado();
  pet: Peticionario = new Peticionario();

  //Fechass
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;

  constructor(
    private fb: FormBuilder,
    private pqrSv: PqrsfService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  //comfirm dialog
  modalRef?: BsModalRef;
  message: boolean=false;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {

    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    this.llenarEntidad();

      if (!this.pqrSv.addPqr(this.pqr)) {
        this.toastr.success(`La peticion PQRSF ${this.pqr.pqrRadicado} No se registro`);
      } else {
        this.toastr.success(`La peticion PQRSF ${this.pqr.pqrRadicado} se registo, Exitosamente`);
        this.subirArchivo();
      }
    
    this.message = true;
    this.modalRef?.hide();
  }

  decline(): void {
    this.message = false;
    this.modalRef?.hide();
  }

  /**atributos para la previsualizacion */
  files: any = [];
  loading: boolean = true;
  public archivos: any = [];
  public previFaile: string = "";
  archivoadjunto!: File;
  //Atributo para la =aptura del anexo
  nombreAnexo: string = "";
  mensaje: any;


  ngOnInit() {
    this.myForm = this.fb.group({
      pqrRadicado: ['', Validators.required],
      pqrFechaAdmision: ['', Validators.required],
      pqrFechaVencimiento: ['', Validators.required],
      pqrTipo: ['', Validators.required],
      traOficioNum: ['', Validators.required],
      traNombre: ['', Validators.required],
      traDependencia: ['', Validators.required],
      pqrMedio: ['', Validators.required],
      pqrAsunto: ['', Validators.required],
      petTipo: ['', Validators.required],
      petNombre: [''],
      petDireccion: [''],
      petTelefono: [''],
      petCorreo: ['']
    });


    this.Spqr = this.myForm.value.traOficioNum;

    this.rellenarForm();

    this.pqr = new PQRSF();
  }

  public rellenarForm() {
    this.myForm.patchValue({ pqrTipo: 'Tipo PQRSF', pqrMedio: 'Medio de Petición', petTipo: 'Tipo Peticionario' });
    this.todayWithPipe = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.myForm.patchValue({ pqrFechaAdmision: this.todayWithPipe });
  }

  //Accesor para los campos del formulario
  public get f(): any {
    return this.myForm.controls;
  }

  SendDataonChange(event: any) {
    if (this.myForm.value.pqrTipo == "PETICION" || this.myForm.value.pqrTipo == "QUEJA" || this.myForm.value.pqrTipo == "RECLAMO" || this.myForm.value.pqrTipo == "SUGERENCIA") {
      this.today = new Date(this.myForm.value.pqrFechaAdmision);
      this.today.setDate(this.today.getDate() + 15);
      this.myForm.patchValue({ pqrFechaVencimiento: this.pipe.transform(this.today, 'yyyy-MM-dd') });
      this.today = new Date();
    } else if (this.myForm.value.pqrTipo == "INFORMACION") {
      this.today = new Date(this.myForm.value.pqrFechaAdmision);
      this.today.setDate(this.today.getDate() + 10);
      this.myForm.patchValue({ pqrFechaVencimiento: this.pipe.transform(this.today, 'yyyy-MM-dd') });
      this.today = new Date();
    } else if (this.myForm.value.pqrTipo == "CONSULTA" || this.myForm.value.pqrTipo == "FELICITACIÓN") {
      this.today = new Date(this.myForm.value.pqrFechaAdmision);
      this.today.setDate(this.today.getDate() + 30);
      this.myForm.patchValue({ pqrFechaVencimiento: this.pipe.transform(this.today, 'yyyy-MM-dd') });
      this.today = new Date();
    }
  }

  SendDate(event: any) {
    if (this.myForm.value.pqrTipo == "PETICION" || this.myForm.value.pqrTipo == "QUEJA" || this.myForm.value.pqrTipo == "RECLAMO" || this.myForm.value.pqrTipo == "SUGERENCIA") {
      this.today = new Date(this.myForm.value.pqrFechaAdmision);
      this.today.setDate(this.today.getDate() + 15);
      this.myForm.patchValue({ pqrFechaVencimiento: this.pipe.transform(this.today, 'yyyy-MM-dd') });
      this.today = new Date();
    } else if (this.myForm.value.pqrTipo == "INFORMACION") {
      this.today = new Date(this.myForm.value.pqrFechaAdmision);
      this.today.setDate(this.today.getDate() + 10);
      this.myForm.patchValue({ pqrFechaVencimiento: this.pipe.transform(this.today, 'yyyy-MM-dd') });
      this.today = new Date();
    } else if (this.myForm.value.pqrTipo == "CONSULTA" || this.myForm.value.pqrTipo == "FELICITACIÓN") {
      this.today = new Date(this.myForm.value.pqrFechaAdmision);
      this.today.setDate(this.today.getDate() + 30);
      this.myForm.patchValue({ pqrFechaVencimiento: this.pipe.transform(this.today, 'yyyy-MM-dd') });
      this.today = new Date();
    }
  }

  public async submitFormulario() {
  }

  public llenarEntidad() {
    this.pqr.pqrRadicado = this.myForm.value.pqrRadicado;
    this.pqr.pqrTipo = this.myForm.value.pqrTipo;
    this.pqr.pqrFechaAdmision = this.pipe.transform(this.myForm.value.pqrFechaAdmision, 'yyyy-MM-dd');
    this.pqr.pqrFechaVencimiento = this.pipe.transform(this.myForm.value.pqrFechaVencimiento, 'yyyy-MM-dd');

    this.tras.traOficioNum = this.myForm.value.traOficioNum;
    this.tras.traNombre = this.myForm.value.traNombre;
    this.tras.traOficioFecha = this.pqr.pqrFechaAdmision;
    this.tras.traDependencia = this.myForm.value.traDependencia;

    //corregir con la url
    this.pqr.pqrAnexo = this.nombreAnexo;
    this.tras.traAnexo =  this.pqr.pqrAnexo;
    /**
     * "D:\\Semestre 8\\Proyecto I\\version 9\\
     * Proy_PQRSF-master\\backend_PQRSF\\MapaConceptualServicios_juanmanriv.pdf\\
     * http:\\localhost:8080\\pqrsf\\MapaConceptualServicios_juanmanriv.pdf"
     */

    this.pqr.traId = [this.tras];
    this.pqr.pqrMedio = this.myForm.value.pqrMedio;
    this.pqr.pqrAsunto = this.myForm.value.pqrAsunto;

    if (this.myForm.value.petTipo !== 'ANONIMO') {
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
    this.nombreAnexo = event.target.files[0].name;
    this.archivoadjunto = archivoCapturado;
    this.pqr.pqrAnexo;
    this.extraerBase(archivoCapturado).then((filePDF: any) => {
      this.previFaile = filePDF.base;
      console.log(filePDF);
    })
    this.archivos.push(archivoCapturado);
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

  subirArchivo(): any {
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo: any) => {
        console.log(archivo);
        formularioDeDatos.append('files', archivo)
      });
      this.mensaje = this.pqrSv.addPqrAnexo(formularioDeDatos);
      console.log(this.mensaje);
    } catch (e) {
      console.log('ERROR', e);
    }
  }




}
