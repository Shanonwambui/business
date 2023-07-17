import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import { MyService } from '../app/my.service';



export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  

}
export interface Item {
  itemId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
  businessId: string;
  category: string;
  categoryId: string;
  // ... other properties and methods
}


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private categories: Category[] = [];
  items: Item[] = [];
  categoryItems: Item[] = [];
  constructor(private router: Router, private service: MyService) { }

  setCategories(categories: Category[]): void {
    this.categories = categories;
  }

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  selectItemsByCategory(category: string): Item[] {
    const categoryItems = this.items.filter(item => item.category === category);
    localStorage.setItem('categoryItems', JSON.stringify(categoryItems));
    this.router.navigate(['/items', category]);
    return categoryItems;
  }

}
