import { Component, OnInit,TemplateRef } from '@angular/core';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Traslado } from 'src/app/models/Traslado/traslado';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-seguimiento',
  templateUrl: './editar-seguimiento.component.html',
  styleUrls: ['./editar-seguimiento.component.css'],
})
export class EditarSeguimientoComponent implements OnInit {

  myForm!: FormGroup;
  pqr: PQRSF = new PQRSF();
  tras: Traslado = new Traslado();

  //Fechass
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

  constructor (
    private fb: FormBuilder,
    private pqrSv: PqrsfService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) {}

  //comfirm dialog
  modalRef?: BsModalRef;
  message: boolean = false;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    console.log("Entra a la funcion")
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }

    this.llenarEntidad();

    if(!this.pqrSv.addTra(this.tras)){
      this.toastr.error(`El traslado ${this.tras.traOficioNum} No se agrego`);
    } else {
      this.toastr.success(`El traslado ${this.tras.traOficioNum} se agrego Exitosamente`);
      this.subirArchivo();
    }

    this.message = true;
    this.modalRef?.hide();
  }

  decline(): void {
    this.message = false;
    this.modalRef?.hide();
  }
  
  ngOnInit(): void {
    this.myForm = this.fb.group({
      traOficioNum:['', Validators.required],
      traNombre:['', Validators.required],
      traOficioFecha:['', Validators.required],
      traDependencia:['', Validators.required],
      traOficioSeg:['']
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

    this.todayWithPipe = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.myForm.patchValue({ traOficioFecha: this.todayWithPipe });

    await new Promise(f => setTimeout(f, 1000));

  }

  public submitFormulario() {

  }

  public llenarEntidad() {
    this.tras.traOficioNum = this.myForm.value.traOficioNum;
    this.tras.traNombre = this.myForm.value.traNombre;
    this.tras.traOficioFecha = this.pipe.transform(this.myForm.value.traOficioFecha, 'yyyy-MM-dd');
    this.tras.traDependencia = this.myForm.value.traDependencia;
    this.tras.traOficioSeg = this.myForm.value.traOficioSeg;
    this.tras.pqrId = this.pqr
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
      this.mensaje = this.pqrSv.addTraAnexo(formularioDeDatos);
      console.log(this.mensaje);
    } catch (e) {
      console.log('ERROR', e);
    }
  }

}
