import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  username: string = '';

  constructor(private authService: AuthService) {}

  validate() {
    return this.username.length < 3;
  }

  login() {
    this.authService.login(this.username);
  }
}
