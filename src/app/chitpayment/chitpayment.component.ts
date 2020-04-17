import { Component, OnInit, ViewChild,AfterViewInit, OnDestroy } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PaymenthistoryService } from '../services/paymenthistory.service';
import { MemberPaymentDetails } from '../objects/memberpaymentdetails';
import { DataTableDirective } from 'angular-datatables';
import { AuctionService } from '../services/auction.service';
import { AuctionResponse } from '../objects/auctionresponse';
import { PaymentHistory } from '../objects/paymenthistory';
import { DatePipe } from '@angular/common';
declare var $;
@Component({
  selector: 'app-chitpayment',
  templateUrl: './chitpayment.component.html',
  styleUrls: ['./chitpayment.component.css']
})
export class ChitpaymentComponent implements  OnInit {

  @ViewChild(DataTableDirective) 
  dtElement: DataTableDirective;
  @ViewChild('closebutton') closebutton;
   dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  myControl = new FormControl();
  options: string[]=[];
  filteredOptions: Observable<string[]>;
  selectedMemberName:string;
  public memberPaymentDetailsArray:MemberPaymentDetails[];
  public memberPaymentDetall:MemberPaymentDetails;
  public auction:AuctionResponse=new AuctionResponse;
  public paymenthistory:PaymentHistory=new PaymentHistory;
  public Amounttopaid:number;
  public InterestAmount:number;
  public commission:number;
  
 
  constructor(private paymenthistoryservice:PaymenthistoryService,private Auctionservice:AuctionService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.dtOptions = {
       pagingType: 'simple_numbers',
       pageLength: 5,
       
    };
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   
    this.getDistinctMemberNames();
  }

  getDistinctMemberNames()
{
  this.paymenthistoryservice.getDistinctMemberName().subscribe(data => {

    this.options=data;
  });
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}

selectedOption(event) {
  this.selectedMemberName = event.option.value;
  console.log(this.selectedMemberName);
}

  getMemberPaymentDetails()
  {
    this.paymenthistoryservice.getMemberPaymentDetails(this.selectedMemberName).subscribe(data => {

    this.memberPaymentDetailsArray=data;
    //this.dtTrigger.next();
    this.rerender();

    });
  }

  getAuctionDetailsByChitNumber(memberpaymentdetails:MemberPaymentDetails)
  {
    console.log('chitNumber',memberpaymentdetails.chitNumber);
    this.memberPaymentDetall=memberpaymentdetails;
    this.Auctionservice.getAuctionDetailsByChitNumber(memberpaymentdetails.chitNumber).subscribe(data =>{
          this.auction=data;
          this. calculatepayableamount(this.auction,memberpaymentdetails);
    });
  }

  calculatepayableamount(auction:AuctionResponse,memberpaymentdetails:MemberPaymentDetails)
  {
    
    let chitvalue  = auction.actualchitamount;
    let premium= chitvalue/memberpaymentdetails.noOfMemeber;
    let auctionamount=auction.bidamount;
    this.commission=chitvalue * 3/100;
    let interest = (auctionamount-this.commission)/memberpaymentdetails.noOfMemeber;
    let payableamount = premium-interest;
    this.Amounttopaid = payableamount;
    this.InterestAmount = interest;

  }

  savepaymentHistoryDetails()
  {
      this.paymenthistory.chitnumber=this.memberPaymentDetall.chitNumber;
      this.paymenthistory.membernumber=this.memberPaymentDetall.membernumber;
      this.paymenthistory.interestamount=this.InterestAmount;
      this.paymenthistory.paidamount=this.Amounttopaid;
      this.paymenthistory.commission=this.commission;
      this.paymenthistory.paiddate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.paymenthistory.remarks='paid';
      this.paymenthistory.auctionnumber=this.auction.auctionnumber;
      this.paymenthistoryservice.saveMemberPayentDetais(this.paymenthistory).subscribe(data=>{
      this.closebutton.nativeElement.click();
      console.log("Response",data)
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
//   ngOnDestroy(): void {
//     // Do not forget to unsubscribe the event
//     this.dtTrigger.unsubscribe();
// }

//  ngAfterViewInit(): void {this.dtTrigger.next();}

// rerender(): void {
//     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
//         // Destroy the table first
//         dtInstance.destroy();
//         // Call the dtTrigger to rerender again
//         this.dtTrigger.next();
//     });
// }   
}
