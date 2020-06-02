import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { AuctionService } from '../services/auction.service';
import { AuctionResponse } from '../objects/auctionresponse';
import { NewChitResponse } from '../objects/newchitresponse';
import { NewchitserviceService } from '../services/newchitservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public auctionreponseArray: AuctionResponse[];
  barChartLabels: Label[]=[];
  data:any[]=[];
  public GroupNameArray:NewChitResponse[];
  public selecteChitNumber:number;
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  constructor(private auction:AuctionService,private newchitservice:NewchitserviceService) { }

  ngOnInit(): void {
    this.getGroupDetails();
  }

 

  getGroupDetails()
  {
    this.newchitservice.getChitDetails().subscribe(data =>{
      console.log(data);
      this.GroupNameArray=data;
    });
  }


  barChartOptions: ChartOptions = {
    responsive: true,
  };
 // barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.data, label: 'Auction Details', 
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'

  ],
  borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
  ],
  borderWidth: 1 
  }
  ];

  geAuctionDetailsByChitNbr()
  {
    console.log('chitnumber',this.selecteChitNumber);
    this.auctionreponseArray=[];
    this.data.length=0;
    this.barChartLabels.length=0;
    this.auction.getAuctionDetails().subscribe(data =>
      {
        this.auctionreponseArray=data;
        this.auctionreponseArray.sort(
          function(a, b) {          
             if (a.chitnumber === b.chitnumber) {
                // Sort with month when chitnumber are same
                return a.month-b.month;
             }
             return a.chitnumber > b.chitnumber ? 1 : -1;
          });

          this.auctionreponseArray.forEach(res =>
            {
              if(this.selecteChitNumber==res.chitnumber)
              {
                this.barChartLabels.push(res.month);
                this.data.push(res.bidamount);
              }
      
            })

            // this.barChartData = this.barChartData.slice();
            // // this.barChartData[0].data=this.data;
            // console.log(this.chart.chart);
            // console.log(this.chart.chart.data.datasets[0].data);
            // this.chart.chart.data.datasets[0].data=this.data;
            //  this.chart.chart.update();
            this.updateChartData(this.chart,this.data);
      });
  }

  updateChartData(chart,resultdata)
  {
    chart.data=resultdata;
    chart.update();
  }

}

//'rgba(54, 162, 235, 0.7)',
      //'rgb1a(208, 54, 100, 0.7)',