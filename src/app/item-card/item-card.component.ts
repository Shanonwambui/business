import { Component, Input } from '@angular/core';import { Item } from '../items/item.model';
import { MatDialog } from '@angular/material/dialog';
import { TypeComponent } from '../type/type.component';
import { Type } from '../type/type.model';
import {AccompanimentComponent} from '../accompaniment/accompaniment.component';
import { Accompaniment } from '../accompaniment/accompaniment.model';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {
  @Input() item: Item = {id: '', name: '', price: 0, category: '', hasType: false, hasAccompaniment: false,isAccompaniment: false , selected: false};
  @Input() accompaniments: Accompaniment[] = [];
  
  
  types: Type[] = [];
  
  
  constructor(private dialog: MatDialog) { }
  
  
 
  

  

  addToCart() {
    if (this.item.hasType) {
      const dialogRef = this.dialog.open(TypeComponent, {
        width: '300px',
      });
      
  
      dialogRef.afterClosed().subscribe((selectedType: Type) => {
        if (selectedType) {
          this.types = [];
          this.addToCartWithSelectedType(selectedType);
        }
      });
    } else if (this.item.hasAccompaniment) {
      const dialogRef = this.dialog.open(AccompanimentComponent, {
        width: '300px',
        
      });
      dialogRef.afterClosed().subscribe((selectedAccompaniments: Accompaniment[]) => {
        if (selectedAccompaniments && selectedAccompaniments.length > 0) {
          this.addToCartWithSelectedAccompaniments(selectedAccompaniments);
        } else {
          // If no accompaniment is selected, add the item to the cart without accompaniment
          this.addToCartWithSelectedAccompaniments([]);
        }
      });
    }
  
     else {
      this.addToCartWithSelectedType();
    }
  }
  
  
  private addToCartWithSelectedType(selectedType?: Type) {
    let cartItems: { id: string, quantity: number, type?: Type }[] = JSON.parse(localStorage.getItem('cartItems') || "[]");
    
    if (this.item.hasType && selectedType) {
      const item = cartItems.find((i: { id: string, quantity: number, type?: Type }) => i.id === this.item.id && i.type?.id === selectedType?.id);
  
      if (item) {
        item.quantity++;
      } else {
        cartItems.push({ id: this.item.id, quantity: 1, type: selectedType });
      }
    }  else {
      let item = cartItems.find((i: { id: string, quantity: number, type?: Type }) => i.id === this.item.id && !i.type);
  
      if (item) {
        item.quantity++;
      } else {
        // Check if an item with no type has already been added to the cart
        item = cartItems.find((i: { id: string, quantity: number, type?: Type }) => i.id === this.item.id && i.type?.id === 'none');
        if (item) {
          item.quantity++;
        } else {
          cartItems.push({ id: this.item.id, quantity: 1, type: { id: 'none', name: 'None', description: 'No type' } });
        }
      }
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  
  private addToCartWithSelectedAccompaniments(selectedAccompaniments: Accompaniment[]) {
    let cartItems: { id: string, quantity: number, type?: Type, accompaniment?: Accompaniment }[] = JSON.parse(localStorage.getItem('cartItems') || "[]");
  
    // Add the item as a separate cart item
    const item = cartItems.find((i: { id: string, quantity: number, type?: Type, accompaniment?: Accompaniment }) => i.id === this.item.id && !i.accompaniment);
  
    if (item) {
      item.quantity++;
    } else {
      cartItems.push({ id: this.item.id, quantity: 1 ,type: { id: 'none', name: 'None', description: 'No type' }});
    }
  
    // Add each selected accompaniment as a separate cart item
    selectedAccompaniments.forEach((selectedAccompaniment: Accompaniment) => {
      const accompanimentItem = cartItems.find((i: { id: string, quantity: number, type?: Type, accompaniment?: Accompaniment }) => i.id === selectedAccompaniment.id && !i.type);
  
      if (accompanimentItem) {
        accompanimentItem.quantity++;
      } else {
        cartItems.push({ id: selectedAccompaniment.id, quantity: 1, accompaniment: selectedAccompaniment, type: { id: 'none', name: 'None', description: 'No type' } });
      }
    });
  
    
  
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  
  
  
  
  
  
  getQuantity(): number {
    let cartItems: { id: string, quantity: number, type?: any }[] = JSON.parse(localStorage.getItem('cartItems') || "[]");
    const item = cartItems.find((i: { id: string, quantity: number, type?: any }) => i.id === this.item.id);
    if (item) {
      return item.quantity;
    } else {
      return 0;
    }
  }
  
  removeQuantity() {
    let cartItems: { id: string, quantity: number, type?: any }[] = JSON.parse(localStorage.getItem('cartItems') || "[]");
    const itemIndex = cartItems.findIndex((i: { id: string, quantity: number, type?: any }) => i.id === this.item.id);
    if (itemIndex >= 0) {
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
      } else {
        cartItems.splice(itemIndex, 1);
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}