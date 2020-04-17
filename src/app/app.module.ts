import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewchitComponent } from './newchit/newchit.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuctionComponent } from './auction/auction.component';
import { ChitpaymentComponent } from './chitpayment/chitpayment.component';
import { ChitpaymenthistoryComponent } from './chitpaymenthistory/chitpaymenthistory.component';
import { PendingchitpaymentComponent } from './pendingchitpayment/pendingchitpayment.component';
import { DatatableComponent } from './datatable/datatable.component';
import { NewchitserviceService } from './services/newchitservice.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { HttpInterceptor } from './http.interceptor';
import { httpFactory } from './http.factory';
import { LoaderService } from './loader/loader.service';
import { AuctionService } from './services/auction.service';
import { RegistermemeberComponent } from './registermemeber/registermemeber.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { DataTablesModule } from 'angular-datatables';
import { NewdatatableComponent } from './newdatatable/newdatatable.component';
import { DatePipe } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GooglechartsComponent } from './googlecharts/googlecharts.component';

const appRoutes: Routes = [
  { path:'',component:DashboardComponent},
  { path:'newchit',component:NewchitComponent},
  { path:'auction',component:AuctionComponent},
  { path:'chitpayment',component:ChitpaymentComponent},
  { path:'chitpaymenthistory',component:ChitpaymenthistoryComponent},
  { path:'pendingchitpayment',component:PendingchitpaymentComponent},
  { path:'datatable',component:DatatableComponent},
  { path:'registercomponent',component:RegistermemeberComponent},
  { path:'newdatatable',component:NewdatatableComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NewchitComponent,
    DashboardComponent,
    AuctionComponent,
    ChitpaymentComponent,
    ChitpaymenthistoryComponent,
    PendingchitpaymentComponent,
    DatatableComponent,
    RegistermemeberComponent,
    NewdatatableComponent,
    LoaderComponent,
    GooglechartsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    DataTablesModule,
    RouterModule.forRoot(appRoutes,{useHash:false}),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    NewchitserviceService,
    LoaderService,
    AuctionService,
    DatePipe,
    {
      provide:HttpInterceptor,
      useFactory:httpFactory,
      deps:[XHRBackend,RequestOptions,LoaderService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
