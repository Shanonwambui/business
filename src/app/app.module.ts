import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { HttpService } from '../app/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MyService } from './my.service';
import { BusinessComponent } from './business/business.component';
import { ItemsComponent } from './items/items.component';
import { TypeComponent } from './type/type.component';
import { CartComponent } from './cart/cart.component';
import { AccompanimentComponent } from './accompaniment/accompaniment.component';
import { EmptyCartDialogComponentComponent } from './empty-cart-dialog-component/empty-cart-dialog-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemCardComponent } from './item-card/item-card.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    BusinessComponent,
    ItemsComponent,
    TypeComponent,
    CartComponent,
    AccompanimentComponent,
    EmptyCartDialogComponentComponent,
    ItemCardComponent,
    CheckoutComponent,
    ContactUsComponent,
    HomeComponent,
    ComingSoonComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [HttpService, MyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
