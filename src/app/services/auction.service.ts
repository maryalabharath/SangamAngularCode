import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../http.interceptor';
import { AuctionResponse } from '../objects/auctionresponse';
import { Observable } from 'rxjs';
import { NewChitResponse } from '../objects/newchitresponse';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  public auctionurl:string='finance/Auction/getAuctionDetails';
  public auctionbychitNbr:string='finance/Auction/auctionbyChitNumber/';
  public auctiongroupname:string='finance/getGroupName/'
  public saveauctionurl:string='finance/Auction/save'
  constructor(private http:HttpInterceptor) { }

  getAuctionDetails():Observable<AuctionResponse[]>
  {
     return this.http.get(this.auctionurl) ;
  }

  getAuctionDetailsByChitNumber(chitnumber:number):Observable<AuctionResponse>
  {
    return this.http.get(this.auctionbychitNbr+chitnumber) ;
  }

  getGroupNameByChitNumber(chitnumber:number):Observable<NewChitResponse>
  {
    return this.http.get(this.auctiongroupname+chitnumber);
  }

  saveAuctionDetails(auction:AuctionResponse):Observable<AuctionResponse>
  {
    const body=JSON.stringify(auction);
    return this.http.post(this.saveauctionurl,body,null)
  }
  
}
