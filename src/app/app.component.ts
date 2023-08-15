import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartItem } from './cart/cart.model';
import {MyService} from "./my.service";
import {Business} from "./business/business.model";
import {ActivatedRoute} from "@angular/router";
import {BusinessServiceService} from "./business-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'testing5';
  selectedBusiness: Business | undefined = undefined;

  showBusiness = false;



  constructor(private service: MyService, private route: ActivatedRoute, private router: Router, private businessService: BusinessServiceService) {}
  ngOnInit(): void {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.showBusiness = currentRoute.includes('/categories') || currentRoute.includes('/items') || currentRoute.includes('/cart') || currentRoute.includes('/home')|| currentRoute.includes('/contact-us') || currentRoute.includes('/checkout')|| currentRoute.includes('/coming-soon');
      }
    });

    this.route.queryParams.subscribe(params => {
      const businessId = params['business'];
      if (businessId) {
        // Fetch the selected business using its ID, assuming you have a service for that
        this.selectedBusiness = this.businessService.getSelectedBusiness();
      }
    });



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
