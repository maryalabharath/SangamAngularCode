import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../http.interceptor';
import { Observable } from 'rxjs';
import { NewChitResponse } from '../objects/newchitresponse';

@Injectable({
  providedIn: 'root'
})
export class NewchitserviceService {

  public chiturl:string='finance/getChitDetails';
  public savechitdetatilsurl:string='finance/save'

  constructor(private http:HttpInterceptor) { }

  getChitDetails():Observable<NewChitResponse[]>
  {
     return this.http.get(this.chiturl) ;
  }

  saveChitDetails(newchitreq:NewChitResponse):Observable<NewChitResponse>
  {

    const body=JSON.stringify(newchitreq);
    console.log('request',body)
    return this.http.post(this.savechitdetatilsurl,body,null);
  }

}
