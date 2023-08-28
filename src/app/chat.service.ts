import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  connection$: WebSocketSubject<any> | null = null;

  constructor() {}

  connect(userId: string): Observable<any> {
    this.connection$ = webSocket({
      url: `${environment.chat_endpoint}/${userId}`,
      deserializer: ({ data }) => data,
      serializer: (data) => data,
    });
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
