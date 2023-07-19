import { Component, OnInit } from '@angular/core';
import {Business} from "../business/business.model";
import {environment} from "../../environments/environment";
import {MyService} from "../my.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{

  Business :Business = {name: "", id: "", repemail:"", repmobile: ""}

  constructor(private service: MyService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || environment.businessId;


    this.service.getBusinessId().subscribe(
      (data: any)=>{
        const matchingBusiness = data.find((business: Business) => business.id === id);
        if (matchingBusiness) {
          this.Business = matchingBusiness;
          console.log('Business data:', this.Business);
          console.log('Business name:', this.Business.name);
        }
      },
      error => {
        console.error(error);
      }
    )

  }


}
