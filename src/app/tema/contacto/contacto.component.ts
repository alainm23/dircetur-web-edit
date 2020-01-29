import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import * as $ from 'jquery';
import { DialogTextComponent } from '../../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../../dialogs/dialog-image/dialog-image.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UtilsService } from '../../services/utils.service'; 

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  Categorias:any[]=[];
  Faqs:any[]=[];
  idcat:any;
  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    private dialog: MatDialog,
    public utils: UtilsService
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
    let idioma: string;
    idioma = localStorage.getItem("idioma");

    console.log ("Idioma: " + idioma);

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    this.db.getPaginaWebEtiquetas ('contacto_' + idioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.db.getPaginaWebEtiquetas ('contacto').subscribe ((res) => {
      this.imagenes = res;
      console.log ("res", res);
    });

    this.utils.idioma.subscribe((nextValue: string) => {
      console.log ("Next Idioma", nextValue);
      /* subscribirme */
      this.db.getPaginaWebEtiquetas ('contacto_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
    });

  }  

  openDialog (etiqueta_key: string, etiqueta_valor: string, tipo_entry: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '500px';
    dialogConfig.width = '600px';

    let idioma: string;
    idioma = localStorage.getItem ("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    dialogConfig.data = {
      etiqueta_key: etiqueta_key,
      etiqueta_valor: etiqueta_valor,
      tipo_entry: tipo_entry,
      doc: 'contacto',
      idioma: idioma
    };

    this.dialog.open (DialogTextComponent, dialogConfig);
  }

  openDialogImagen (etiqueta_key: string, etiqueta_valor: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      etiqueta_key: etiqueta_key,
      etiqueta_valor: etiqueta_valor
    };

    this.dialog.open (DialogImageComponent, dialogConfig);
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
