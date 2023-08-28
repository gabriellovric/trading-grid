import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string) {
    localStorage.setItem('username', username);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('username') !== null;
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }
}
