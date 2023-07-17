import { Injectable, EventEmitter } from '@angular/core';
import { Business } from './business/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessServiceService {
  businessSelected = new EventEmitter<Business>();

  constructor() { }
}
