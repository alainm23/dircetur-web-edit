import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';

import { Router, ActivatedRoute } from '@angular/router';

// Services
import { AuthGuard } from '../services/auth.guard';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router,
              private utils: UtilsService,
              private auth: AuthGuard,
              public afAuth: AngularFireAuth,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.utils.footer_visible = false;

    this.activatedRoute.params.subscribe( params =>{
      const custom_token = params['custom_token'];

      console.log ('custom_token', custom_token);

      this.auth.isLogin ().then ((user) => {
        if (user) {
          this.router.navigate(['/home']);
        } else {
          this.afAuth.auth.signInWithCustomToken (custom_token)
          .then ((user) => {
            console.log ("Usuario logeado", user);
            this.router.navigate(['/home']);
          })
          .catch (erro => {
            console.log ("Usuario no logeado, Error");
          });
        }
      });
    });
  }
}
