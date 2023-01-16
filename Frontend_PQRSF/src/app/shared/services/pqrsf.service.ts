import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { Traslado } from 'src/app/models/Traslado/traslado';

@Injectable({
  providedIn: 'root'
})
export class PqrsfService {
  private urlAPI = 'http://localhost:8080';
  private result: boolean = false;//false;

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  async getAll(){
    return await this.httpClient.get<PQRSF[]>(this.urlAPI + "/pqrsf/listPqrsf");
  }
  async addPqr(pqr: PQRSF): Promise<boolean>{
    const body = JSON.stringify(pqr);
    await this.httpClient.post<boolean>(this.urlAPI + "/pqrsf/addPqrsf", body, this.httpHeader).subscribe((res)=>{
      this.result = res;
      console.log("Body " + body);
      console.log("Resultado " + this.result);
      console.log("Res " + res);
    });
    return this.result;
  }
  async getTraslado(id:number){
    return await this.httpClient.get<Traslado[]>(this.urlAPI + "/traslado/"+id+"/listTraslado");
  }
  async getPqr(id:number){
    return await this.httpClient.get<PQRSF>(this.urlAPI + "/pqrsf/listPqrsf/"+id);
  }
  async UpdatePqr(pqr: PQRSF): Promise<boolean>{
    const body = JSON.stringify(pqr);
    await this.httpClient.post<boolean>(this.urlAPI + "/pqrsf/updatePqrsf/"+pqr.pqrId, body, this.httpHeader).subscribe((res)=>{
      this.result = res;
      console.log("Body " + body);
      console.log("Resultado " + this.result);
      console.log("Res " + res);
    });
    return this.result;
  }


}
