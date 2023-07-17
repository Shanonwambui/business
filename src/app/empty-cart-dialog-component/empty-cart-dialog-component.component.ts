import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-empty-cart-dialog-component',
  templateUrl: './empty-cart-dialog-component.component.html',
  styleUrls: ['./empty-cart-dialog-component.component.css']
})
export class EmptyCartDialogComponentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

}
