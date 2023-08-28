import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  username: string = '';
  message: string = '';
  messages: string[] = [];
  destroyed$ = new Subject();

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();

    const chartSub$ = this.chatService
      .connect(this.username)
      .pipe(takeUntil(this.destroyed$));

    chartSub$.subscribe((msg) => this.messages.push(msg));
  }

  validate() {
    this.message.length > 0;
  }

  send() {
    this.chatService.send(this.message);
    this.message = '';
  }

  close() {
    this.chatService.closeConnection();
    this.closeEvent.emit();
  }

  countLines() {
    const lines = this.message.split('\n').length;

    return lines > 3 ? 3 : lines;
  }

  ngOnDestroy() {
    this.destroyed$.complete();
  }
}
