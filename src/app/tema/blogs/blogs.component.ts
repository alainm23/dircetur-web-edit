import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
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
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute
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
