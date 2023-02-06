import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PQRSF } from 'src/app/models/PQRSF/pqrsf';
import { Traslado } from 'src/app/models/Traslado/traslado';
import { Respuesta } from 'src/app/models/Respuesta/Respuesta';
import { Subscriber } from 'rxjs';
//import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class PqrsfService {
  private urlAPI = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //GESTION DE PQRSF

  async getAll(){
    return await this.httpClient.get<PQRSF[]>(this.urlAPI + "/pqrsf/listPqrsf");
  }

  async addPqr(pqr: PQRSF): Promise<boolean>{
    var result = false;
    const body = JSON.stringify(pqr);
    await this.httpClient.post<boolean>(this.urlAPI + "/pqrsf/addPqrsf", body, this.httpHeader).subscribe((res)=>{
      result = res;
    });
    await new Promise(f => setTimeout(f, 1000));
    return result;
  }

  async getPqr(id:number){
    return await this.httpClient.get<PQRSF>(this.urlAPI + "/pqrsf/listPqrsf/" + id);
  }
  
  async updatePqr(pqr: PQRSF): Promise<boolean>{
    var result = false;
    const body = JSON.stringify(pqr);
    await this.httpClient.put<boolean>(this.urlAPI + "/pqrsf/updatePqrsf/" + pqr.pqrId, body, this.httpHeader).subscribe(res=>
      result = res
    );
    await new Promise(f => setTimeout(f, 1000));
    return result;
  }

  //GESTION DE TRASLADO

  async addTra(tra: Traslado): Promise<boolean> {
    var result = false;
    const body = JSON.stringify(tra);
    console.log(body)
    await this.httpClient.post<boolean>(this.urlAPI + "/traslado/addTraslado", body, this.httpHeader).subscribe((res)=>{
      result = res;
    });
    await new Promise(f => setTimeout(f, 1000));
    return result;
  }

  async getTraslado(id: number) {
    return await this.httpClient.get<Traslado[]>(this.urlAPI + "/traslado/" + id + "/listTraslado");
  }

  //GESTION DE RESPUESTAS

  async addRes(res: Respuesta): Promise<boolean>{
    var result = false;
    const body = JSON.stringify(res);
    await this.httpClient.post<boolean>(this.urlAPI + "/respuesta/addRespuesta", body, this.httpHeader).subscribe((res)=>{
      result = res;
    });
    await new Promise(f => setTimeout(f, 1000));
    return result;
  }
    
  async getRespuesta(id: number){
    return await this.httpClient.get<Respuesta>(this.urlAPI + "/respuesta/" + id + "/listRespuesta");
  }


  //async addPqrAnexo(formularioAnexo: FormData): Observable<any>{
    //var result = false;
    //const body = JSON.stringify(pqr);
    /*await this.httpClient.post(this.urlAPI + "/pqrsf/anexo", formularioAnexo);//.subscribe((res:any)=>{
      //result = res;
    //});
    //await new Promise(f => setTimeout(f, 1000));

    /*this.rest.post('http://localhost:4200/upload',formularioDeDatos)
        .suscribe(res=>{
          console.log('respuesta del servidor',res);
        })*/

    //return result;
  //}
  async addPqrAnexo(formularioAnexo: FormData):Promise<any>{
    var result:any;
    //const body = JSON.stringify(pqr);
    await this.httpClient.post<any>(this.urlAPI + "/pqrsf/anexo", formularioAnexo).subscribe((res:any)=>{
    result = res;
    });
    await new Promise(f => setTimeout(f, 1000));

    /*this.rest.post('http://localhost:4200/upload',formularioDeDatos)
        .suscribe(res=>{
          console.log('respuesta del servidor',res);
        })*/

    return result;
  }
  
  
  async obtenerAnexo(nameFile: String){
    var result:any;
    return await this.httpClient.get<FormData>(this.urlAPI + "/pqrsf/"+ nameFile).subscribe((res:any)=>{
      result = res;
      console.log(result);
      });
  }

}
