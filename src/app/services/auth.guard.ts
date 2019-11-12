import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { UtilsService } from '../services/utils.service';

import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, 
              private router: Router, 
              private util: UtilsService) {}

  canActivate() {
    return this.isLogin ()
      .then (user => {
        if (user) {
          console.log("Usuario logeado", user);

          this.util.footer_visible = true;
          return true;
        } else {
          console.log('Usuario no logeado');
          this.util.footer_visible = false;
          this.util.header_visible = false;
          
          this.router.navigate(['/no-login']);

          var win = window.open("https://admi-dirceturcuscoapp.firebaseapp.com/login", '_blank');
          win.focus();
          
          return false;
        }
      });
  }

  async isLogin (){
    const user = await this.afAuth.authState.pipe(first()).toPromise();
    if (user) {
      return true;
    } else {
      return false;
    }    
  }
}
