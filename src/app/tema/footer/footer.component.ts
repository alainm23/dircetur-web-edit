import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import { DialogTextComponent } from '../../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../../dialogs/dialog-image/dialog-image.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Categorias:any;
  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private dialog: MatDialog,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    this.TraerCategoriasBlogs();

    let idioma: string;
    idioma = localStorage.getItem("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    this.db.getPaginaWebEtiquetas ('footer_' + idioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.db.getPaginaWebEtiquetas ('footer').subscribe ((res) => {
      this.imagenes = res;
      console.log ("res", res);
    });

    this.utils.idioma.subscribe((nextValue: string) => {
      console.log ("Next Idioma", nextValue);
      /* subscribirme */
      this.db.getPaginaWebEtiquetas ('footer_' + nextValue).subscribe ((res) => {
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
      doc: 'footer',
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

  TraerCategoriasBlogs () {
    this.db.getallCats().subscribe(res=>{
      this.Categorias=res;
      console.log('categorias del blog',res);
    });
  }

  goSobreDIR () {
    this.route.navigate (["/sobre-nosotros"]);
  }

  goTransparenciaInst () {
    this.route.navigate (["/transparencia-institucional"]);
  }

  goCalendario () {
    this.route.navigate (["/calendario"]);
  }

  goCircuitosTuristicos () {
    this.route.navigate (["/circuitos-turisticos"]);
  }
  
  goBoletoTuristico () {
    this.route.navigate (["/boleto-turistico"]);
  }
  
  goTurismoRural () {
    this.route.navigate (["/turismo-rural-comunitario"]);
  }
  
  goTurismoSocial () {
    this.route.navigate (["/turismo-social"]);
  }

  goTurismo () {
    this.route.navigate (["/turismo"]);
  }
  
  goComercioExterior () {
    this.route.navigate (["/comercio-exterior"]);
  }

  goArtesania () {
    this.route.navigate (["/artesania"]);
  }

  goContacto () {
    this.route.navigate (["/contacto"]);
  }

  goBlogs (id:string) {
    this.route.navigate (["/blogs/" + id]);
  }

  gohome () {
    this.route.navigate (["/home"]);
  }
}
