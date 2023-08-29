import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  username: string = '';

  constructor(private authService: AuthService) { }

  validate() {
    return this.username.length >= 3;
  }

  login() {
    console.log("oiljiojoijoijoijoij")
    if (!this.validate()) return;

    this.authService.login(this.username);
  }
}
