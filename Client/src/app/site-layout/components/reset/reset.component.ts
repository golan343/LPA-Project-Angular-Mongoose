import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  public password: string;
  public error: string;

  constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.password = '';
    this.error = '';
  }

  public updatePass() {
    if(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/.test(this.password)){
      const token = this.activatedRoute.snapshot.params.token;
      this.accountService.updatePassword(token, this.password)
        .subscribe(user => {
          console.log(user);
        },error => {
          console.log(error)
        })
      
    } else {
      this.error = 'password must contain at least 8 characters one uppercase letter and one lowercase letter';
      console.log(this.error);
    }
    
  }

  public clear() {
    this.error = '';
  }
}
