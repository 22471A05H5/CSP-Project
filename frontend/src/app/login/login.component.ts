// login.component.ts

import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: UserService,private router:Router) {}

  login() {
    const user = { username: this.username, password: this.password };
    this.authService.login(user).subscribe(response => {
      alert(response.message);
      if (response.message === 'Login successful!') {
        this.router.navigate(['/bussinesses']);
      }
    });
  }
}
