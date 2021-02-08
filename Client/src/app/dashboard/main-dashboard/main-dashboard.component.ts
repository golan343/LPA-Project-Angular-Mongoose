import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/account.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent implements OnInit {
  title: string;
  user: UserModel;
  modelNum: number;
  errorMessgae: string;
  userImage: string;
  routerStateArray: number[];
  constructor(
    private account: AccountService,
    private adminService: AdminService
  ) {
    this.modelNum = 2;
    this.routerStateArray = new Array<number>();
    this.routerStateArray.push(1);
  }

  ngOnInit(): void {
    this.user = this.account.getUser();
    this.title = `hello ${this.user.firstName} ${this.user.lastName}`;
    this.adminService.getUserImage(this.user._id).subscribe((result) => {
      this.userImage = result.img;
    });
    this.adminService.errorSubject.subscribe((err) => {
      this.errorMessgae = err;
      setTimeout(this.clearError.bind(this), 10000);
    });
    this.adminService.componentNumberSubject.subscribe((modelNumber) => {
      this.modelNum = modelNumber;
      this.routerStateArray.push(modelNumber);
    });
    window.history.pushState('forward', null, null);
    const popstateEvent = fromEvent(window,'popstate')
    popstateEvent.subscribe((e) => {
      debugger;
      let lastModule = this.routerStateArray.pop();
      console.log(lastModule);
      this.modelNum = lastModule;
    });
  }
  clearError() {
    this.errorMessgae = '';
  }
  setModel(modelNumber: number) {
    this.modelNum = modelNumber;
    this.routerStateArray.push(modelNumber);
  }
  logout() {
    this.account.logout();
  }
}
