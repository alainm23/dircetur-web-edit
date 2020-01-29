import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../app/services/utils.service';
import * as moment from 'moment';
import { Location } from "@angular/common";

// Cookies
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/auth';

import { first } from 'rxjs/operators';

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
      //this.check_user ();

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

  async check_user () {
    console.log ("UUID", this.cookieService.get ("dircetur_device_uuid"));
    var dircetur_device_uuid = JSON.parse (this.cookieService.get ("dircetur_device_uuid"));
    
    const user = await this.afAuth.authState.pipe(first()).toPromise();
    if (user) {
      if (dircetur_device_uuid.type === 'signout') {
        this.afAuth.auth.signOut ();
        this.utils.footer_visible = false;
        this.router.navigate(['/no-login']);

        alert ("Se han revocado el acceso a la cuenta, vuelva a ingresar");
        var win = window.open("https://admi-dirceturcuscoapp.firebaseapp.com/login", '_blank');
        win.focus();
      }
    } else {
      if (dircetur_device_uuid.type === 'signin' && dircetur_device_uuid.user_type === "admi") {
        this.afAuth.auth.signInWithCustomToken (dircetur_device_uuid.token)
          .then ((user) => {
            console.log ("Usuario logeado", user);
            this.router.navigate(['/home']);
          })
          .catch (erro => {
            console.log ("Usuario no logeado, Error");
          });
      }
    } 
  }
}
