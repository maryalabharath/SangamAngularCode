
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, finalize, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http,
    Headers, ResponseContentType
} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
// import { TapUserProfileService } from './tap-services/tap-user-profile.service';
import { LoaderService } from './loader/loader.service';

@Injectable()
export class HttpInterceptor extends Http {
    login: string;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private loaderService: LoaderService) {
        super(backend, defaultOptions);
        //this.login = TapUserProfileService.userId !== null && TapUserProfileService.userId ? TapUserProfileService.userId: 'vxv819';
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        this.showLoader();

        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options)).pipe(
            map(this.extractData),
            catchError(this.handleError),
            finalize(() => {
                console.log('finally block');

                this.hideLoader();
            }), );
    }

    post<T>(url: string, body: string, options?: RequestOptionsArgs): Observable<T> {
        this.showLoader();
        url = this.newMethod(url);
        return super.post(url, body, this.getRequestOptionArgs(options)).pipe(
            map(this.extractData),
            catchError(this.handleError),
            finalize(() => {
                console.log('finally block');
                this.hideLoader();
            }), );
    }

    put<T>(url: string, body: string, options?: RequestOptionsArgs): Observable<T> {
        this.showLoader();

        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options)).pipe(
            map(this.extractData),
            catchError(this.handleError),
            finalize(() => {
                console.log('finally block');
                this.hideLoader();
            }), );
    }

    delete<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        this.showLoader();

        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options)).pipe(
            map(this.extractData),
            catchError(this.handleError),
            finalize(() => {
                console.log('finally block');
                this.hideLoader();
            }), );
    }

    testGet<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        this.showLoader();

        return super.get(url, this.getRequestOptionArgs(options)).pipe(
            map(this.extractData),
            catchError(this.handleError),
            finalize(() => {
                console.log('finally block');
                this.hideLoader();
            }), );
    }

    testPost<T>(url: string, body: string, options?: RequestOptionsArgs): Observable<T> {
        this.showLoader();

        return super.post(url, body, this.getRequestOptionArgs(options)).pipe(
            map(this.extractData),
            catchError(this.handleError),
            finalize(() => {
                console.log('finally block');
                this.hideLoader();
            }), );
    }

    postExcel<T>(url: string, body: string, options?: RequestOptionsArgs): Observable<Blob> {
        this.showLoader();
        url = this.updateUrl(url);

        options = this.getRequestOptionArgs(options);
        options.responseType = ResponseContentType.Blob;
        return super.post(url, body, options).pipe(
            map(res => new Blob([(<any>res)._body], { type: 'application/vnd.ms-excel' })),
            catchError(this.handleError),
            finalize(() => {
                console.log('finally block');
                this.hideLoader();
            }), );
    }

    private newMethod(url: string) {
        url = this.updateUrl(url);
        return url;
    }


    private updateUrl(req: string) {
       // this.login = TapUserProfileService.userId !== null && TapUserProfileService.userId ? TapUserProfileService.userId : 'pxl293';
       // console.log('InHttpInterceptor -- Update URL  -- loginUser :', this.login);
        //TODO  clean this function as no need to pass userId as service layer will take care of it.
        // return environment.baseUrl + req;
        // return environment.baseUrl + req + '?userId=' + this.login;
        return environment.baseUrl + req;

    }
  
    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
       // this.login = TapUserProfileService.userId !== null && TapUserProfileService.userId ? TapUserProfileService.userId : 'nxg335';
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        // let  ctSession = this.getCookieInfo();
        //options.headers.append('Cookie',ctSession );

        //options.headers.append('Access-Control-Allow-Credentials', 'true');  
        // options.headers.append('withCredentials', 'true');       
        //options.headers.append('Access-Control-Allow-Origin', '*');        
        // console.log("In HttpInterceptor -- getRequestOptionArgs -- loginUser :", this.login);
        options.withCredentials = false;
        return options;
    }

    extractData(res: Response) {
        const body = res.json();
        return body || {};
    }
    handleError(error: any) {
        return observableThrowError(error);
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }

    getCookieInfo() {

        const cookieData = document.cookie;
        let ctSession = '';
        console.log('cookie: ', cookieData);
        if (cookieData !== 'undefined') {
            const data = cookieData.split(';');
            if (data.length > 0) {
                data.forEach(element => {
                    if (element.split('=')[0].replace(/\s/g, '') === 'CTSESSION') {
                        ctSession = element;
                    }
                });
            }
            console.log('ctSession  from cookie: ', ctSession);
        }
        return ctSession;
    } 
}
