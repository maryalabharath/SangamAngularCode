import { Component, OnInit, ViewChild } from '@angular/core';
import { AnjumanMemberRegistration } from '../objects/anjuman_memreg';
import { AnjumanmemberregService } from '../services/anjumanmemberreg.service';
import { AnujumanType } from '../objects/anjumantype';
import { NgForm } from '@angular/forms';
import { Response} from '@angular/http';

@Component({
  selector: 'app-anjumanmemregistration',
  templateUrl: './anjumanmemregistration.component.html',
  styleUrls: ['./anjumanmemregistration.component.css']
})
export class AnjumanmemregistrationComponent implements OnInit {

  public memberReg: AnjumanMemberRegistration = {} as AnjumanMemberRegistration;
  public anjumanTypeArray:AnujumanType[];
  public anjuman:AnujumanType={} as AnujumanType;
  @ViewChild('myForm') mytemplateForm : NgForm;
  public successMessage:boolean = false;
  public errorMessage:boolean=false;
  public message:string;

  constructor(private anjumanMemReg:AnjumanmemberregService) {}

  ngOnInit(): void {

    this.successMessage=true;
    this.errorMessage=true;
    this.anjumanMemReg.getAnjumantypeDetails().subscribe(data =>
      {
        this.anjumanTypeArray=data;

      })
  }

  saveAnjumanRegistrationDetails(member:AnjumanMemberRegistration)
  {
    this.anjuman.anjumanid=member.anjumantype;
    member.anjumantype=this.anjuman;

     this.anjumanMemReg.saveAnjumanMemberDetails(member).subscribe(data=>
      {
        console.log('data',data);
        this.message=data.name+''+data.surname+'AnjumanDetails Succesfully Saved';
        this.successMessage=false;
        setTimeout(() => this.successMessage = true, 8000)
       this.resetform();
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
  });
}
resetform()
{
  this.mytemplateForm.reset();

}

}
