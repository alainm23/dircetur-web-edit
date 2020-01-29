import { Component, OnInit, Inject } from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DatabaseService } from '../../../services/database.service';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import { Observable } from "rxjs";

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.css']
})
export class DialogImageComponent implements OnInit {
  etiqueta_key: string;
  etiqueta_valor: any;
  
  imagen: any = "";
  file: string = "";
  uploadPercent: number = 0;
  constructor(
    private database: DatabaseService,
    private af_storage: AngularFireStorage,
    private dialogRef: MatDialogRef<DialogImageComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.etiqueta_key = data.etiqueta_key;
      this.etiqueta_valor = data.etiqueta_valor;

      this.imagen = this.etiqueta_valor.img;
    }

  ngOnInit() {
    
  }

  changeListener (event: any) : void {
    this.file = event.target.files[0];
    this.getBase64 (this.file);
  }

  getBase64(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      this.imagen = reader.result;
    };
    
    reader.onerror = (error) => {

    };
  }

  save () {
    const file = this.file
    const filePath = this.etiqueta_valor.path;
    const fileRef = this.af_storage.ref (filePath);
    const task = this.af_storage.upload (filePath, file);

    // observe percentage changes
    task.percentageChanges().subscribe ((res) => {
      this.uploadPercent = res;
      console.log ("this.uploadPercent", res);
    });

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL ().subscribe ((url: string) => {
            this.etiqueta_valor.img = url;

            this.database.updateImage (this.etiqueta_key, this.etiqueta_valor)
              .then (() => {
                this.close ();
              })
              .catch ((error) => {

              });
          });
        })
    )
    .subscribe ();
  }

  close () {
    this.dialogRef.close ();
  }
}
