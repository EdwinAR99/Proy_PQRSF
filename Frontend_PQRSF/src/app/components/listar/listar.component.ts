import { Component } from '@angular/core';
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
  constructor(private service: PqrsfService, private router: Router) { }

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
}
