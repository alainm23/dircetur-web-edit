import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogTextComponent } from '../../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../../dialogs/dialog-image/dialog-image.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-viaje-rural',
  templateUrl: './viaje-rural.component.html',
  styleUrls: ['./viaje-rural.component.css']
})
export class ViajeRuralComponent implements OnInit {
  detalle:any;
  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public utils: UtilsService
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

    let idioma: string;
    idioma = localStorage.getItem("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    this.db.getPaginaWebEtiquetas ('viaje_rural_' + idioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.db.getPaginaWebEtiquetas ('viaje_rural').subscribe ((res) => {
      this.imagenes = res;
      console.log ("res", res);
    });

    this.utils.idioma.subscribe((nextValue: string) => {
      console.log ("Next Idioma", nextValue);
      /* subscribirme */
      this.db.getPaginaWebEtiquetas ('viaje_rural_' + nextValue).subscribe ((res) => {
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
      doc: 'viaje_rural',
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


}
