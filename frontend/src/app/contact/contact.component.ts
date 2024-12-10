import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.userService.sendMessage(this.contactForm.value).subscribe(
        response => {
          console.log('Message sent successfully', response);
          this.successMessage = 'Your message has been sent successfully!';
          this.errorMessage = null;
          this.contactForm.reset();
        },
        error => {
          console.error('Error sending message', error);
          this.errorMessage = 'There was an error sending your message. Please try again later.';
          this.successMessage = null;
        }
      );
    }
  }
}
