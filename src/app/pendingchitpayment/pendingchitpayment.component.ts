import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { NewChitResponse } from '../objects/newchitresponse';
import { NewchitserviceService } from '../services/newchitservice.service';
import { PaymenthistoryService } from '../services/paymenthistory.service';
import { RegistermemeberComponent } from '../registermemeber/registermemeber.component';
import { RegisterMemeberResponse } from '../objects/registermemberresponse';

@Component({
  selector: 'app-pendingchitpayment',
  templateUrl: './pendingchitpayment.component.html',
  styleUrls: ['./pendingchitpayment.component.css']
})
export class PendingchitpaymentComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public GroupNameArray:NewChitResponse[]=[];
  myControl = new FormControl();
  filteredGroupNames: Observable<NewChitResponse[]>;
  selectChitNumber:number;
  public pendingPayMemberArray:RegisterMemeberResponse[];

  constructor(private newchitservice:NewchitserviceService, private payment:PaymenthistoryService) {
   }

   ngOnInit(): void {
    this.getGroupDetails();
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      order: [[ 0, "asc" ]]
      
   };  
   this.myControl = new FormControl();
   console.log('GroupArray length',this.GroupNameArray.length)
   this.filteredGroupNames = this.myControl.valueChanges
     .pipe(
       startWith(null),
       map(groupname => groupname ? this.filterStates(groupname) : this.GroupNameArray.slice()));
     
  }


   filterStates(s: any) {
    let groupname = s.name || s; // s can be a State or a string
    return this.GroupNameArray.filter(group =>
      group.groupName.toLowerCase().indexOf(group.groupName.toLowerCase()) === 0);
  }

  displayGroup(group: NewChitResponse) {
    return group ? group.groupName : '';
  }

  getPendingDetails()
  {
    this.payment.getPendingPaymentDetails(this.selectChitNumber).subscribe(data =>
      {
        this.pendingPayMemberArray=data;
        this.rerender();
      });
  }

  selectedOption(event) {
    let newchit:NewChitResponse = event.option.value;
    this.selectChitNumber=newchit.chitNumber;
    // console.log(this.selectedMemberName);
  }

  getGroupDetails()
  {
    this.newchitservice.getChitDetails().subscribe(data =>{
      console.log(data);
      this.GroupNameArray=data;
      
    });
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
       this.dtTrigger.next();
    });
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
 }
  

}
