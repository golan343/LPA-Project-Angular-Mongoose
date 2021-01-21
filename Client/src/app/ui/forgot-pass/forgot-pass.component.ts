import { Component, OnInit } from '@angular/core';
import { EmailService, EmailContent } from './../../services/email.service';
@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  email: string;
  error: string;

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    this.email = '';
    this.error = '';
  }
  send() {
    this.error = '';
    if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) {
      this.emailService.sendEmail(this.email).subscribe(
        result => {

        },
        err => {

        }
      );

    } else {
      this.error = 'This email is inValid'
    }


  }
  clear() {
    this.error = '';
  }
}
