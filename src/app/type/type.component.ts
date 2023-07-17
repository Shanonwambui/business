import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from '../type/type.model';
import { MyService } from '../my.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox'; // import MatCheckboxModule

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit{
  types: Type[] = [];

  constructor(private service: MyService,
    public dialogRef: MatDialogRef<TypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { types: Type[] }
  ) {}

  ngOnInit(): void {
    this.service.getTypes().subscribe(
      (data: any) => {
        this.types = data as Type[];
        console.log('Fetched types:', this.types);
      },
      
      error => {
        console.error(error);
      }
      );
      

  }

  onTypeSelected(type: Type) {
    this.dialogRef.close(type);
    console.log("this is the selected type",type)
  }
  
  onCancel() {
    this.dialogRef.close();
  }

}