import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as $ from 'jquery';
/*import reframe from 'reframe.js';*/

import { MatDialog, MatDialogConfig } from "@angular/material"
import { DialogTextComponent } from '../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../dialogs/dialog-image/dialog-image.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Blogs:any;
  Categorias:any;
  Rutas:any;
  Eventos:any[];
  Ancho_video:any;
  Alto_video:any;

  /* video */
  YT: any;
  video: any;
  player: any;
  reframed: Boolean = false;

  etiquetas: any;
  imagenes: any;

  constructor(public db:DatabaseService,
              public route: Router,
              private dialog: MatDialog
            ) { }

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
        doc: 'home',
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

    init () {
      if (window['YT']) {
        this.createPlayer();
        return;
      }

      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window['onYouTubeIframeAPIReady'] = () => this.createPlayer();
    }
    
    getFormatText (text: string) {
      return "";
    }

    ngOnInit() { 
      this.init();
  
      this.db.getBlogporCat("5ZvVcywez0zYJa0t3BUt").subscribe((res: any [])=>{
        this.Blogs=res;
        console.log("Estos son los blog de la categoria Noticia:",res);
      });
  
      this.db.get7RutasSugeridas().subscribe(res=>{
        this.Rutas=res;
        console.log(res);
      });
  
      AOS.init();
  
      this.TraerEventos();
      
      this.TraerCategoriasBlogs();

      //copiar 

      let idioma: string;
      idioma = localStorage.getItem("idioma");

      if (idioma === undefined || idioma === null) {
        idioma = 'es';
      }
      
      this.db.getPaginaWebEtiquetas ('home_' + idioma).subscribe ((res) => {
        this.etiquetas = res;
      });

      this.db.getPaginaWebEtiquetas ('home').subscribe ((res) => {
        this.imagenes = res;
        console.log ("res", res);
      });
    };

    cambio_idioma (idioma: string) {
      localStorage.setItem ("idioma", idioma);

      this.db.getPaginaWebEtiquetas ('home_' + idioma).subscribe ((res) => {
        this.etiquetas = res;
      });
    }

    createPlayer () {
      if(screen.width==360){
        this.Ancho_video=screen.width;
        this.Alto_video=203;
      }else if (screen.width==375){
        this.Ancho_video=screen.width;
        this.Alto_video=210;
      }else if (screen.width==411){
        this.Ancho_video=screen.width;
        this.Alto_video=235;
      }else if (screen.width==414){
        this.Ancho_video=screen.width;
        this.Alto_video=243;
      }else if (screen.width==768){
        this.Ancho_video=screen.width;
        this.Alto_video=433;
      }else if (screen.width==1024){
        this.Ancho_video=screen.width;
        this.Alto_video=575;
      }else if (screen.width==1280){
        this.Ancho_video=screen.width;
        this.Alto_video=719;
      }else if (screen.width==1366){
        this.Ancho_video=1349.4;
        this.Alto_video=760;
      }else if (screen.width>1399){
        this.Ancho_video=screen.width;
        this.Alto_video=780;
      }
      this.video = 'Mnjpd9qXwdI' //video id
      console.log('Este es el id del video',this.video,'Este es el ancho de tu video=', this.Ancho_video,'este es el alto del video=',this.Alto_video);
      console.log('Entre en la funcion Api Youtube');
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        width: this.Ancho_video,
        height: this.Alto_video,
        videoId: this.video,
        playerVars: {
            autoplay: 1,        // Auto-play the video on load
            enablejsapi: 1,
            autohide: 1,
            disablekb: 1, 
            controls: 0,        // Hide pause/play buttons in player
            showinfo: 0,        // Hide the video title
            modestbranding: 1,  // Hide the Youtube Logo
            loop: 1,            // Run the video in a loop
            fs: 0,              // Hide the full screen button
            rel: 0,
        },
        
        events: {
          onReady: function(e) {
              console.log ("Evento onReady", e);
              e.target.mute();
              e.target.playVideo(); // para q funcione en el telefono
              e.target.setPlaybackQuality('hd720');
          },
          onStateChange: function(e) {
            console.log ("Evento onStateChange", e);
            var videoHolder = document.getElementById('video-prueba');
            var imagenView = document.getElementById('imagen-prueba');
            var imagenSrc = document.getElementById('imagen-prueba2');
            if(e && e.data === 1){
                if(videoHolder && videoHolder.id) {
                    imagenSrc.classList.remove('loading-img');
                    imagenSrc.classList.add('loading');
                  setTimeout(() => {
                    imagenView.classList.remove('loading-img');
                    videoHolder.classList.remove('loading'); 
                  }, 4*1000);
                  
                }
            }else if(e && e.data === 0){
              e.target.playVideo();
            }
          },
          onError: function(e) {
          console.log('Detalle del error de Youtube:',e);
        }
        }
      });
    }

    ngOnDestroy(){
      console.log('Destruyendo video youtube');
      window['onYouTubeIframeAPIReady'] = null;
      if (this.player) {
        this.player.destroy();
      }
      $('#video-prueba').addClass('loading');
      $('#imagen-prueba').addClass('loading-img');
      $('#imagen-prueba2').addClass('loading-img');
      $('#imagen-prueba2').removeClass('loading');
    }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
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

  formatoFecha1(fecha:string)
  {
    return moment(fecha).format('L');
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
  
  BlogDetalle(id:string)
  {
    this.route.navigate (["/blog-detalle/" + id]);
  }

  verCircuitoTourDetalle(id:string)
  {
    this.route.navigate (["/circuito-detalle/" + id]);
  }

  verDetalleEvento(id:string)
  {
    this.route.navigate (["/evento-detalle/" + id]);
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

  goBlogs (id:string) {
    this.route.navigate (["/blogs/" + id]);
  }
  
  goContacto () {
    this.route.navigate (["/contacto"]);
  }
 
  ObtenerDia(fecha:string)
  {
    return moment(fecha).format('DD');
  }

  ObtenerMesEnLetra(fecha:string)
  {
    return moment(fecha).format('MMM');
  }

  TraerEventos() 
  {
    
    this.db.getEventospormes(moment().format('MM')).subscribe((data: any [])=>{
    
      /*let respuesta=data.filter ((i: any) => {
        return new Date(i.datageneral.fecha).getTime() >= new Date().getTime();
      });*/
 
      this.Eventos = data.sort ((a: any, b: any) => {
        return +new Date(a.datageneral.fecha) - +new Date(b.datageneral.fecha);
      });
      let i=1;
      this.Eventos.forEach(evento => {
        //Asignar el color azul y rojo a cada evento
        if(i<3)
        {
          evento.color='azul';
        }
        else
        {
          evento.color='rojo'; 
          if(i==4)
          {
            i=0;
          }
        }
        i++;
      });
      
      console.log('listado de eventos del mes actual:', this.Eventos);
    })

  }
}
