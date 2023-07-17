import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MyService } from '../my.service';
import { Business } from '../business/business.model';
import { Item } from '../items/item.model';
import { Category } from './category.model';
import { CartItem } from '../cart/cart.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  @Input() selectedBusiness: Business = { name: '', id: '', repEmail: '', repMobile: '' };


  categories: Category[] = [];
  items: Item[] = [];
  categoryItems: Item[] = [];
  categoryImages = [
    {
      
      name: 'PIZZA',
      imageUrl: 'assets/image/pizza.jpeg'
    },
    {
      
      name: 'SOUPS',
      imageUrl: 'assets/image/soup.jpeg'
    },
    {
     
      name: 'PASTAS',
      imageUrl: 'assets/image/pastas.jpeg'
    },
    {
      
      name: 'JUICES',
      imageUrl: 'assets/image/juices.jpeg'
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
      imageUrl: 'assets/image/seafoods.jpeg'
    },
    {
      
      name: 'SWAHILI DISHES',
      imageUrl: 'assets/image/swahilidishes.jpeg'
    },
    {
      
      name: 'CHOMA',
      imageUrl: 'assets/image/choma.jpeg'
    },
  ];
  
  Business: Business = {name: "", id: "",repEmail: "",repMobile: ""};
 

  constructor(private service: MyService, private router: Router, private route: ActivatedRoute, private sharedService: SharedService) {
    
  }



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.getBusinessId().subscribe(
      (data: any)=>{
        this.Business = data[0] as Business; // access the first object of the array
        console.log('Business data:', this.Business);
        console.log('Business name:', this.Business.name);
      
      },
      error => {
        console.error(error);
      }
    );
   
  
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
