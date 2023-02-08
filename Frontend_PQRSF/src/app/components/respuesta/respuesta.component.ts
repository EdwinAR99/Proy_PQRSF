import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { Respuesta } from 'src/app/models/Respuesta/Respuesta';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { Traslado } from 'src/app/models/Traslado/traslado';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
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
  traza: Traslado[] = [];

  tiempoRes!: number;

  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;

  /**atributos para la previsualizacion */
  files: any = [];
  loading: boolean = true;
  public archivos: any = [];
  public previFaile: string = "";
  archivoadjunto!: File;
  //Atributo para la =aptura del anexo
  nombreAnexo: string = "";
  mensaje: any;

  constructor(
    private fb: FormBuilder,
    private pqrSv: PqrsfService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) { }
  //comfirm dialog
  modalRef?: BsModalRef;
  message: boolean = false;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = true;
    this.modalRef?.hide();
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    this.llenarEntidad();

    if (!this.pqrSv.addRes(this.res)) {
      this.toastr.error(`La respuesta ${this.res.resId} No se agrego`);
    } else {
      this.pqr.pqrEstado = 'RESPONDIDA';
      this.pqrSv.updatePqr(this.pqr);
      this.toastr.success(`La respuesta ${this.res.resOficio} se agrego Exitosamente`);
      this.subirArchivo();
    }


  }

  decline(): void {
    this.message = false;
    this.modalRef?.hide();
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      resFechaRespuesta: ['', Validators.required],
      resTiempoRespuesta: [{ value: '', disabled: true }],
      resOficioRespuesta: ['', Validators.required],
      resMensaje:['']
    });

    this.rellenarForm();
  }

  //Accesor para los campos del formulario
  public get f(): any {
    return this.myForm.controls;
  }

  public async rellenarForm() {
    var id = JSON.parse(localStorage.getItem('id') || '3');
    (await this.pqrSv.getPqr(id)).subscribe((data) => (
      this.pqr = data)
    );
    (await this.pqrSv.getTraslado(id)).subscribe((data) => {
      this.traza = data;
    })

    await new Promise(f => setTimeout(f, 1000));

    this.todayWithPipe = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.myForm.patchValue({ resFechaRespuesta: this.todayWithPipe });

    this.todayWithPipe = moment(this.todayWithPipe).format('yyyy-MM-DD');
    let fechaRespuesta: Date = new Date(this.todayWithPipe);

    this.todayWithPipe = moment(this.pqr.pqrFechaAdmision).format('yyyy-MM-DD');
    let fechaAdmision: Date = new Date(this.todayWithPipe);

    this.tiempoRes = (fechaRespuesta.getTime() - fechaAdmision.getTime()) / 86400000;

    this.myForm.patchValue({ resTiempoRespuesta: this.tiempoRes + ' dias' });

  }

  public SendDate(event: any) {
    this.todayWithPipe = moment(this.myForm.value.resFechaRespuesta).format('yyyy-MM-DD');
    let fechaRespuesta: Date = new Date(this.todayWithPipe);

    this.todayWithPipe = moment(this.pqr.pqrFechaAdmision).format('yyyy-MM-DD');
    let fechaAdmision: Date = new Date(this.todayWithPipe);

    this.tiempoRes = (fechaRespuesta.getTime() - fechaAdmision.getTime()) / 86400000;

    this.myForm.patchValue({ resTiempoRespuesta: this.tiempoRes + ' dias' });
  }

  public async submitFormulario() {

  }

  public llenarEntidad() {
    this.pqr.traId = this.traza;
    this.res.pqrId = this.pqr;
    this.res.resFechaRespuesta = this.pipe.transform(this.myForm.value.resFechaRespuesta, 'yyyy-MM-dd');
    this.res.resTiempoRespuesta = this.tiempoRes;
    this.res.resOficio = this.myForm.value.resOficioRespuesta;
    this.res.resMensaje = this.myForm.value.resMensaje;
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
      this.mensaje = this.pqrSv.addResAnexo(formularioDeDatos);
      console.log(this.mensaje);
    } catch (e) {
      console.log('ERROR', e);
    }
  }

}
