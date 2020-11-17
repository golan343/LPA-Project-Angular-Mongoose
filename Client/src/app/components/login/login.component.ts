import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/account.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new UserModel();

  constructor(private router: Router, public accountService: AccountService,
              public dialogRef: MatDialogRef<LoginComponent>
              ) { }

  ngOnInit(): void {
  }

  public async login(): Promise<any> {
    await this.accountService.login(this.user)
      .subscribe(
        response => {
          console.log(response);
          this.dialogRef.close();
          this.router.navigateByUrl('/live');
        },
        err => {
          alert(err.message);
        });

  }
  public routeToRegisterPage(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/register');
  }


}
