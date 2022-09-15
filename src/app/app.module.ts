import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentDetailsFormComponent } from './payment-module/payment-details-form/payment-details-form.component';
import { PaymentDetailsListComponent } from './payment-module/payment-details-list/payment-details-list.component';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'AddDetails', component: PaymentDetailsFormComponent },
  { path: 'ListDetails', component: PaymentDetailsListComponent },
  { path: ':id', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PaymentDetailsFormComponent,
    PaymentDetailsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
