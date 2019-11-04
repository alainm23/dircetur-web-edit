import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Categorias:any;
  constructor(
    public db:DatabaseService,
    public route: Router
  ) { }

  ngOnInit() {
    this.TraerCategoriasBlogs();
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
