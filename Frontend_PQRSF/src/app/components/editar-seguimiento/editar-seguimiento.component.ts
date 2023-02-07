import { Component, OnInit,TemplateRef } from '@angular/core';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Traslado } from 'src/app/models/Traslado/traslado';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { ToastrService } from 'ngx-toastr';

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
    private pqrSv: PqrsfService,
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
    console.log("Pasa validaciones")

    this.llenarEntidad();
    console.log("Pasa llenar la entidad")

    if(!this.pqrSv.addTra(this.tras)){
      this.toastr.error(`El traslado ${this.tras.traOficioNum} No se agrego`);
    } else {
      this.toastr.success(`El traslado ${this.tras.traOficioNum} se agrego Exitosamente`);
    }
  }

  decline(): void {
    this.message = false;
    this.modalRef?.hide();
  }
  
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

  }

  public llenarEntidad() {
    this.tras.traOficioNum = this.myForm.value.traOficioNum;
    this.tras.traNombre = this.myForm.value.traNombre;
    this.tras.traDependencia = this.myForm.value.traDependencia;
    this.tras.pqrId = this.pqr
  }

}
