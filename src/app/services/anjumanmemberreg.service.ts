import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../http.interceptor';
import { Observable } from 'rxjs';
import { AnujumanType } from '../objects/anjumantype';
import { AnjumanMemberRegistration } from '../objects/anjuman_memreg';

@Injectable({
  providedIn: 'root'
})
export class AnjumanmemberregService {

  private anjumantypeurl:string='finance/AnjumanType/getAnjumanType';
  private saveanjumanmeberurl:string='finance/AnjumanMemberReg/save';
  private getanjumanDetailurl:string='finance/AnjumanMemberReg/getAllDetails';

  constructor(private http:HttpInterceptor) { }

  getAnjumantypeDetails():Observable<AnujumanType[]>
  {
    return this.http.get(this.anjumantypeurl);
  }

  saveAnjumanMemberDetails(member:AnjumanMemberRegistration):Observable<AnjumanMemberRegistration>
  {
    let body=JSON.stringify(member);
    return this.http.post(this.saveanjumanmeberurl,body,null);
  }

  retriveAnjumanMemberDetails():Observable<AnjumanMemberRegistration[]>
  {
    return this.http.get(this.getanjumanDetailurl);
  }



}
