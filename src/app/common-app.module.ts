
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [
    RouterModule,
    NgxLocalStorageModule.forRoot(),
    ModalModule.forRoot(),
    NgxUiLoaderModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right'
    }), 
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module,
  ],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    NgxLocalStorageModule,
    NgxUiLoaderModule,
    ToastrModule,
    FontAwesomeModule,
    HttpClientModule ,
    FormsModule,
    SweetAlert2Module
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})

export class CommonAppModule { }
