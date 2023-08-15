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
  @Input() selectedBusiness: Business = { name: '', id: '', repemail: '', repmobile: '' };
  isActive: boolean = false;
  categories: Category[] = [];

  categoryItems: Item[] = [];
  items: Item[] = []; // Specify the type of 'items' property as 'Item[]'
  types: Type[] = [];


  constructor(private route: ActivatedRoute, private service:MyService, private router: Router, private dialog: MatDialog, private sharedService: SharedService) {}

  ngOnInit() {
    this.service.getCategories().subscribe(
      (data: any) => {
        this.categories = data as Category[];
        // Initialize isActive to false for all categories
        this.categories.forEach(category => category.isActive = false);

      },
      error => {
        console.error(error);
      }
    );
    this.service.getItems().subscribe(
      (data: any) => {
        this.items = data as Item[];
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
      this.categoryItems = JSON.parse(categoryItems);
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


  selectItemsByCategory(selectedCategory: Category): void {
    // Reset isActive for all categories
    this.categories.forEach(category => category.isActive = false);

    // Set isActive only for the selected category
    selectedCategory.isActive = true;

    // Filter the items array based on the selected category
    this.categoryItems = this.items.filter(i => i.category === selectedCategory.id);

    console.log('Filtered items:', this.categoryItems);



  }




}
