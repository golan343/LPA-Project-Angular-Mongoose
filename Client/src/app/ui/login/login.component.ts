import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { errorModel, UserModel } from './../../models/user-model';
import { AccountService } from './../../services/account.service' //'src/app/services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new UserModel();
  error = new errorModel();

  constructor(private router: Router, public accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.error.validateEmail(this.user.email) && this.error.validatePassword(this.user.password)) {
      this.accountService.login(this.user)
        .subscribe(
          response => {
            this.router.navigateByUrl('/home');
          },
          err => {
            alert(err.message);
          });
    }
  }


}
