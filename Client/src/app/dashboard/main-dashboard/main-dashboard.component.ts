import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/account.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
  title: string;
  user: UserModel;
  modelNum: number;
  errorMessgae: string;
  constructor(private account: AccountService, private adminService: AdminService) {
    this.modelNum = 1;
  }

  ngOnInit(): void {
    this.user = this.account.getUser();
    this.title = `hello ${this.user.firstName} ${this.user.lastName}`;
    this.adminService.errorSubject.subscribe(err => {
      this.errorMessgae = err;
    });
  }
  setModel(num: number) {
    this.modelNum = num;
  }
  logout() {
    this.account.logout();
  }

}
