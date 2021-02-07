import { Component, OnDestroy, OnInit } from '@angular/core';
import { errorModel, UserModel } from './../../models/user-model';
import { AccountService } from './../../services/account.service';
import { DialogService } from '../dialog.service';
import { DialogData } from '../model/dialog-data';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Events } from 'ag-grid-community';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit , OnDestroy {
  public user = new UserModel();
  error = new errorModel();
  keypress:Subscription;
  constructor(public accountService: AccountService,private dialogService: DialogService) { }
  ngOnDestroy(): void {
    this.keypress.unsubscribe();
  }

  ngOnInit(): void {
  
   }
   ngAfterViewInit() {
    this.keypress =  fromEvent(window,"keyup").subscribe((e:KeyboardEvent)=>{
      console.log(e.keyCode, e.code);
      if(e.code === 'Enter' || e.keyCode === 13){
        this.login();
      }
  
    })
   }
  clear() {
    this.error = new errorModel();
  }
  login() {
    if (
      this.error.validateEmail(this.user.email) &&
      this.error.validatePassword(this.user.password)
    ) {
      this.accountService.login(this.user).subscribe(
        (response) => {
          this.accountService.setLoginUser(response.user,response.token);
          this.dialogService.subjectType.next(new DialogData());
        }
      ,err=>{
        this.error.email = err.error;
      });
    }
  }
  showRegisterlayout() {
    const dialogdata = new DialogData('Register');
    dialogdata.wide = true;
    this.dialogService.subjectType.next(dialogdata);
  }
  showForgotPass() {
    const dialogdata = new DialogData('forgotpass');
    this.dialogService.subjectType.next(dialogdata);
  }
}
