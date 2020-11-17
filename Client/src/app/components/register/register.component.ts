import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide:  STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
export class RegisterComponent implements OnInit {

  public regForm: FormGroup;
  public personalDetails: FormGroup;
  public user = new UserModel();

  // tslint:disable-next-line: variable-name
  constructor(
    private myFormBuilder: FormBuilder,
    private accountService: AccountService,
    public router: Router) { }
  // tslint:disable-next-line: typedef
  public async register() {
    try{
      this.user.email = this.regForm.value.emailControl;
      this.user.password = this.regForm.value.passwordControl;
      this.user.firstName = this.personalDetails.value.firstNameControl;
      this.user.lastName = this.personalDetails.value.lastNameControl;
      this.user.country = this.personalDetails.value.countryControl;
      this.user.city = this.personalDetails.value.cityControl;
      this.user.street = this.personalDetails.value.streetControl;
      this.user.postcode = this.personalDetails.value.postcodeControl;
      this.user.birthDate = this.personalDetails.value.birthDateControl;
      this.user.roleId = '5f58ba6355eac12930d7b3ef';
      console.log(this.user);
      await this.accountService.addUser(this.user);
      this.router.navigateByUrl('/home');
    }
    catch (err){

    }
  }

  ngOnInit(): void {
    if (this.accountService.isUserLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
    this.regForm = this.myFormBuilder.group({
      emailControl: ['', Validators.required],
      passwordControl: ['', Validators.required]
    });
    this.personalDetails = this.myFormBuilder.group({
      firstNameControl: ['', Validators.required],
      lastNameControl: ['', Validators.required],
      postcodeControl: ['', Validators.required],
      countryControl: ['', Validators.required],
      cityControl: ['', Validators.required],
      birthDateControl: ['', Validators.required],
      streetControl: ['', Validators.required]
    });
  }
}
