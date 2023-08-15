import { Component, OnInit } from '@angular/core';
import {Business} from "../business/business.model";
import {BusinessServiceService} from "../business-service.service";
import {MyService} from "../my.service";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";



@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{

  selectedBusiness: Business | undefined = undefined;

  constructor(private service: MyService,private router: Router, private route: ActivatedRoute, private businessService: BusinessServiceService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const businessId = params['business'];
      if (businessId) {
        // Fetch the selected business using its ID, assuming you have a service for that
        this.selectedBusiness = this.businessService.getSelectedBusiness();
      }
    });


  }

}
