import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AnjumanmemberregService } from '../services/anjumanmemberreg.service';
import { AnjumanMemberRegistration } from '../objects/anjuman_memreg';

@Component({
  selector: 'app-anjumanviewmember',
  templateUrl: './anjumanviewmember.component.html',
  styleUrls: ['./anjumanviewmember.component.css']
})
export class AnjumanviewmemberComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public anjumanMemberRegDetails:AnjumanMemberRegistration[];

  constructor(private memberRegService:AnjumanmemberregService) { 
    // this.dtOptions = {
    //   pagingType: 'numbers',
    //   paging: true,
      
    // };
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      order:[]
      
   };  
   this.getMemberRegistrationDetails();
  }

  getMemberRegistrationDetails()
  {
    this.memberRegService.retriveAnjumanMemberDetails().subscribe(data => {
      this.anjumanMemberRegDetails=data;
      this.dtTrigger.next();
    })
  }

//   ngAfterViewInit() {
//     this.dtTrigger.next();
//  }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     // this.dtTrigger.next();
  //   });
  // }

}
