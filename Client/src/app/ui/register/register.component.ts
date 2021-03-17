import { AccountService } from '../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { errorModel, UserModel, validationConstrains } from 'src/app/models/user-model';
import { DialogService } from '../dialog.service';
import { DialogData } from '../model/dialog-data';
import { PageService } from 'src/app/services/page.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {


  public user = new UserModel();
  error = new errorModel();
  errorMsg = '';
  currentStep = 1;
  steps = 4;
  backBtn = 'Back';
  nextBtn = 'Next Step';
  approvalContant = Array<string>();
  isapproved = false;
  public today = new Date();
  public minAge = new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate());
  title = 'User initial Details';
  constructor(
    private accountService: AccountService,
    private dialog: DialogService,
    private pageService: PageService,
  ) { }
  ngOnInit(): void {
    const listOfCall = [this.pageService.getPage('Terms'), this.pageService.getPage('policy')];
    forkJoin(listOfCall).subscribe(result => {
      console.log(result);
      const bdarr = result.map(page => { return page.content; });
      console.log(bdarr);
      bdarr.map(arr => {
        this.approvalContant = [...this.approvalContant, ...arr];
      })
    });
  }
  public register() {

    this.user.roleId = '5f58ba6355eac12930d7b3ef';
    this.user.registrationDate = this.today.toLocaleString();
    this.user.loginDate = this.today.toLocaleString();
    this.accountService.addUser(this.user).subscribe(result => {
      const d = new DialogData('');
      d.show = true;
      d.title = 'Congratulations !!';
      d.innerTitle = 'you have sign in successfully!';
      d.text = 'we are please to have you registration complete'
      this.dialog.method();
      this.dialog.subjectType.next(d);
      this.accountService.setLoginUser(result.addedUser, result.token)
    }, err => {
      if (err.error) {
        if (err.error.errors) {
          for (let prop in err.error.errors) {
            let errItem = err.error.errors[prop];
            this.error[prop] = errItem.message;
          }
        }
      }
    });


  }
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  back() {
    this.errorMsg = '';
    if (this.currentStep == this.steps) {
      this.nextBtn = 'Next Step';
    }
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }
  }
  next() {
    this.errorMsg = '';
    if (this.currentStep <= this.steps) {
      if (this.validate()) {
        this.currentStep += 1;
      }
    }
    if (this.currentStep > this.steps && this.isapproved) {
      this.register();
    }

    if (this.currentStep == this.steps) {
      this.nextBtn = 'Sign Me Up';
    }
  }

  checkIsApproved($event) {
    this.error = new errorModel();
    this.isapproved = !this.isapproved;
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
      case 2: {
        const constrainsCountry = new validationConstrains({ prop: 'country', content: this.user.country, isReqire: true, errorMsg: 'country Name is missing' });
        const constrainsCity = new validationConstrains({ prop: 'city', content: this.user.city, isReqire: true, errorMsg: 'city Name is missing' });
        const constrainsStreet = new validationConstrains({ prop: 'street', content: this.user.street, isReqire: true, errorMsg: 'street Name is missing' });
        return this.error.validate(constrainsCountry) && this.error.validate(constrainsCity) && this.error.validate(constrainsStreet);
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
        const constrainsbirthDate = new validationConstrains({ prop: 'birthDate', content: this.user.birthDate, isReqire: true, errorMsg: 'birth Date Name is missing' });
        return this.error.validate(constrainsEmail) && this.error.validate(constrainsbirthDate);
      }
      case 4: {
        if(!this.isapproved){
          const constrainsbirthDate = new validationConstrains({ prop: 'isApproved', isReqire: true, errorMsg: 'You have to approve the terms and policy' });
         // this.error["isApproved"] = "Please Approve the Terms";
          return this.error.validate(constrainsbirthDate);
        }
      }

    }

    return true;
  }
  selectCountry($event) {
    this.user.country = $event;
  }
}
