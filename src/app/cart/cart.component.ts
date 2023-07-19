import { Component, OnInit, Input } from '@angular/core';
import { MyService } from '../my.service';
import { Item } from '../items/item.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Type } from '../type/type.model';
import { TypeComponent } from '../type/type.component';
import { Business } from '../business/business.model';
import { Accompaniment } from '../accompaniment/accompaniment.model';
import { MatDialog } from '@angular/material/dialog';
import { EmptyCartDialogComponentComponent } from '../empty-cart-dialog-component/empty-cart-dialog-component.component';


interface CartItem {
  itemId: Item;
  selectedType: Type;
  selectedAccompaniment: Accompaniment;
  quantity: number;
  total: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  @Input() selectedBusiness: Business = { name: '', id: '', repemail: '', repmobile: '' };

  carts: CartItem[] = [];
  subTotal = 0;
  loading = true;

  constructor(private service: MyService, private dialog: MatDialog, private router: Router) {}

  getItemCount(): number {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    let count = 0;
    for (const item of cartItems) {
      count += item.quantity;
    }
    return count;
  }


  ngOnInit() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (cartItems.length) {
      this.service.getItems().subscribe(
        (data: Item[]) => {
          this.carts = cartItems.map((cartItem: { id: string, quantity: number,type?: Type, accompaniment?: Accompaniment }) => {
            const item = data.find(i => i.id === cartItem.id);

            const total = item ? cartItem.quantity * item.price : 0; // Add check for item
            return {
              itemId: item,
              quantity: cartItem.quantity,
              selectedType: cartItem.type,
              selectedAccompaniments: cartItem.accompaniment, //
              total: total
            };
          });
          this.subTotal = this.carts.reduce((acc, curr) => acc + curr.total, 0);
        },
        error => {
          console.error(error);
        },
        () => {
          this.loading = false;
        }

      );
    } else {
      this.loading = false;
    }
  }


  emptyCart() {
    const dialogRef = this.dialog.open(EmptyCartDialogComponentComponent, {
      data: { message: 'Are you sure you want to empty your cart?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        localStorage.setItem('cartItems', '[]');
        this.carts = [];
        this.subTotal = 0;
      }
    });
  }

  incrementQuantity(item: CartItem) {
    let cartItems: { id: string, quantity: number, type?: Type, accompaniment?: Accompaniment }[] = JSON.parse(localStorage.getItem('cartItems') || "[]");
    const itemIndex = cartItems.findIndex((i: { id: string, quantity: number, type?: Type, accompaniment?: Accompaniment }) => i.id === item.itemId.id && i.type?.id === item.selectedType?.id && i.accompaniment?.id === item.selectedAccompaniment?.id);
    if (itemIndex >= 0) {
      cartItems[itemIndex].quantity++;
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    item.quantity++;
    item.total = item.itemId.price * item.quantity;
    this.subTotal = this.carts.reduce((acc, curr) => acc + curr.total, 0);
  }

  decrementQuantity(item: CartItem) {
    let cartItems: { id: string, quantity: number, type?: Type, accompaniment?: Accompaniment }[] = JSON.parse(localStorage.getItem('cartItems') || "[]");
    const itemIndex = cartItems.findIndex((i: { id: string, quantity: number, type?: Type, accompaniment?: Accompaniment }) => i.id === item.itemId.id && i.type?.id === item.selectedType?.id && i.accompaniment?.id === item.selectedAccompaniment?.id);
    if (itemIndex >= 0) {
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
      } else {
        cartItems.splice(itemIndex, 1);
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    item.quantity--;
    item.total = item.itemId.price * item.quantity;
    this.subTotal = this.carts.reduce((acc, curr) => acc + curr.total, 0);
  }



  removeItem(item: CartItem) {
    const dialogRef = this.dialog.open(EmptyCartDialogComponentComponent, {
      data: { message: 'Are you sure you want to remove this item?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Remove the item from the carts array
        let cartItems: { id: string, quantity: number }[] = JSON.parse(localStorage.getItem('cartItems') || "[]");
        const itemIndex = cartItems.findIndex((i: { id: string, quantity: number, type?: Type, accompaniment?: Accompaniment }) => i.id === item.itemId.id && i.type?.id === item.selectedType?.id && i.accompaniment?.id === item.selectedAccompaniment?.id);
        if (itemIndex > -1) {
          cartItems.splice(itemIndex, 1);
          // Update the cart data in the local storage
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }

        const index = this.carts.indexOf(item);
        if (index > -1) {
          this.carts.splice(index, 1);
          // Update subtotal
          this.subTotal -= item.total;
        }
      }
    });
  }

  goToCategoryPage() {
    const businessId = this.selectedBusiness.id;
    this.router.navigate(['/categories', businessId]);
  }

}




