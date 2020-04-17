import { Injectable } from '@angular/core';
import { LoaderState } from './loader.state';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
    public loaderSubject: BehaviorSubject<LoaderState> = new BehaviorSubject<LoaderState>({show: false});
    loaderState = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        console.log('In loaderservice: show method');
        this.loaderSubject.next(<LoaderState>{show: true});
    }

    hide() {
        console.log('In loaderservice: hide method');
        this.loaderSubject.next(<LoaderState>{show: false});        
    }
}   


