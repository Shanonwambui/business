import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../items/item.model';
import { MyService } from '../my.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartItem } from '../cart/cart.model';
import { Type } from '../type/type.model';
import { TypeComponent } from '../type/type.component';
import { Business } from '../business/business.model';
import { Category } from '../categories/category.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  @Input() selectedBusiness: Business = { name: '', id: '', repEmail: '', repMobile: '' };

  categories: Category[] = [];

  categoryItems: Item[] = [];
  items: Item[] = []; // Specify the type of 'items' property as 'Item[]'
  types: Type[] = [];
  

  constructor(private route: ActivatedRoute, private service:MyService, private router: Router, private dialog: MatDialog, private sharedService: SharedService) {}

  ngOnInit() {
    this.service.getCategories().subscribe(
      (data: any) => {
        this.categories = data as Category[];
      },
      error => {
        console.error(error);
      }
    );

   
  
    const id = this.route.snapshot.paramMap.get('id');
    // Get the stored items from the local storage
    const categoryItems = localStorage.getItem('categoryItems');
  
    if (categoryItems) {
      // Parse the stored items string to an array of items
      this.items = JSON.parse(categoryItems);
    } else {
      // If no items are stored, get all the items from the service
      this.service.getItems().subscribe(
        (data: any) => {
          this.items = data as Item[];
          
          // check the 'hasType' property of each item and show the dialog box if it is set to true
          this.items.forEach(item => {
            if (item.hasType) {
              this.service.getTypes().subscribe(
                (data: any) => {
                  this.types = data as Type[];
                  // show the dialog box
                  const dialogRef = this.dialog.open(TypeComponent, {
                    data: { types: this.types }
                  });
                  dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                      item.selectedType = result;
                    }
                  });
                },
                error => {
                  console.error(error);
                }
              );
            }
          });
        },
        error => {
          console.error(error);
        }
      );
    }

  }

  getItemCount(): number {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    let count = 0;
    for (const item of cartItems) {
      count += item.quantity;
    }
    return count;
  }

  selectItemsByCategory(category: string): void {
    console.log('Selected category:', category);
    // Filter the items array based on the selected category
    const categoryItems = this.items.filter(i => i.category === category);

    console.log('Filtered items:', categoryItems);

  
    // Store the filtered items in the local storage
    localStorage.setItem('categoryItems', JSON.stringify(categoryItems));

    console.log('JSON string:', JSON.stringify(categoryItems));

    console.log('localStorage:', localStorage);


  
    // Navigate to the items page to display the filtered items
    this.router.navigate(['/items']);
  }

  
}
