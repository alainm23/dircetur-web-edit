import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../app/services/utils.service';
import * as moment from 'moment';
import { Location } from "@angular/common";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dir';
  route: string;
  constructor(
    public utils: UtilsService,
    private router: Router,
    private location: Location
  ) {
    moment.locale ("es");
    
    router.events.subscribe(val => {
      console.log('Esta es la ruta actual',location.path());
      if (location.path() == "/home" || location.path() == "" || location.path() == "/") {
        this.utils.header_visible=false;
      } else {
        this.utils.header_visible=true;
      }
      $('.mostrar-menu').hide();
      $('.derecha-menu').css({'transform': 'translate3d(0,0,0)'});
    });
  }
}
