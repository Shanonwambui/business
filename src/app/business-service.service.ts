import { Injectable } from '@angular/core';
import {Business} from "./business/business.model";

@Injectable({
  providedIn: 'root'
})
export class BusinessServiceService {
  private selectedBusiness: Business | undefined; // Initialize with undefined

  setSelectedBusiness( business : Business) {
    this.selectedBusiness = business;
  }

  getSelectedBusiness() {
    return this.selectedBusiness;
  }
}
