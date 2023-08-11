import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BusinessServiceService {
  private selectedBusiness: string | null = null; // Initialize with null

  setSelectedBusiness(businessName: string) {
    this.selectedBusiness = businessName;
  }

  getSelectedBusiness() {
    return this.selectedBusiness;
  }
}
