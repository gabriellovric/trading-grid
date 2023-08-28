import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TradeGridComponent } from './trade-grid/trade-grid.component';
import { ChatCardComponent } from './chat-card/chat-card.component';

@NgModule({
  declarations: [AppComponent, TradeGridComponent, LoginFormComponent, ChatCardComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
