import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartItem } from './cart/cart.model';
import {environment} from "../environments/environment";
import {MyService} from "./my.service";
import {Business} from "./business/business.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'testing5';

  showBusiness = false;

  Business: Business = {name: "", id: "",repemail: "",repmobile: ""};

  constructor(private service: MyService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || environment.businessId;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.showBusiness = currentRoute.includes('/categories') || currentRoute.includes('/items') || currentRoute.includes('/cart') || currentRoute.includes('/home')|| currentRoute.includes('/contact-us') || currentRoute.includes('/checkout');
      }
    });



    this.service.getBusinessId().subscribe(
      (data: any)=>{
        const matchingBusiness = data.find((business: Business) => business.id === id);
        if (matchingBusiness) {
          this.Business = matchingBusiness;
          console.log('Business data:', this.Business);
          console.log('Business name:', this.Business.name);
          console.log('Business mobile:', this.Business.repmobile)
        }
      },
      error => {
        console.error(error);
      }
    )

  }

  getItemCount(): number {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    let count = 0;
    for (const item of cartItems) {
      count += item.quantity;
    }
    return count;
  }
}
