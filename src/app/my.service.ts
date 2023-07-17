import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './categories/category.model';
import { Item } from './items/item.model';
import { Business } from './business/business.model';
import { Type } from './type/type.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private baseApiUrl = `${environment.baseURL}`;
  private businessId = environment.businessId;

  constructor(private http: HttpClient) { }
 


  getBusinessId(): Observable<Business[]>{
    const apiUrl = `https://businessapi.wynda.africa/api/business/list/global`;
    return this.http.get<Business[]>(apiUrl);
  }
  

  getCategories(): Observable<Category[]> {
    const apiUrl = `${this.baseApiUrl}/items/categories/${this.businessId}`;
    return this.http.get<Category[]>(apiUrl);
  }

  getItems(): Observable<Item[]> {
    const apiUrl = `${this.baseApiUrl}/items/${this.businessId}`;
    return this.http.get<Item[]>(apiUrl);
  }

  getTypes(): Observable<Type[]> {
    const apiUrl= `${this.baseApiUrl}/item/type/${this.businessId}`;
    return this.http.get<Type[]>(apiUrl)
    
  }
}
