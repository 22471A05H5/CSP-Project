import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email:string='';

  constructor(private authService: UserService,private router:Router) {}

  //register() {
    //const user = { username: this.username, password: this.password };
    //this.authService.register(user).subscribe(response => {
     // alert(response.message);
    //});
 // }


 register() {
  if (this.validateInputs()) {
    const user = { username: this.username, password: this.password ,email: this.email};
    this.authService.register(user).subscribe(response => {
      alert(response.message);
      if (response.message === 'User registered!') {
        this.router.navigate(['/login']);
      }
    });
  }
}

validateInputs(): boolean {
  if (this.username.length < 3) {
    alert('Username must be at least 3 characters long.');
    return false;
  }

  if (this.password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(this.email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  

  return true;
}

}
