import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-blog-detalle',
  templateUrl: './blog-detalle.component.html',
  styleUrls: ['./blog-detalle.component.css']
})
export class BlogDetalleComponent implements OnInit {
detalle:any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
    
    window.scrollTo(0, 0);
/* Capturamos el id */
    this.activatedRoute.params.subscribe( params =>{
      this.db.getBlogByKey(params['id']).subscribe( data => 
        {
          this.detalle=data;
          console.log('Este es el detalle:',this.detalle);
        });
    } )
  }
  formatoFecha1(fecha:string)
  {
    return moment(fecha).format('L');
  }
}
