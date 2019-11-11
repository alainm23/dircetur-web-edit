import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../app/services/utils.service';
import * as moment from 'moment';
import { Location } from "@angular/common";

// Cookies
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/auth';

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
      private location: Location,
      public cookieService: CookieService,
      public afAuth: AngularFireAuth
    ) {
      console.log ("UUID", this.cookieService.get ("dircetur_device_uuid"));

      this.afAuth.auth.signInWithCustomToken (this.cookieService.get ("dircetur_device_uuid"))
        .then ((user) => {
          console.log ("Usuario logeado", user);
        })
        .catch (erro => {
          console.log ("Usuario no logeado, Error");
        });

      moment.locale ("es");
      
      router.events.subscribe(val => {
        console.log('Esta es la ruta actual',location.path());
        if (location.path() == "/home" || location.path() == "" || location.path() == "/" || location.path() == "/no-login") {
          this.utils.header_visible = false;
        } else {
          this.utils.header_visible = true;
        }
        
        $('.mostrar-menu').hide();
        $('.derecha-menu').css({'transform': 'translate3d(0,0,0)'});
      });
  }
}
