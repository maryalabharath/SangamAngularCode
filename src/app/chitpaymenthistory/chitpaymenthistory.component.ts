import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentHistory } from '../objects/paymenthistory';
import { PaymenthistoryService } from '../services/paymenthistory.service';
import { startWith, map, subscribeOn } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, Subject, interval } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NewChitResponse } from '../objects/newchitresponse';
import { RegisterMemeberResponse } from '../objects/registermemberresponse';
import { RegistermemberService } from '../services/registermember.service';
import { NewchitserviceService } from '../services/newchitservice.service';
declare var $;
@Component({
  selector: 'app-chitpaymenthistory',
  templateUrl: './chitpaymenthistory.component.html',
  styleUrls: ['./chitpaymenthistory.component.css']
})
export class ChitpaymenthistoryComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public paymentHistoryreponseArray: PaymentHistory[];
  public  myControl = new FormControl();
  public filteredMemberNames: Observable<RegisterMemeberResponse[]>;
  public selectedMember:string;
  public GroupNameArray:NewChitResponse[];
  public MemberNames:RegisterMemeberResponse[]=[];
  public selectedChitNumber:number;
  public selectedMemberName:RegisterMemeberResponse;
  public selecteChitNumber:number;
  public paymenthistory=new PaymentHistory();
  public selectedName;
  
  constructor(private paymenthistoryservice:PaymenthistoryService,private registermemberservice:RegistermemberService,
    private newchitservice:NewchitserviceService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      // order: [[ 5, "desc" ]],
      footerCallback: function(row, data, start, end, display) {
        var api = this.api();
       
          // Total over all pages
         var  total = api
          .column(4)
          .data()
          .reduce( function (a, b) {
              return parseInt(a) + parseInt(b);
          }, 0 );

      // Total over this page
     var  pageTotal = api
          .column( 4, { page: 'current'} )
          .data()
          .reduce( function (a, b) {
              return parseInt(a) + parseInt(b);
          }, 0 );

      // Update footer
      $( api.column(4).footer() ).html(
          '$'+pageTotal +' ( $'+ total +' total)'
      );
       
      }
      
   };  
    this.getPaymentDetails();
    this.getGroupDetails();
  }

  filtermember(s: any) {
    let groupname = s.name || s; // s can be a State or a string
    return this.MemberNames.filter(member =>
      member.firstname.toLowerCase().indexOf(groupname.toLowerCase()) === 0);
  }

  displayMember(member: RegisterMemeberResponse) {
    return member ? member.firstname : '';
  }

  getActualChitAmount(chitnumber)
  {
    console.log(chitnumber);
    this.selecteChitNumber=chitnumber;
    this.getMemberDetailsByChitNumber();
    this.selectedMember='';
    this.selectedMemberName.membernumber=null;
  }


  getMemberDetailsByChitNumber()
  {
    this.registermemberservice.getMemberDetailsByChitNumber(this.selecteChitNumber).subscribe(data => {
      this.MemberNames=data;
      this.filteredMemberNames=this.myControl.valueChanges.pipe(
        startWith(null),
        map(membername => membername ? this.filtermember(membername) : this.MemberNames.slice()));
    })
  }

  selectedOption(event) {
    this.selectedMemberName = event.option.value;
    // this.selectedMember=this.selectedMemberName.firstname;
    console.log(this.selectedMemberName);
  }
  

  getGroupDetails()
  {
    this.newchitservice.getChitDetails().subscribe(data =>{
      console.log(data);
      this.GroupNameArray=data;
    });
  }

getPaymentDetails()
{
  this.paymenthistoryservice.getPaymentDetailsHistory().subscribe(data =>{
    console.log(data);
    this.paymentHistoryreponseArray=data;
    // this.dtTrigger.next();
    this.rerender();
  //   this.dtOptions = {
  //     data: this.paymentHistoryreponseArray,
  //     columns: [
  //      // {title: 'PaymentId', data: 'paymentid'},
  //      {title: 'GroupName', data: 'groupname'},
  //       {title: 'Firstname', data: 'firstname'},
  //       {title: 'InterestAmount', data: 'interestamount'},
  //       {title: 'PaidAmount', data: 'paidamount'},
  //       {title: 'commission', data: 'commission'},
  //       {title: 'Paiddate', data: 'paiddate'},
        
       
  //     ],
  //     columnDefs: [
  //       { targets:1 , type: 'string' }

  //     ]
      
  //   };
  // }, err => {}, () => {
  //   this.dataTable = $(this.table.nativeElement);
  //   this.dataTable.DataTable(this.dtOptions);
  // });
  // {title: 'ChitNumber', data: 'chitnumber'},
  // {title: 'MemberNumber', data: 'membernumber'},
  // {title: 'Remarks', data: 'remarks'},
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

//paymenthistory:PaymentHistory
getPaymentDetailsByGrpMember()
 {
   this.paymenthistory.chitnumber=this.selecteChitNumber;
   if(this.selectedMemberName!== undefined)
   {
    this.paymenthistory.membernumber=this.selectedMemberName.membernumber;
   }
   
   this.paymenthistoryservice.getPaymentDetailsByGrpandmember(this.paymenthistory).subscribe(data =>{
     this.paymentHistoryreponseArray=data;
     this.rerender();
   })

 }

 getTotal(){
  return this.paymentHistoryreponseArray.reduce((a, b) => +a + +b.interestamount, 0);
}

}



