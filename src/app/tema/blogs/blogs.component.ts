import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DialogTextComponent } from '../../dialogs/dialog-text/dialog-text.component';
import { DialogImageComponent } from '../../dialogs/dialog-image/dialog-image.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UtilsService } from '../../services/utils.service'; 

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  Blogs:any;
  Categorias:any;
  Todos_los_blogs:string='todos';
  todos:boolean=false;
  id:string;
  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    /* Capturamos el id */
    this.activatedRoute.params.subscribe( params =>{
      this.id=params['id'];
      /*let element = document.getElementById(params['id']);
      element.setAttribute ("style", "background-color: #3E729A; color: #fff;");*/
      if(params['id']=='todos')
      {
        this.TodoslosBlog();
      }
      else
      {
        this.todos=false;
        this.db.getBlogporCat(params['id']).subscribe( data => 
          {
            this.Blogs=data;
            console.log('Estos son los blog(Articulos):',this.Blogs);
          });
      }
    } );

    this.TraerCategoriasBlogs();

    let idioma: string;
    idioma = localStorage.getItem("idioma");

    if (idioma === undefined || idioma === null) {
      idioma = 'es';
    }

    this.db.getPaginaWebEtiquetas ('turismo_blog_' + idioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.db.getPaginaWebEtiquetas ('turismo_blog').subscribe ((res) => {
      this.imagenes = res;
      console.log ("res", res);
    });

    this.utils.idioma.subscribe((nextValue: string) => {
      console.log ("Next Idioma", nextValue);
      /* subscribirme */
      this.db.getPaginaWebEtiquetas ('turismo_blog_' + nextValue).subscribe ((res) => {
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
      doc: 'turismo_blog',
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


  TodoslosBlog () {
    this.db.getallblogs().subscribe(res=>{
      this.Blogs=res;
      this.todos=true;
      console.log('Estos son Todos los blog(Articulos)',res,'este es el valor de todos:',this.todos);
    });
  }

  formatoFecha1(fecha:string)
  {
    return moment(fecha).format('L');
  }

  BlogDetalle(id:string)
  {
    this.route.navigate (["/blog-detalle/" + id]);
  }

  TraerCategoriasBlogs () {
    this.db.getallCats().subscribe(res=>{
      this.Categorias=res;
      console.log('categorias del blog',res);
    });
  }

  goBlogs (id:string) {
    this.route.navigate (["/blogs/" + id]);  
    
  
  }

}
