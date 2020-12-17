import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { errorModel, UserModel } from 'src/app/models/user-model';

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
    if (this.currentStep < this.steps) {
      this.currentStep += 1;
    }
    if (this.currentStep == this.steps) {
      this.nextBtn = 'Sign Me Up';
    }

  }
  ngOnInit(): void {

  }
}
