import { Component, OnInit } from '@angular/core';
import { PaymenthistoryService } from '../services/paymenthistory.service';
import { MemberPaymentDetails } from '../objects/memberpaymentdetails';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-newdatatable',
  templateUrl: './newdatatable.component.html',
  styleUrls: ['./newdatatable.component.css']
})
export class NewdatatableComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  selectedMemberName:string='Bhanu Prakesh';
  public memberPaymentDetailsArray:MemberPaymentDetails[];
  constructor(private paymenthistoryservice:PaymenthistoryService) { }
  dtTrigger: Subject<MemberPaymentDetails> = new Subject();
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      paging: true,
      
    };
this.getMemberPaymentDetails();
    
  }

  getMemberPaymentDetails()
  {
    this.paymenthistoryservice.getMemberPaymentDetails(this.selectedMemberName).subscribe(data => {

      this.memberPaymentDetailsArray=data;
      this.dtTrigger.next();
    });
  }
  

  

}
