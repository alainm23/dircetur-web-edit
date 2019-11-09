import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  header_visible: boolean = false;
  idioma:any = new Subject();

  constructor() { }

  set ElIdioma (value) {
    this.idioma.next(value);
    localStorage.setItem('idioma', value);
  }
 
  get ElIdioma () {
    return localStorage.getItem('idioma');
  }
}
