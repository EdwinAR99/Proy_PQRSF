import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FilterPipe } from './components/Pipes/filter.pipe';

//Service
import { PqrsfService } from './shared/services/pqrsf.service';
//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { EditarComponent } from './components/editar/editar.component';
import { EditarSeguimientoComponent } from './components/editar-seguimiento/editar-seguimiento.component';
import { ListarComponent } from './components/listar/listar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TrazabilidadComponent } from './components/trazabilidad/trazabilidad.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    EditarComponent,
    EditarSeguimientoComponent,
    ListarComponent,
    NavbarComponent,
    TrazabilidadComponent,
    FilterPipe 
  ],
  imports: [
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [PqrsfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
