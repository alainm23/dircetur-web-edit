import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import * as $ from 'jquery';

import { MatDialog, MatDialogConfig } from "@angular/material"
import { DialogTextComponent } from '../../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../../dialogs/dialog-image/dialog-image.component';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  Funciones:any;
  Juntas_Directivas:any;

  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.TodaslasFunciones ();

    this.JuntaDirectiva ();
    
    let idioma: string;
    idioma = localStorage.getItem("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    //copiar 
    this.db.getPaginaWebEtiquetas ('sobre_nosotros_' + idioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.db.getPaginaWebEtiquetas ('sobre_nosotros').subscribe ((res) => {
      this.imagenes = res;
      console.log ("res", res);
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
      doc: 'sobre_nosotros',
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

  TodaslasFunciones () {
    this.db.getallDirceturFunciones().subscribe(res=>{
      this.Funciones=res;
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

  JuntaDirectiva () {
    this.db.getallDirceturJuntaDirectiva().subscribe(res=>{
      this.Juntas_Directivas=res;
    });
  }

}
