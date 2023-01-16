import { Component, OnInit } from '@angular/core';
import { AunthenticathedService } from 'src/app/shared/services/aunthenticathed.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(
    private authSv: AunthenticathedService
  ) { }

  ngOnInit() {
    
  }

  SendLogOut(event:any){
    this.authSv.setIngresar();
  }

}
