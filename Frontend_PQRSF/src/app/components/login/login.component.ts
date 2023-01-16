import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario/usuario';
import { AunthenticathedService } from 'src/app/shared/services/aunthenticathed.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;
  usu: Usuario = new Usuario();

  constructor(
    private fb: FormBuilder,
    private authSv: AunthenticathedService
    ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      usuNombre:['', Validators.required],
      usuContrasenia:['', Validators.required]
    });
  }

  //Accesor para los campos del formulario
  public get f():any{
    return this.myForm.controls;
  }

  public submitFormulario(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
    
    this.llenarEntidad();

    if(!this.authSv.ingresarApp(this.usu)){
      alert("Login valido")
    } else {
      alert("Usuario o contraseña invalida")
    }

  }

  public llenarEntidad(){
    this.usu.usuNombre = this.myForm.value.usuNombre;
    this.usu.usuContraseña = this.myForm.value.usuContrasenia;
  }

  
}
