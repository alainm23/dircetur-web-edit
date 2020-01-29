import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-no-login',
  templateUrl: './no-login.component.html',
  styleUrls: ['./no-login.component.css']
})
export class NoLoginComponent implements OnInit {

  constructor(public utils: UtilsService) { }

  ngOnInit() {
    this.utils.footer_visible = false;
  }
}
