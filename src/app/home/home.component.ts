import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MyService } from '../my.service';
import { Business } from '../business/business.model';
import { Item } from '../items/item.model';
import { Category } from '../categories/category.model';
import { CartItem } from '../cart/cart.model';
import { SharedService } from '../shared.service';
import {BusinessServiceService} from "../business-service.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedBusiness: Business | undefined = undefined;


  categories: Category[] = [];
  items: Item[] = [];
  categoryItems: Item[] = [];
  categoryImages = [
    {

      name: 'PIZZA',
      imageUrl: 'assets/image/pizza.png'
    },
    {

      name: 'OTHERS',
      imageUrl: 'assets/image/others.png'
    },
    {

      name: 'SERVICE',
      imageUrl: 'assets/image/service2.png'
    },
    {

      name: 'UNFINISHED',
      imageUrl: 'assets/image/service2.png'
    },
    {

      name: 'DESSERTS',
      imageUrl: 'assets/img/home-one/feature3.jpg'
    },
    {

      name: 'SOUPS',
      imageUrl: 'assets/image/soup.png'
    },
    {

      name: 'PASTAS',
      imageUrl: 'assets/image/pastas.png'
    },
    {

      name: 'JUICES',
      imageUrl: 'assets/image/juices.png'
    },
    {

      name: 'SOFT DRINKS',
      imageUrl: 'assets/image/softdrinks.jpeg'
    },
    {

      name: 'BREAKFAST',
      imageUrl: 'assets/image/breakfast.jpeg'
    },
    {

      name: 'STARTERS',
      imageUrl: 'assets/image/starters.jpeg'
    },
    {

      name: 'SEA FOODS',
      imageUrl: 'assets/image/seafoods.png'
    },
    {

      name: 'SWAHILI DISHES',
      imageUrl: 'assets/image/swahilidishes.png'
    },
    {

      name: 'CHOMA',
      imageUrl: 'assets/image/choma.png'
    },
  ];



  constructor(private service: MyService, private router: Router, private route: ActivatedRoute, private sharedService: SharedService, private businessService: BusinessServiceService) {

  }



  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const businessId = params['business'];
      if (businessId) {
        // Fetch the selected business using its ID, assuming you have a service for that
        this.selectedBusiness = this.businessService.getSelectedBusiness();
      }
    });


    this.service.getCategories().subscribe(
      (data: any) => {
        this.categories = data as Category[];
        this.sharedService.setCategories(this.categories);
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
    console.log(this.categories)
  }
  getItemCount(): number {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    let count = 0;
    for (const item of cartItems) {
      count += item.quantity;
    }
    return count;
  }

  getImageUrl(name: string): string {
    const image = this.categoryImages.find(img => img.name === name);
    return image ? image.imageUrl : '';
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
