import { Component } from '@angular/core';
import { AunthenticathedService } from './shared/services/aunthenticathed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend_PQRSF';

  constructor(
    private authSv: AunthenticathedService
  ) { }

  public visualizarMenu(){
    return this.authSv.getIngresar();
  }
}
