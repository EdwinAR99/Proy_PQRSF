import {Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { PqrsfService } from 'src/app/shared/services/pqrsf.service';
import { Router } from '@angular/router';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  filterPost = '';
  pqrsf: PQRSF[] = [];


  constructor(private service: PqrsfService, private router: Router) { 
  }
  ngOnInit(): void {
    this.getPQRSF();
  }
  async getPQRSF() {
    (await this.service.getAll()).subscribe(arg => { this.pqrsf = arg; })
  }
  editar(pqr: PQRSF): void {
    localStorage.setItem("id", pqr.pqrId.toString());
  }
  getSeguimiento(pqr: PQRSF): void {
    localStorage.setItem("id", pqr.pqrId.toString());
  }
  
}
function createNewUser(arg0: number): any {
  throw new Error('Function not implemented.');
}

