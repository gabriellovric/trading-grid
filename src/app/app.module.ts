import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeGridComponent } from './trade-grid/trade-grid.component';

@NgModule({
  declarations: [AppComponent, TradeGridComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, AgGridModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
