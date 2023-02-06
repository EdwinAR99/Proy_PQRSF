import { Component } from '@angular/core';
//agregado import para pdf
import { DomSanitizer } from '@angular/platform-browser';
import { OnInit } from '@angular/core';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { Router } from '@angular/router';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  filterPost = '';
  pqrsf: PQRSF[]=[];
  dataSource: any;
  constructor(private service: PqrsfService, private router: Router,private sanitizer: DomSanitizer) { }
    /**atributos para la previsualizacion */
    files: any = [];
    loading: boolean = true;
    public archivos: any = [];
    public previFaile:string="";
    archivoadjunto!: File;

  ngOnInit():void {
   this.getPQRSF();
  }
  async getPQRSF(){
    (await this.service.getAll()).subscribe(arg => {this.pqrsf= arg;})
  }
  applyFilter(event: Event) {
    const dataSource = new MatTableDataSource(this.pqrsf);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editar(pqr:PQRSF):void{
    localStorage.setItem("id", pqr.pqrId.toString());
  }
  getSeguimiento(pqr:PQRSF):void{
    localStorage.setItem("id", pqr.pqrId.toString());
  }

  //Obteniendo pdf del back
  obtenerPDF() {
    const formularioDeDatosObtenido = this.service.obtenerAnexo("Apuntes.pdf");

    //const archivoCapturado = event.target.files[0];
    //this.nombreAnexo = event.target.files[0].name;
    //this.archivoadjunto = formularioDeDatosObtenido;
    //this.pqr.pqrAnexo;
    this.extraerBase(formularioDeDatosObtenido).then((filePDF:any)=>{
      this.previFaile = filePDF.base;
      console.log(filePDF);
    })
    this.archivos.push(formularioDeDatosObtenido);
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
