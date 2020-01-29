import { Component, OnInit, Inject } from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup , FormControl, Validators } from '@angular/forms';

import { DatabaseService } from '../../../services/database.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-dialog-text',
  templateUrl: './dialog-text.component.html',
  styleUrls: ['./dialog-text.component.css']
})
export class DialogTextComponent implements OnInit {
  etiqueta_key: string;
  etiqueta_valor: string;
  tipo_entry:  number;
  doc: string;
  idioma: string;

  form: FormGroup;

  public Editor = ClassicEditor;

  config: any = {
    fillEmptyBlocks: false,
    tabSpaces: 0
  };

  constructor(
    private database: DatabaseService,
    private dialogRef: MatDialogRef<DialogTextComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.etiqueta_key = data.etiqueta_key;
      this.etiqueta_valor = data.etiqueta_valor;
      this.tipo_entry = data.tipo_entry;
      this.doc = data.doc;
      this.idioma = data.idioma;
  }

  ngOnInit() {
    this.form = new FormGroup ({
      etiqueta_valor: new FormControl (this.etiqueta_valor, [Validators.required]),
    });
  }

  save () {
    if (this.form.valid) {
      this.database.updatePaginaWebValor (this.doc + '_' + this.idioma, this.etiqueta_key, this.form.value.etiqueta_valor)
        .then (() => {
          this.close ();
        })
        .catch ((error: any) => {
          console.log ('Error', error);
        });
    }
  }

  close () {
    this.dialogRef.close ();
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}
}
