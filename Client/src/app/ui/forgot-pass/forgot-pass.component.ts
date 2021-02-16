import { AccountService } from 'src/app/services/account.service';
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

  constructor(private emailService: EmailService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.email = '';
    this.error = '';
  }
  send() {
    this.error = '';
    if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) {
      this.accountService.resetPassword(this.email).subscribe(
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
