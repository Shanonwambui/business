import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Item } from '../app/items/item.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseApiUrl: string = environment.baseURL; // append "/v1/business" to the base URL
  private businessId: string = environment.businessId;

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    const url = `${this.baseApiUrl}/items/${this.businessId}`;
    return this.http.get<Item[]>(url);
  }

  getItemsCategoryId(category: string): Observable<Item[]> {
    const url = `${this.baseApiUrl}/items/${this.businessId}/category/${category}`;
    return this.http.get<Item[]>(url);
  }

  getItemBysCategoryId(businessId: string,category: string): Observable<Item[]> {
    const url = `${this.baseApiUrl}/items/${this.businessId}/${category}`;
    return this.http.get<Item[]>(url);
  }

  

  addToCart(payload:any) {
    return this.http.post(`${environment.baseURL}/cart`, payload); // append "/v1" to the cart endpoint URL
  }

  getCartItems() {
    return this.http.get(`${environment.baseURL}/cart`); // append "/v1" to the cart endpoint URL
  }

  increaseQty(payload:any) {
    return this.http.post(`${environment.baseURL}/cart`, payload); // append "/v1" to the cart endpoint URL
  }

  emptyCart() {
    return this.http.delete(`${environment.baseURL}/cart/empty-cart`); // append "/v1" to the cart endpoint URL
  }
}
