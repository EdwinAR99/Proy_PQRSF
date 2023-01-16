import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './components/listar/listar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { EditarComponent } from './components/editar/editar.component';
import { TrazabilidadComponent } from './components/trazabilidad/trazabilidad.component';
import { EditarSeguimientoComponent } from './components/editar-seguimiento/editar-seguimiento.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',component:ListarComponent},
  {path:'registrar',component:RegistrarComponent},
  {path:'editar',component:EditarComponent},
  {path:'trazabilidad',component:TrazabilidadComponent},
  {path:'editarTrazabilidad',component:EditarSeguimientoComponent},
  {path:'logout', component:LoginComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
