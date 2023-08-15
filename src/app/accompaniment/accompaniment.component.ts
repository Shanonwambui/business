import { Component, Inject,OnInit } from '@angular/core';
import {Item} from "../items/item.model";
import {MyService} from "../my.service";

import {Accompaniment} from "./accompaniment.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-accompaniment',
  templateUrl: './accompaniment.component.html',
  styleUrls: ['./accompaniment.component.css']
})
export class AccompanimentComponent implements  OnInit{
  items: Item[] = [];
  accompaniments: Accompaniment[] =[];

  constructor(private service: MyService,
              public dialogRef: MatDialogRef<AccompanimentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { accompaniments: Accompaniment [] }
  ) {}


  ngOnInit(): void {
    this.service.getItems().subscribe(
      (data: any)=>{
        this.items = data as Item[];
        this.accompaniments = this.items.filter(item => item.isAccompaniment)
          .map(item => ({...item, selected: false})); // set selected property to false for all accompaniments
      }
    )

  }



  onCancel() {
    this.dialogRef.close();
  }

  onOk() {
    const selectedAccompaniments = this.accompaniments.filter(accompaniment => accompaniment.selected);
    this.dialogRef.close(selectedAccompaniments);
  }


}
