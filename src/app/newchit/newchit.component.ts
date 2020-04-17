import { Component, OnInit, ViewChild } from '@angular/core';
import { NewChitResponse } from '../objects/newchitresponse';
import { NewchitserviceService } from '../services/newchitservice.service';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
declare var $;

@Component({
  selector: 'app-newchit',
  templateUrl: './newchit.component.html',
  styleUrls: ['./newchit.component.css']
})
export class NewchitComponent implements OnInit {


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  model: NgbDateStruct;

  public newchitreponseArray: NewChitResponse[];
  public newchitReq:NewChitResponse=new NewChitResponse();
  constructor(private newchitservice:NewchitserviceService) { }
  public successMessage:boolean = false;
  public message:string;

   // destroy:true,
  ngOnInit(): void {
    this.successMessage=true;
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5
      
   };
    this.getChitDetails();
  }
 

  getChitDetails()
  {
    this.newchitservice.getChitDetails().subscribe(data =>{
      console.log(data);
      this.newchitreponseArray=data;
      this.dtTrigger.next();
    });

  }  

  savechitdetails(newchitReq:NewChitResponse)
  {
    
    console.log(newchitReq.groupName);
    this.newchitservice.saveChitDetails(newchitReq).subscribe(data =>{
      this.message=data.groupName+' Succesfully Saved';
      this.successMessage=false;
      setTimeout(() => this.successMessage = true, 8000)
      this.rerender();
      this.ResetFormField(newchitReq);
      this.getChitDetails();
    });

  }

  ResetFormField(newchitReq:NewChitResponse)
  {
    newchitReq.groupName='';
    newchitReq.amount=null;
    newchitReq.noOfMemeber=null;
    newchitReq.noofmonths=null;

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      // this.dtTrigger.next();
    });
  }

}
