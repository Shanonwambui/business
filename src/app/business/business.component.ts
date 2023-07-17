import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Business } from './business.model';
import { MyService } from '../my.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BusinessServiceService } from '../business-service.service';
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit{

  Businesses: Business[] =[];

  constructor(private service: MyService, private router: Router, private route: ActivatedRoute, private businessService: BusinessServiceService){}
  
  ngOnInit(): void {
    this.service.getBusinessId().subscribe(
      (data: any)=>{
        this.Businesses = data as Business[];
        console.log('Business data:', this.Businesses);
      },
      error => {
        console.error(error);
      }
    )
  }

  onBusinessClick(business: Business) {
    console.log('Business selected:', business.name);
    this.businessService.businessSelected.emit(business); // Emit the selected business
    // additional code to handle the selected business
    this.router.navigate(['/categories', business.id]); // navigate to the business app with the business ID as a parameter
  }

}
