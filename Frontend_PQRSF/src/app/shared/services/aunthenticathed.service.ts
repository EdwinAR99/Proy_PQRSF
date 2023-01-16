import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/models/Usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AunthenticathedService {

  private urlAPI = 'http://localhost:8080';
  private ingresar: boolean = true;

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  async ingresarApp(obj: Usuario): Promise<boolean>{
    const body = {
      "usuNombre": obj.usuNombre,
      "usuContraseña": obj.usuContraseña
    };
 

    await this.httpClient.post<boolean>(this.urlAPI + "/login", body, this.httpHeader).subscribe((res)=>
    {
      this.ingresar = res;
    });

    return this.ingresar;
  }

  getIngresar():boolean{
    return this.ingresar;
  } 

  setIngresar(){
    this.ingresar = true;
  }

}
