import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from 'src/app/services/account.service';
import { MobileService } from 'src/app/services/mobile.service';
import { DialogData } from 'src/app/ui/model/dialog-data';
import { DialogService } from 'src/app/ui/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showMobile: boolean;
  isLogin: boolean;
  subscriberLogin: Subscription;
  constructor(private router: Router,
    public accountService: AccountService,
    private cookieService: CookieService,
    private dialogLocalsService: DialogService,
    private mobile: MobileService
     ) { }
  ngOnDestroy(): void {
    this.subscriberLogin.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriberLogin = this.accountService.isLoginSubject.subscribe(isLogin => {
      this.isLogin = isLogin;
    });
  }
  menuToggle() {
    this.showMobile = !this.showMobile;
    this.mobile.showMenuTrigger.next(this.showMobile);
  }
  public moveToHome(): void {
    this.router.navigateByUrl('/');
  }

  public goToDashboard(): void {
    let route = '/user-panel';
    if (this.accountService.isAdmin()){
      const role = JSON.parse(this.cookieService.get('user')).user.roleId;
      if (role === '5f58ba8855eac12930d7b405'){
        route = '/admin-panel';
        alert('admin');

      }
      else if (role === '5f58ba9a55eac12930d7b40c'){
        route = '/sub-admin';
        alert('sub admin');

      }
      else if (role === '5f58badd55eac12930d7b427'){
        route = '/gish-admin';
        alert('gish admin');

      }
    }
    this.router.navigateByUrl(route);
  }

  public logout(): void{
    this.accountService.logout();
  }

  public login(): void {
    const dialog = new DialogData("Login");
    dialog.title = '';
    dialog.text = '';
    this.dialogLocalsService.subjectType.next(dialog);
  }
  public placeBid() {
    if (this.accountService.isLogin) {
      this.router.navigate(["live"]);
    } else {
      this.login();
    }

  }
}
