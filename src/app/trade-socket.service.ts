import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TradeSocketService {
  connection$: WebSocketSubject<any> | null = null;

  constructor() {}

  connect(userId: string): Observable<any> {
    this.connection$ = webSocket(`${env.trade_endpoint}/${userId}`);
    return this.connection$;
  }

  send(data: any): void {
    if (this.connection$) {
      this.connection$.next(data);
    } else {
      console.log('Did not send data, unable to open connection');
    }
  }

  closeConnection(): void {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  }

  ngOnDestroy() {
    this.closeConnection();
  }
}
