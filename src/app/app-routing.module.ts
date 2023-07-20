import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { HttpClient } from '@angular/common/http';
import { ItemsComponent } from './items/items.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { BusinessComponent } from './business/business.component';


const routes: Routes = [

  { path: '', redirectTo: '/business', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  { path: 'categories/:business_id', component: CategoriesComponent },
  { path: 'cart', component: CartComponent },
  {path: 'items', component: ItemsComponent},
  {path: 'item-card', component: ItemCardComponent},
  {path: 'checkout', component: CheckoutComponent},
  { path: 'business/:id', component: BusinessComponent },
  { path: 'business', component: BusinessComponent },
  {path: 'contact-us', component: ContactUsComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
