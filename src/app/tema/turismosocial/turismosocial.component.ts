import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-turismosocial',
  templateUrl: './turismosocial.component.html',
  styleUrls: ['./turismosocial.component.css']
})
export class TurismosocialComponent implements OnInit {
Viajes:any;
  constructor(
    public db:DatabaseService,
    public route: Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.TodoslosViajesProgramados ();
  }

  TodoslosViajesProgramados () {
    this.db.getallViajesProgramados().subscribe(res=>{
      this.Viajes=res;
    });
  }
  goViajeProgramado (id:string) {
    this.route.navigate (["/viaje-programado/" + id]);
  }
}
