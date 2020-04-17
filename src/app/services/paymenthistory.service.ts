import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../http.interceptor';
import { Observable } from 'rxjs';
import { RegisterMemeberResponse } from '../objects/registermemberresponse';
import { PaymentHistory } from '../objects/paymenthistory';
import { MemberPaymentDetails } from '../objects/memberpaymentdetails';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymenthistoryService {

  public paymentDetailsurl:string='finance/Payment/getPaymentDetails';
  public DistinctNamesurl:string='finance/member/getDistinctMemName';
  public MemberPaymenturl:string='finance/Payment/getMemberPaymentDetails';
  public savepaymenturl:string='finance/Payment/save';
  public paymenthistoryurl:string='finance/Payment/getPaymentHistoryDetails';
  public pendingpaymenturl:string='finance/Payment/PendingChitPayments/';

  constructor(private http:HttpInterceptor) { }

  getPaymentHistoryDetails():Observable<PaymentHistory[]>
  {
     return this.http.get(this.paymentDetailsurl) ;
  }

  getDistinctMemberName():Observable<string[]>
  {
    return this.http.get(this.DistinctNamesurl);
  }

  getMemberPaymentDetails(firstname:string):Observable<MemberPaymentDetails[]>
  {
    let encodefirstname=encodeURI(firstname)
    return this.http.get(this.MemberPaymenturl+'?firstName='+encodefirstname);
  }

  saveMemberPayentDetais(memberpaymentdetails:PaymentHistory):Observable<PaymentHistory>
  {
    const body=JSON.stringify(memberpaymentdetails);
     return this.http.post(this.savepaymenturl,body,null);
  }

  getPaymentDetailsHistory():Observable<PaymentHistory[]>
  {
    return this.http.get(this.paymenthistoryurl);
  }

  getPendingPaymentDetails(chitnumber:number):Observable<RegisterMemeberResponse[]>
  {
    return this.http.get(this.pendingpaymenturl+chitnumber);
  }
}
