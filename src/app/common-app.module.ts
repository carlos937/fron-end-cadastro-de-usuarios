
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  imports: [
    RouterModule,
    NgxLocalStorageModule.forRoot(),
    NgxUiLoaderModule,
    ToastrModule.forRoot(), 
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
    HttpClientModule ,
    FormsModule,
    SweetAlert2Module
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})

export class CommonAppModule { }
