import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../http.interceptor';
import { Observable } from 'rxjs';
import { AnjumanLoanIssued } from '../objects/anjuman_loanissued';


@Injectable({
  providedIn: 'root'
})
export class AnjumanloanissuedService {

  public anjumamSaveLoanUrl:string='finance/AnjumanLoanIssued/save';

  constructor(private http:HttpInterceptor) { }

  
  saveLoanIssuedDetails(anjumanloanissued):Observable<AnjumanLoanIssued>
  {
    let body=JSON.stringify(anjumanloanissued);
    return this.http.post(this.anjumamSaveLoanUrl,body,null);
  }
}
