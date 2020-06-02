import { Component, OnInit, ViewChild } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { AuctionResponse } from '../objects/auctionresponse';
import { NewChitResponse } from '../objects/newchitresponse';
import { NewchitserviceService } from '../services/newchitservice.service';
import { DatePipe } from '@angular/common';
import { RegistermemberService } from '../services/registermember.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { RegisterMemeberResponse } from '../objects/registermemberresponse';
import { DataTableDirective } from 'angular-datatables';
import { Response} from '@angular/http';
declare var $;
@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

 
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public GroupNameArray:NewChitResponse[];
  public ActualChitAmount:NewChitResponse=new NewChitResponse();
  public AuctionDetails:AuctionResponse=new AuctionResponse();
  public MemberNames:RegisterMemeberResponse[]=[];
  public selecteChitNumber:number;
  public selectedMemberName:RegisterMemeberResponse;
  public auctionreponseArray: AuctionResponse[];
  public myControl:FormControl;
  options: string[]=[];
  //filteredOptions: Observable<string[]>;
  public successMessage:boolean = false;
  public errorMessage:boolean=false;
  public message:string;
  public filteredMemberNames: Observable<RegisterMemeberResponse[]>;
  public selectedMember:string;
  public numberOfMonths:any[]=[];
  public selectedmonth:any;
  errorMsg: any;

  constructor(private auctionService:AuctionService,private newchitservice:NewchitserviceService,private datePipe:DatePipe,
    private registermemberservice:RegistermemberService) {
      this.myControl = new FormControl();
     }

    ngOnInit(): void {
      this.successMessage=true;
      this.errorMessage=true;

      this.dtOptions = {
        pagingType: 'simple_numbers',
        pageLength: 5,
        order:[]
        
     };  
    this.getAuctionDetails();
    this.getGroupDetails();
  }

  filtermember(s: any) {
    let firtname = s.firstname || s; // s can be a State or a string
    return this.MemberNames.filter(member =>
      member.firstname.toLowerCase().indexOf(firtname.toLowerCase()) === 0);
  }

  displayMember(member: RegisterMemeberResponse) {
    return member ? member.firstname : '';
  }

  getAuctionDetails()
  {
    this.auctionService.getAuctionDetails().subscribe(data =>{
      console.log(data);
      this.auctionreponseArray=data;
      this.dtTrigger.next();
    });
  }  

  getGroupDetails()
  {
    this.newchitservice.getChitDetails().subscribe(data =>{
      console.log(data);
      this.GroupNameArray=data;
    });
  }
  

  getActualChitAmount(chitnumber)
  {
    console.log(chitnumber);
    this.numberOfMonths=[];
    let noofmonths;
    this.selecteChitNumber=chitnumber;
    this.auctionService.getGroupNameByChitNumber(chitnumber).subscribe(data => {
      console.log(data);
      this.ActualChitAmount=data;
    },error => {
      this.errorMsg=error;
      alert(JSON.stringify(error.json()));
    })
    if(this.GroupNameArray.length!=0)
    {
      for(let group of this.GroupNameArray)
      {
        if(this.selecteChitNumber==group.chitNumber)
        {
            noofmonths=group.noOfMemeber;
        }
      }

    }

    for (let i=1;i<=noofmonths;i++)
    {
      this.numberOfMonths.push(i);
    }
    this.getMemberDetailsByChitNumber();
  }

  saveAuctionDetails(auction:AuctionResponse)
  {
    auction.actualchitamount = this.ActualChitAmount.amount;
    auction.chitnumber = this.selecteChitNumber;
    //auction.lifteddate=this.datePipe.transform(new Date(), 'yyyy-MM-dd'); hardcode
    auction.lifteddate='2021-01-10';
    auction.liftedmemname=this.selectedMemberName.firstname;
    auction.memberid=this.selectedMemberName.membernumber;
    auction.month=this.selectedmonth;
    this.auctionService.saveAuctionDetails(auction).subscribe(data => {
      console.log(data);
      this.message=data.liftedmemname+' Bid Details Succesfully Saved';
      this.successMessage=false;
      setTimeout(() => this.successMessage = true, 8000)
      this.rerender();
      this.ResetFormFields(auction);
      this.getAuctionDetails();
    },error => {
      if(error instanceof Response)
      {
        console.log(error.text());
        console.log(error.json());
        console.log(error.json().message);
        this.message=error.json().message;
        this.errorMessage=false;
        setTimeout(() => this.errorMessage = true, 10000); 
      }

      // alert(JSON.stringify(error.json()));
       //this.errorMsg=JSON.stringify(error._body);
      // console.log(error._body);
     //alert(this.errorMsg.message);
      // this.message=error._body.message;
      // this.errorMessage=false;
      // setTimeout(() => this.errorMessage = true, 8000);

      
    }
    )
    
  }

   getMemberDetailsByChitNumber()
  {
    this.selectedMember=null;
    this.registermemberservice.getMemberDetailsByChitNumber(this.selecteChitNumber).subscribe(data => {
      this.MemberNames=data;
      this.filteredMemberNames=this.myControl.valueChanges.pipe(
        startWith(null),
        map(membername => membername ? this.filtermember(membername) : this.MemberNames.slice()));
    })
  }

  selectedOption(event) {
    this.selectedMemberName = event.option.value;
    //this.selectedMember=this.selectedMemberName.firstname;
    console.log(this.selectedMemberName);
  }
  
  ResetFormFields(auction:AuctionResponse)
  {
     this.selecteChitNumber=null;
     this.ActualChitAmount.amount=null;
     auction.bidamount=null;
     this.selectedMember='';
     this.selectedMemberName.membernumber=null;
     this.options=[];
    //  this.getMemberDetailsByChitNumber();
     
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      // this.dtTrigger.next();
    });
  }

//   onChange() {
//     console.log(deviceValue);
// }
}
