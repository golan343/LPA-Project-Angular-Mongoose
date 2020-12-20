import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { errorModel, UserModel, validationConstrains } from 'src/app/models/user-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [

  ]
})
export class RegisterComponent implements OnInit {


  public user = new UserModel();
  error = new errorModel();
  currentStep = 1;
  steps = 3;
  backBtn = 'Back';
  nextBtn = 'Next Step';
  constructor(
    private accountService: AccountService,
    public router: Router) { }
  public async register() {
    try {
      this.user.roleId = '5f58ba6355eac12930d7b3ef';
      console.log(this.user);
      await this.accountService.addUser(this.user);
      this.router.navigateByUrl('/home');
    }
    catch (err) {
      console.log(err)
    }
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  back() {
    if (this.currentStep == this.steps) {
      this.nextBtn = 'Next Step';
    }
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }

  }
  next() {
    if (this.currentStep == this.steps) {
      this.register();
    }
    if (this.currentStep < this.steps) {
      if (this.validate()) {
        this.currentStep += 1;
      }

    }
    if (this.currentStep == this.steps) {
      this.nextBtn = 'Sign Me Up';
    }

  }
  validate(): boolean {

    switch (this.currentStep) {
      case 1: {
        const constrainsFirst = new validationConstrains({ prop: 'firstName', content: this.user.firstName, isReqire: true, errorMsg: 'first Name is missing' });
        const constrainsLast = new validationConstrains({ prop: 'lastName', content: this.user.lastName, isReqire: true, errorMsg: 'Last Name is missing' });
        const constrainsPassword = new validationConstrains({
          prop: 'password', content: this.user.password, isReqire: true,
          errorMsg: 'Password  is missing',
          pattarn: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/g,
          pattarnErrorMsg: 'password must contain at least 8 characters one uppercase letter and one lowercase letter'
        });
        return this.error.validate(constrainsFirst) && this.error.validate(constrainsLast) && this.error.validate(constrainsPassword);
      }
      case 3: {
        const constrainsEmail = new validationConstrains({
          prop: 'email',
          content: this.user.email,
          isReqire: true,
          errorMsg: 'Email  is missing',
          pattarn: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/g,
          pattarnErrorMsg: 'Email must be valid example@example.com'
        });
        return this.error.validate(constrainsEmail);
      }

    }

    return true;
  }
  ngOnInit(): void {

  }
}
