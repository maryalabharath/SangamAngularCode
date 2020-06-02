import { Component, OnInit, ViewChild } from '@angular/core';
import { AnjumanmemberregService } from '../services/anjumanmemberreg.service';
import { AnujumanType } from '../objects/anjumantype';
import { NgForm, FormControl } from '@angular/forms';
import { AnjumanMemberRegistration } from '../objects/anjuman_memreg';
import { Observable } from 'rxjs';
import { startWith, map,filter } from 'rxjs/operators';
import { AnjumanloanissuedService } from '../services/anjumanloanissued.service';
import { AnjumanLoanIssued } from '../objects/anjuman_loanissued';
import { Response} from '@angular/http';

@Component({
  selector: 'app-anjumanloanissued',
  templateUrl: './anjumanloanissued.component.html',
  styleUrls: ['./anjumanloanissued.component.css']
})
export class AnjumanloanissuedComponent implements OnInit {
  
  public anjumanTypeArray:AnujumanType[];
  public anjuman:AnujumanType={} as AnujumanType;
  @ViewChild('myForm') mytemplateForm : NgForm;
  public successMessage:boolean = false;
  public errorMessage:boolean=false;
  public message:string;  
  public filteredMemberNames: Observable<AnjumanMemberRegistration[]>;
  public myControl:FormControl;
  public MemberNames:AnjumanMemberRegistration[]=[];
  public selectedMemberName:AnjumanMemberRegistration={} as AnjumanMemberRegistration;
  public filteredsurityMemberName: Observable<AnjumanMemberRegistration[]>;
  public suritymyControl:FormControl;
  public surityMemberNames:AnjumanMemberRegistration[]=[];
  public surityselectedMemberName:AnjumanMemberRegistration={} as AnjumanMemberRegistration;
  public selectedMember:string;
  public suritySelecteMember:string;
  public bookmembermyControl:FormControl;
  public bookMemberNames:AnjumanMemberRegistration[]=[];
  public bookselectedMemberName:AnjumanMemberRegistration={} as AnjumanMemberRegistration;
  public filteredbookMemberName: Observable<AnjumanMemberRegistration[]>;
  public bookselectedMember:string;
  public selectedAnjumanType:number;
  public issueamount:number;
  public anjumanLoanIssued:AnjumanLoanIssued={} as AnjumanLoanIssued;
  public anjumanType:AnujumanType={} as AnujumanType;



  constructor(private anjumanservice:AnjumanmemberregService,private anjumanloanissuedservice:AnjumanloanissuedService) {
    this.myControl = new FormControl();
    this.suritymyControl=new FormControl();
    this.bookmembermyControl=new FormControl();
  }

  ngOnInit(): void {
    this.successMessage=true;
    this.errorMessage=true;
    this.anjumanservice.getAnjumantypeDetails().subscribe(data =>
      {
        this.anjumanTypeArray=data;

      });
   
  }

  getAnjumanMemberDetailsByAnjumanType(bookmembernumber)
  {

    this.bookselectedMember=bookmembernumber;

    this.getMemberRegistrationDetails();

   

  }
  getMemberRegistrationDetails()
  {
    this.anjumanservice.retriveAnjumanMemberDetails().subscribe(data => {
      
      this.MemberNames=this.getFilteredArrayByAnjumantype(data);
      this.surityMemberNames=this.getFilteredArrayByAnjumantype(data);
      this.bookMemberNames=this.getFilteredArrayByAnjumantype(data);
      this.filteredMemberNames=this.myControl.valueChanges.pipe(
        startWith(null),
        map(membername => membername ? this.filtermember(membername) : this.MemberNames.slice()));
      this.filteredsurityMemberName=this.suritymyControl.valueChanges.pipe(
          startWith(null),
          map(membername => membername ? this.filtermemberSurity(membername) : this.surityMemberNames.slice()));
        
      this.filteredbookMemberName=this.bookmembermyControl.valueChanges.pipe(
            startWith(null),
            map(membername => membername ? this.filterbookmember(membername) : this.bookMemberNames.slice()));
    
  

    })

  }


  getFilteredArrayByAnjumantype(data)
  {
     return data.filter(member=>member.anjumantype.anjumanid == this.bookselectedMember);
  }


  filtermember(s: any) {
    let firtname = s.name || s; // s can be a State or a string
    return this.MemberNames.filter(member =>
      member.name.toLowerCase().indexOf(firtname.toLowerCase()) === 0);
  }
  filtermemberSurity(s: any) {
    let firtname = s.name || s; // s can be a State or a string
    return this.surityMemberNames.filter(member =>
      member.name.toLowerCase().indexOf(firtname.toLowerCase()) === 0);
  }

  filterbookmember(s: any) {
    let firtname = s.name || s; // s can be a State or a string
    return this.bookMemberNames.filter(member =>
      member.name.toLowerCase().indexOf(firtname.toLowerCase()) === 0);
  }

  selectedOption(event) {
    this.selectedMemberName = event.option.value;
    //this.selectedMember=this.selectedMemberName.firstname;
    console.log(this.selectedMemberName);
  }

  surity2SelectedOption(event)
  {
    this.surityselectedMemberName=event.option.value;
    console.log('surity2',this.surityselectedMemberName);
  }

  displayMember(member: AnjumanMemberRegistration) {
    return member ? member.name : '';
  }

  bookMemberSelectedOption(event)
  {
    this.bookselectedMemberName=event.option.value;
  }
  

  saveLoanIssuedDetails()
  {
    this.anjumanType.anjumanid=this.selectedAnjumanType;
    this.anjumanLoanIssued.anjumantype=this.anjumanType;
    this.anjumanLoanIssued.anjumanMemberregistration=this.bookselectedMemberName;
    this.anjumanLoanIssued.issuedamount=this.issueamount;
    this.anjumanLoanIssued.surity1address=this.selectedMemberName.address;
    this.anjumanLoanIssued.surity1name=this.selectedMemberName.name;
    this.anjumanLoanIssued.surity1mobilenumber=this.selectedMemberName.mobilenumber;
    this.anjumanLoanIssued.surity2name=this.surityselectedMemberName.name;
    this.anjumanLoanIssued.surity2address=this.surityselectedMemberName.address;
    this.anjumanLoanIssued.surity2mobilenumber=this.surityselectedMemberName.mobilenumber;
    this.anjumanLoanIssued.noofinstallments=20;
    this.anjumanLoanIssued.status='Active';

    this.anjumanloanissuedservice.saveLoanIssuedDetails(this.anjumanLoanIssued).subscribe(data=>{
      console.log(data);
      this.message=data.anjumantype.anjumanname+' Details Succesfully Saved';
      this.successMessage=false;
      setTimeout(() => this.successMessage = true, 8000)

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

      
    })
  }
}
