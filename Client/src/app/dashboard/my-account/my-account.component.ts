import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(private account: AccountService) { }
  user: UserModel;
  ngOnInit(): void {
    this.user = this.account.getUser();
  }
  saveChanges() {
    
  }
}
