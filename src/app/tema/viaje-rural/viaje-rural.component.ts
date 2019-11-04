import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-viaje-rural',
  templateUrl: './viaje-rural.component.html',
  styleUrls: ['./viaje-rural.component.css']
})
export class ViajeRuralComponent implements OnInit {
  detalle:any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  init() {
    var tag = document.createElement('script');
    tag.src = '../../../assets/js/initslider-1.js';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  ngOnInit() {
    this.init();
    window.scrollTo(0, 0);
    /* Capturamos el id */
    this.activatedRoute.params.subscribe( params =>{
      this.db.getTurismoRuralByKey(params['id']).subscribe( data => 
        {
          this.detalle=data;
          console.log('Este es el detalle:',this.detalle);
        });
    });
  }

}
