import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-circuitosturisticos',
  templateUrl: './circuitosturisticos.component.html',
  styleUrls: ['./circuitosturisticos.component.css']
})
export class CircuitosturisticosComponent implements OnInit {
Viajes:any;
  constructor(
    public db:DatabaseService,
    public route: Router,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.TodoslosCircuitosTuristicos ();
  }

  TodoslosCircuitosTuristicos () {
    this.db.getallCircuitosTuristicos().subscribe(res=>{
      this.Viajes=res;
    });
  }

  goCircuitoDetalle (id:string) {
    this.route.navigate (["/circuito-detalle/" + id]);
  }

}
