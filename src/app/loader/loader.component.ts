import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from './loader.service';
import { LoaderState } from './loader.state';

@Component({
    selector: 'app-angular-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

    show = false;
    private subscription: Subscription;

    constructor(private loaderService: LoaderService) { }

    ngOnInit() {       
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
                console.log('In loadercomponent: init method', this.show);
            });
    }

    ngOnDestroy() {
        console.log('In loadercomponent: destroy method',  this.show);
        this.subscription.unsubscribe();
    }
}
