import { Component,ViewChild, OnInit, ElementRef } from '@angular/core';
declare var $;
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  @ViewChild('dataExample', {static: true, read: ElementRef}) table:ElementRef;

  dataTable: any;

  constructor() { }

  ngOnInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable();
  }

}
