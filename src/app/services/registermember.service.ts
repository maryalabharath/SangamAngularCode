import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../http.interceptor';
import { RegisterMemeberResponse } from '../objects/registermemberresponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistermemberService {

  public memberurl:string='finance/member/getMemberDetails';
  public membersaveurl:string='finance/member/save';
  public memberdetailsbychitnumber:string='finance/member/getMemberDetailsByChitNumber/';
  public memberdetailsbyfirstname:string='finance/member/getMemberDetailsByFirstname/'
  constructor(private http:HttpInterceptor) { }

  getMemberDetails():Observable<RegisterMemeberResponse[]>
  {
     return this.http.get(this.memberurl) ;
  }

  saveMemberDetails(regMemResponse:RegisterMemeberResponse):Observable<RegisterMemeberResponse>
  {
    const body=JSON.stringify(regMemResponse)
    console.log('Request payload',body);
    return this.http.post(this.membersaveurl,body,null)
  }

  getMemberDetailsByChitNumber(chitNumber:number):Observable<RegisterMemeberResponse[]>
  {
    return this.http.get(this.memberdetailsbychitnumber+chitNumber)
  }

  getMemberDetailsByFirstName(firstName:string):Observable<RegisterMemeberResponse[]>
  {
    let encodefirstname=encodeURI(firstName)
    return this.http.get(this.memberdetailsbyfirstname+firstName);
  }

}
