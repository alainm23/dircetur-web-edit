import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  Categorias:any[]=[];
  Faqs:any[]=[];
  idcat:any;
  constructor(
    public db:DatabaseService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.db.getallcatfaqs().subscribe(res=>{
      this.Categorias=res;
      if(this.Categorias.length>0)
      {
        this.idcat=this.Categorias[0].id;
        this.db.getFaqsporCats(this.idcat).subscribe( data => 
          {
            this.Faqs=data;
            $(document).ready(function() {
              $(".accordion-titulo").click(function(e){
                e.preventDefault();
                var contenido=$(this).next(".accordion-content");
                if(contenido.css("display")=="none"){ //open    
                  contenido.slideDown(0);     
                  $(this).addClass("open");
                }
                else{ //close   
                  contenido.slideUp(0);
                  $(this).removeClass("open");  
                }
                });
            });
          });
      }
      
    });
  }  
  TraerFaqs (id:string) {
    this.idcat=id;
    this.db.getFaqsporCats(id).subscribe( data => 
      {
        this.Faqs=data;
    
        $(document).ready(function() {
          $(".accordion-titulo").click(function(e){
            e.preventDefault();
            var contenido=$(this).next(".accordion-content");
            if(contenido.css("display")=="none"){ //open    
              contenido.slideDown(0);     
              $(this).addClass("open");
            }
            else{ //close   
              contenido.slideUp(0);
              $(this).removeClass("open");  
            }
            });
        });
      });
  }
}
