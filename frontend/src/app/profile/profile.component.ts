import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users: any[] = [];
  editingUser: any = null;

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
  }
  navigate(){
    this.router.navigate(['/register'])
  }
  getRegistrations(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  editUser(user: any): void {
    this.editingUser = { ...user }; // Make a copy of the user to edit
  }

  cancelEdit(): void {
    this.editingUser = null; // Cancel editing
  }

  updateUser(): void {
    this.userService.updateUser(this.editingUser).subscribe(response => {
      // Refresh the user list after update
      this.getRegistrations();
      this.editingUser = null; // Clear the form
    });
  }




  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(response => {
        // Refresh the user list after deletion
        this.getRegistrations();
      });
    }
  }
}
