import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistermemberService } from '../services/registermember.service';
import { RegisterMemeberResponse } from '../objects/registermemberresponse';
import { NewChitResponse } from '../objects/newchitresponse';
import { NewchitserviceService } from '../services/newchitservice.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, throwError } from 'rxjs';
declare var $;
@Component({
  selector: 'app-registermemeber',
  templateUrl: './registermemeber.component.html',
  styleUrls: ['./registermemeber.component.css']
})
export class RegistermemeberComponent implements OnInit {

  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public regmemreponseArray: RegisterMemeberResponse[];
  public GroupNameArray:NewChitResponse[];
  public regMemReq:RegisterMemeberResponse=new RegisterMemeberResponse();
  public memberid:number;
  public successMessage:boolean = false;
  public message:string;


  
  constructor(private registermemberservice:RegistermemberService,private newchitservice:NewchitserviceService) { }

  ngOnInit(): void {
    this.successMessage=true;
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5
      
   };
    this.getMemberDetails();
    this.getChitDetails();
    
  }
 
  getChitDetails()
  {
    this.newchitservice.getChitDetails().subscribe(data =>{
      console.log(data);
      this.GroupNameArray=data;
    });
  }

  getMemberDetails()
  {
    this.registermemberservice.getMemberDetails().subscribe(data =>{
      console.log(data);
      this.regmemreponseArray=data;
      this.dtTrigger.next();
       
    //   this.dtOptions = {
    //     data: this.regmemreponseArray,
    //     columns: [
    //       {title: 'MemberNumber', data: 'membernumber'},
    //       {title: 'ChitNumber', data: 'chitnumber'},
    //       {title: 'FirstName', data: 'firstname'},
    //       {title: 'LastName', data: 'lastname'},
    //       {title: 'Gender', data: 'gender'},
    //       {title: 'DateofBirth', data: 'dob'},
    //       {title: 'MobileNumber', data: 'mobilenumber'},
    //       {title: 'Address', data: 'address'},
    //       {title: 'EmailAddress', data: 'emailaddress'},
    //     ]
    //   };
    // }, err => {}, () => {
    //   this.dataTable = $(this.table.nativeElement);
    //   this.dataTable.DataTable(this.dtOptions);
    // });
    });
  }  

  saveMemberDetails(registermemberresponse:RegisterMemeberResponse)
  {
     console.log(registermemberresponse);
     this.registermemberservice.saveMemberDetails(registermemberresponse).subscribe(data =>{
      this.message=data.firstname+' '+data.lastname+' Succesfully Saved';
      this.successMessage=false;
      setTimeout(() => this.successMessage = true, 8000)
      this.rerender();
      this.ResetFormFields(registermemberresponse);
      this.getMemberDetails();
    });
  }

  ResetFormFields(registermemberresponse:RegisterMemeberResponse)
  {
      registermemberresponse.firstname='';
      registermemberresponse.lastname='';
      registermemberresponse.gender='';
      registermemberresponse.dob='';
      registermemberresponse.mobilenumber='';
      registermemberresponse.address='';
      registermemberresponse.emailaddress='';
      registermemberresponse.chitnumber= 0;
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      // this.dtTrigger.next();
    });
  }

  valuechange(firstname:string)
  {
    console.log('firstname',firstname);
    this.registermemberservice.getMemberDetailsByFirstName(firstname).subscribe(data => {
      console.log(data[0]);
      if(data.length !== 0)
      {
        let member=data[0]
        this.regMemReq.lastname=member.lastname;
        this.regMemReq.gender=member.gender;
        this.regMemReq.dob=member.dob;
        this.regMemReq.mobilenumber=member.mobilenumber;
        this.regMemReq.address=member.address;
        this.regMemReq.emailaddress=member.emailaddress;

      }
      else
      {
        this.regMemReq.lastname='';
        this.regMemReq.gender='';
        this.regMemReq.dob='';
        this.regMemReq.mobilenumber='';
        this.regMemReq.address='';
        this.regMemReq.emailaddress='';
      }
     
      console.log(data[0]);

    })
  }
 
}
